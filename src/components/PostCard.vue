<template>
  <div class="card_container">
    <div class="card_header">
      <div class="left_content">
        <img class="profile_img" src="../assets/images/profile_image.png" />
        <div class="post_info">
          <h1>Google</h1>
          <span>254 Followers</span>
          <span>
            <timeago
              :datetime="createdAt"
              :locale="en"
              :converter-options="{
                includeSeconds: true,
                addSuffix: false,
                useStrict: false,
              }"
              auto-update
          /></span>
        </div>
      </div>

      <div class="right_content">
        <img src="../assets/images/follow.svg" />
        <span>Follow</span>
        <div class="post_actions">
          <img @click="handleMenuClick" src="../assets/images/more_icon.svg" />
          <div
            class="menu"
            :style="[
              menuActive
                ? {
                    visibility: 'visible',

                    opacity: '1',
                  }
                : {},
            ]"
          >
            <span @click="handleDeletePost(id)">Delete</span>
          </div>
        </div>
      </div>
    </div>
    <p class="post_desc" :id="seMoreActive ? 'show' : ''">
      {{ desc }}
    </p>
    <span v-if="desc.length > 134" class="see_more" @click="seeMore">{{
      seMoreActive ? "Show less" : "See more"
    }}</span>
    <div v-if="media_type === 'img'">
      <img
        v-if="media_url.length > 66"
        class="post_img"
        v-bind:src="media_url"
      />
    </div>
    <div v-if="media_type === 'vid'">
      <video-player
        v-bind:src="media_url"
        controls
        :volume="0.6"
        :width="527"
      />
    </div>
    <div class="post_stats">
      <span>{{ likeCount }} Love</span>
      <span>{{ comments }} Comments</span>
      <span>2 Share</span>
    </div>
    <div class="card_ui">
      <div class="left_ui">
        <img
          v-if="!isLiked"
          class="post_img"
          src="../assets/images/like_icon.svg"
          @click="handlepostLike(id)"
        />
        <img
          v-if="isLiked"
          class="post_img"
          src="../assets/images/like_active.svg"
        />

        <span @click="handlepostLike(id)">Like</span>
        <img class="post_img" src="../assets/images/comment_icon.svg" />
        <span>Comment</span>
        <img class="post_img" src="../assets/images/share.svg" />
        <span>Share</span>
      </div>
      <div class="right_ui">
        <img src="../assets/images/send_icon.svg" />
        <span v-if="isLiked">Send</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { deletePost, likePost } from "../functions/api";
import { useToast } from "vue-toastification";

export default {
  name: "PostCard",
  props: [
    "likes",
    "comments",
    "desc",
    "createdAt",
    "media_url",
    "id",
    "media_type",
    "liked",
  ],
  data(props: any) {
    const likeCount = ref(props.likes);
    const isLiked = ref(props.liked);

    const handlepostLike = (id: number) => {
      if (isLiked.value) {
        return;
      }
      likeCount.value = likeCount.value + 1;
      isLiked.value = true;
      likePost(id).then((res) => {
        console.log(res.data);
      });
    };
    return {
      likeCount,
      handlepostLike,
      isLiked,
    };
  },
  setup() {
    const toast = useToast();

    const menuActive = ref(false);
    const seMoreActive = ref(false);

    const handleMenuClick = () => {
      menuActive.value = !menuActive.value;
    };
    const seeMore = () => {
      seMoreActive.value = !seMoreActive.value;
    };

    const handleDeletePost = (id: number) => {
      menuActive.value = false;
      deletePost(id).then((res) => {
        console.log(res.data);
        toast.success("Post Deleted !", {
          timeout: 1150,
        });
        setTimeout(() => location.reload(), 1150);
      });
    };

    return {
      menuActive,
      handleMenuClick,
      seeMore,
      seMoreActive,
      handleDeletePost,
    };
  },
};
</script>

<style lang="scss" scoped>
$color_1: #f6f8fb;
$color_2: #cccedd;
.card_container {
  margin-top: 30px;
  width: 527px;
  height: fit-content;
  background-color: #1e2027;
  border-radius: 5px;
  margin-bottom: 40px;
}
.card_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}
.left_content {
  display: flex;
  img {
    width: 52px;
    height: 52px;
    border-radius: 5px;
    margin-right: 10px;
    object-fit: cover;
  }
  .post_info {
    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 600;
      font-size: 14px;
      color: $color_1;
    }
    span {
      font-weight: 400;
      font-size: 12px;
      color: $color_2;
    }
  }
}
.right_content {
  display: flex;
  align-items: center;
  img {
    margin-right: 7px;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #f586e6;
    margin-right: 20px;
    cursor: pointer;
  }
  .post_actions {
    position: relative;
    img {
      cursor: pointer;
    }
    .menu {
      position: absolute;
      width: 120px;
      padding: 15px;
      border-radius: 10px;
      background-color: #282a33;
      transition: all 0.4s;
      top: 40px;
      visibility: hidden;
      opacity: 0;
      right: -100px;
      z-index: 100;
      span {
        color: #c7135b;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
        width: 100%;
      }
    }
  }
}
.post_desc {
  font-weight: 400;
  font-size: 12px;
  color: $color_1;
  padding: 10px;
  width: 527px;
  max-height: 65px;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#show {
  max-height: 100% !important;
  text-overflow: unset;
  display: unset;
}
.see_more {
  font-weight: 400;
  font-size: 12px;
  color: $color_2;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  display: block;
  float: right;
}
.post_img {
  width: 100%;
  object-fit: cover;
  .test {
    fill: #f586e6 !important;
  }
}
.post_stats {
  padding: 10px;
  display: flex;
  align-items: center;
  margin-top: 30px;
  span {
    font-weight: 400;
    font-size: 12px;
    color: $color_1;
    margin-right: 18px;
  }
}
.card_ui {
  height: 41px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 500;
    font-size: 12px;
    color: $color_1;
    margin-right: 25px;
  }
  img {
    margin-right: 5px;
  }
  .left_ui,
  .right_ui {
    display: flex;
    align-items: center;
    span,
    img {
      cursor: pointer;
    }
  }
}
</style>