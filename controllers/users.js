const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.getUserById = (req, res) => {
  const {id} = req.params;

  User.findById(id)
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.updateUser = (req, res) => {
  const {_id} = req.user;
  const {name, about, avatar} = req.body;

  User.findByIdAndUpdate(_id,
    {name, about, avatar},
    {new: true}
  )
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.updateUserAvatar = (req, res) => {
  const {_id} = req.user;
  const {avatar} = req.body;

  User.findByIdAndUpdate(_id,
    {avatar},
    {new: true}
  )
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};