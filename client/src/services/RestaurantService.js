import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('restaurants')
    },
    show (restaurantId) {
        return Api().get('restaurant/'+restaurantId)
    },
    post (restaurant) {
        return Api().post('restaurant/',restaurant)
    },
    put (restaurant) {
        return Api().put('restaurant/'+restaurant.id, restaurant)
    },
    delete (restaurant) {
        return Api().delete('restaurant/'+restaurant.id, restaurant)
    },
}