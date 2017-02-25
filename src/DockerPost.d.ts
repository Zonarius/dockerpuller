interface PushData {
  images: string[];
  pushed_at: number;
  pusher: string;
}

interface Repository {
  comment_count: string;
  date_created: number;
  description: string;
  dockerfile: string;
  full_description: string;
  is_official: boolean;
  is_private: boolean;
  is_trusted: boolean;
  name: string;
  namespace: string;
  owner: string;
  repo_name: string;
  repo_url: string;
  star_count: number;
  status: string;
}

interface DockerPost {
  callback_url: string;
  push_data: PushData;
  repository: Repository;
}