const User = require('../models/user');
const { userErrors, serverError } = require('../constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: serverError.COMMON }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(new Error('notFoundId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(404).send({ message: userErrors.NOT_FOUND_ID });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: userErrors.CAST_ERROR });
        return;
      }
      res.status(500).send({ message: serverError.COMMON });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: userErrors.VALIDATION_ERROR });
      } else {
        res.status(500).send({ message: serverError.COMMON });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notFoundId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(400).send({ message: userErrors.NOT_FOUND_ID });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: userErrors.VALIDATION_ERROR });
        return;
      }
      res.status(500).send({ message: serverError.COMMON });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notFoundId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(400).send({ message: userErrors.NOT_FOUND_ID });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: userErrors.VALIDATION_ERROR });
        return;
      }
      res.status(500).send({ message: serverError.COMMON });
    });
};
