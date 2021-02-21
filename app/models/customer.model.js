const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query(`INSERT INTO customers SET ?`, newCustomer, (err, res) => {
    if (err) {
      console.log(`error ${err}`);
      result(err, null);
      return;
    }

    newCustomer = { id: res.insertId, ...newCustomer };
    console.log(`created customer: `, newCustomer);
    result(null, newCustomer);
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log(`error ${err}`);
      result(err, null);
      return;
    }

    // not found Customer with the id
    if (!res.length) return result({ kind: `not_found` }, null);

    console.log(`found customer: `, res[0]);
    return result(null, res[0]);
  });
};

Customer.getAll = result => {
  sql.query(`SELECT * FROM customers`, (err, res) => {
    if (err) {
      console.log(`error ${err}`);
      result(err, null);
      return;
    }

    console.log(`customers: `, res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log(`error ${err}`);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) return result({ kind: `not_found` }, null);

      customer = { id: id, ...customer };
      console.log(`updated customer: `, customer);
      result(null, customer);
    }
  );
};

Customer.remove = (id, result) => {
  sql.query(`DELETE FROM customers WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error ${err}`);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) return result({ kind: `not_found` }, null);

    console.log(`deleted customer with id: `, id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query(`DELETE FROM customers`, (err, res) => {
    if (err) {
      console.log(`error ${err}`);
      result(err, null);
      return;
    }

    console.log(`deleted: ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
