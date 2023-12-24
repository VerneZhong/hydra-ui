<template>
  <div class="query-container">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="20">
        <el-form :model="form" :rules="rules" ref="queryForm" inline>
          <el-form-item label="Start time" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="Select date time">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="End time" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="Select date time">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Pandora type">
            <el-select v-model="form.queryType" placeholder="please choose">
              <el-option label="176" value="176"></el-option>
              <el-option label="194" value="194"></el-option>
            </el-select>
          </el-form-item>
          <!-- 将按钮移到这里 -->
          <el-form-item>
            <el-button type="primary" @click="fetchChartData">search</el-button>
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
          { required: true, message: 'Please select a start time', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: 'Please select a end time', trigger: 'blur' },
        ]
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
    calculateMiddleTime(start, end) {
      const startDate = moment(start);
      const endDate = moment(end);
      const middleTimestamp = (startDate.valueOf() + endDate.valueOf()) / 2;
      return moment(middleTimestamp).format('YYYY-MM-DD HH:mm:ss');
    },
    updateChart(chartData, originalChartLabels) {
      // 如果已经有一个图表实例，先销毁它
      if (this.chart) {
        this.chart.destroy();
        this.chart = null; // 清空引用
      }
      this.$nextTick(() => {
        const canvas = this.$refs.myChart;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          // 获取开始、结束和中间时间点
          this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: originalChartLabels,
              datasets: [{
                label: 'Humidity data',
                data: chartData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                pointRadius: 10, // 控制点的大小，您可以根据需要调整这个值
                showLine: false, // 设置为 false，以移除数据点之间的连线
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
                    tooltipFormat: 'll YYYY-MM-DD HH:mm:ss',
                    unit: 'minute',
                    // 确保在时间轴上显示所有的数据点
                    displayFormats: {
                      minute: 'YYYY-MM-DD HH:mm:ss'
                    }
                  },
                  ticks: {
                    // 设置刻度标签字体大小
                    font: {
                      size: 18, // 增大字体大小
                      weight: 'bold' // 加粗字体
                    },
                    // 覆盖生成刻度标签的逻辑
                    callback: function(value, index, ticks) {
                      // 使用统一格式转换ticks中的时间和原始标签时间
                      const format = 'YYYY-MM-DD HH:mm';
                      const formattedValue = moment(value).format(format);
                      const startTimeFormatted = moment(originalChartLabels[0]).format(format);
                      const endTimeFormatted = moment(originalChartLabels[originalChartLabels.length - 1]).format(format);
                      const middleValueFormatted = moment(ticks[Math.floor(ticks.length / 2)].value).format(format);

                      if (formattedValue === startTimeFormatted || formattedValue === middleValueFormatted || formattedValue === endTimeFormatted) {
                        return moment(value).format('YYYY-MM-DD HH:mm:ss'); // 返回完整格式的时间字符串
                      } else {
                        if (index === 0) {
                          return moment(value).format('YYYY-MM-DD HH:mm:ss');
                        } else {
                          return null; // 隐藏其他刻度标签
                        }
                      }
                    }
                  },
                  title: {
                    display: false,
                    text: 'time',
                    // 设置轴标题字体大小
                    font: {
                      size: 20, // 增加字体大小
                      weight: 'bold' // 加粗字体
                    }
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'humidity (%)',
                    // 设置轴标题字体大小
                    font: {
                      size: 20, // 增大字体大小
                      weight: 'bold', // 加粗字体
                    }
                  },
                  ticks: {
                    // 设置刻度标签字体大小
                    font: {
                      size: 18, // 增大字体大小
                      weight: 'bold', // 加粗字体
                    }
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
