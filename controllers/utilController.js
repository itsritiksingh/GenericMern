const Busboy = require('busboy');
const path = require('path');
var rimraf = require("rimraf");
const fs = require('fs');
const rand = require("crypto").randomBytes;
const bcrypt = require('bcrypt');

exports.upload = (req, res) => {
  let fileuuid = rand(8).toString('hex');
  fs.mkdirSync(path.join(".","views",fileuuid),{recursive:true});
  let _filename;
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename) {
    var saveTo = path.join('.', "views",fileuuid, filename);
    file.pipe(fs.createWriteStream(saveTo));
    _filename = filename;
  });
  busboy.on('finish', function () {
    res.send({key:fileuuid+"/"+_filename});
  });
  return req.pipe(busboy);

};

exports.removeUpload = (req, res) => {
  const { key } = req.body;
  rimraf(path.join('.',"views",key.split("/")[0]),()=>{return res.send("Ok");})
}

exports.checkToken =(req, res, next)=> {
  var { access_token, refresh_token } = req.headers;
  if (!access_token || !refresh_token) res.redirect("/");

  //check access token first
  jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) console.log(err);

    //then if access token expired check refresh token instead.
    if (!user) {
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) res.redirect("/");
        if (!user) return res.redirect("/");

        //if refresh token verified issue new access token
        access_token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: 3600 });
        res.set("access_token", access_token);
        next();
      });
    } else {
      next();
    }
  });
}


exports.hashpassword = (req,res,next)=>{
    req.body.password = bcrypt.hashSync(req.body.password,10);
    next();
 }

 //remove password
exports.addSelect = (req,res,next)=>{
    req.querymen.select.password=0;
    next();
}
