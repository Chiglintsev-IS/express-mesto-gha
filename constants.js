module.exports.userErrors = {
  NOT_FOUND_ID: 'Пользователь по указанному _id не найден.',
  CAST_ERROR: 'Переданы некорректные данные при поиске пользователя.',
  VALIDATION_ERROR: 'Переданы некорректные данные при создании пользователя.',
};

module.exports.cardErrors = {
  NOT_FOUND_ID: 'Карточка с указанным _id не найдена.',
  CAST_ERROR: 'Передан несуществующий _id карточки.',
  VALIDATION_ERROR: 'Переданы некорректные данные при создании карточки.',
};

module.exports.serverError = { COMMON: 'Ошибка на сервере' };
