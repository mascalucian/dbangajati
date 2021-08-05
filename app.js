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
              
            // Adding the data to the table
            for (var i = 0; i < data.length; i++) {
                  
                // Create a new row
                trow = table.insertRow(-1);
                for (var j = 0; j < cols.length; j++) {
                    var cell = trow.insertCell(-1);
                      
                    // Inserting the cell at particular place
                    
                 cell.innerHTML = data[i][cols[j]];
                }
            }
              
            // Add the newely created table containing json data
            var el = document.getElementById("table");
            el.innerHTML = "";
            el.appendChild(table);
        }    
        var count=4;


        function logSubmit(event) {
            log.textContent = `Form Submitted!`;
            event.preventDefault();
            data.push({
                key:   "First Name",
                value: document.querySelector('#fname').value
            });
            trow = table.insertRow(-1);
                for (var j = 0; j < 6; j++) {
                    var cell = trow.insertCell(-1);
                    
                    if (j==1){cell.innerHTML = document.querySelector('#fname').value;}
                    if (j==2){cell.innerHTML = document.querySelector('#lname').value;}
                    if (j==3){cell.innerHTML = document.querySelector('#email').value;}
                    if (j==4){cell.innerHTML = document.querySelector('#gender').value;}
                    if (j==5){cell.innerHTML = document.querySelector('#date').value;}
                    
                    
                }



          }
          
          const form = document.getElementById('form');
          const log = document.getElementById('log');
          form.addEventListener('submit', logSubmit);
