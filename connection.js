import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

config();  // Cargar variables de entorno

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Función para ver todos los departamentos
export const getDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

// Función para ver todos los roles
export const getRoles = async () => {
    const result = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    return result.rows;
};

// Función para ver todos los empleados
export const getEmployees = async () => {
    const result = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
               COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return result.rows;
};

// Función para agregar un departamento
export const addDepartment = async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Función para agregar un rol
export const addRole = async (title, salary, department_id) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

// Función para agregar un empleado
export const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

// Función para actualizar el rol de un empleado
export const updateEmployeeRole = async (employee_id, role_id) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};