const z = require('zod')

const createTaskSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional()
})

const updateTaskSchema = z.object({
  status: z.enum(["pending", "in-progress", "completed"])
})

module.exports = { createTaskSchema, updateTaskSchema }