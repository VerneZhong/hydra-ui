<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Personal information</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon iconClass="user" /><span class="margin-left-4">User name</span>
                <div class="pull-right">{{user.userCode}}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" /><span class="margin-left-4">Phone number</span>
                <div class="pull-right">{{ user.mobile }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" /><span class="margin-left-4">User email</span>
                <div class="pull-right">{{ user.userEmail }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" /><span class="margin-left-4">Department</span>
                <div class="pull-right" v-if="user.dept">{{ user.dept.deptName }} </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" /><span class="margin-left-4">Role</span>
                <div class="pull-right">{{ roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /><span class="margin-left-4">Creation date</span>
                <div class="pull-right">{{ dateTimeFormat(user.createdTime) }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>Basic information</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Basic information" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="change Password" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getUserProfile } from "@/api/sys/user";
  import userAvatar from "./components/UserAvatar";
  import userInfo from "./components/UserInfo";
  import resetPwd from "./components/ResetPwd";

  export default {
    name: "Profile",
    components: { userAvatar, userInfo, resetPwd},
    data() {
      return {
        user: {},
        roleGroup: {},
        activeTab: "userinfo"
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data.user;
          this.roleGroup = response.data.roleGroup;
        });
      }
    }
  }
</script>
