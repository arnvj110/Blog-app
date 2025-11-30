import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getPosts, getPost, createPost } from "../api/posts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }) => createPost({title, content}),
    onSuccess: () => {
      qc.invalidateQueries(["posts"]);
    },onError: (error) => {
      console.error("Error creating post:", error);
    }
  });
}
