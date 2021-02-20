const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Content cannot be empty!`
    });
  }

  // Create  a customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || `Some error occured while creating the Customer.`
      });
    res.send(data);
  });
};

// Retreive all Customers from the database
exports.findAll = (req, res) => {};

// Find a single Cutomer with a customerId
exports.findOne = (req, res) => {};

// Update a Customer indentified by the customerId in the request
exports.update = (req, res) => {};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {};

// Delete all Customers from the database
exports.deleteAll = (req, res) => {};
