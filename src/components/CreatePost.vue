<template>
  <div class="container" @click="showModal">
    <div class="input_row">
      <img class="profile_img" src="../assets/images/profile_image.png" />
      <input
        class="input_1"
        @click="showModal"
        placeholder="Start a post ..."
      />
    </div>
    <div class="ui">
      <img src="../assets/images/p_icon.svg" />
      <span>Photo</span>
      <img src="../assets/images/v_icon.svg" />
      <span>Video</span>
      <img src="../assets/images/f_icon.svg" />
      <span>File</span>
    </div>
    <Modal v-model="isShow" :close="closeModal">
      <div class="modal">
        <div class="modal_header">
          <span>Create a post</span>
          <img src="../assets/images/close_modal.svg" @click="closeModal" />
        </div>
        <span class="line"></span>
        <textarea
          v-model="desc"
          placeholder="What do you want to talk about?"
        />
        <div class="img_uploaded" v-if="showImg">
          <img
            class="uploaded_img"
            v-bind:src="`https://vgwhvsgnevpmuolydzce.supabase.co/storage/v1/object/public/${uploadedMedia}`"
          />
          <span
            ><img
              @click="handleDeleteMedia"
              src="../assets/images/delete_img.svg"
          /></span>
        </div>
        <div class="img_uploaded" v-if="showVid">
          <video-player
            v-bind:src="`https://vgwhvsgnevpmuolydzce.supabase.co/storage/v1/object/public/${uploadedMedia}`"
            controls
            :volume="0.6"
            :width="620"
          />
          <span
            ><img
              @click="handleDeleteMedia"
              src="../assets/images/delete_img.svg"
          /></span>
        </div>
        <span class="line"></span>
        <div
          style="
            padding: 18px;
            margin: 0;
            justify-content: space-between;
            align-items: center;
          "
          class="ui"
        >
          <div style="display: flex; align-items: center">
            <img src="../assets/images/p_icon.svg" />
            <label for="img_upload"
              >Photo
              <input
                type="file"
                id="img_upload"
                accept="image/*"
                style="visibility: hidden; position: absolute"
                @change="uploadImg"
            /></label>
            <img src="../assets/images/v_icon.svg" />
            <label for="vid_upload"
              >Video
              <input
                type="file"
                id="vid_upload"
                accept="video/*"
                style="visibility: hidden; position: absolute"
                @change="uploadVid"
            /></label>

            <img src="../assets/images/f_icon.svg" />
            <span>File</span>
            <div v-if="loading">
              <span class="loading_span">Uploading ...</span>
            </div>
          </div>
          <button @click="handleCreatePost">Post</button>
        </div>
      </div>
    </Modal>
    <Modal v-model="isShow_2" :close="closeModal_2">
      <div class="modal_2">
        <div class="modal_header">
          <span>Discard draft</span>
          <img src="../assets/images/close_modal.svg" @click="closeModal_2" />
        </div>
        <span class="line"></span>
        <p>
          You haven’t finished your post yet. Are you sure you want to leave and
          discard your draft?
        </p>
        <span class="line"></span>
        <div class="modal_2_ui">
          <button @click="closeModal_2" class="btn1">Go back</button>
          <button @click="handleDiscard" class="btn2">Discard</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { createPost } from "../functions/api";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "vue-toastification";

