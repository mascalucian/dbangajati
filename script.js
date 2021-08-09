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
filtruaplicat=0;
var res=[];
var nruseri=0;

class UI {

    static displayUsers(){
        
        
        var users = Store.getUsers();
        nruseri=users.length;
        if(filtruaplicat==1) {
            users=res;
        }
        if(filtruaplicat==2) {
            users=res;
        }
        
        

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

        //stergere avertizare dupa 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 4000);
    }

    static clearFileds(){
        // document.querySelector('#id').value = '';
        document.querySelector('#poza').value = '';
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#date').value = '';
    }
}

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
            
            if(user.id == id){
                users.splice(index, 1);
                
            }
            
        });

        localStorage.setItem('users', JSON.stringify(users));
    }
}

// event - arata useri in UI
document.addEventListener('DOMContentLoaded', UI.displayUsers);

//event - filtrare dupa gen 
document.querySelector('#filterform').addEventListener('submit', (e) => {
    e.preventDefault();
    const fgender = document.querySelector('#fgender').value;
    filtraregen(fgender)
})

//event - filtrare dupa data
document.querySelector('#filterform2').addEventListener('submit', (e) => {
    e.preventDefault();
    const datai = document.querySelector('#datai').value;
    const datas = document.querySelector('#datas').value;
    filtraredata(datai,datas)
})

// event - adauga un user
document.querySelector('#user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //const id = document.querySelector('#id').value;
    const id = users.length+1;
    const poza = 'img/'+document.querySelector('#poza').value+'.jfif';
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const email = document.querySelector('#email').value;
    const gender = document.querySelector('#gender').value;
    const date = document.querySelector('#date').value;


 // Validate
 if(id === '' || fname === '' || location === ''){
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
var users=Store.getUsers();

//Filtrare tabel
//in functie de gen:
function filtraregen(fgender) {
var data=eval(localStorage.users);
var selected = [fgender];

res = data.filter(({
  gender
}) => selected.includes(gender));
filtruaplicat=1;
for (i=0;i<nruseri;i++){
document.getElementById("table").deleteRow(-1);
}
UI.displayUsers();

console.log(res)
}

//in functie de data:
function filtraredata(datai,datas) {
    var data=eval(localStorage.users);
    res = data.filter(function(obj) {
        return obj.date >= datai && obj.date<=datas;
    });
    filtruaplicat=2;
    for (i=0;i<nruseri;i++){
    document.getElementById("table").deleteRow(-1);
    }
    UI.displayUsers();
    
    console.log(res)
    }

//reset filters
function resetfiltru() {
    filtruaplicat=0;
    for (i=0;i<res.length;i++){
        document.getElementById("table").deleteRow(-1);
        }
    UI.displayUsers();
}


// Event to remove a user
document.querySelector('#user-list').addEventListener('click', (e) => {

    // delete user from UI
    UI.deleteUser(e.target);

    // delete user from storage
    Store.removeUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)

    UI.showNotification('User Removed', 'success');
});