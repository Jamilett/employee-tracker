import inquirer from 'inquirer';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './db/queries.js';

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
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
        }
    ]);

    switch (action) {
        case 'View all departments':
            console.table(await getDepartments());
            break;

        case 'View all roles':
            console.table(await getRoles());
            break;

        case 'View all employees':
            console.table(await getEmployees());
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt([{ name: 'departmentName', message: 'Department name:' }]);
            await addDepartment(departmentName);
            console.log('Department added.');
            break;

        case 'Add a role':
            const { roleName, roleSalary, departmentId } = await inquirer.prompt([
                { name: 'roleName', message: 'Role title:' },
                { name: 'roleSalary', message: 'Role salary:' },
                { name: 'departmentId', message: 'Department ID for the role:' }
            ]);
            await addRole(roleName, roleSalary, departmentId);
            console.log('Role added.');
            break;

        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { name: 'firstName', message: 'Employee first name:' },
                { name: 'lastName', message: 'Employee last name:' },
                { name: 'roleId', message: 'Employee role ID:' },
                { name: 'managerId', message: 'Employee manager ID (if any):' }
            ]);
            await addEmployee(firstName, lastName, roleId, managerId || null);
            console.log('Employee added.');
            break;

        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { name: 'employeeId', message: 'Employee ID to update role:' },
                { name: 'newRoleId', message: 'New role ID for employee:' }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role updated.');
            break;

        case 'Exit':
            console.log('Exiting...');
            process.exit();
    }

    mainMenu();  // Recurse to show the menu again after an action
};

mainMenu();  // Start the app