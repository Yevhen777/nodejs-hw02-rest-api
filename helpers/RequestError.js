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
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = {
  RequestError,
  asyncWrapper,
};
