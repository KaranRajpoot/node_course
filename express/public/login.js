function login_clicked(){
 var txt_email = document.getElementById('txt_email').value;
 var txt_password = document.getElementById('txt_password').value;
 // alert(txt_email + "\n" + txt_password);
         $.ajax({
               type: 'POST',
               url: '/loginUser',
               dataType: "json",
               contentType: "application/json",
               cache: false,
               timeout: 5000,
               data: JSON.stringify({email:txt_email,passowrd:txt_password}),
               success: function(data) {
                   console.log(`User result:${data}`);
                   window.location = "/about.html";
               },
               error: function(err){
                 console.log(err.responseText);
                 var result = JSON.parse(err.responseText);
                 if (result.errorcode === 105){
                 alert('Invalid credentials');
                 }
                 else {
                   alert('No output');
                 }
               }

           });
}
