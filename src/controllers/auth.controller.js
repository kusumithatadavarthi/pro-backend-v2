const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')
const { registerSchema, loginSchema } = require('../validators/auth.validator')

const register = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "request body is empty" })
    }
    const rest = registerSchema.safeParse(req.body)
    if (!rest.success) {
      return res.status(400).json({ message: rest.error.issues[0].message })
    }
    const { name, email, password } = req.body
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return res.status(400).json({ message: "email already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })
    res.status(201).json({ message: "user registered successfully" })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "request body is empty" })
    }
    const rest = loginSchema.safeParse(req.body)
    if (!rest.success) {
      return res.status(400).json({ message: rest.error.issues[0].message })
    }
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "user not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '2h' })
    res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}

const profile = async (req, res) => {
  res.status(200).json(req.user)
}

module.exports = { register, login, profile }