import express from 'express';
import userRoutes from './user.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>Welcome to the New App </h1>`)
})

router.use('/user', userRoutes)
export default router;