const parseCookies = (req, res, next) => {
  //console.log('req: ', req);
  if(req.headers.cookie === undefined){
    next();
    return;
  }
  console.log('cookie: ', req.headers);
  // console.log('res: ', res);
  //req.cookies = req.headers;
  //var cookie = req.cookie
  //JSON.parse(req.)
  //return 
  

  var cookieStrings = req.headers.cookie;
  var cookieStringsArr = cookieStrings.split(';');
  cookieStringsArr.forEach((cookieString)=>{
    var kv = cookieString.split('=');
    var key = kv[0].trim();
    var value = kv[1];
    req.cookies[key] =  value;
  })
  next();
  
};

module.exports = parseCookies;