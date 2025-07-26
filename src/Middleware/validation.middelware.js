/* validation middleware to validate request using joi */
export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const schemaKey = Object.keys(schema);
    let validationErrors = [];
    for (const key of schemaKey) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        validationErrors.push(error.details);
      }
    }
    if (validationErrors.length) {
      return res
        .status(400)
        .json({ message: "Validation Error", validationErrors });
    }
    next();
  };
};
