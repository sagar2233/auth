const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate');

const {
  registerController,
  loginController,
  verifyOTPController,
  verifyRegisterOTPController,
  logoutController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController,
} = require('../controllers/auth.controller');

const {
  registerSchema,
  loginSchema,
  verifyOTPSchema,
  verifyRegisterOTPSchema,
  logoutSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../utils/validation');

// Swagger docs remain unchanged...

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController);
router.post('/verify-otp', validate(verifyOTPSchema), verifyOTPController);
router.post('/verify-register-otp', validate(verifyRegisterOTPSchema), verifyRegisterOTPController);
router.post('/logout', validate(logoutSchema), logoutController);
router.post('/refresh-token', validate(refreshTokenSchema), refreshTokenController);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPasswordController);
router.post('/reset-password', validate(resetPasswordSchema), resetPasswordController);

router.get('/admin-only', authenticate, authorize('ADMIN'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
