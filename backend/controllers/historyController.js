const User = require("../models/userModel.js");
const Favourite = require("../models/favouriteModel.js");
const SearchHistory = require("../models/searchHistoryModel.js"); // import Favourite model

const addSearchHistory = async (req, res) => {
  try {
    const userId = req.user.user_id; // assuming user_id is stored in req.user
    const { from, to } = req.body;

    // Create a new search history item
    const newSearchHistory = await SearchHistory.create({
      user: userId,
      from,
      to,
    });

    // Optionally, add this new search history item's ID to the user's searchHistory
    // if you have such an array in your User model
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { searchHistory: newSearchHistory._id } },
      { new: true, safe: true, upsert: true },
    );

    res.status(200).send("Search history added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const listSearchHistories = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await User.findById(userId).populate("searchHistory");
    res.status(200).json(user.searchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const getSearchHistory = async (req, res) => {
  try {
    const searchHistoryId = req.params.searchHistoryId; // Get the search history ID from the request parameters

    const searchHistory = await SearchHistory.findById(searchHistoryId);
    if (!searchHistory) {
      return res.status(404).send("Search history not found.");
    }

    res.status(200).json(searchHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const removeSearchHistory = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { searchHistoryId } = req.body;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { searchHistory: searchHistoryId } },
      { new: true },
    );

    res.status(200).send("Search history removed.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const addFavoriteFromHistory = async (req, res) => {
  try {
    const userId = req.user.user_id; // assuming user_id is stored in req.user
    const { searchHistoryId } = req.body;

    // Find the search history item
    const searchHistoryItem = await SearchHistory.findById(searchHistoryId);
    if (!searchHistoryItem) {
      return res.status(404).send("Search history item not found.");
    }

    // Create a new favorite based on the search history item
    const newFavorite = await Favourite.create({
      user: userId,
      from: searchHistoryItem.from,
      to: searchHistoryItem.to,
    });

    // Add this new favorite item's ID to the user's favorites
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: newFavorite._id } },
      { new: true, safe: true, upsert: true },
    );

    res.status(200).send("Added to favorites from history.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  addSearchHistory,
  listSearchHistories,
  getSearchHistory,
  removeSearchHistory,
  addFavoriteFromHistory,
};
