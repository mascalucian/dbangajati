
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

// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });

//cum sa citesti o variabila din Firestore
// data.doc('0').get().then((doc) => {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

//cum sa setezi date in Firestore
// data.doc("useri").set({
//     fname: "San Francisco", lname: "CA", email: "USA",
//     gender: "Male", id: 860000,
//     date: ["west_coast", "norcal"] });

//citeste taote datele din colectie
// db.collection("users").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
// });

//sterge un doc
// iuseri.doc(user.toString()).delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });

class UI {

    static displayUsers(){
        
        users=[];
        users = Store.getUsers();
        setTimeout(() => {  nruseri=users.length;
            console.log(nruseri);
            if(filtruaplicat==1) {
                users=res;
            }
            if(filtruaplicat==2) {
                users=res;
            }
            
    
            users.forEach((user) => UI.addUserToList(user)); }, 1000);
        
    }

    static addUserToList(user) {
        const list = document.querySelector('#user-list');

        const row = document.createElement('tr');
        console.log(user.id);
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
        var useri=[];
        

        //  db.collection("useri").get().then((querySnapshot) => {
        //      querySnapshot.forEach((doc) => {
        //          //console.log(`${doc.id} => ${doc.data()}`);
        //          users.push(doc.data());
        //      });
        //  });
        
        // if(localStorage.getItem('users') === null){
        //     users = [];
        // }else{
            // users = JSON.parse(localStorage.getItem('users'));
        // }
        iuseri.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                useri.push(doc.data());
            });
        });
        
        return useri;
        
    }

    

    static addUser(user){
        const users = Store.getUsers();

        users.push(user);
        setTimeout(() => {
            iuseri.doc((users.length-1).toString()).set({
            fname: user.fname, lname: user.lname, email: user.email,
            gender: user.gender, id: user.id,
            date: user.date, poza: 'img/'+user.fname+'.jfif' });
        }, 1000);
        //localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(id){
        const users = Store.getUsers();

        // users.forEach((user, index) => {
            
        //     if(user.id == id){
        //         users.splice(index, 1);
                
        //     }
        // });
        setTimeout(() => {   
            iuseri.doc(id.toString()).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            }); }, 1000);
       
            
        

        //localStorage.setItem('users', JSON.stringify(users));
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
    const id = users.length;
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
    res=[];
// var data=eval(localStorage.users);

// var selected = [fgender];

// res = data.filter(({
//   gender
// }) => selected.includes(gender));
db.collection("useri").where("gender", "==", fgender)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            res.push(doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

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