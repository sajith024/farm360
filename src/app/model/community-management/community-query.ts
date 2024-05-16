export interface CommunityQueryDetail {
  id: number;
  title: string;
  description: string;
  query_type: string;
  created_at: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  country: string;
  images: string[];
  replies: number;
}
