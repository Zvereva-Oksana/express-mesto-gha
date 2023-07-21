const BadRequest = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const validateRequest = (schema, requestParameters, error = '400') => {
  const validationResult = schema.validate(requestParameters);
  if (validationResult.error) {
    if (error === '400') {
      throw new BadRequest('Переданы некорректные данные');
    } else if (error === '401') {
      throw new UnauthorizedError('Переданы некорректные данные');
    }
  }
};

module.exports = { validateRequest };
