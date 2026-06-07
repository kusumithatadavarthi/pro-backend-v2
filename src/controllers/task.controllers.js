const prisma = require('../config/db');
const { createTaskSchema, updateTaskSchema }=require('../validators/task.validator');
const post_task=async(req,res,next)=>{
    try{
    const data=req.body;
    if(!req.body||Object.keys(req.body).length===0){
        return res.send('data is empty!!');
    }
    const validate=createTaskSchema.safeParse(req.body);
    if(!validate.success){
        return res.status(400).json({ message: validate.error.issues[0].message })
    }
    const result= await prisma.task.create({data:{title:data.title,description:data.description,status:data.status,userId: req.user.id }})
    if(!result){
        next(err);
    }
    res.status(200).send('data added successfully!')
    }
    catch(err){
        next(err);
    }
}

const update_task=async(req,res,next)=>{
    try{
    const id=req.params.id
    const validate=await prisma.task.findUnique({where:{id:Number(id)}});
    if(!validate){
          return res.status(404).json({ message: "task not found" })
    }
    const data=req.body;
    if(!data||Object.keys(data).length==0){
        return res.status(400).json({ message: "body is empty" })
    }
    const result= await prisma.task.update({
        where:{id:Number(id)},
        data:{status:data.status}
    })
    res.status(200).json({ message: "task updated successfully" })
    }
    catch(err){
        next(err);
    }

}
const get_tasks=async(req,res,next)=>{
    try{
    const user_id=req.user.id;
    const user=await prisma.user.findUnique({where:{id:user_id}});
    if(!user){
        return res.status(404).send("user not found");
    }
    const tasks=await prisma.task.findMany({where:{userId:user_id,include:{user:true}}});
    if(tasks.length===0){
        return res.status(404).send('No tasks available');

    }
    res.status(200).json({tasks})
}
catch(err){
    next(err);
}
}
const delete_task=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const validate=await prisma.task.findUnique({where:{id:Number(id)}});
        if(!validate){
            return res.status(404).send('no tasks found!');
        }
        const deleting=await prisma.task.delete({where:{id:Number(id)}});
        if(!deleting){
            next(err);
        }
        res.status(200).send('task deleted successfully!!')
    }
    catch(err){
        next(err);
    }
}
module.exports={post_task,update_task,get_tasks,delete_task};