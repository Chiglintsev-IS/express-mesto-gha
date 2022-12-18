module.exports.userErrors = {
  NOT_FOUND_ID: {
    message: 'Пользователь по указанному _id не найден.',
    code: 404,
  },
  CAST_ERROR: {
    message: 'Переданы некорректные данные при поиске пользователя.',
    code: 400,
  },
  VALIDATION_ERROR: {
    message: 'Переданы некорректные данные при создании пользователя.',
    code: 400,
  },
};

module.exports.cardErrors = {
  NOT_FOUND_ID: { message: 'Карточка с указанным _id не найдена.', code: 404 },
  CAST_ERROR: { message: 'Передан несуществующий _id карточки.', code: 400 },
  VALIDATION_ERROR: { message: 'Переданы некорректные данные при создании карточки.', code: 400 },
};

module.exports.serverError = {
  COMMON: { message: 'Ошибка на сервере', code: 500 },
  PAGE_NOT_FOUND: { message: 'Запрашиваемый ресурс не найден', code: 404 },
};
