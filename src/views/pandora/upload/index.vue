<template>
  <div class="image-management-container">
    <div class="upload-form">
      <h2>Upload Images</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="imageTitle">Image Title:</label>
          <input type="text" id="imageTitle" v-model="imageTitle" required>
        </div>
        <div class="form-group">
          <label for="imageDescription">Description:</label>
          <textarea id="imageDescription" v-model="imageDescription" required></textarea>
        </div>

        <div class="form-group file-upload">
          <label for="imageFile" class="file-label">
            <i class="fa fa-upload"></i> Choose a file...
            <input type="file" id="imageFile" accept="image/*" @change="handleFileChange" required>
          </label>
          <span class="file-chosen" v-if="imageFile">{{ imageFile.name }}</span>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>

    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script>
import { submitForm } from '@/api/pandora/pandora'

export default {
  name: 'ImageUploadForm',
  data() {
    return {
      imageTitle: '',
      imageDescription: '',
      imageFile: null,
      images: [],
      successMessage: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.imageFile = event.target.files[0]
    },
    async submitForm() {
      const formData = new FormData()
      formData.append('fileName', this.imageTitle)
      formData.append('description', this.imageDescription)
      formData.append('file', this.imageFile)

      try {
        // Replace with your actual API endpoint
        const response = await submitForm(formData)
        if (response && response.code === 200) {
          // Handle success
          this.successMessage = response.data

          // Reset form
          this.imageTitle = ''
          this.imageDescription = ''
          this.imageFile = null
        } else {
          this.successMessage = 'Error: ' + (response.message || 'Unknown error')
        }
      } catch (error) {
        this.successMessage = 'Submission failed. Please try again.'
        console.error('Error submitting form:', error)
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group textarea,
.form-group input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 20px;
}

.image-management-container {
  max-width: 600px;
  margin: 2rem auto;
}

.upload-form h2,
.image-display h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
}

.form-group input[type="text"],
.form-group textarea,
.form-group input[type="file"] {
  width: 100%;
  padding: 0.5rem;
}

.submit-btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #42b983; /* Vue.js green */
  color: white;
  border: none;
  cursor: pointer;
}

.image-card img {
  max-width: 100%;
  display: block;
}

.file-upload {
  position: relative;
  text-align: center;
}

.file-label {
  display: block;
  padding: 10px 20px;
  background-color: #3498db; /* Custom Upload Button Color */
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.file-label i {
  margin-right: 8px;
}

.file-label:hover {
  background-color: #2980b9; /* Darker shade for hover state */
}

.file-label input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.file-chosen {
  margin-top: 10px;
  display: block;
}
</style>
