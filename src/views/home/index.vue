<template>
<!--  <div class="dashboard-container">-->
    <div class="bg-fox">
      <img src="@/assets/images/bgImg-yama.jpg">
    </div>
<!--  </div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import img_home_order from '@/assets/images/home_order.png'
import img_home_today_amount from '@/assets/images/home_today_amount.png'
import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png'

export default {
  name: 'Home',
  components: {
  },
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #F2F6FC;
  font-weight: bold;
}
.color-danger {
  color: #f56c6c;
}
.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}
.mine-layout {
  position: absolute;
  right: 70px;
  top: 30px;
  width: 250px;
  height: 235px;
}
.address-content{
  padding: 20px;
  font-size: 18px;
  color: #909399;
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.card-panel__col {
  margin-bottom: 12px;
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.bg-fox {
  width: 100%; /* 或者指定宽度 */
  height: 100vh; /* 或者指定高度 */
  overflow: hidden; /* 隐藏超出部分 */
}

.bg-fox img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持宽高比并覆盖整个容器 */
}

</style>
