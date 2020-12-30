<template>
  <div>
  <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    methods:{
      //退出
      logout:function(){
        //清空token
        window.sessionStorage.clear();
        //跳转到login页
        this.$router.push('/login');
      }
    }
  }
</script>

<style lang="less" scoped>

</style>