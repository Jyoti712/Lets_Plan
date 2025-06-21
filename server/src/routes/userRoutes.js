const express = require('express');
const { authUser, registerUser, logoutUser , getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/profile',protect, getUserProfile);

module.exports = router;