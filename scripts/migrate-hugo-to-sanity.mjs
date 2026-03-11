import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

const cwd = process.cwd();
const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");

const env = await loadEnv(path.join(cwd, ".env"));
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET ?? "production";
const token = env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "Manglar PUBLIC_SANITY_PROJECT_ID eller SANITY_WRITE_TOKEN i .env. Tokenet trengst berre for å køyre migreringsskriptet.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const publicDir = path.join(cwd, "public");
const pageDir = path.join(cwd, "content", "sider");
const newsDir = path.join(cwd, "content", "nyheter");
const homepageFile = path.join(cwd, "content", "_index.md");

const imageCache = new Map();

async function main() {
  const homepage = await buildHomepageDocument(homepageFile);
  const pages = await loadMarkdownDocuments(pageDir, buildPageDocument);
  const news = await loadMarkdownDocuments(newsDir, buildNewsDocument, {
    exclude: new Set(["_index.md"]),
  });

  const documents = [homepage, ...pages, ...news];

  console.log(
    `${shouldWrite ? "Importer" : "Dry-run"} ${documents.length} dokument til Sanity (${dataset})`,
  );

  for (const doc of documents) {
    console.log(`- ${doc._type}:${doc._id} (${doc.title ?? doc.heroTitle ?? "utan tittel"})`);
  }

  if (!shouldWrite) {
    console.log("Dry-run ferdig. Kjør med --write for å sende til Sanity.");
    return;
  }

  for (const doc of documents) {
    await client.createOrReplace(doc);
    console.log(`Oppdaterte ${doc._type}:${doc._id}`);
  }
}

async function loadMarkdownDocuments(dir, builder, options = {}) {
  const entries = await readdir(dir);
  const files = entries
    .filter((entry) => entry.endsWith(".md") && !options.exclude?.has(entry))
    .sort();

  const docs = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const parsed = await parseMarkdownFile(fullPath);
    docs.push(await builder(parsed, file));
  }

  return docs;
}

async function buildHomepageDocument(filePath) {
  const parsed = await parseMarkdownFile(filePath);
  const existing = shouldWrite
    ? await client.fetch(`*[_type == "hjemmeside" && _id == "hjemmeside-singleton"][0]`)
    : null;

  return {
    _id: "hjemmeside-singleton",
    _type: "hjemmeside",
    heroTitle: "Fiksdal/Rekdal ballklubb",
    heroLead: "Ein inkluderande fotballklubb for barn, unge og vaksne.",
    heroPosition: normalizeHeroPosition(parsed.data.heroPosition),
    heroActions: existing?.heroActions ?? [
      {
        _key: randomUUID(),
        _type: "object",
        label: "Siste nytt",
        href: "/nyheter/",
        variant: "primary",
      },
      {
        _key: randomUUID(),
        _type: "object",
        label: "Bli med",
        href: "/kontakt/",
        variant: "secondary",
      },
    ],
    newsSectionTitle: existing?.newsSectionTitle ?? "Siste nyheter",
    matchesSectionTitle: existing?.matchesSectionTitle ?? "Kamper",
    badges: existing?.badges ?? [
      {
        _key: randomUUID(),
        _type: "object",
        title: "Fair Play",
        text: "Respekt · inkludering · glede",
      },
      {
        _key: randomUUID(),
        _type: "object",
        title: "Kvalitetsklubb",
        text: "NFF-sertifisering",
      },
      {
        _key: randomUUID(),
        _type: "object",
        title: "Dugnad",
        text: "Vi bygger klubb saman",
      },
    ],
    sponsors: existing?.sponsors ?? [],
    ...(await maybeHeroImage(parsed.data.heroImage)),
  };
}

async function buildPageDocument(parsed) {
  const slug = parsed.data.slug ?? slugify(parsed.data.title);
  const navigationOrder = parsed.data.menu?.main?.weight ?? 100;

  return {
    _id: publicDocumentId("side", slug),
    _type: "side",
    title: parsed.data.title,
    slug: { _type: "slug", current: slug },
    showInNavigation: true,
    navigationTitle: parsed.data.navigationTitle ?? parsed.data.title,
    navigationOrder,
    heroPosition: normalizeHeroPosition(parsed.data.heroPosition),
    body: await markdownToPortableText(parsed.content),
    ...(await maybeHeroImage(parsed.data.heroImage)),
  };
}

async function buildNewsDocument(parsed, fileName) {
  const baseName = fileName.replace(/\.md$/, "");
  const slug = parsed.data.slug ?? baseName;
  const publishedAt = normalizeDate(parsed.data.date);

  return {
    _id: publicDocumentId("nyhet", slug),
    _type: "nyhet",
    title: parsed.data.title,
    slug: { _type: "slug", current: slug },
    publishedAt,
    summary: parsed.data.summary ?? "",
    body: await markdownToPortableText(parsed.content),
    ...(await maybeHeroImage(parsed.data.heroImage)),
  };
}

async function maybeHeroImage(imagePath) {
  if (!imagePath) {
    return {};
  }

  const asset = await uploadImage(imagePath);
  return {
    heroImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };
}

