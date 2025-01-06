export interface Post {
  title: string;
  slug: { current: string};
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  _id: string;
}

export interface Tag {
  name: string;
  slug: { current: string};
  _id: string;
  postCount?: number;
}

export interface Profile {
  name: string;
  role: string;
  pronouns: string;
  blurb: string;
  linkedin: string;
  mainImage: any;
  _id: string;
}