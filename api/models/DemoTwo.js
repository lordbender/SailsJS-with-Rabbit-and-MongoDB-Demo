/**
 * DemoTwo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    age: {
      type: 'integer',
      required: true
    },
    isAdmin: {
      type: 'boolean',
      required: true
    },
    roles: {
      type: 'array',
      required: true
    },
    additionalStuffs: {
      type: 'json',
      required: false
    }
  }
};

