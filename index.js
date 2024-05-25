import inquirer from 'inquirer';
class User {
    username;
    userid;
    password;
    constructor(username, userid, password) {
        this.username = username;
        this.userid = userid;
        this.password = password;
        console.log(password); // Yeh password ko console par print karta hai
    }
    static async Signup() {
        const answers = await inquirer.prompt([
            {
                name: 'username',
                message: 'Enter Your Username',
                type: 'input'
            },
            {
                name: 'userid',
                message: 'Enter Your User Email-ID',
                type: 'input'
            },
            {
                name: 'password',
                message: 'Enter Your Password',
                type: 'password',
                mask: '.',
                validate: function (input) {
                    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
                    if (passwordRegex.test(input)) {
                        return true;
                    }
                    else {
                        return 'Password must contain at least one number and one special character.';
                    }
                }
            }
        ]);
        return new User(answers.username, answers.userid, answers.password);
    }
    static async login(savedUsers) {
        const answers = await inquirer.prompt([
            {
                name: 'userid',
                message: 'Enter Your User Email-ID',
                type: 'input'
            },
            {
                name: 'password',
                message: 'Enter Your Password',
                type: 'password',
                mask: '*'
            }
        ]);
        const foundUser = savedUsers.find((user) => user.userid === answers.userid && user.password === answers.password);
        if (foundUser) {
            console.log(`Welcome back, ${foundUser.username}! Login successful.`);
        }
        else {
            console.log('Login failed: Invalid User ID or Password.');
        }
    }
}
class Admin {
    name;
    password;
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
    static add() {
        console.log("Add function executed.");
    }
    static remove() {
        console.log("Remove function executed.");
    }
    static delete() {
        console.log("Delete function executed.");
    }
    static async login() {
        const answers = await inquirer.prompt([
            {
                name: 'name',
                message: 'Enter Admin Name',
                type: 'input'
            },
            {
                name: 'password',
                message: 'Enter Admin Password',
                type: 'password',
                mask: '*'
            }
        ]);
        if (answers.name === 'Admin' && answers.password === 'Admin123') {
            console.log('Welcome Admin! Login successful.');
            await Admin.adminMenu();
        }
        else {
            console.log('Login failed: Invalid Admin Name or Password.');
        }
    }
    static async adminMenu() {
        const { action } = await inquirer.prompt([
            {
                name: 'action',
                message: 'Choose an action',
                type: 'list',
                choices: ['Add', 'Remove', 'Delete', 'Exit']
            }
        ]);
        switch (action) {
            case 'Add':
                Admin.add();
                break;
            case 'Remove':
                Admin.remove();
                break;
            case 'Delete':
                Admin.delete();
                break;
            case 'Exit':
                console.log('Exiting admin menu.');
                break;
        }
    }
}
(async () => {
    const users = [];
    // Sign up phase
    const newUser = await User.Signup();
    users.push(newUser);
    console.log('Signup successful!');
    // Ask for login type
    const { loginType } = await inquirer.prompt([
        {
            name: 'loginType',
            message: 'Would you like to login as a User or Admin?',
            type: 'list',
            choices: ['User Login', 'Admin Login']
        }
    ]);
    // Login phase based on selected type
    if (loginType === 'User Login') {
        if (users.length > 0) {
            console.log("WELCOME USER");
            await User.login(users);
        }
    }
    else if (loginType === 'Admin Login') {
        console.log("WELCOME ADMIN");
        await Admin.login();
    }
    console.log('Goodbye!');
})();
