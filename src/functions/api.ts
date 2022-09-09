import axios from "axios";

export const getAllPosts = async () =>
  await axios.get(`https://media-post-back.herokuapp.com/post`, {});

export const createPost = async (
  like: number,
  desc: string,
  comments: number,
  media_url: string,
  media_type: string
) =>
  await axios.post(`https://media-post-back.herokuapp.com/post`, {
    like,
    desc,
    comments,
    media_url,
    media_type,
  });

export const deletePost = async (id: number) =>
  await axios.delete(`https://media-post-back.herokuapp.com/post/${id}`, {});

export const likePost = async (id: number) =>
  await axios.patch(
    `https://media-post-back.herokuapp.com/post/like/${id}`,
    {}
  );
