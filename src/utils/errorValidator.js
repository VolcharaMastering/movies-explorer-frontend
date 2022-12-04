const { celebrate, Joi } = require('celebrate');

const validName = (value, helpers) => {
  if (!/[a-zA-Zа-яА-Я0-9- ]+?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
    name: Joi.string().custom(validName),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string(),
    name: Joi.string().custom(validName),
  }),
});


module.exports = {
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
};
