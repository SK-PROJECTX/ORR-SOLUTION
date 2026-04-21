import { groq } from "next-sanity";

// Blogs & Resources Queries
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  badge,
  mainImage,
  featured,
  publishedAt,
  body,
  button1Text,
  button2Text
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  badge,
  mainImage,
  featured,
  publishedAt,
  body,
  button1Text,
  button2Text
}`;

export const postsSlugQuery = groq`*[_type == "post"] { "slug": slug.current }`;

// Resources Page Singleton Query
export const resourcesPageQuery = groq`*[_type == "resourcesPage"][0] {
  heroTitle,
  heroDescription1,
  heroDescription2,
  heroDescription3,
  heroButton1Text,
  heroButton2Text,
  metaTitle,
  metaDescription
}`;

// Engagement Page Queries
export const engagementPageQuery = groq`*[_type == "engagementPage" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  sections[] {
    ...,
    _type == "imageText" => {
      text
    }
  }
}`;

export const engagementPagesSlugQuery = groq`*[_type == "engagementPage"] { "slug": slug.current }`;
