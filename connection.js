import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

const dbName = 'employee_db';

const createDatabase = async () => {
    try {
        const checkDb = await pool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (checkDb.rowCount === 0) {
            await pool.query(`CREATE DATABASE ${dbName}`);
            console.log(`✔ Database "${dbName}" created successfully.`);
        } else {
            console.log(`✔ Database "${dbName}" already exists.`);
        }

        // Cerrar conexión inicial
        await pool.end();

        // Conectarse a la nueva base de datos para crear tablas
        const newPool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: dbName,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        // Crear tablas
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS department (
                id SERIAL PRIMARY KEY,
                name VARCHAR(30) UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS role (
                id SERIAL PRIMARY KEY,
                title VARCHAR(30) UNIQUE NOT NULL,
                salary DECIMAL NOT NULL,
                department_id INTEGER NOT NULL,
                CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS employee (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                role_id INTEGER NOT NULL,
                manager_id INTEGER,
                CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
                CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
            );
        `);

        console.log('✔ Tables created successfully.');

        // Poblar la base de datos con datos iniciales
        await newPool.query(`
            INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('HR')
            ON CONFLICT (name) DO NOTHING;

            INSERT INTO role (title, salary, department_id) VALUES
            ('Software Engineer', 80000, 1),
            ('Sales Representative', 50000, 2),
            ('HR Manager', 60000, 3)
            ON CONFLICT (title) DO NOTHING;

            INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
            ('Alice', 'Smith', 1, NULL),
            ('Bob', 'Johnson', 2, NULL),
            ('Charlie', 'Brown', 3, NULL)
            ON CONFLICT DO NOTHING;
        `);

        console.log('✔ Initial data inserted successfully.');

        await newPool.end();
    } catch (error) {
        console.error('❌ Error creating database:', error);
    }
};

// Ejecutar la función para crear la base de datos y las tablas
createDatabase();