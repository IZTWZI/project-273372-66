<template>
  <div class="restaurants-container">
    <div class="navbar">
      <button v-on:click="navigateTo('/users/')" class="navbar-button-showUsers">Show Users</button>
      <button v-on:click="navigateTo('/restaurant/create/')" class="navbar-button-createRe">Create Restaurant</button>
      <button v-on:click="logout" class="navbar-button-logout">Logout</button>
    </div>
    <h2 class="page-heading">All Restaurants</h2>
    <h4 class="total-restaurants">Total Restaurants: {{ restaurants.length }}</h4>

    <table class="restaurant-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Restaurant Name</th>
          <th>Address</th>
          <th>View Details</th>
          <th>Edit Info</th>
          <th>Delete Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(restaurant, index) in paginatedRestaurants" :key="restaurant.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ restaurant.name }}</td>
          <td>{{ restaurant.address }}</td>
          <td>
            <button v-on:click="navigateTo('/restaurant/' + restaurant.id)" class="view-button">View Details</button>
          </td>
          <td>
            <button v-on:click="navigateTo('/restaurant/edit/' + restaurant.id)" class="edit-button">Edit Info</button>
          </td>
          <td>
            <button v-on:click="deleteRestaurant(restaurant)" class="delete-button">Delete Info</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button v-on:click="prevPage" class="pagination-button">Previous Page</button>
      <div class="page-numbers">
        <button v-for="page in visiblePageNumbers" :key="page" @click="changePage(page)" class="pagination-button"
          :class="{ 'active-page': page === currentPage }">
          {{ page }}
        </button>
      </div>
      <p>Pages: {{ currentPage }}/{{ totalPages }}</p>
      <button v-on:click="nextPage" class="pagination-button">Next Page</button>
    </div>
  </div>
</template>

<script>
import RestaurantService from '@/services/RestaurantService';

export default {
  data() {
    return {
      restaurants: [],
      currentPage: 1,
      itemsPerPage: 5,
      visiblePageNumbers: [],
    };
  },
  computed: {
    paginatedRestaurants() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.restaurants.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.restaurants.length / this.itemsPerPage);
    },
  },
  async created() {
    this.restaurants = (await RestaurantService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'login',
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteRestaurant(restaurant) {
      const result = confirm('Want to delete?');
      if (result) {
        try {
          await RestaurantService.delete(restaurant);
          this.restaurants = this.restaurants.filter((r) => r.id !== restaurant.id);
        } catch (error) {
          console.log(error);
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    updateVisiblePageNumbers() {
      const maxVisiblePages = 5;
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);

      if (this.totalPages <= maxVisiblePages) {
        this.visiblePageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      } else if (this.currentPage <= halfVisiblePages) {
        this.visiblePageNumbers = Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
      } else if (this.currentPage >= this.totalPages - halfVisiblePages) {
        this.visiblePageNumbers = Array.from({ length: maxVisiblePages }, (_, i) => this.totalPages - maxVisiblePages + i + 1);
      } else {
        this.visiblePageNumbers = Array.from({ length: maxVisiblePages }, (_, i) => this.currentPage - halfVisiblePages + i);
      }
    },
  },
};
</script>

<style scoped>
/* สไตล์ CSS สำหรับแถบบา */
.navbar {
  background-color: #ffffff;
  /* สีพื้นหลังของแถบบา */
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

/* สไตล์ปุ่มในแถบบา */

.navbar-button {
  background-color: #ff9100;
  /* สีพื้นหลังของปุม */
  color: #fff;
  /* สีข้อความ */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
}

.navbar-button:hover {
  background-color: #d77c04;
  /* สีพื้นหลังเมื่อนำเมาส์ผ่าน (hover) */
}

.navbar-button-showUsers {
  background-color: #999;
  /* สีพื้นหลังของปุม */
  color: #fff;
  /* สีข้อความ */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
}

.navbar-button-createRe {
  background-color: #999;
  /* สีพื้นหลังของปุม */
  color: #fff;
  /* สีข้อความ */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
}

.navbar-button-logout {
  background-color: #999;
  /* สีพื้นหลังของปุม */
  color: #fff;
  /* สีข้อความ */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 10px;
}

.navbar-button-showUsers:hover {
  background-color: #28a745;
  /* สีพื้นหลังเมื่อนำเมาส์ผ่าน (hover) */
}

.navbar-button-createRe:hover {
  background-color: #007bff;
  /* สีพื้นหลังเมื่อนำเมาส์ผ่าน (hover) */
}

.navbar-button-logout:hover {
  background-color: #dc3545;
  /* สีพื้นหลังเมื่อนำเมาส์ผ่าน (hover) */
}

.restaurants-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurants-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.page-heading {
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
}

.total-restaurants {
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.restaurant-table {
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
}

.restaurant-table th,
.restaurant-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
  text-align: left;
}

.restaurant-table th {
  background-color: #f1f1f1;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.view-button {
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.edit-button {
  background-color: #edce1a;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.view-button:hover {
  background-color: #18662a;
}

.edit-button:hover {
  background-color: #d1b518;
}

.delete-button:hover {
  background-color: #a02834;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin: 0 10px;
}

.pagination-button:hover {
  background-color: #0056b3;
}
</style>
