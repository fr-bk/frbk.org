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
  "heroImageRef": heroImage,
  metaDescription,
  "ogImageRef": ogImage
}`;

/** Sider som skal visast i hovedmenyen */
export const navigationPagesQuery = `*[_type == "side" && coalesce(showInNavigation, true)] | order(coalesce(navigationOrder, 100) asc, title asc) {
  title,
  "slug": slug.current,
  navigationTitle
}`;

/** Enkelt side etter slug */
export const sideBySlugQuery = `*[_type == "side" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  "heroImageRef": heroImage,
  heroPosition,
  metaDescription,
  "ogImageRef": ogImage
}`;

/** Framsida-singleton */
export const hjemmesideQuery = `*[_type == "hjemmeside" && _id == "hjemmeside-singleton"][0] {
  heroTitle,
  heroLead,
  "heroImageRef": heroImage,
  heroPosition,
  heroActions[] {
    label,
    href,
    variant
  },
  newsSectionTitle,
  matchesSectionTitle,
  badges[] {
    title,
    text
  },
  sponsors[] {
    name,
    url,
    "logoRef": logo
  },
  metaDescription,
  "ogImageRef": ogImage
}`;
