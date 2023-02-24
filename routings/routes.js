const authUser = require('../auth/auth.user');
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteuser,
    loginUser,
} = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/users', authUser, getAllUsers);
router.get('/users/:id', authUser, getSingleUser);
router.post('/new/users', createUser);
router.put('/users/:id', authUser, updateUser);
router.delete('/users/:id', authUser, deleteuser);
router.post('/login', loginUser);


module.exports = router;