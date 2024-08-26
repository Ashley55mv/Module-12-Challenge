-- Insert departments
INSERT INTO departments (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Accountant', 60000, 2),
('HR Manager', 70000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Jiminy', 'Cricket', 1, NULL),
('Alexis', 'Macgillicutty', 2, NULL),
('Terrence', 'Vanderawful', 3, NULL),
('Theo', 'Worst', 1, 1);