const  express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorize')
const upload = require('../middlewares/multer')

// user
router.post('/register', upload.single('profileImage'), userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/getUserInfo',authorize.auth, userController.getUserInfo)

router.put('/updateUserInfo', authorize.auth, upload.single('profileImage'), userController.updateUserInfo);

module.exports = router;