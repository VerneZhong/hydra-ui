<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'XiliuDoc',
  data() {
    return {
      url: 'https://gitee.com/huoqstudy/xiliu-tenant-ui'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
