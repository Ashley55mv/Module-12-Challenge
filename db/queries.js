const { Client } = require('pg');

class Database {
  constructor() {
    this.client = new Client({
      host: 'localhost',
      user: 'postgres',
      password: 'Smash',
      database: 'company_db'
    });
    this.client.connect();
  }

  async getAllDepartments() {
    const res = await this.client.query('SELECT * FROM departments');
    return res.rows;
  }

  async getAllRoles() {
    const res = await this.client.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id');
    return res.rows;
  }

  async getAllEmployees() {
    const res = await this.client.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                                         FROM employees
                                         LEFT JOIN roles ON employees.role_id = roles.id
                                         LEFT JOIN departments ON roles.department_id = departments.id
                                         LEFT JOIN employees manager ON manager.id = employees.manager_id`);
    return res.rows;
  }

  async addDepartment(name) {
    await this.client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  }

  async addRole(title, salary, department_id) {
    await this.client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  }

  async addEmployee(first_name, last_name, role_id, manager_id) {
    await this.client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  }

  async updateEmployeeRole(employee_id, role_id) {
    await this.client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  }

  close() {
    this.client.end();
  }
}

module.exports = Database;