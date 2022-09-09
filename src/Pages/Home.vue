<template>
  <div>
    <CreatePost />
    <div v-for="post in posts[0]" v-bind:key="post.id">
      <PostCard
        :likes="post.like"
        :comments="post.comments"
        :desc="post.desc"
        :createdAt="post.createdAt"
        :media_url="post.media_url"
        :id="post.id"
        :media_type="post.media_type"
        :liked="post.liked"
      />
    </div>
    <div class="cp">
      <span
        >Ⓒ
        <a target="_blank" href="https://mahdiferiani.netlify.com/"
          >MAHDI</a
        ></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import CreatePost from "../components/CreatePost.vue";
import PostCard from "../components/PostCard.vue";
import { getAllPosts } from "../functions/api";

export default {
  name: "HomePage",
  components: {
    CreatePost,
    PostCard,
  },

  setup() {
    const posts = ref<string[]>([]);
    let date = ref<number>(Date.now());
    const fetchPosts = () => {
      getAllPosts().then((res) => {
        posts.value.push(res.data);
        console.log(res.data);
      });
    };
    onMounted(() => {
      fetchPosts();
    });

    return {
      posts,
      date,
    };
  },
};
</script>
<style scoped lang="scss">
.cp {
  position: fixed;
  display: flex;
  justify-items: end;

  bottom: 0;
  bottom: 10px;
  right: 20px;
  color: #999;
  letter-spacing: 2px;
  font-size: 18px;
  transition: all 1s ease;
  a {
    text-decoration: none;
    color: #999;
  }
  &:hover {
    font-weight: bold;
  }
}
</style>