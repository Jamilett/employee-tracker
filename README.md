# Employee Management CLI

A command-line application for managing a company's employee database using **Node.js**, **Inquirer**, and **PostgreSQL**. This app allows the user to view and manage departments, roles, and employees in a company, providing an organized interface to keep track of company resources.

## Features
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role

## Technologies Used
- **Node.js**: JavaScript runtime for building the application
- **Inquirer**: A package for creating interactive command-line interfaces
- **PostgreSQL**: A powerful, open-source relational database management system to store data
- **dotenv**: A zero-dependency module to load environment variables from a `.env` file

## Prerequisites
Before you can run the application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **PostgreSQL** (installed and running)
- **psql CLI tool** (for database management)
- **NPM** (Node Package Manager)

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/employee-manager.git
cd employee-manager

### 2. Install dependencies
npm install

### 3. Configure environment variables
Create a .env file in the root directory of the project and add the following:
```bash
DB_USER=your_username
DB_HOST=localhost
DB_NAME=employee_db
DB_PASSWORD=your_password
DB_PORT=5432
```
### 4. Create the database
The app will connect to your PostgreSQL database and create the tables when it starts up. You do not need to manually create the database or tables unless you prefer doing so.
### 5. Run the application
```bash
npm run start:dev
npm run start:prod
```
### License
This project is licensed under the MIT License. See the LICENSE file for details.

#### Video Walkthrough

#### Contact
For any questions or feedback, please contact me at https://github.com/Jamilett.