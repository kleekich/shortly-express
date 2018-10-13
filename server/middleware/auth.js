const models = require('../models');
const Promise = require('bluebird');
const Utils = require('../lib/hashUtils')
const _ = require('lodash');

module.exports.createSession = (req, res, next) => {
  
  if(_.isEmpty(req.cookies)){
    
    models.Sessions.create()
    .then((result)=>{
      return result.insertId;
    })
    .then(sessionId =>{
      var options = {
        id: sessionId
      }
      models.Sessions.get(options)
      .then(sessionRow=>{
        req.session = {hash: {value: sessionRow.hash }}
        res.cookies = {shortlyid: {value: sessionRow.hash}}
      })
      .then(() => {
        console.log('req: ', req);
        var cookie = req.cookies.shortlyid.value;
        console.log('cookie: ', cookie);
        var options = {
         hash: cookie
        }
        models.Sessions.get(options)
        .then(result =>{
          console.log('result: ', result)
          //var sessionResult = result;
          req.session = {hash: {value: result.hash}};
          return result;
        })
        .then(result =>{
          if(result.userId){
            models.Users.get({id: result.userId})
            .then(user =>{
              req.session.user = {username: user.username}
              req.session.userId = user.id;
            })
            .error( err => {
              console.log('ERROR1:    ',err);
            })
          }
        })
      })
  .error( err =>{
    console.log('ERRO2:    ',err);
  })
      
      
    })
    .error( err => {
      console.log(err); 
    })
  }
  
  

  next();
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

