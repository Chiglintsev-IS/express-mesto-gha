const Card = require('../models/card');
const { cardErrors, serverError } = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'like'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res
        .status(serverError.COMMON.code)
        .send({ message: serverError.COMMON.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(cardErrors.VALIDATION_ERROR.code)
          .send({ message: cardErrors.VALIDATION_ERROR.message });
        return;
      }
      res
        .status(serverError.COMMON.code)
        .send({ message: serverError.COMMON.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notFoundId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res
          .status(cardErrors.NOT_FOUND_ID.code)
          .send({ message: cardErrors.NOT_FOUND_ID.message });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(cardErrors.CAST_ERROR.code)
          .send({ message: cardErrors.CAST_ERROR.message });
        return;
      }
      res
        .status(serverError.COMMON.code)
        .send({ message: serverError.COMMON.message });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new Error('notFoundId'))
    .populate(['owner', 'like'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res
          .status(cardErrors.NOT_FOUND_ID.code)
          .send({ message: cardErrors.NOT_FOUND_ID.message });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(cardErrors.CAST_ERROR.code)
          .send({ message: cardErrors.CAST_ERROR.message });
        return;
      }
      res
        .status(serverError.COMMON.code)
        .send({ message: serverError.COMMON.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new Error('notFoundId'))
    .populate(['owner', 'like'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res
          .status(cardErrors.NOT_FOUND_ID.code)
          .send({ message: cardErrors.NOT_FOUND_ID.message });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(cardErrors.CAST_ERROR.code)
          .send({ message: cardErrors.CAST_ERROR.message });
        return;
      }
      res
        .status(serverError.COMMON.code)
        .send({ message: serverError.COMMON.message });
    });
};
