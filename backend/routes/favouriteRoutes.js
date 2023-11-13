const express = require("express");
const router = express.Router();
const FavouriteController = require("../controllers/favouriteController.js");
const authenticate = require('../middleware/authenticate.js');

// API to add a favorite item
router.post('/add', authenticate, FavouriteController.addFavorite);

// API to list all favorite items
router.get('/list', authenticate, FavouriteController.listFavorites);

// API to get specific favourite item
router.get('/get/:favoriteId', authenticate, FavouriteController.getFavorite);

// API to remove a favorite item
router.post('/delete', authenticate, FavouriteController.removeFavorite);

module.exports = router;
