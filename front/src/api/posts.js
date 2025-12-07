import { api } from "./client";

export const getPosts = async (search) => {
  const { data } = await api.get(`/posts/?search=${search}`);
  
  return data;
};

export const getPost = async (id) => {
  const { data } = await api.get(`/posts/${id}`);
  return data;
};

export const createPost = async (post) => {
  const { data } = await api.post("/posts", post);
  return data;
};

export const updatePost = async ({ id, ...post }) => {
  const { data } = await api.put(`/posts/${id}`, post);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

