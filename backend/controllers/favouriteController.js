const User = require("../models/userModel.js");
const Favourite = require("../models/favouriteModel.js"); // import Favourite model

const addFavorite = async (req, res) => {
    try {
        const userId = req.user.user_id; // assuming user_id is stored in req.user
        const { from, to } = req.body;

        // Create a new favourite item
        const newFavourite = await Favourite.create({ user: userId, from, to });

        // Add this new favourite item's ID to the user's favourites
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: newFavourite._id } },
            { new: true, safe: true, upsert: true }
        );

        res.status(200).send("Favorite added successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};

const listFavorites = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const user = await User.findById(userId).populate('favorites');
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};

const getFavorite = async (req, res) => {
    try {
        const favoriteId = req.params.favoriteId; // Get the favorite ID from the request parameters

        const favorite = await Favourite.findById(favoriteId);
        if (!favorite) {
            return res.status(404).send("Favorite not found.");
        }

        res.status(200).json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};


const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { itemId } = req.body;

        await User.findByIdAndUpdate(
            userId,
            { $pull: { favorites: itemId } },
            { new: true }
        );

        res.status(200).send("Item removed from favorites.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error.");
    }
};

module.exports = {
    addFavorite,
    listFavorites,
    getFavorite,
    removeFavorite,
}