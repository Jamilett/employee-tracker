INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Sales Representative', 50000, 2),
('HR Manager', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, NULL),
('Charlie', 'Brown', 3, NULL);