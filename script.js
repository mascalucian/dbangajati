// User Class
class Users {
    constructor(id, poza, fname, lname, email, gender, date){
        this.id = id;
        this.poza = poza;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.gender = gender;
        this.date = date;
    }
}

// UI class
class UI {
    static displayUsers(){
        const users = Store.getUsers();

        users.forEach((user) => UI.addUserToList(user));
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td><img src=${user.poza} class='imgrotund'></img></td>
            <td>${user.fname}</td>
            <td>${user.lname}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.date}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteUser(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showNotification(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#user-form');
        container.insertBefore(div, form);

        // remove not in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // clear fields method
    static clearFileds(){
        document.querySelector('#id').value = '';
        document.querySelector('#poza').value = '';
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#date').value = '';
    }
}

// Store class
class Store {
    static getUsers(){
        let users;
        
        if(localStorage.getItem('users') === null){
            users = [];
        }else{
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user){
        const users = Store.getUsers();

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id){
        const users = Store.getUsers();

        users.forEach((user, index) => {
            if(user.id === id){
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Event to display users
document.addEventListener('DOMContentLoaded', UI.displayUsers);

// Event to add a user
document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const poza = 'img/lucian.jfif';
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const email = document.querySelector('#email').value;
    const gender = document.querySelector('#gender').value;
    const date = document.querySelector('#date').value;

    // Validate
    if(id === '' || fname === '' || lname === '' || email==='' || date===''){
        UI.showNotification('All fields are required!', 'danger');
    }else{
        // Instantiate user
        const user = new Users(id, poza, fname, lname, email, gender, date);

        // Add user to table
        UI.addUserToList(user);

        // Add user to storage
        Store.addUser(user);

        // Success not
        UI.showNotification('User added', 'success');

        // Clear form fields
        UI.clearFileds();

        // console.log(user);
    }
});

// Event to remove a user
document.querySelector('#user-list').addEventListener('click', (e) => {

    // delete user from UI
    UI.deleteUser(e.target);

    // delete user from storage
    Store.removeUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent)

    UI.showNotification('User Removed', 'success');
});