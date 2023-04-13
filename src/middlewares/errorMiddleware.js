module.exports = (err, req, res, _next) => {
    if (err.cod) {
      return res.status(err.cod).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };