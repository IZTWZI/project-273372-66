<template>
    <div class="edit-user-container">
        <div class="l1">
            <h1 class="edit-user-heading">Edit User</h1>
            <form v-on:submit.prevent="editUser">
                <div class="form-group">
                    <label for="name">First Name:</label>
                    <input type="text" id="name" placeholder="ชื่อร้านอาหาร" v-model="user.name" required>
                </div>
                <div class="form-group">
                    <label for="lastname">Last Name:</label>
                    <input type="text" id="lastname" placeholder="ที่อยู่ของร้านอาหาร" v-model="user.lastname" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" id="email" placeholder="test@gmail.com" v-model="user.email" readonly disabled>
                </div>
                <div class="form-group">
                    <label for="status">Status:</label>
                    <select id="status" v-model="user.status" required class="styled-select">
                        <option value="active">Active</option>
                        <option value="not active">Not Active</option>
                    </select>
                </div>


                <div class="form-actions">
                    <button type="submit" class="edit-button">Edit User</button>
                    <button v-on:click="navigateTo('/users/')" class="back-button">Back</button>
                </div>
            </form>
        </div>
        <hr>
        <div class="l2">
            <div class="current-details">
                <h2>Current Details</h2>
                <p>Name: {{ user.name }}</p>
                <p>Address: {{ user.lastname }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Statis: {{ user.status }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import UsersService from '../../services/UsersService';

export default {
    data() {
        return {
            user: {
                name: '',
                lastname: '',
                email: '',
                status: 'active',
            }
        }
    },
    methods: {
        async editUser() {
            try {
                await UsersService.put(this.user)
                this.$router.push({
                    name: 'users'
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
            let userId = this.$route.params.userId
            this.user = (await UsersService.show(userId)).data
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
/* สไตล์สำหรับเลือกกล่องแบบปุ่มกด */
.styled-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 10px 50px 10px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: url('https://cdn.jsdelivr.net/gh/encharm/Font-Awesome-SVG-PNG/white/svg/caret-down.svg') 95% / 15% no-repeat #fff;
    cursor: pointer;
}

.edit-user-container {
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

.edit-user-heading {
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
}
</style>