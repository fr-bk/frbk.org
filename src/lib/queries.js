/** Alle nyheter, nyaste først */
export const allNyheterQuery = `*[_type == "nyhet"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  "heroImageRef": heroImage
}`;

/** Enkelt nyheit etter slug */
export const nyhetBySlugQuery = `*[_type == "nyhet" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  body,
  "heroImageRef": heroImage
}`;

/** Alle sider (for getStaticPaths) */
export const allSiderQuery = `*[_type == "side"] {
  title,
  "slug": slug.current
}`;

/** Enkelt side etter slug */
export const sideBySlugQuery = `*[_type == "side" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  "heroImageRef": heroImage,
  heroPosition
}`;

/** Framsida-singleton */
export const hjemmesideQuery = `*[_type == "hjemmeside" && _id == "hjemmeside-singleton"][0] {
  heroTitle,
  heroLead,
  "heroImageRef": heroImage,
  heroPosition,
  sponsors[] {
    name,
    url,
    "logoRef": logo
  }
}`;