async function uploadImage(imagePath) {
  if (imageCache.has(imagePath)) {
    return imageCache.get(imagePath);
  }

  if (!shouldWrite) {
    const dryRunAsset = { _id: `dryrun.${path.basename(imagePath)}` };
    imageCache.set(imagePath, dryRunAsset);
    return dryRunAsset;
  }

  const normalized = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(publicDir, normalized);
  const file = await readFile(fullPath);
  const asset = await client.assets.upload("image", file, {
    filename: path.basename(fullPath),
  });
  imageCache.set(imagePath, asset);
  return asset;
}

async function markdownToPortableText(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(textBlock(text));
    }
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    for (const item of listItems) {
      blocks.push(textBlock(item, "normal", ["bullet"]));
    }
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      flushList();
      continue;
    }

    const imageMatch = trimmed.match(/^!\[(.*?)\]\((.+?)\)$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      blocks.push(await imageBlock(imageMatch[2]));
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push(textBlock(headingMatch[2], headingStyle(headingMatch[1].length)));
      continue;
    }

    const listMatch = trimmed.match(/^-\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function textBlock(text, style = "normal", listItem = undefined) {
  const { children, markDefs } = parseInlineChildren(text);
  return {
    _key: randomUUID(),
    _type: "block",
    style,
    ...(listItem ? { listItem: listItem[0], level: 1 } : {}),
    markDefs,
    children,
  };
}

async function imageBlock(imagePath) {
  const asset = await uploadImage(imagePath);
  return {
    _key: randomUUID(),
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

function parseInlineChildren(text) {
  const children = [];
  const markDefs = [];
  let remaining = text;
  const defsByHref = new Map();

  while (remaining.length > 0) {
    const markdownLinkMatch = remaining.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    const bareUrlMatch = remaining.match(/https?:\/\/[^\s]+/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    const candidates = [markdownLinkMatch, bareUrlMatch, boldMatch]
      .filter(Boolean)
      .map((match) => ({ match, index: match.index ?? 0 }));

    if (candidates.length === 0) {
      pushSpan(children, remaining);
      break;
    }

    candidates.sort((a, b) => a.index - b.index);
    const { match, index } = candidates[0];

    if (index > 0) {
      pushSpan(children, remaining.slice(0, index));
    }

    if (match === markdownLinkMatch) {
      const href = match[2];
      const markKey = ensureLinkDef(markDefs, defsByHref, href);
      pushSpan(children, match[1], [markKey]);
    } else if (match === bareUrlMatch) {
      const href = match[0];
      const markKey = ensureLinkDef(markDefs, defsByHref, href);
      pushSpan(children, href, [markKey]);
    } else {
      pushSpan(children, match[1], ["strong"]);
    }

    remaining = remaining.slice(index + match[0].length);
  }

  return { children, markDefs };
}

function pushSpan(children, text, marks = []) {
  if (!text) {
    return;
  }

  children.push({
    _key: randomUUID(),
    _type: "span",
    marks,
    text,
  });
}

function ensureLinkDef(markDefs, defsByHref, href) {
  if (defsByHref.has(href)) {
    return defsByHref.get(href);
  }

  const key = randomUUID();
  defsByHref.set(href, key);
  markDefs.push({
    _key: key,
    _type: "link",
    href,
  });
  return key;
}

function headingStyle(level) {
  if (level === 1) return "h1";
  if (level === 2) return "h2";
  if (level === 3) return "h3";
  if (level === 4) return "h4";
  if (level === 5) return "h5";
  return "h6";
}

function normalizeHeroPosition(value) {
  if (["top", "center", "bottom"].includes(value)) {
    return value;
  }
  return "center";
}

function normalizeDate(value) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Ugyldig dato: ${value}`);
  }

  return date.toISOString();
}

function slugify(value = "") {
  return value
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function publicDocumentId(prefix, slug) {
  return `${prefix}-${slug}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

async function parseMarkdownFile(filePath) {
  const source = await readFile(filePath, "utf8");
  return parseFrontMatter(source, filePath);
}

function parseFrontMatter(source, filePath) {
  if (!source.startsWith("---\n")) {
    return {
      data: {},
      content: source.trim(),
      filePath,
    };
  }

  const end = source.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error(`Fant ikkje slutt på front matter i ${filePath}`);
  }

  const rawFrontMatter = source.slice(4, end);
  const content = source.slice(end + 5).trim();

  return {
    data: parseSimpleYaml(rawFrontMatter),
    content,
    filePath,
  };
}

function parseSimpleYaml(source) {
  const root = {};
  const stack = [{ indent: -1, value: root }];

  for (const rawLine of source.split("\n")) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) {
      continue;
    }

    const indent = rawLine.match(/^ */)[0].length;
    const line = rawLine.trim();
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const current = stack[stack.length - 1].value;

    if (!rawValue) {
      current[key] = {};
      stack.push({ indent, value: current[key] });
      continue;
    }

    current[key] = parseYamlScalar(rawValue);
  }

  return root;
}

function parseYamlScalar(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  return value;
}

async function loadEnv(filePath) {
  const result = {};
  const source = await readFile(filePath, "utf8");

  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1);
    result[key] = value;
  }

  return result;
}

await main();
