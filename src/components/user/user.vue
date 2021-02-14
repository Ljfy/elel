<template>
  <div>
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<div style="margin-top:15px"></div>
<!-- 卡片区域 -->
<el-card>
<!-- 搜索区域 -->
<el-row>
  <el-col :span="8" gutter>
     <el-input placeholder="请输入内容" clearable @clear="getUserList" v-model="quertyInfo.query" class="input-with-select">
  <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
 </el-input>
  </el-col>
  <!-- 添加用户 -->
   <el-col :span="4">
    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
  </el-col>
</el-row>
<!-- 用户列表区域 -->
<el-table :data="usersList" border stripe>
<el-table-column type="index" label="#"></el-table-column>
<el-table-column label="姓名"  prop="username"></el-table-column>
<el-table-column label="邮箱"  prop="email"></el-table-column>
<el-table-column label="电话"  prop="mobile"></el-table-column>
<el-table-column label="角色"  prop="role_name"></el-table-column>
<el-table-column label="状态"  prop="mg_state">
  <!-- 作用域插槽 -->
  <template slot-scope="scope">
    <el-switch v-model="scope.row.mg_stat" @change="userStateChanged(scope.row)">
    </el-switch>
  </template>
</el-table-column>
<el-table-column label="操作" width="180">
  <!-- 作用域插槽 -->
  <template slot-scope="scope">
    <!-- 修改按钮 -->
    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
    <!-- 删除按钮 -->
    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    <!-- 分配角色按钮 -->
     <el-tooltip  effect="dark" content="修改按钮" placement="top" :enterable="false">
         <el-button type="warning" icon="el-icon-setting" size="mini" ></el-button>
       </el-tooltip>
  </template>
</el-table-column>
</el-table>
<!-- 分页区域 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="quertyInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="quertyInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  <!-- 添加用户对话框 -->
  <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%">
  <!-- 内容主体区域 -->
  <el-form label-width="80px" :model="editForm"  :rules="ruleseditForm" ref="addFormRef">
    <el-form-item></el-form-item>
  </el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</el-card>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        editForm:{
          username:'',
          email:'',
          password:'',
          mobile:''
        },
          //添加用户表单数据
          editForm:{},
          //添加表单验证规则对象
          ruleseditForm:'',
        dialogVisible:false,
        // 总数据
        total:0,
        // 用户列表
        usersList:[],
        // 用户列表的参数对象
        quertyInfo:{
          query:'',
          // 当前页数
          pagenum:1,
          //每页显示的条数
          pagesize:2
        }
      }
    },
    // 发起组件的首屏请求
    created(){
      this.getUserList();
    },
    methods:{
     async getUserList(){
     const{data:res} =  await this.$http.get('users',{params:this.quertyInfo})
     if(res.meta.status!==200) return this.$message.error('获取用户列表失败')
     console.log(res);
     this.usersList = res.data.users;
     this.total = res.data.total;
      },
      // 监听pageSize改变的事件
      handleSizeChange(newSize){
        this.quertyInfo.pagesize = newSize;
        this.getUserList();
      },
      // 监听页码值改变的事件
       //监听页码值改变的事件
      handleCurrentChange(newPage){
        this.quertyInfo.pagenum = newPage;
          this.getUserList();

      },
      // 监听swich状态改变
     async userStateChanged(userinfo){
       console.log(userinfo);
      const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if(res.meta.status!==200) {
      userinfo.mg_state = !userinfo.mg_state ;
      return this.$message.error('更新状态失败');
      }
      this.$message.success('更新状态成功')
      },
      // 
    }
  }
</script>

<style lang="less" scoped>
  .el-table{
    margin-top: 12px;
  }
</style>