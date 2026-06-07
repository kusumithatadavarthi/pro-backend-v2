const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "something went wrong" })
}

module.exports = { errorMiddleware }