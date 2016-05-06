var main = function() {

var username;

    $("#loginmodal").on("click", function() {
         alert("Value: " + $("#loginmodal").val());

        $('#modal2').openModal();
        $("#log").on("click", function() {
            login();
        });

    });

    $("#newusermodal").on("click", function() {

        $('#modal1').openModal();
        $("#reg").on("click", function() {
            signup();
        });

    });

    $('#profile').on("click", function(){
      $('#homeContent').addClass('hide');
      $('#personalDetails').removeClass('hide');
    });

    $('#editFname').on("click", function(){
      $('#fNameTxt').addClass("hide");
      $('#fNamDiv').removeClass("hide");
    });

    $('#editLname').on("click", function(){
      $('#lNameTxt').addClass("hide");
      $('#LNamDiv').removeClass("hide");
    });

    $('#editAbtMe').on("click", function(){
      $('#abtMeTxt').addClass("hide");
      $('#abtMeDiv').removeClass("hide");
    });

    $('#editFavBok').on("click", function(){
      $('#favBokTxt').addClass("hide");
      $('#favBokDiv').removeClass("hide");
    });

    $(".dropdown-button").dropdown({hover: false});

};

$('#save').on("click", function(){
  updateUsrDetails(username);
});

function signup() {
    var fname = document.getElementById("firstName").value;
    var lname = document.getElementById("lastName").value;
    var email = document.getElementById("emailId").value;
    var name = document.getElementById("userName").value;
    var pwd = document.getElementById("password").value;

    var j = JSON.parse('{"username":"' + name + '","password":"' + pwd + '","firstname":"' + fname + '","lastname":"' + lname + '","email":"' + email + '"}');
    console.log(j);
    $('#userName').val("   ");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#emailId").val("");
    $("#password").val("");


    $.ajax({
        url: "http://localhost:3000/Signup",
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        data: JSON.stringify(j),
        success: function(data) {
            console.log(data.Attempt);
            if (data.Attempt === "success") {
                alert("Attempt : Sucessfully Registered");
               $('#modal1').closeModal();
                console.log("SUCCESS");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').text(name);
                //$('#usernameTitleBar').append("<i class='material-icons right'>arrow_drop_down</i>");
                $('#usernameTitleBar').removeClass('hide');
                getUserDetails(name);
            } else {
                alert("Attempt : Username Already Exists");
                console.log("FAILURE");

            }


        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

}

function login() {
    var name = document.getElementById("siuserName").value;
    var pwd = document.getElementById("sipassword").value;
    var j = JSON.parse('{"username":"' + name + '","password":"' + pwd + '"}');
    console.log(j);
    username = name;
    $('#siuserName').val("   ");
    $("#sipassword").val("");


    $.ajax({
        url: "http://localhost:3000/login",
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        data: JSON.stringify(j),
        success: function(data) {

            console.log(data.Attempt);
            if (data.Attempt == "success") {
                alert("Succesfully Logged In");
                $('#modal2').closeModal();
                //$("#loginmodal").text("Signout");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').text(username);
                $('#usernameTitleBar').removeClass('hide');
                getUserDetails(name);
                console.log("Success");
            }
            else {
                alert("Login Failed");
                console.log(" Login Failed");
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

function getUserDetails(username){
  var obj = JSON.parse('{"username":"'+username+'"}');

  $.ajax({
          url:'http://localhost:3000/userinfo/'+username,
          type: 'GET',
          dataType : "JSON",
          contentType : "Application/json",
          success: function(data){
             if(data != ""){
               var firstName = data.Attempt.firstname;
               var lastName = data.Attempt.lastname;
               var userName = data.Attempt.username;
               var email = data.Attempt.email;
               var abtMe = data.Attempt.aboutme;
               var favBok = data.Attempt.favourite;

               $('#fNameTxt').text(firstName);
               $('#fName').val(firstName);
               $('#lNameTxt').text(lastName);
               $('#lName').val(lastName);
               $('#uNameTxt').text(userName);
               $('#eMailTxt').text(email);
               $('#abtMeTxt').text(abtMe);
               $('#aboutMe').val(abtMe);
               $('#favBokTxt').text(favBok);
               $('#favBok').val(favBok);

             }
           },
          error: function(error) {
                console.log("Error getUserDetails!!");
          }
      });
}

function updateUsrDetails(username){
  alert("updateUsrDetails:"+username);
  var firstName = $('#fName').val();
  var lastName = $('#lName').val();
  var userName = $('#uNameTxt').val();
  var email = $('#eMailTxt').val();
  var abtMe = $('#aboutMe').val();
  var favBok = $('#favBok').val();
  var obj = JSON.parse('{"firstname" : "'+firstName+'","lastname" : "'+lastName+'","aboutme" : "'+abtMe+'","favourite" : "'+favBok+'"}');

  $.ajax({
          url:'http://localhost:3000/update/'+username,
          type: 'POST',
          datatype : "json",
          contentType : "Application/Json",
          data: JSON.stringify(obj),
          success: function(data){
           },
          error: function(error) {
          }
      });

}

$(document).ready(function() {
    main();
    $('.slider').slider({
        full_width: false
      });
});
