const User = require('../models/user.models')

const handleGetAllUsers = async (req, res) => {
  try {
    const response = await User.all()
    res.status(201).json(response)
  } catch (error) {
    throw error
  }
}

module.exports = {
  handleGetAllUsers
}
