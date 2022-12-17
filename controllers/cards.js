const Card = require('../models/card');
const {cardErrors, serverError} = require("../constants");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'like'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: cardErrors.ValidationError });
        return;
      }
      res.status(500).send({ message: serverError.common });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('notFoundId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(404).send({ message: cardErrors.notFoundId });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: cardErrors.CastError });
        return;
      }
      res.status(500).send({ message: serverError.common });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notFoundId'))
    .populate(['owner', 'like'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(404).send({ message: cardErrors.notFoundId });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: cardErrors.CastError });
        return;
      }
      res.status(500).send({ message: serverError.common });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notFoundId'))
    .populate(['owner', 'like'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(404).send({ message: cardErrors.notFoundId });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: cardErrors.CastError });
        return;
      }
      res.status(500).send({ message: serverError.common });
    });
};
