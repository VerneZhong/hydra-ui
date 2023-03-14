<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'XiliuGit',
  data() {
    return {
      url: 'https://gitee.com/huoqstudy/xiliu-tenant'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
