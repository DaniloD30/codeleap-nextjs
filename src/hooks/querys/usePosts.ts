import { useQuery } from "react-query";
import { api } from "../../services/api";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export type Post = {
  id: number;
  username: string;
  title: string;
  content: string;
  created_datetime: string;
};

type GetPostsResponse = {
  posts: Post[];
  total_count: number;
};

interface getPostsProps {
  page: number;
  limit?: number;
}

export async function getPosts({
  page = 1,
  limit = 1,
}: getPostsProps): Promise<GetPostsResponse> {
  const data = await api.get("", {
    params: {
      limit: limit,
      offset:
        page === 1 ? (Number(page) - 1) * 10 : (Number(page) - 1) * 10 + 10,
    },
  });

  const posts_results: Post[] = data.data?.results;
  const total_count = data.data?.count;

  const posts = posts_results.map((post) => ({
    id: post.id,
    title: post.title,
    username: post.username,
    created_datetime: format(
      new Date(post.created_datetime),
      "d',' MMMM 'at' HH:mm"
    ),
    content: post.content,
  }));

  return {
    posts: posts,
    total_count,
  };
}

export function usePosts(page: number, limit: number) {
  return useQuery([`posts`, page, limit], () => getPosts({ page, limit }));
}
