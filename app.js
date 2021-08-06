let tablou=document.getElementsByClassName("table table-striped table-hover");


function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
}


var data = JSON.parse(loadFile('db.json'));


/*let tablou=document.getElementById('tablou');
for (row=0;row<=data.length;row++){
    let rand=tablou.insertRow();
    data[row].forEach(el=>
        {
        let elem=rand.insertCell();
        elem.innerHTML=el;
    })
} */

var el_up = document.getElementById("GFG_UP");
          
        
          
        /*el_up.innerHTML = "Click on the button to create the "
                + "table from the JSON data.<br><br>" 
                + JSON.stringify(data[0]) + "<br>" 
                + JSON.stringify(data[1]) + "<br>" 
                + JSON.stringify(data[2]);   */
    GFG_FUN()
          
        function GFG_FUN() {
            var cols = [];
            var count=0;
              
            for (var i = 0; i < data.length; i++) {
                for (var k in data[i]) {
                    if (cols.indexOf(k) === -1) {
                          
                        // Push all keys to the array
                        cols.push(k);
                    }
                }
            }
              
            // Create a table element
            var table = document.createElement("table");
            
              
            // Create table row tr element of a table
            var tr = table.insertRow(-1);
              
            for (var i = 0; i < cols.length; i++) {
                  
                // Create the table header th element
                var theader = document.createElement("th");
                theader.innerHTML = cols[i];
                  
                // Append columnName to the table row
                tr.appendChild(theader);
            }
            var theader = document.createElement("th");
                theader.innerHTML = "Delete User";
                tr.appendChild(theader)
            
            
              
            // Adding the data to the table
            for (var i = 0; i < data.length; i++) {
                  
                // Create a new row
                trow = table.insertRow(-1);
                for (var j = 0; j <= cols.length; j++) {
                    var cell = trow.insertCell(-1);
                      
                    // Inserting the cell at particular place
                    if (j==1) {
                        var img = document.createElement('img');
                        img.src = 
                        data[i][cols[j]];
                        img.className='imgrotund';
                        cell.appendChild(img);
                    }
                    else if (j==7) {
                        var xbutton= document.createElement('button');
                        xbutton.className='xbtn';
                        xbutton.onclick= function(){delete_user(count);count++;}
                        xbutton.innerHTML='<img class="xbutton" src="img/x.png"/>';
                        cell.appendChild(xbutton);
                    }
                    else cell.innerHTML = data[i][cols[j]];
                }
                
            }
              
            // Add the newly created table containing json data
            var el = document.getElementById("table");
            el.innerHTML = "";
            el.appendChild(table);
        }    
        

        function delete_user(nr) {
            if (confirm('Are you sure you want to delete '+data[nr]["First Name"]+'?')) {
                deluser(nr)
                console.log('User deleted.');
              } else {
                
                console.log('User not deleted.');
              }
        }
        function deluser(nr) {
            console.log('no');
        }
       
        function logSubmit(event) {
            
            event.preventDefault();

            var dictionar = {
                "User ID": count,
                "Profile Picture": '/img/laszlo.jfif',
                "First Name": document.querySelector('#fname').value,
                "Last Name": document.querySelector('#lname').value,
                "E-mail": document.querySelector('#email').value,
                "Gender": document.querySelector('#gender').value,
                "Birth Date": document.querySelector('#date').value
            };
            var content="new="+dictionar;

          }
          
          const form = document.getElementById('form');
          const log = document.getElementById('log');
          form.addEventListener('submit', logSubmit);
