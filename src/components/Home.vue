<template>
  <div>
    <div class="container">
      <div class="left">
        <h3>后台管理系统</h3>
      </div>
      <div class="right">
        <img
          src="../../src/assets/logo.png"
          alt=""
        />
        <!-- 下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" >
             <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <a href="#">
                <el-dropdown-item>项目仓库</el-dropdown-item>
                <el-dropdown-item divided  command="handelcommand">退出登录</el-dropdown-item>
              </a>
            </el-dropdown-menu>
            </el-dropdown>
      </div>
    </div>
    <el-container>

  <el-container class="home-contaier">
      <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="toggle-btn" @click="toggle">|||</div>
      <!-- 侧边栏菜单区域 -->
          <el-menu 
      class="el-menu-vertical-demo"
      text-color="rgb(102, 102, 102)"
      background-color="#000"
      active-text-color="#f0f" unique-opened :collapse="isCollapse" :collapse-transition="false"
      router :default-active="avtivePath"
      >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
        <!-- 菜单模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="icons[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->

          <el-menu-item :index="'/'+sunItem.path" 
          v-for="sunItem in item.children" 
          :key="sunItem.id" @click="savaNavState('/'+sunItem.path)">
             <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
         <span>{{sunItem.authName}}</span>
        </template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  data(){
return{
   visible: false,
   username:'  admin',
   //链接激活的地址
   avtivePath:'',
  //  左侧菜单数据
  menuList:[],
  icons:{
    '125':'iconfont icon-user',
    '103':'iconfont icon-tijikongjian',
    '101':'iconfont icon-shangpin',
    '102':'iconfont icon-danju',
    '145':'iconfont icon-baobiao',

  },
  isCollapse:false
}
  
  },
  created(){
    this.getMenuList();
    this.avtivePath=window.sessionStorage.getItem('avtivePath');
  },
  methods: {
    handelcommand(){
    },
    //获取所有的菜单
   async getMenuList(){
   const {data:res} = await this.$http.get('menus');   
  //  console.log(res);
   if(res.meta.status !==200) return this.$message.error('菜单权限获取失败!');
   this.menuList = res.data;
   
    },
    toggle(){
      this.isCollapse = !this.isCollapse
    },
    savaNavState(avtivePath){
     window.sessionStorage.getItem('avtivePath');
       this.avtivePath = avtivePath;
    }
   
  }
};
</script>

<style lang="less" scoped>

.toggle-btn{
  background-color: rgb(118, 116, 116);
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-aside{
  height:549px;
  overflow: hidden;
  background-color: #000;
}
.el-dropdown-link{
  cursor: pointer;
}
a{
  text-decoration: none;
}
.container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3{
    margin-left: 40px;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
  }
  .right img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right:  10px;
  }
}
 .iconfont{
    margin-right: 10px;
  }
  .el-menu{
    height: 100%;
    border-right: none;
  }

</style>
