function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// all errors occur here and handled by the API service in the client using their response codes
function errorHandler(err, req, res, next) {
  console.log("Error handler", err);
  // will throw the error
  return res.status(err.status || 500).send({
    message: err.message,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
