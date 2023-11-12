const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/historyController.js");
const authenticate = require('../middleware/authenticate.js');

// Add a new search history record
router.post('/add', authenticate, HistoryController.addSearchHistory);

// List all search history records for a user
router.get('/list', authenticate, HistoryController.listSearchHistories);

// Retrieve a specific search history record
router.get('get/:searchHistoryId', authenticate, HistoryController.getSearchHistory);

// Remove a search history record
router.delete('/delete', authenticate, HistoryController.removeSearchHistory);

// Add a favorite from a search history item
router.post('/addtofav', authenticate, HistoryController.addFavoriteFromHistory);

module.exports = router;
