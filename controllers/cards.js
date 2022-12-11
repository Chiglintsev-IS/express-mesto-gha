const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
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
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.status(500).send({ message: err.message });
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
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(500).send({ message: err.message });
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
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};