export default {
  name: "CreatePost",
  setup() {
    const toast = useToast();
    const isShow = ref(false);
    const isShow_2 = ref(false);
    const showImg = ref(false);
    const showVid = ref(false);
    const loading = ref(false);
    const uploadedMedia = ref("");
    const desc = ref("");

    function showModal() {
      isShow.value = true;
    }

    function closeModal() {
      if (desc.value.length != 0 || uploadedMedia.value.length != 0) {
        isShow_2.value = true;
        return;
      }
      isShow.value = false;
    }
    function closeModal_2() {
      isShow_2.value = false;
    }
    const handleCreatePost = () => {
      if (desc.value.length == 0 && uploadedMedia.value.length == 0) {
        toast.error("Cannot share empty post!", {
          timeout: 1150,
        });
        return;
      }
      let like = Math.floor(Math.random() * 200);
      let comments = Math.floor(Math.random() * 200);
      let media_url = `https://vgwhvsgnevpmuolydzce.supabase.co/storage/v1/object/public/${uploadedMedia.value}`;
      let media_type = showImg.value ? "img" : showVid.value ? "vid" : "text";
      createPost(like, desc.value, comments, media_url, media_type).then(
        (res) => {
          toast.success("Successfully posted!", {
            timeout: 1150,
          });
          console.log(res.data);
          isShow.value = false;
          setTimeout(() => location.reload(), 1150);
        }
      );
    };

    async function uploadImg(event: any) {
      try {
        loading.value = true;
        showImg.value = false;
        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const response = await supabase.storage
          .from("post-imgs")
          .upload(filePath, file);
        uploadedMedia.value = response.data!.Key;
        showImg.value = true;
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    async function uploadVid(event: any) {
      try {
        loading.value = true;
        showVid.value = false;
        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const response = await supabase.storage
          .from("post-imgs")
          .upload(filePath, file);

        uploadedMedia.value = response.data!.Key;
        showVid.value = true;
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    const handleDiscard = () => {
      isShow.value = false;
      isShow_2.value = false;
      desc.value = "";
      uploadedMedia.value = "";
      showImg.value = false;
      showVid.value = false;
    };

    const handleDeleteMedia = () => {
      uploadedMedia.value = "";
      showImg.value = false;
      showVid.value = false;
    };

    return {
      isShow,
      showModal,
      closeModal,
      desc,
      handleCreatePost,
      uploadImg,
      uploadedMedia,
      showImg,
      loading,
      closeModal_2,
      isShow_2,
      handleDiscard,
      handleDeleteMedia,
      uploadVid,
      showVid,
    };
  },
};
</script>

<style lang="scss" scoped>
$color_1: #1e2027;
$btn_color_1: #f586e6;
.modal {
  width: 620px;
  background: $color_1;
  border-radius: 10px;
  .uploaded_img {
    width: 100%;
    object-fit: contain;
  }
  .img_uploaded {
    position: relative;
    span {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
  .loading_span {
    font-weight: 500;
    font-size: 16px;
    color: #f6f8fb;
  }
  textarea {
    font-weight: 400;
    font-size: 14px;
    color: #b5b5c3;
    height: 120px;
    padding: 20px 20px 12px 20px;
    outline: none;
    width: 100%;
    background: $color_1;
    border: none;
  }
  button {
    width: 63px;
    height: 40px;
    background: #575a64;
    border-radius: 6px;
    padding: 8px 14px;
    outline: none;
    border: none;
    font-weight: 600;
    font-size: 16px;
    color: #cccedd;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
      background: $btn_color_1;
      color: #000c57;
    }
  }
}
.modal_header {
  position: relative;
  border-radius: 10px 10px 0px 0px;
  padding: 18px;
  span {
    font-weight: 500;
    font-size: 16px;
    color: #f6f8fb;
  }
  img {
    position: absolute;
    top: 24px;
    right: 22px;
    cursor: pointer;
  }
}
.line {
  background: $color_1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  display: block;
}
.modal_2 {
  width: 389px;
  background: $color_1;
  border-radius: 10px;
  p {
    padding: 40px 18px;
    font-weight: 400;
    font-size: 14px;
    color: #f6f8fb;
  }
  .modal_2_ui {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 25px;
    .btn1 {
      border: 1px solid $btn_color_1;
      outline: none;
      border-radius: 6px;
      color: $btn_color_1;
      width: 95px;
      height: 40px;
      margin-right: 30px;
      font-weight: 600;
      font-size: 16px;
      background-color: transparent;
      transition: all 1s ease-in-out;
      cursor: pointer;
      &:hover {
        background: $btn_color_1;
        color: #000c57;
        border: none;
      }
    }
  }
  .btn2 {
    background: $btn_color_1;
    box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.25);
    border-radius: 6px;
    width: 95px;
    outline: none;
    height: 40px;
    color: #000c57;
    font-weight: 600;
    cursor: pointer;
    font-size: 16px;
    border: none;
    transition: all 1s ease-in-out;
    &:hover {
      background-color: transparent;
      color: $btn_color_1;
      border: 1px solid $btn_color_1;
    }
  }
}
.container {
  cursor: pointer;
  background-color: $color_1;
  width: 527px;
  height: 121px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.profile_img {
  width: 47px;
  height: 47px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 10px;
}
.input_row {
  display: flex;
}
.input_1 {
  width: 100%;
  height: 42px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 5px;
  padding: 12px 20px 12px 13px;
  color: #fff;
  outline: none;
  cursor: pointer;
  border: none;
  caret-color: transparent;
}
.ui {
  margin: 5px 0 0 60px;
  display: flex;
  align-items: center;
  span,
  label {
    font-size: 12px;
    color: #e9ecef;
    margin-right: 30px;
    cursor: pointer;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }

  .vjs-big-play-button {
    left: 60px !important;
  }
}
</style>