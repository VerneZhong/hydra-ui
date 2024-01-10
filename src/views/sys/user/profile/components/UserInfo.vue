<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="User's Nickname" prop="nickName">
      <el-input v-model="user.realName" maxlength="30"/>
    </el-form-item>
    <el-form-item label="Phone number" prop="phonenumber">
      <el-input v-model="user.mobile" maxlength="11"/>
    </el-form-item>
    <el-form-item label="Mail" prop="email">
      <el-input v-model="user.userEmail" maxlength="50"/>
    </el-form-item>
    <el-form-item label="gender">
      <el-radio-group v-model="user.sex">
        <el-radio label="0">male</el-radio>
        <el-radio label="1">female</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">save</el-button>
      <el-button type="danger" size="mini" @click="close">close</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from '@/api/sys/user'

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: 'User nickname cannot be empty', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email address cannot be empty', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please input the correct email address',
            trigger: ['blur', 'change']
          }
        ],
        phonenumber: [
          { required: true, message: 'Phone number can not be blank', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: 'Please enter the correct phone number',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateUserProfile(this.user).then(response => {
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
