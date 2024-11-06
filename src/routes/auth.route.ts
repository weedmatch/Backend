import express from 'express';
import { 
    signup,
    verify,
    login,
    resendVerification,
    forgotPassword,
    resetPassword,
    logOut,
    protect,
    updatePassword,

} from '../controllers/auth.controller'

const router = express.Router();

router.post('/signup', signup)

router.post('/verify', verify)

router.post('/login', login)

router.post('/resendverification', resendVerification)

router.post('/forgotpassword', forgotPassword)

router.post('/resetpassword', resetPassword)

router.post('/logout', logOut)


router.use(protect)
router.use(protect)
router.post('/updatepassword', updatePassword)


export default router;