// get library
const { request } = require('express');
const express = require('express');
const port = 8000;
const app = express();


// user credential
const user = 'sumit';
const pass = 'st12345';

let mySession = false;

// parse form
app.use(express.urlencoded());

// db connection
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const bloodBank = require('./models/blood_bank');
const Doner = require('./models/doner');


// set up views and assets
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));

// routes and controller
app.get('/', function(req, res){
      return res.render("home");
});

app.get('/get-blood', function(req, res){
    bloodBank.find({}, function(err, bank){
        if(err){
            console.log(err);
            return;
        }
        return res.render('get_blood', {
            bank: bank
        });
     });
});

app.get('/doners', function(req, res){
    Doner.find({}, function(err, doner){
        if(err){
            console.log(err);
            return;
        }
        return res.render('doner', {
            doner: doner
        });
    });
});

// contact form
app.post('/send-contact', function(req, res){
     Contact.create({
         fname: req.body.fname,
         lname: req.body.lname,
         email: req.body.email,
         mobile: req.body.mobile,
         description: req.body.description
     }, function(err, newObj){
           if(err){
               console.log(`Error : ${err} unable to save`);
               return;
           }
           console.log(`*** ${newObj}`);
           res.redirect('back');
     });
});


// admin routes

app.get('/st-admin', function(req, res){
    if(mySession == false){
        return res.redirect('/login');
    }
    Contact.find({}, function(err, contact){
       if(err){
           console.log(`error: ${err}`);
           return;
       }
       return res.render('admin/index', {
           title: "user admin",
           contact: contact
       });
    });
});

// become doner and blood bank request
app.get('/be-doner', (req, res)=>{
      return res.render('become_doner');
});

// admin routes
app.get('/admin-doner', function(req, res){
    if(mySession == false){
        return res.redirect('/login');
    }
     Doner.find({}, function(err, doner){
         if(err){
             console.log(err);
             return;
         }
         return res.render('admin/doner', {
             doner: doner
         });
     });
});
app.get('/admin-bank', function(req, res){
    if(mySession == false){
        return res.redirect('/login');
    }
     bloodBank.find({}, function(err, bank){
        if(err){
            console.log(err);
            return;
        }
        return res.render('admin/bank', {
            bank: bank
        });
     });
});

// delete blood bank
app.get('/del-bank', function(req, res){
    if(mySession == false){
       return res.redirect('/login');
    }
    const id = req.query.id;
    bloodBank.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log('deleted!');
        res.redirect('back');
    });
});
// delete doner
app.get('/del-doner', function(req, res){
    if(mySession == false){
       return res.redirect('/login');
    }
    const id = req.query.id;
    Doner.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log('deleted!');
        res.redirect('back');
    });
});


// delete contact data
app.get('/del-contact', function(req, res){
    if(mySession == false){
       return res.redirect('/login');
    }
     const id = req.query.id;
     Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log(`error: ${err}`);
            return;
        }
        return res.redirect('back');
     });
});
// add blood bank
app.post('/add-blood-bank', function(req, res){
    if(mySession == false){
       return res.redirect('/login');
    }
      bloodBank.create({
         
          bbname: req.body.bbname,
          bbnumber: req.body.bbnumber,
          bbGroup: req.body.bbgroup
      }, function(err, newObj){
          if(err){
              console.log("Error ", err);
              return;
          }
          console.log(`*** ${newObj}`);
          res.redirect('back');
      });
});

// add doner
app.post('/add-doner', function(req, res){
    if(mySession == false){
       return res.redirect('/login');
    }
     Doner.create({
        donerName: req.body.donerName,
        donerMobile: req.body.donerMobile,
        bloodGroup: req.body.bloodGroup
     }, function(err, newObj){
         if(err){
             console.log(`error ${err}`);
             return;
         }
         console.log(`*** ${newObj}`);
         res.redirect('back');
     });
});



// login functionality
app.get('/login', function(req, res){
   return res.render('admin/login');
});

app.post('/login-send', function(req, res){
    if(user == req.body.user && pass == req.body.pass){
        mySession = true;
        return res.redirect('/st-admin');
    }else{
        return res.redirect('back');
    }
});

// logout functionality
app.get('/admin-logout', function(req, res){
     mySession = false;
    return res.redirect('/');
});



// test server
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Yup! Server is running on port: ${port}`);
    return;
});