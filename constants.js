module.exports.userErrors = {
  notFoundId: 'Пользователь по указанному _id не найден.',
  CastError: 'Переданы некорректные данные при поиске пользователя.',
  ValidationError: 'Переданы некорректные данные при создании пользователя.',
};

module.exports.cardErrors = {
  notFoundId: 'Карточка с указанным _id не найдена.',
  CastError: 'Передан несуществующий _id карточки.',
  ValidationError: 'Переданы некорректные данные при создании карточки.',
};

module.exports.serverError = { common: 'Ошибка на сервере' };
