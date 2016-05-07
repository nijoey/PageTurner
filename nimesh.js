var username;
var main = function () {

    $("#loginmodal").on("click", function () {
        $('#modal2').openModal();
        $("#log").on("click", function () {
            login();
        });
    });

    $("#newusermodal").on("click", function () {
        $('#modal1').openModal();
        $("#reg").on("click", function () {
            signup();
        });
    });

    $('#profile').on("click", function(){
      $('#homeContent').addClass('hide');
      $('#personalDetails').removeClass('hide');
    });

    $('#backProfile').on("click", function(){
      $('#personalDetails').addClass('hide');
      $('#homeContent').removeClass('hide');
    });


    $('#editFname').on("click", function(){
      $('#fNameTxt').addClass("hide");
      $('#fNamDiv').removeClass("hide");
      $('#save').removeClass("disabled");
    });

    $('#editLname').on("click", function(){
      $('#lNameTxt').addClass("hide");
      $('#LNamDiv').removeClass("hide");
      $('#save').removeClass("disabled");
    });

    $('#editAbtMe').on("click", function(){
      $('#abtMeTxt').addClass("hide");
      $('#abtMeDiv').removeClass("hide");
      $('#save').removeClass("disabled");
    });

    $('#editFavBok').on("click", function(){
      $('#favBokTxt').addClass("hide");
      $('#favBokDiv').removeClass("hide");
      $('#save').removeClass("disabled");
    });
};

$('#save').on("click", function () {
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
        success: function (data) {
            console.log(data.Attempt);
            if (data.Attempt === "success") {
                alert("Attempt : Sucessfully Registered");
                $('#modal1').closeModal();
                console.log("SUCCESS");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').removeClass('hide');
                $('#usernameTitleBar').append(name);
                getUserDetails(name);
            } else {
                alert("Attempt : Username Already Exists");
                console.log("FAILURE");

            }


        },
        failure: function (errMsg) {
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
    $('#siuserName').val("");
    $("#sipassword").val("");


    $.ajax({
        url: "http://localhost:3000/login",
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        data: JSON.stringify(j),
        success: function (data) {

            console.log(data.Attempt);
            if (data.Attempt == "success") {
                alert("Succesfully Logged In");
                $('#modal2').closeModal();
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').append(username);
                $('#usernameTitleBar').removeClass('hide');
                getUserDetails(name);
                console.log("Success");
            }
            else {
                alert("Login Failed");
                console.log(" Login Failed");
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getUserDetails(username) {
    var obj = JSON.parse('{"username":"' + username + '"}');

    $.ajax({
        url: 'http://localhost:3000/userinfo/' + username,
        type: 'GET',
        dataType: "JSON",
        contentType: "Application/json",
        success: function (data) {
            if (data != "") {
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


                if(abtMe == " "){
                  $('#abtMeTxt').text("Tell us about yourself...");
                  $('#abtMeTxt').css({"color" : "grey"});
                }
                else{
                  $('#abtMeTxt').text(abtMe);
                  $('#aboutMe').val(abtMe);
                }

                if(favBok == " "){
                  $('#favBokTxt').text("What are your favorite reads...?");
                  $('#favBokTxt').css({"color" : "grey"});
                }
                else{
                  $('#favBokTxt').text(favBok);
                  $('#favBok').val(favBok);
                }

            }
        },
        error: function (error) {
            console.log("Error getUserDetails!!");
        }
    });
}

function updateUsrDetails(username) {
    var firstName = $('#fName').val();
    var lastName = $('#lName').val();
    var userName = $('#uNameTxt').val();
    var email = $('#eMailTxt').val();
    var abtMe = $('#aboutMe').val();
    var favBok = $('#favBok').val();
    var obj = JSON.parse('{"firstname" : "' + firstName + '","lastname" : "' + lastName + '","aboutme" : "' + abtMe + '","favourite" : "' + favBok + '"}');

    $.ajax({
        url: 'http://localhost:3000/update/' + username,
        type: 'POST',
        datatype: "json",
        contentType: "Application/Json",
        data: JSON.stringify(obj),
        success: function (data) {
          $('#fNameTxt').text(firstName);
          $('#fName').addClass('hide');
          $('#fNameTxt').removeClass('hide');
          $('#lNameTxt').text(lastName);
          $('#lName').addClass('hide');
          $('#lNameTxt').removeClass('hide');
          $('#abtMeTxt').text(abtMe);
          $('#aboutMe').addClass('hide');
          $('#abtMeTxt').removeClass('hide');
          $('#favBokTxt').text(favBok);
          $('#favBok').addClass('hide');
          $('#favBokTxt').removeClass('hide');
          $('.banner').removeClass('hide');
          $('.banner').css({"font-size": "1.3rem", "color": "#2bbbad", "text-align":"center"});
          $('.banner').delay(7000).fadeOut('slow');
        },
        error: function (error) {
          console.log("error updateUsrDetails");
        }
    });

}
function favBooks() {
    $("#mainDiv").addClass("hide");
}
function booksList() {
    $("#mainDiv").removeClass("hide");
}
function genresType() {
    $("#mainDiv").removeClass("hide");
}
function people() {
    $("#mainDiv").removeClass("hide");
}
$(document).ready(function () {
    main();
    $("#mainDiv").addClass("show");
    $('.slider').slider({
        full_width: false
    });
    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});
