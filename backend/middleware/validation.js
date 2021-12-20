const Joi = require("joi");

module.exports = (schema) => (req, res, next) => {
  console.log("req.body:", req.body);

  if (req.body.location) {
    req.body.location = JSON.parse(req.body.location);
    console.log("fixed req.body location:", req.body);
  }

  const joiSchema = Joi.object(schema);
  const result = joiSchema.validate(req.body);

  console.log("validation result:", result);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  next();
};
