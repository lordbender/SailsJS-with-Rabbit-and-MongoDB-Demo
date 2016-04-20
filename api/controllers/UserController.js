var uuid = require('uuid');

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    User.create({
      uuid: uuid.v4(),
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name
    }).exec(function createCB(err, created){
      if(err){
        sails.log.error(err)
        return res.send(err, 409);
      }
      sails.log.debug('Created user with name ' + created.name);
      console.log('Created user with name ' + created.name);
      return res.send(created);
    });


  },
  list: function (req, res) {
    return res.send("Got a User!");
  }
};

