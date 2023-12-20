<template>
  <div class="query-container">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="20">
        <el-form :model="form" :rules="rules" ref="queryForm" inline>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="查询类型">
            <el-select v-model="form.queryType" placeholder="请选择">
              <el-option label="潘多拉176" value="176"></el-option>
              <el-option label="潘多拉194" value="194"></el-option>
            </el-select>
          </el-form-item>
          <!-- 将按钮移到这里 -->
          <el-form-item>
            <el-button type="primary" @click="fetchChartData">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
import {query} from '@/api/pandora/pandora';
import moment from 'moment';
import 'chartjs-adapter-moment';

export default {
  name: 'ChartComponent',
  data() {
    return {
      form: {
        startTime: '',
        endTime: '',
        queryType: '176'
      },
      rules: {
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ],
      },
      chart: null,
      chartData: null,
      chartLabels: null
    };
  },
  methods: {
    async fetchChartData() {
      const requestData = {
        startTime: moment(this.form.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(this.form.endTime).format('YYYY-MM-DD HH:mm:ss'),
        pandoraType: this.form.queryType
      };

      try {
        const response = await query(requestData);
        if (response && response.code === 200) {
          if (response.rows && response.rows.length > 0) {
            const chartData = response.rows.map(item => item.humidity);
            const chartLabels = response.rows.map(item => item.time);
            this.updateChart(chartData, chartLabels);
          } else {
            // 处理没有数据的情况
            console.log('No data available');
            this.chartData = [];
            this.chartLabels = [];
            this.updateChart([], []); // 更新图表为一个空的状态
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateChart(chartData, chartLabels) {
      // 如果已经有一个图表实例，先销毁它
      if (this.chart) {
        this.chart.destroy();
        this.chart = null; // 清空引用
      }
      this.$nextTick(() => {
        const canvas = this.$refs.myChart;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartLabels,
              datasets: [{
                label: '湿度数据',
                data: chartData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    parser: 'YYYY-MM-DD HH:mm:ss',
                    tooltipFormat: 'll HH:mm'
                  },
                  title: {
                    display: true,
                    text: '时间'
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: '湿度 (%)'
                  }
                }
              }
            }
          })
        } else {
          console.error('Canvas element is not available');
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.query-container {
  margin-top: 20px;
  padding: 20px;
  .el-form-item {
    margin-bottom: 0; // 防止表单项之间有额外的间距
  }
  .button-container {
    text-align: right;
  }
}
</style>
