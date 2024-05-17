export interface CommunityQueryDetail {
  id: number;
  title: string;
  description: string;
  query_type: string;
  created_at: string;
  created_by: CommunityCreatedUserDetail;
  images: string[];
  replies: number;
}

export interface CommunityCommentDetail {
  id: number;
  description: string;
  images: string[];
  created_at: string;
  created_by: CommunityCreatedUserDetail;
  threads: CommunityCommentDetail[];
}

export interface CommunityCreatedUserDetail {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  country: string;
  role: string;
}

export interface CommunityQuery {
  id?: number;
  description: string;
  query: number;
  main: number | null;
}
