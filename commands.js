#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
} = require("./index.js");

//customer adding questions
const questions = [
  { type: "input", name: "firstname", message: "Customer First Name" },
  { type: "input", name: "lastname", message: "Customer Last Name" },
  { type: "input", name: "phone", message: "Customer Phone " },
  { type: "input", name: "email", message: "Customer Email " },
];

program.version("1.0.0").description("Client Management System");

// program
//   .command("add <firstname> <lastname> <phone> <email>")
//   .alias("a")
//   .description("Add a customer")
//   .action((firstname, lastname, phone, email) => {
//     addCustomer({ firstname, lastname, phone, email });
//   });

program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => {
    findCustomer({ name });
  });

program
  .command("update <_id>")
  .alias("u")
  .description("Update details of existing customers")
  .action((_id) =>
    prompt(questions).then((answers) => updateCustomer(_id, answers))
  );

program
  .command("remove <_id>")
  .alias("r")
  .description("Remove an existing customer")
  .action((_id) => removeCustomer(_id));

program.parse(process.argv);
