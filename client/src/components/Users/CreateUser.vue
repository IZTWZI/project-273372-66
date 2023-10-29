<template>
  <div class="CreateUser-container">
    <div class="CreateUser-form">
      <h1 class="CreateUser-heading">Create User</h1>
      <form v-on:submit.prevent="createUser" class="form">
        <div class="form-group">
          <label for="name" class="form-label">First Name</label>
          <input type="text" id="name" v-model="user.name" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="lastname" class="form-label">Last Name</label>
          <input type="text" id="lastname" v-model="user.lastname" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="user.email" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="user.password" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input" required>
        </div>

        <div class="button-group">
          <button type="submit" class="singin-button">Create User</button>
          <button v-on:click="navigateTo('/users/')" class="singup-button">Back</button>
        </div>
        <br>
        <div class="error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
  
<script>
import AuthenService from '@/services/AuthenService'

export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active',
      },
      error: null
    }
  },
  methods: {
    async createUser() {
      if (this.user.password !== this.confirmPassword) {
        this.error = "Passwords don't match.";
        return;
      }
      try {
        const response = await AuthenService.singup({
          name: this.user.name,
          lastname: this.user.lastname,
          email: this.user.email,
          password: this.user.password,
          status: this.user.status,
        })
        console.log(response)

        this.$router.push({
          name: 'users'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
        this.user.name = '',
        this.user.lastname = '',
        this.user.email = '',
        this.user.password = '',
        this.user.status = 'active',
        this.confirmPassword = ''
      }
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
.CreateUser-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.CreateUser-form {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 300px;
  text-align: center;
}

.CreateUser-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.singin-button {
  width: 48%;
  /* กำหนดความกว้างของปุ่ม Sing In */
  background: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 10px;
  /* เพิ่มระยะห่างขาดไปทางขวาของปุ่ม Sing In */
}

.singup-button {
  width: 48%;
  /* กำหนดความกว้างของปุ่ม Sing Up */
  background: #ccc;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
  /* เพิ่มระยะห่างขาดไปทางซ้ายของปุ่ม Sing Up */
}

.singin-button:hover {
  background: #0056b3;
}

.singup-button:hover {
  background: #999;
}

.error {
  color: red;
}
</style>
