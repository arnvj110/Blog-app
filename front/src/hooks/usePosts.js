import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getPosts, getPost, createPost, deletePost } from "../api/posts";

export function usePosts(search="") {
  return useQuery({
    queryKey: ["posts", search],
    queryFn: () => getPosts(search),
    keepPreviousData: true,
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
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      qc.invalidateQueries(["posts"]);
    },onError: (error) => {
      console.error("Error creating post:", error);
    }
  });
}

export function useDeletePost(id) {
  const qc = useQueryClient();  
  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries(["posts"]);
    },onError: (error) => {
      console.error("Error deleting post:", error);
    }
  });
}
