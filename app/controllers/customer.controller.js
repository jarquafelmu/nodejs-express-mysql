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
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || `Some error occured while creating the Customer.`
      });
    res.send(data);
  });
};

// Find a single Cutomer with a customerId
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`)
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      else
        res.status(500).send({
          message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    } else res.send(data);
  });
};

// Update a Customer indentified by the customerId in the request
exports.update = (req, res) => {
  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === `not_found`)
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        else
          res.status(500).send({
            message: `Error retrieving Customer with id ${req.params.customerId}.`
          });
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === `not_found`)
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      else
        res.status(500).send({
          message: `Error retrieving Customer with id ${req.params.customerId}.`
        });
    } else
      res.send({
        message: `Customer was deleted with id ${req.params.customerId}.`
      });
  });
};

// Delete all Customers from the database
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      return res.status(500).send({
        message:
          err.message || `Some error occured while creating the Customer.`
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
