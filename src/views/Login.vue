<template>
  <div id="login">
    <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account" :label-width="formLabelWidth">
        <el-input v-model="user.account" autocomplete="off" ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="concel">取消</el-button>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>

    import axios from "axios";

    export default {
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
        return {
          beforeRouteEnter: (to,from,next)=>{
            console.log("12344");
          },
          dialogFormVisible: true,
          user: {
            account: '',
            password: '',

          },
          formLabelWidth: '100px',
          rules: {
            password: [
              { validator: validatePass, trigger: 'blur' }
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
                url: 'http://localhost:8081/login',
                method: 'post',

                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {
                  account: this.user.account,
                  password: this.user.password
                }
              }).then((response)=>{
                  if (response.data.returnData){
                    this.$message({
                      message: '登录成功',
                      type: 'success',
                      duration: 1000
                    });
                    this.$router.push('/success/'+this.user.account);
                  } else {
                    this.$alert(response.data.message, '登录失败', {
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
        concel: function() {
          this.$router.push({path: '/'});
        }
      }
    }
</script>

<style >

    #login{
      margin-top: 60px;
      margin-left: 34%;
      width: 400px;
    }

</style>
