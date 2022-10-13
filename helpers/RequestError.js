const messages = {
  400: "Bad Request",
  401: "Unathorized",
  403: "Forbbiden",
  404: "Not Found",
  409: "Conflict",
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = {
  RequestError,
  asyncWrapper,
};
