const readline = require('readline');
const inquirer = require('inquirer');
const { viewDepartments, db } = require('./lib/queries.js');
const ui = require('./lib/user_interface.js');
const chalk = require('chalk');

var reprompt = true;

// Create an instance of readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to move the cursor to the bottom of the terminal
const moveToBottom = () => {
  readline.cursorTo(process.stdout, 0, process.stdout.rows - 1);
};

// Function to render the UI at the bottom of the terminal
const renderUI = (uiText) => {
  // Move cursor to the bottom and clear the line
  moveToBottom();
  readline.clearLine(process.stdout, 0);

  // Log the UI text
  console.log(uiText);

  // Re-prompt the user input
  rl.prompt(reprompt);
};

// Prompt the user for input
/*  = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
    ])
    .then((answers) => {
      // Do something with the user's input
      const name = answers.name;
      renderUI(`Hello, ${name}!`);

      // Prompt the user again
      promptUser();
    });
};*/

const promptUser = () => {
  inquirer.prompt(ui).then(answer => {
  if (answer.options === 'Exit') {
      reprompt = false;
      return;
  }
  else if (answer.options === 'View all departments') {
      viewDepartments();
      //init();
  }
  //console.log(answer);
  promptUser();
}).catch((error) => {
  if (error) console.log(error)
});
};

// Configure the readline prompt
rl.prompt();
rl.setPrompt('');

// Handle the user input
rl.on('line', (line) => {
  // Handle any other logic for non-inquirer input
  console.log('Received input:', line);
  renderUI('Type something to continue...');
});

// Start the initial prompt
renderUI('Welcome to Employee Manager');
promptUser();
