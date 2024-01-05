declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}


export type BlogItem = {
  type_of: string
  id: number
  title: string
  description: string
  published: boolean
  published_at: string
  slug: string
  path: string
  url: string
  comments_count: number
  public_reactions_count: number
  page_views_count: number
  published_timestamp: string
  body_markdown: string
  positive_reactions_count: number
  cover_image: string
  tag_list: string[]
  canonical_url: string
  reading_time_minutes: number
  user: UserProps
  db_views_count: number
  total_views_count: number
  collection_id: number
  created_at: string
}

export interface ContentProps {
  id: number
  title: string
  slug: string
  description: string
  image: string
  is_new: boolean
  level: 'Easy' | 'Medium' | 'Hard'
  is_show: boolean
  language: string
}
