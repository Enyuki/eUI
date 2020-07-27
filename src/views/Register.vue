<template>
  <div id="register">
    <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px" >

      <el-form-item label="账号" prop="account">
        <el-input type="text" v-model="user.account" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="user.checkPassword" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Register',
    data() {
      var checkAcc = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        if(!/^[A-Z][a-zA-Z0-9]{3,16}$/.test(value)){
          return callback(new Error('账号格式有误！首字母大写4-16位字母和数字'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPassword');
          }
          if(!/^[a-zA-Z0-9]{6,16}$/.test(value)){
            return callback(new Error('密码格式有误！6-16位字母或数字'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }

      };
      return {
        user: {
          password: '',
          checkPassword: '',
          account: ''
        },

        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            { validator: checkAcc, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url: 'http://localhost:8081/register',
              method: 'post',

              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              params: {
                account: this.user.account,
                password: this.user.password
              }
            }).then((response)=> {
              if (response.data.returnData){

                this.$message({
                  message: '注册成功，自动跳转登录界面',
                  type: 'success',
                  duration: 3000,
                  onClose: this.$router.push({path: '/login'})
                });
              }else {
                this.$alert(response.data.message, '注册失败', {
                  confirmButtonText: '确定',

                });
              }
            })
              .catch(function (error) {
                console.log(error);
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style >
  #register{
    margin-top: 60px;
    margin-left: 34%;
    width: 400px;
  }
</style>
