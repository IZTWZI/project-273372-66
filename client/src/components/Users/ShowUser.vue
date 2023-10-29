<template>
  <div class="user-details-container">
    <h1 class="user-details-heading">User Details</h1>
    <div class="user-details">
      <p class="user-info">User ID: {{ user.id }}</p>
      <p class="user-info">First Name: {{ user.name }}</p>
      <p class="user-info">Last Name: {{ user.lastname }}</p>
      <p class="user-info">Email: {{ user.email }}</p>
      <p class="user-info">Status: {{ user.status }}</p>
    </div>
    <p><button v-on:click="navigateTo('/users/')" class="back-button">back</button></p>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService';

export default {
  data() {
    return {
      user: null
    }
  },
  async created() {
    try {
      let userId = this.$route.params.userId
      this.user = (await UsersService.show(userId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
  }

}
</script>
<style scoped>
.user-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-details-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.user-details {
  width: 100%;
  max-width: 400px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

.user-info {
  margin: 10px 0;
}

.back-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>