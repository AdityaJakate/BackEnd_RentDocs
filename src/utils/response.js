const response = (res, status, message, data) => {
  res.status(status).json({ message, data });
};

module.exports = { response };
