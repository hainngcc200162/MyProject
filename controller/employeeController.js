const express = require('express');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("Customer/addOrEdit", {
        viewTitle: "Insert Customer"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var Customer = new Customer();
    Customer.fullName = req.body.fullName;
    Customer.email = req.body.email;
    Customer.city = req.body.city;
    Customer.mobile = req.body.mobile;

    Customer.save((err, doc) => {
        if (!err) {
            res.redirect('Customer/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("Customer/addOrEdit", {
                    viewTitle: "Insert Customer",
                    Customer: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Customer.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('Customer/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("Customer/addOrEdit", {
                    viewTitle: 'Update Customer',
                    Customer: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Customer.find((err, docs) => {
        if (!err) {
            res.render("Customer/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("Customer/addOrEdit", {
                viewTitle: "Update Customer",
                Customer: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Customer/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                body['emailError'] = err.errors[field].message;
                break;

            default:
                break;
        }
    }
}

module.exports = router;