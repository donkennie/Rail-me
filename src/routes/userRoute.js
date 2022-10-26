const express = require('express'); 
const {IsAuthenticatedUser, IsAdminUser} = require('../middleware/authorizationHandler')

const router = express.Router();

const auth = require('../controllers/authController')

router
  .route('/register')
  .post(auth.createUserAccount)
router.route('/login')
  .post(auth.Login);
router.route('/getAllUsers')
   .get(IsAdminUser, auth.GetAllUsers);
module.exports = router;