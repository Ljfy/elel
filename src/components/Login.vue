<template>
  <div class="login-container">
    <!-- <h3>登录页面</h3> -->
    <div class="login-list">
      <!-- 头像 -->
      <div class="login-box">
        <img src="https://inews.gtimg.com/newsapp_bt/0/9004957065/640" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef"
        label-width="0px"
        class="info"
        :model="loginForm"
        :rules="loginFormrules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-goods"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      //表单的数据绑定对象
      loginForm: {
        username: "admin",
        password:'123456'

      },
      // 表单验证规则
      loginFormrules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "登录名称长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        passworld: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "密码长度在 3 到 12个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods:{
    //重置
  resetLoginFrom(){
  this.$refs.loginFormRef.resetFields()
},
    //表单预校验
 login(){
    this.$refs.loginFormRef.validate(async valid=>{
      // console.log(valid);
      if(!valid) return;
     const {data:res} = await this.$http.post('login',this.loginForm);
     console.log(res);

     if(res.meta.status!==200)return this.$message.error('登录失败')
        this.$message.success('登录成功');

        //token只在当前网站打开期间生效,所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token",res.data.token);

        //通过编程式导航 跳转到后台主页 /home
        this.$router.push("/home");
    });
  }
  
  }
}
</script>

<style lang="less" scoped>
.login-list {
  width: 400px;
  height: 300px;
  background-color: rgb(83, 82, 82);
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login-box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #34495e;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.info {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>