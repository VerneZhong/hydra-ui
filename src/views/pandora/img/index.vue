<template>
  <div>
    <!-- 图片展示区域 -->
    <div class="image-display-container">
      <div v-for="(image, index) in images" :key="index" class="image-container">
        <img :src="image.filePath" @click="enlargeImage(image.filePath)"/>
        <p>{{ image.fileName }}</p>
        <p>{{ image.description }}</p>
      </div>
    </div>

    <!-- 图片放大模态窗口 -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="selectedImageUrl" class="enlarged-image"/>
      </div>
    </div>
  </div>
</template>

<script>
import { queryImgList } from '@/api/pandora/pandora'

export default {
  name: 'ShowImg',
  data() {
    return {
      // 假设 images 数组包含图片的 URL 和名称
      images: [],
      isModalVisible: false,
      selectedImageUrl: ''
    }
  },
  created() {
    this.fetchImages()
  },
  methods: {
    async fetchImages() {
      try {
        const response = await queryImgList()
        this.images = response.data // 假设后端返回的是一个包含images的对象
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    },
    openUploadPage() {
      // 这里编写打开文件上传页面的逻辑

    },
    enlargeImage(url) {
      // 这里编写点击图片放大的逻辑
      this.selectedImageUrl = url
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    }
  }
}
</script>

<style scoped>
.upload-button-container {
  text-align: center;
  margin-bottom: 20px;
}

.image-display-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 防止容器高度不一致导致的垂直不对齐 */
  gap: 10px; /* 设置图片之间的间隔 */
}

.image-container {
  width: calc(33.333% - 20px); /* 三列布局，减去gap的大小 */
  margin: 10px; /* 设置外边距，可根据实际需要调整 */
  text-align: center; /* 文本居中 */
}

.image-container img {
  width: 100%; /* 图片宽度填满容器 */
  height: auto; /* 高度自适应 */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

/* 如果图片数量不足6张，可以使用伪元素来填补空缺 */
.image-display-container:after {
  content: '';
  width: calc(33.333% - 20px);
  margin: 10px;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto; /* 调整上边距以居中显示 */
  padding: 20px;
  border: 1px solid #888;
  width: auto; /* 自动适应内容宽度 */
  max-width: 90%; /* 增加最大宽度，或根据需求调整 */
  max-height: 90vh; /* 增加最大高度，使其占据视口的大部分 */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.enlarged-image {
  max-width: 100%; /* 允许图片填充模态窗口的宽度 */
  max-height: 80vh; /* 限制图片的最大高度，保留空间显示关闭按钮等 */
  display: block; /* 防止图片底部有空白 */
  margin: 0 auto; /* 水平居中 */
}
</style>
