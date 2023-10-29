<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-heading">SingIn!</h1>
      <form v-on:submit.prevent="onLogin" class="form">
        <div class="form-group">
          <label for="username" class="form-label">Email</label>
          <input type="email" id="username" v-model="email" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-input" required>
        </div>
        <div class="button-group">
          <button type="submit" class="singin-button">Sing in</button>
          <button v-on:click="navigateTo('/singup')" class="singup-button">Sing up</button>
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
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password
        })
        console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'restaurants'
        })

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
        this.email = ''
        this.password = ''
      }
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 300px;
  text-align: center;
}

.login-heading {
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
  background: #28a745;
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
  background: #edce1a;
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
  background: #18662a;
}

.singup-button:hover {
  background: #d1b518;
}

.error {
  color: red;
}</style>