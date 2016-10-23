var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongMembrane = mongoose.model('Membrane')

//Params
// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongMembrane.findById(id, function (err, membrane) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next(); 
        } 
    });
});

//GET returns all
router.get('/', function(req,res, next){
	mongMembrane.find(function(err, membranes){
		if(err){return next(err)}
		res.json(membranes);
	});
})

//GET id
router.route('/:id')
	.get(function(req, res){
		mongMembrane.findById(req.id, function(err, membrane){
			if(err){
				console.log('GET error: There was a problem retrieving: '+err);
			} else {
				console.log("GET retrieving ID: "+req.id)
				res.json(membrane)
			}
		})
	})

//POST
router.post('/', function(req, res, next) {
  var membrane = mongMembrane.create(req.body, function (err, membrane) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new membrane: ' + membrane);
                        res.json(membrane);
              }
        })
});

module.exports = router;