<template>
  <div class="view-box">
    <!--背景盒子-->
    <div class="bg-fox">
      <img src="@/assets/images/login-bg.png" style="position: absolute; bottom: 8vh; left: 8vw; width: 450px;">
      <div style="width: 100%; height: 100%">
        <!-- 三角形-->
        <div class="sjx" style="position: absolute; top: 0vh; left: 25vw; transform: rotate(70deg) scale(0.8, 0.8);" />
        <div class="sjx" style="position: absolute; top: 0vh; right: 15vw; transform: rotate(60deg) scale(0.5, 0.5);" />
        <div class="sjx" style="position: absolute; top: 25vh; right: -2vw; transform: rotate(40deg);" />
        <div class="sjx" style="position: absolute; bottom: 10vh; right: 20vw; transform: rotate(10deg) scale(1.5, 1.5);" />
      </div>
    </div>
    <!--内容盒子-->
    <div class="for-box">
      <div class="login-box">
        <div class="login-box-2">
          <!-- 表单盒子 -->
          <div class="from-box from-box-show">
            <h3 class="from-title">
              <span>Pandora management</span>
            </h3>
            <el-form size="small" label-position="left" label-width="0px" ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="userName">
                <el-input v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="Please enter user name" size="medium" />
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input v-model="loginForm.passWord" prefix-icon="el-icon-unlock" type="password" placeholder="Please enter password" size="medium"
                 :type="passwordType"  @keyup.native.enter="handleLogin()" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item>
                <span style="color: #999;"> <el-checkbox v-model="loginForm.remember">remember me</el-checkbox></span>
                <span style="float: right; color: #999;"></span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" round size="medium" style="width: 100%;" @click="handleLogin()">Log in</el-button>
              </el-form-item>
              <!-- 滑块验证 -->
              <el-dialog title="Please drag the slider to complete the puzzle" width="360px" :visible.sync="isShowSliderVerify" :close-on-click-modal="false" @closed="refresh" append-to-body>
                <slider-verify ref="sliderVerify" @success="onSuccess" @fail="onFail" @again="onAgain"/>
              </el-dialog>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 底部 版权 -->
      <div style="position: absolute; bottom: 40px; width: 100%; text-align: center; color: #666;">
        Copyright ©2024  | Hao Xu (許昊)
      </div>
    </div>
  </div>
</template>

<script>
import sliderVerify from './sliderVerify'
export default {
  name: 'Login',
  components: {
    sliderVerify
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Password cannot be less than 6 characters'))
      } else {
        callback()
      }
    }
    return {
      codeUrl: '',
      loginForm: {
        userName: 'admin',
        passWord: '',
        // 随机字符串
        nonceStr: '',
        // 验证值
        value: '',
        remember: false
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: 'Please enter user name' }],
        passWord: [{ required: true, trigger: 'blur', message: 'Please enter password' }, { validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogVisible: false,
      msg: '',
      // 是否显示滑块验证
      isShowSliderVerify: false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    /* 提交*/
    handleLogin() {
      let self = this;
      self.$refs.loginForm.validate((flag) => {
        self.isShowSliderVerify = flag;
      });
    },
    /* 登录*/
    login() {
      let self = this;
      self.loading = true;
      self.$store.dispatch('user/login', self.loginForm).then(() => {
          self.$refs.sliderVerify.verifySuccessEvent()
          setTimeout(() => {
            self.isShowSliderVerify = false
            self.message('success', 'login successful')
          }, 500)
          this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
        self.$refs.sliderVerify.verifyFailEvent()
        self.loading = false;
      })
    },
    /* 滑动验证成功*/
    onSuccess(captcha) {
      Object.assign(this.loginForm, captcha)
      this.login()
    },
    /* 滑动验证失败*/
    onFail(msg) {
      // this.message('error', msg || '验证失败，请控制拼图对齐缺口');
    },
    /* 滑动验证异常*/
    onAgain() {
      this.message('error', 'The sliding operation is abnormal, please try again')
    },
    /* 刷新验证码*/
    refresh() {
      this.$refs.sliderVerify.refresh()
    },
    /* 提示弹框*/
    message(type, message) {
      this.$message({
        showClose: true,
        type: type,
        message: message,
        duration: 1500
      })
    }
  }

}
</script>

<style lang="scss">
/* 视图盒子 */
.view-box{}

/*  */
.bg-fox {
  position: fixed;
  width: 100%;
  height: 100%;
  /*background-color: #fafeff;*/
  /*background-color: #f8f8ff;*/
  background-color: rgb(250, 254, 255);
  pointer-events: none;
}
.for-box{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
}

.login-box{
  flex: 1;
}
.login-box-2{
  width: 450px;
  max-width: 90vw;
  margin: auto;
  padding-bottom: 100px;
}

/* 表单 */
.from-box{padding: 45px 50px 25px; background-color: #e2effc; border: 1px #e5e5e5 solid;}
.from-box{ border-radius: 1px; /*box-shadow: 1px 1px 2px #666;*/}
.from-title{font-size: 24px; color: #000; margin-bottom: 30px; text-align: center; position: relative; left: -15px;}

.logo{width: 50px; height: 50px; vertical-align: middle; margin-right: 15px;}

/*动画*/
.bg-fox>div{animation: changes 30s 0.2s linear infinite alternate; }  /* normal | alternate */
@keyframes changes {
  from {transform: translate(0, 0vh);}
  to {transform: translate(0, 15vh);}
}

.sjx {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 180px solid #dee7f8;
}

/* 2px圆角 */
.view-box >>> .el-input__inner,
.view-box >>> .el-button{border-radius: 2px !important;}

/* 渐渐显示的动画 */
.from-box{
  opacity: 0;
  transition: opacity 1s;
}
.from-box-show{
  opacity: 1;
}
.show-pwd{
  position: absolute;
  left: 320px;
  font-size: 20px;
}
</style>
