<template>
  <div class="restaurant-details-container">
    <h1 class="restaurant-details-heading">Restaurant Details</h1>
    <div class="restaurant-details">
      <p class="restaurant-info">Restaurant ID: {{ restaurant.id }}</p>
      <p class="restaurant-info">Restaurant Name: {{ restaurant.name }}</p>
      <p class="restaurant-info">Address: {{ restaurant.address }}</p>
      <p class="restaurant-info">Email: {{ restaurant.email }}</p>
      <p class="restaurant-info">Phone Number: {{ restaurant.phoneNumber }}</p>
      <p class="restaurant-info">Opening Time: {{ restaurant.timeOn }}</p>
      <p class="restaurant-info">Closing Time: {{ restaurant.timeOff }}</p>
      <p class="restaurant-info">Menu Type: {{ restaurant.menuType }}</p>
      <p class="restaurant-info">Services: {{ restaurant.services }}</p>
      <p class="restaurant-info">Promotion: {{ restaurant.promotion }}</p>
    </div>
    <p><button v-on:click="navigateTo('/restaurants/')" class="back-button">back</button></p>
  </div>
</template>

<script>
import RestaurantService from '@/services/RestaurantService';

export default {
  data() {
    return {
      restaurant: null
    }
  },
  async created() {
    try {
      let restaurantId = this.$route.params.restaurantId
      this.restaurant = (await RestaurantService.show(restaurantId)).data
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
.restaurant-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurant-details-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.restaurant-details {
  width: 100%;
  max-width: 400px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

.restaurant-info {
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