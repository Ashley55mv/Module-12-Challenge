const inquirer = require('inquirer');
const Database = require('./db/queries');


const db = new Database();

function startApp() {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.close();
        break;
    }
  });
}

async function viewAllDepartments() {
  const departments = await db.getAllDepartments();
  console.table(departments);
  startApp();
}

async function viewAllRoles() {
  const roles = await db.getAllRoles();
  console.table(roles);
  startApp();
}

async function viewAllEmployees() {
  const employees = await db.getAllEmployees();
  console.table(employees);
  startApp();
}

function addDepartment() {
  inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  }).then(async answer => {
    await db.addDepartment(answer.name);
    console.log('Department added successfully');
    startApp();
  });
}

function addRole() {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]).then(async answers => {
    await db.addRole(answers.title, answers.salary, answers.department_id);
    console.log('Role added successfully');
    startApp();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the employee (leave blank if none):',
      default: null
    }
  ]).then(async answers => {
    await db.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
    console.log('Employee added successfully');
    startApp();
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then(async answers => {
    await db.updateEmployeeRole(answers.employee_id, answers.role_id);
    console.log('Employee role updated successfully');
    startApp();
  });
}

startApp();