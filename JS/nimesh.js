var main = function () {

    var username;

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

    $('#profile').on("click", function () {
        $('#homeContent').addClass('hide');
        $("#mainDiv").removeClass("hide");
        $('#personalDetails').removeClass('hide');
    });

    $('#editFname').on("click", function () {
        $('#fNameTxt').addClass("hide");
        $('#fNamDiv').removeClass("hide");
    });

    $('#editLname').on("click", function () {
        $('#lNameTxt').addClass("hide");
        $('#LNamDiv').removeClass("hide");
    });

    $('#editAbtMe').on("click", function () {
        $('#abtMeTxt').addClass("hide");
        $('#abtMeDiv').removeClass("hide");
    });

    $('#editFavBok').on("click", function () {
        $('#favBokTxt').addClass("hide");
        $('#favBokDiv').removeClass("hide");
    });

    $(".dropdown-button").dropdown({ hover: false });

};

$('#save').on("click", function () {
    updateUsrDetails(username);
});







function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 1 * 1 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {

        setCookie("username", nimesh, 365);
    }
}









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

                setCookie("username", name, 1);

                checkCookie();
                $('#modal1').closeModal();
                console.log("SUCCESS");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').text(name);
                //$('#usernameTitleBar').append("<i class='material-icons right'>arrow_drop_down</i>");
                $('#usernameTitleBar').removeClass('hide');
                getUserDetails(name);
                booksList("Success");
            } else {
                console.log("FAILURE");
            }
        },
        failure: function (errMsg) {
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
        success: function (data) {

            console.log(data.Attempt);
            if (data.Attempt == "success") {
                alert("Succesfully Logged In");

                setCookie("username", name, 1);

                checkCookie();
                $('#modal2').closeModal();
                //$("#loginmodal").text("Signout");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').text(username);
                $('#usernameTitleBar').removeClass('hide');
                getUserDetails(name);
                booksList("Success");
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
                $('#abtMeTxt').text(abtMe);
                $('#aboutMe').val(abtMe);
                $('#favBokTxt').text(favBok);
                $('#favBok').val(favBok);

            }
        },
        error: function (error) {
            console.log("Error getUserDetails!!");
        }
    });
}

function updateUsrDetails(username) {
    alert("updateUsrDetails:" + username);
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
        },
        error: function (error) {
        }
    });

}
function favBooks() {
    $("#mainDiv").addClass("hide");
}
function booksList(status) {
    if (status == "Success") {
        alert("Success");
        $("#test1").removeClass("hide");
        $("#mainDiv").addClass("hide");
        var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=harry+potter+stephen+king";
        $.getJSON(googleAPI, function (response) {
            // console.log("JSON Data: " + JSON.stringify(response.items[0]));
            var str = "";
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                str += "<li><div class=\"collapsible-header\">";
                if (item.volumeInfo.title) {
                    str += item.volumeInfo.title;
                }
                str += "</div><div class=\"collapsible-body\"><p><img class=\"materialboxed\" width=\"200\"";
                // if(item.volumeInfo.imageLinks){alert("hello"); console.log(item.imageLinks);}else{alert("zero");console.log(item.imageLinks);}

                if (item.volumeInfo.imageLinks) {
                    str += "src=" + item.volumeInfo.imageLinks.thumbnail + ">";
                } else {
                    str += "src=http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg>";
                }
                str += "</p></div></li>";
            }
            $("#test1 .collapsible").append(str);
            //  $('.collapsible').collapsible();
            //  setTimeout(function(){
            //      $('.collapsible').collapsible({
            //         accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            //     });
            //  },1000);
        });
    }
    else {
        // When cookie is implemented make sure you check for that value
        alert("Failed");
        $("#test1").addClass("hide");
        $("#mainDiv").removeClass("hide");
    }
}
$(document).ready(function () {
    main();
    $("#test1").addClass("hide"); 
    $('.slider').slider({
        full_width: false
    });
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});
