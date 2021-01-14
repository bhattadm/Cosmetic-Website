const uuid = require('uuid').v4;
const sessions = {};

const isValidSession = function(sid) {
  return sessions[sid];
};

const isValidUsername = function(username) {
  const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
  if(!username) {
    return false;
  }
  else if(username !== cleanUsername) {
    return false;
  }
  return true;
};

const create = function({ username }) {
  if(!username) {
    return { error: 'username-required' };
  }
  if(!isValidUsername(username)) {
    return { error: 'username-invalid' };
  }
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return { sid };
};

const isValidUser = function(sid,username) {
  if(!sid || !username || sessions[sid].username !== username) {
    return false;
  }
  return true;
};

const remove = function(sid) {
  delete sessions[sid];
};

module.exports = {
  details: sessions,
  isValidSession,
  isValidUser,
  create,
  remove  
};