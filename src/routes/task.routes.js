const express=require('express');
const router=express.Router();
const {post_task,update_task,get_tasks,delete_task}=require('../controllers/task.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
router.get('/get_tasks',authMiddleware,get_tasks);
router.post('/addtask',authMiddleware,post_task);
router.patch('/updatetask/:id',authMiddleware,update_task);
router.delete('/deletetask/:id',authMiddleware,delete_task);
module.exports=router;