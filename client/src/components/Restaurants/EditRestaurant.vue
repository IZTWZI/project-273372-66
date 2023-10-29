<template>
  <div class="edit-restaurant-container">
    <div class="l1">
      <h1 class="edit-restaurant-heading">Edit Restaurant</h1>
      <form v-on:submit.prevent="editRestaurant">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" placeholder="ชื่อร้านอาหาร" v-model="restaurant.name" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" placeholder="ที่อยู่ของร้านอาหาร" v-model="restaurant.address" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" placeholder="test@gmail.com" v-model="restaurant.email" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" placeholder="062xxxxxxx" pattern="\d{3}\d{3}\d{4}" minlength="10"
            maxlength="10" v-model="restaurant.phoneNumber" required>
        </div>
        <div class="form-group">
          <label for="timeOn">Opening Time:</label>
          <input type="time" id="timeOn" v-model="restaurant.timeOn" required>
        </div>
        <div class="form-group">
          <label for="timeOff">Closing Time:</label>
          <input type="time" id="timeOff" v-model="restaurant.timeOff" required>
        </div>
        <div class="form-group">
          <label for="menuType">Menu Type:</label>
          <input type="text" id="menuType" placeholder="ประเภทของอาหารที่อยู่ในร้าน" v-model="restaurant.menuType"
            required>
        </div>
        <div class="form-group">
          <label for="services">Services:</label>
          <input type="text" id="services" placeholder="บริการที่มีอยู่ในร้าน" v-model="restaurant.services">
        </div>
        <div class="form-group">
          <label for="promotion">Promotion:</label>
          <input type="text" id="promotion" placeholder="โปรโมชัน" v-model="restaurant.promotion">
        </div>

        <div class="form-actions">
          <button type="submit" class="edit-button">Edit Restaurant</button>
          <button v-on:click="navigateTo('/restaurants/')" class="back-button">Back</button>
        </div>
      </form>
    </div>
    <hr>
    <div class="l2">
      <div class="current-details">
        <h2>Current Details</h2>
        <p>Name: {{ restaurant.name }}</p>
        <p>Address: {{ restaurant.address }}</p>
        <p>Email: {{ restaurant.email }}</p>
        <p>Phone Number: {{ restaurant.phoneNumber }}</p>
        <p>Opening Time: {{ restaurant.timeOn }}</p>
        <p>Closing Time: {{ restaurant.timeOff }}</p>
        <p>Menu Type: {{ restaurant.menuType }}</p>
        <p>Services: {{ restaurant.services }}</p>
        <p>Promotion: {{ restaurant.promotion }}</p>
      </div>
    </div>
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
      }
    }
  },
  methods: {
    async editRestaurant() {
      try {
        await RestaurantService.put(this.restaurant)
        this.$router.push({
          name: 'restaurants'
        })
      } catch (error) {
        console.log(error)
      }
    },

    navigateTo(route) {
      this.$router.push(route)
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

}
</script>

<style scoped>
/*.edit-restaurant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}*/

.edit-restaurant-container {
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* ตั้งค่าให้เริ่มจากด้านบนของ .l1 และ .l2 */
}

.l1 {
  /* สไตล์สำหรับ .l1 (ฝั่งซ้าย) */
  width: 48%;
  /* กำหนดความกว้างของ .l1 ให้เล็กน้อยกว่าครึ่งหน้า */
  padding: 10px;
  /* กำหนดการเว้นระหว่างขอบใน .l1 */
  box-sizing: border-box;
  /* ไม่ให้ padding มีผลกับขนาดของ .l1 */

}

.l2 {
  /* สไตล์สำหรับ .l2 (ฝั่งขวา) */
  width: 40%;
  /* กำหนดความกว้างของ .l2 ให้เล็กน้อยกว่าครึ่งหน้า */
  padding: 10px;
  /* กำหนดการเว้นระหว่างขอบใน .l2 */
  box-sizing: border-box;
  /* ไม่ให้ padding มีผลกับขนาดของ .l2 */
}

.edit-restaurant-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

/*
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}*/

input {
  width: 100%;
  padding: 5px;
  /* ปรับความหนาขอบของกล่อง input */
  height: 30px;
  /* ปรับความสูงของกล่อง input */
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-right: 10px;
  /* เพิ่มระยะห่างขาดไปทางขวาของปุ่ม */
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

.edit-button:hover {
  background-color: #0056b3;
}

.back-button:hover {
  background-color: #999;
}

.current-details {
  margin-top: 20px;
  text-align: left;
}</style>