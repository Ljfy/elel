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
<el-table-column label="状态">
  <!-- 作用域插槽 -->
  <template slot-scope="scope">
    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
    </el-switch>
  </template>
</el-table-column>
<el-table-column label="操作" width="180">
  <!-- 作用域插槽 -->
  <template slot-scope="scope">
    <!-- 修改按钮 -->
      <el-tooltip  effect="dark" content="修改按钮" placement="top" :enterable="false">
    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInput(scope.row.id)"></el-button>
      </el-tooltip>
    <!-- 删除按钮 -->
     <el-tooltip  effect="dark" content="删除按钮" placement="top" :enterable="false">
    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeValue(scope.row.id)"></el-button>
     </el-tooltip>
    <!-- 分配角色按钮 -->
     <el-tooltip  effect="dark" content="分配按钮" placement="top" :enterable="false">
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
      :total="total" style="text-align:left;">
    </el-pagination>
  <!-- 添加用户对话框 -->
  <el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  @close="addialogTable"
  width="50%">
  <!-- 内容主体区域 -->
  <el-form label-width="80px" :model="editForm" :rules="ruleseditForm" ref="addFormRef">
  <el-form-item label="用户名">
    <el-input v-model="editForm.username"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>

   <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>

</el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改区域 -->
<el-dialog title="修改用户"
:visible.sync="dialogVisible"
  @close="addialogTable"
  width="50%"
>
   <el-form label-width="80px" :model="editForm" :rules="ruleseditForm" ref="add2FormRef">
  <el-form-item label="用户名">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
   </el-form>
   <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
</el-card>
  </div>
</template>

<script>
  export default {
    data(){
      //验证邮箱的规则
      var checkEmail = (rule,value,callback)=>{
        const reg =/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if(reg.test(value)){
          return callback();
        }
        callback(new Error('请输入合法的邮箱'))
      }
      var checkMobile = (rule,value,callback)=>{
        const regMobile = /^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$/
      if(regMobile.test(value)){
        return callback();
      }
      callback(new Error('请输入合法的手机号'))
      }
      return{
      
          //添加用户表单数据
          editForm:{ 
          username:'张丰',
          email:'914190359@qq.com',
          password:'',
          mobile:'18738858969'
          },
          //添加表单验证规则对象
          ruleseditForm:{
             username: [
          { required: true, message: "请输入添加用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名称长度在 3 到 10 个字符",
            trigger: "blur",
          }, ],
          
          password: [{
             required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "密码强度在 3 到 10 个字符",
            trigger: "blur",
          },
          ],
             email: [{
             required: true, message: "请输入邮箱", trigger: "blur" },
             {validator:checkEmail, trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "请输入正确邮箱",
            trigger: "blur",
          },
          ],
            mobile: [{
             required: true, message: "请输入手机号", trigger: "blur" },
             {validator:checkMobile, trigger: "blur"},
          {
            min: 3,
            max: 11,
            message: "请输入合法的手机号",
            trigger: "blur",
          },
          ]
          },
          addFormRef:{
          password: [{
             required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "密码强度在 3 到 10 个字符",
            trigger: "blur",
          },
          ],
             email: [{
             required: true, message: "请输入邮箱", trigger: "blur" },
             {validator:checkEmail, trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "请输入正确邮箱",
            trigger: "blur",
          },
          ],
            mobile: [{
             required: true, message: "请输入手机号", trigger: "blur" },
             {validator:checkMobile, trigger: "blur"},
          {
            min: 3,
            max: 11,
            message: "请输入合法的手机号",
            trigger: "blur",
          },
          ]
          },
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
          pagesize:5
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
  
     this.usersList = res.data.users;
     this.total = res.data.total;
     },
      // 监听pageSize改变的事件
      handleSizeChange(newSize){
        this.quertyInfo.pagesize = newSize;
        this.getUserList();
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
        this.quertyInfo.pagenum = newPage;
        this.getUserList();
      },
      // 监听swich状态改变
     async userStateChanged(userinfo){
  
      const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if(res.meta.status!==200) {
      userinfo.mg_state = !userinfo.mg_state ;
      return this.$message.error('更新状态失败');
      }
      this.$message.success('更新状态成功')
      },
      //对话框关闭
    addialogTable(){
      this.$refs.addFormRef.resetFields();
    },
    //添加用户
   addUser(){
      this.$refs.addFormRef.validate(async valid=>{
         
          if(!valid) return this.$message.error('请填写完整的用户信息！')
          //发起网络请求
          const {data:res} = await this.$http.post('users',this.editForm);
           console.log(res);
          //判断添加失败就提示
           if(res.meta.status!==201) return    this.$message.error('添加失败！');
            this.$message.success('添加成功！');
          this.dialogVisible = false;
          this.getUserList();
         })
    
    },
    // 修改用户信息并提交
   async  editInput(id){
 const {data:res} = await this.$http.get('users/'+id);
        if(res.meta.status !==200) return this.$message.error('用户查询失败！')
        this.editForm = res.data;
         this.dialogVisible=true;
    },
    editUser(){
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid){
        return this.$message.error('修改用户信息失败');
        }
        const {data:res} = await this.$http.put('users/'+this.editForm.id,this.editForm);
           //判断添加失败就提示
           if(res.meta.status !==200){
             return this.$message.error('编辑用户信息失败');
           }
            this.$message.success('添加信息成功！');
            // 关闭对话框
            this.addialogTable1 = false;
            // 重新请求数据
            this.getUserList();
      })
    },
   async removeValue(id){
      const confimResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         }).catch(err =>err)
     if(confimResult !=='confirm'){
       return this.$message.info('已经取消删除');
     }
     const {data:res} = await this.$http.delete('users/'+id)
     if(res.meta.status !==200) return this.$message.error('删除失败')
     this.$message.success('删除成功')
     this.getUserList();
    }
    }
  }
</script>

<style lang="less" scoped>
  .el-table{
    margin-top: 12px;
  }
</style>