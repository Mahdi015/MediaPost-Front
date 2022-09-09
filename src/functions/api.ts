import axios from "axios";

export const getAllPosts = async () =>
  await axios.get(`http://localhost:3000/post`, {});

export const createPost = async (
  like: number,
  desc: string,
  comments: number,
  media_url: string,
  media_type: string
) =>
  await axios.post(`http://localhost:3000/post`, {
    like,
    desc,
    comments,
    media_url,
    media_type,
  });

export const deletePost = async (id: number) =>
  await axios.delete(`http://localhost:3000/post/${id}`, {});

export const likePost = async (id: number) =>
  await axios.patch(`http://localhost:3000/post/like/${id}`, {});
