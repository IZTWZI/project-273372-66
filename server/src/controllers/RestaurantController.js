const { Restaurant } = require("../models");
module.exports = {
  // get all restaurants
  async index(req, res) {
    try {
      const restaurants = await Restaurant.findAll();
      res.send(restaurants);
    } catch (err) {
      res.status(500).send({
        error: "The restaurants information was incorrect",
      });
    }
  },
  // create restaurant
  async create(req, res) {
    try {
      const restaurants = await Restaurant.create(req.body);
      res.send(restaurants.toJSON());
    } catch (err) {
      res.status(500).send({
        error: "Create Restaurant incorrect",
      });
    }
  },
  // edit restaurant, active
  async put(req, res) {
    try {
      await Restaurant.update(req.body, {
        where: {
          id: req.params.restaurantId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "Update Restaurant incorrect",
      });
    }
  },
  // delete restaurant
  async remove(req, res) {
    try {
      const restaurant = await Restaurant.findOne({
        where: {
          id: req.params.restaurantId,
        },
      });

      if (!restaurant) {
        return res.status(403).send({
          error: "The Restaurant information was incorrect",
        });
      }

      await restaurant.destroy();
      res.send(restaurant);
    } catch (err) {
      res.status(500).send({
        error: "The Restaurant information was incorrect",
      });
    }
  },

  // get restaurant by id
  async show(req, res) {
    try {
      const restaurant = await Restaurant.findByPk(req.params.restaurantId);
      res.send(restaurant);
    } catch (err) {}
  },
};
