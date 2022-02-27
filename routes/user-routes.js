// Reference:
// For mongoose methods, see
// https://mongoosejs.com/docs/api/model.html
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');


router.post('/register',               // http://localhost:3001/user/
    function(req, res) {
        
        // Read the body of POST request
        const document = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password,
            "phone": req.body.phone 
        }

        // Create a new document in database
        UserModel
        .create(document)
        // If successful
        .then(
            function(dbDocument) {
                res.json(
                    {
                        document: dbDocument,
                        message: "User created"
                    }
                );
            }
        )
        // Otherwise
        .catch(
            function(dbError) {
                console.log('DB user create error', dbError);
                res.json(
                    {
                        message: "User create error"
                    }
                );
            }
        );        
    }
);

router.get('/all',                          // http://localhost:3001/user/
    function(req, res) {

        UserModel
        .find()
        .then(
            function(document) {
                res.send(document)
            }
        )
        .catch(
            function(dbError) {
                console.log('Error /user/all', dbError)
            }
        );

    }
);

router.put('/update',
    function(req, res) {

        // The search criteria
        const search = {_id: mongoose.Types.ObjectId(req.body._id)}

        // The replacement of the document
        const updatedDocument = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        }

        // This will tell MongoDB to show the updated document
        const options = {new: true}

        UserModel
        .findOneAndUpdate(
            search,
            updatedDocument,
            options
        )
        .then(
            function(updatedDocument) {
                res.send(updatedDocument);
            }
        )
        .catch(
            function(error) {
                console.log('Error /user/update', error);
            }
        )
    }
);


module.exports = router;