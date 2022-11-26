const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({data: cards}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link})
    .then(card => res.status(201).send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.deleteCard = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndRemove(cardId)
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.likeCard = (req, res) => {
  const {cardId} = req.params;
  const {_id} = req.user;
  Card.findByIdAndUpdate(cardId,
    {$addToSet: {likes: _id}},
    {new: true}
  )
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.dislikeCard = (req, res) => {
  const {cardId} = req.params;
  const {_id} = req.user;
  Card.findByIdAndUpdate(cardId,
    {$pull: {likes: _id}},
    {new: true}
  )
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};
