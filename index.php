<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Angajati- Masca Lucian</title>
    <script src=
"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
    </script>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    <div class="inputdedate">
        <form id="form" method="post" class="inputform">
            <div class="name">
                <label for="fname">
                    First name:
                </label>
                <input type="text" id="fname" name="fname"><br><br>
                <label for="lname">
                    Last name:
                </label>
                <input type="text" id="lname" name="lname">
            </div>
            <div class="emailgender">
                <label for="email">
                    E-mail:
                </label>
                <input type="email" id="email" name="email"><br><br>
                <label for="gender">
                    Gender:
                </label>
                <select id="gender" name="gender">
                    <option value="male">
                        Male
                    </option>
                    <option value="female">
                        Female
                    </option>
                </select>
            </div>
            <div class="nasterepoza">
                <label for="date">
                    Birth date:
                </label>
                <input type="date" id="date" name="date"><br><br>
                <label for="poza">
                    Poza:
                </label>
                <input type='file' id="poza" name="poza"/>
                <!--<br><img id="poza" src="#">-->
            </div>
            <div class="submit1">
                <input type="submit" value="Submit">
            </div>
        </form>      
    </div>
    <p id="log"></p> 
   
   <div class="tabel">
    <br><br>
      
    <table id="table" align = "center" border="1px"></table>

      
   
    <script  src="node_modules/file-saver/dist/FileSaver.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    <script src="app.js"></script>
    </div>  
    
    
    <script>
        window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
      }
  });
});
    </script>





  
</body>
</html>