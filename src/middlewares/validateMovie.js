const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  duration: Joi.number().required(),
  color: Joi.string().required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, duration, color } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, duration, color },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateMovie;
