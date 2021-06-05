const mongoose = require("mongoose");

//map global promises - to get rid of warinings;
mongoose.Promise = global.Promise;

//Connect to DB
const db = mongoose.connect("mongodb://localhost:27017/customerCli", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Import Customer Schema:
const Customer = require("./models/customer");

//Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    mongoose.connection.close();
  });
};

//Find Customer
const findCustomer = (name) => {
  //make name caseInsensitive
  const searchKey = new RegExp(name, "i");
  Customer.find({
    $or: [{ firstname: searchKey }, { lastname: searchKey }],
  }).then((customer) => {
    console.info(customer);
    console.info(`${customer.length} matches`);
    mongoose.connection.close();
  });
};

//Update Customer
const updateCustomer = (_id, customer) => {
  Customer.updateOne({ _id }, customer).then((customer) => {
    if (customer.n === 1) {
      console.info("Customer is updated");
    } else {
      console.info(
        "Customer cant be updated. Seems like the customer does not exists"
      );
    }
    mongoose.connection.close();
  });
};

//Remove Customer
const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((customer) => {
    if (customer.n === 1) {
      console.info(" Customer is removed");
    } else {
      console.info(
        "Customer can't be removed. Seems like the customer does not exists"
      );
    }

    mongoose.connection.close();
  });
};

//Export Methods
module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
};
