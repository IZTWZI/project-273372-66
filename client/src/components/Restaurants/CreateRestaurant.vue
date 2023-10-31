<template>
  <div class="create-restaurant-container">
    <h1 class="create-restaurant-heading">Create Restaurant</h1>
    <form v-on:submit.prevent="createRestaurant" class="restaurant-form">
      <div class="form-group">
        <label for="name">Restaurant Name:</label>
        <input type="text" id="name" v-model="restaurant.name" class="form-input" placeholder="ชื่อร้านอาหาร" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="restaurant.address" class="form-input" placeholder="ที่อยู่ของร้านอาหาร"
          required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="restaurant.email" class="form-input" placeholder="test@gmail.com"
          required />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="restaurant.phoneNumber" class="form-input" placeholder="062xxxxxxx"
          pattern="\d{3}\d{3}\d{4}" minlength="10" maxlength="10" required />
      </div>
      <div class="form-group">
        <label for="timeOn">Opening Time:</label>
        <input type="time" id="timeOn" v-model="restaurant.timeOn" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="timeOff">Closing Time:</label>
        <input type="time" id="timeOff" v-model="restaurant.timeOff" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="menuType">Menu Type:</label>
        <input type="text" id="menuType" v-model="restaurant.menuType" class="form-input"
          placeholder="ประเภทของอาหารที่อยู่ในร้าน" required />
      </div>
      <div class="form-group">
        <label for="services">Services:</label>
        <input type="text" id="services" v-model="restaurant.services" class="form-input"
          placeholder="บริการที่มีอยู่ในร้าน" />
      </div>
      <div class="form-group">
        <label for="promotion">Promotion:</label>
        <input type="text" id="promotion" v-model="restaurant.promotion" class="form-input" placeholder="โปรโมชัน" />
      </div>
      <div class="button-group">
        <button type="submit" class="create-button">Create Restaurant</button>
        <button v-on:click="navigateTo('/restaurants/')" class="back-button">Back</button>
      </div>
      <br>
        <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import RestaurantService from '../../services/RestaurantService';

export default {
  data() {
    return {
      restaurant: {
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        timeOn: '',
        timeOff: '',
        menuType: '',
        services: '',
        promotion: '',
      },
      error: null
    }
  },
  methods: {
    async createRestaurant() {
      try {
        const response = await RestaurantService.post({
        name: this.restaurant.name,
        address: this.restaurant.address,
        email: this.restaurant.email,
        phoneNumber: this.restaurant.phoneNumber,
        timeOn: this.restaurant.timeOn,
        timeOff: this.restaurant.timeOff,
        menuType: this.restaurant.menuType,
        services: this.restaurant.services,
        promotion: this.restaurant.promotion
        })
        console.log(response)
        this.$router.push({
          name: 'restaurants'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.create-restaurant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-restaurant-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.restaurant-form {
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.create-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button {
  background-color: #ccc;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}

.back-button:hover {
  background-color: #999;
}

.error {
  color: red;
}
</style>