<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="160px">
    <el-form-item label="Old Password" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="Please enter old password" type="password" show-password />
    </el-form-item>
    <el-form-item label="New Password" prop="newPassword">
      <el-input v-model="user.newPassword" placeholder="Please enter a new password" type="password" show-password />
    </el-form-item>
    <el-form-item label="Confirm Password" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="Please confirm your password" type="password"
                show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">save</el-button>
      <el-button type="danger" size="mini" @click="close">close</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from '@/api/sys/user'

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error('The passwords entered twice are inconsistent'))
      } else {
        callback()
      }
    }
    return {
      user: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: 'The old password cannot be empty', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: 'New password cannot be empty', trigger: 'blur' },
          { min: 6, max: 20, message: '6 to 20 characters in length', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'confirm password can not be blank', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
            this.$modal.msgSuccess('Successfully modified')
          })
        }
      })
    },
    close() {
      this.$tab.closePage()
    }
  }
}
</script>
