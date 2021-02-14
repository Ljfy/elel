<template>
  <div>
  

  <div class="container">
      <h3>后台管理系统</h3>
    <!-- 登录表单 -->
    <el-form 
    ref="loginFormRef"
    label-width="0"
    :model="loginForm"
    :rules="loginFormrules"
    >

      <!-- 用户名 -->
    <el-form-item prop="username" >
      <el-input v-model="loginForm.username"  prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>  

      <!-- 密码 -->
    <el-form-item prop="password">
      <el-input  prefix-icon="el-icon-s-goods"
      v-model="loginForm.password"
      type="password"
      ></el-input>
    </el-form-item>  
    <!-- 按钮区域 -->
    <el-form-item class="btns">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="resetLoginForm">重置</el-button>
    </el-form-item>
  </el-form>

  </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        //表单数据的绑定对象
      loginForm:{
        username:'admin',
        password:'123456',
      },
      //表单的验证规则

      loginFormrules:{
        //检查用户名是否合法
        username:[
           { required: true, message: '请输入登录名称', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
       ],
          password:[
           { required: true, message: '请输入登录密码', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
       ],
      }
      }
    },
    methods:{
      //重置
      resetLoginForm(){
        this.$refs.loginFormRef.resetFields();
      },
      //表单预校验
      login(){
        this.$refs.loginFormRef.validate(async valid=>{
        if(!valid) return;
        const {data:res} = await this.$http.post('login',this.loginForm)
        console.log(res);
        if(res.meta.status!==200) return this.$message.error('登录失败');
        this.$message.success('登录成功');
        //把token保存到sessionStorage,只在当前网站有效
        window.sessionStorage.setItem('token',res.data.token);
        //跳转
        this.$router.push("/home")
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  width: 400px;
  height: 300px;
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

}


</style>