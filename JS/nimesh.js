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

    
    
    $('#signout').on("click", function () {
         var currentuser = getCookie('username');
       // $('#userdropdown').addClass("hide");
       // $('#usernameTitleBar').addClass("hide");
       // $('#loginmodal').removeClass("hide");
       // $('#newusermodal').removeClass("hide");
        console.log("currentuser"+currentuser);
        deletecookie(currentuser);
        location.reload(true)
        console.log("currentuser"+currentuser);
        
    });
    
    
    
    
    $(".dropdown-button").dropdown({ hover: false });

};

$('#save').on("click", function () {
    updateUsrDetails(username);
});



$('#rel').on("click", function () {
    location.reload();
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



function deletecookie(name){
    console.log("deletecookie"+name);
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function addBook(name) {
    alert(name);
  var obj = JSON.parse('{"title" : "' + name + '"}');
  console.log(obj);
  var u=getCookie('username');
    
     $.ajax({
        url: 'http://localhost:3000/update_bookshelf/' +u,
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



//search code
document.getElementById('search').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        var bookname = $('#search').val();
        var obj = JSON.parse('{"bookname" :"' + bookname + '"}');

        $.ajax({
            url: "http://localhost:3000/books",
            type: "POST",
            dataType: "json",
            contentType: "Application/Json",
            data: JSON.stringify(obj),
            success: function (data) {
                console.log(data);
                if (data != null) {

                    console.log("SUCCESS");

                    console.log(data);
                    $("#list").empty();
                    $("#test1 .collapsible").empty();
                    $("#test1").removeClass("hide");
                    $("#mainDiv").addClass("hide");
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        //var itemm = "ntiesh";
                        
                        str += "<li><div class=\"collapsible-header\">";
                        if (item.title) {
                            str += item.title;
                        }
                        str += "</div><div id=\"bagColor\" class=\"collapsible-body\"><div class=\"col s6\"><img id=\"bookImg\" class=\"materialboxed\" width=\"200\"";
                        // if(item.volumeInfo.imageLinks){alert("hello"); console.log(item.imageLinks);}else{alert("zero");console.log(item.imageLinks);}

                        if (item.thumbnail) {
                            str += "src=" + item.thumbnail + ">";
                        } else {
                            str += "src=http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg>";
                        }
                        str += "</div><div class=\"col s6\" id=\"desc\">";
                        if (item.description) {
                            str += item.description;
                        } else {
                            str += "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
                        } 
                        if(item.averageRating==undefined){
                 item.averageRating=0;
             }
                        // str += "</p><a onClick=\"addBook(\'"+ item.volumeInfo.title+"');\" class=\"waves-effect waves-light btn\">Add to Favourite</a></div></li>";
                        str += "<br><br></div><p>Average Rating: "+item.averageRating+"</p><a onClick=\"addBook(\'" + item.title + "');\" class=\"waves-effect waves-light btn\">Add to Favourite</a></div></li>"
                    }
                    console.log(str);
                    $("#test1 .collapsible").append(str);
                    // onclick=\"addBook(\"" +item.id+ "\");\" 
                    //  $('.collapsible').collapsible();
                    //  setTimeout(function(){
                    //      $('.collapsible').collapsible({
                    //         accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    //     });
                    //  },1000);



                } else {
                    console.log("FAILURE");
                }
            },
            failure: function (errMsg) {
            }
        });

    }
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

                setCookie("username", name, 1);

               
                $('#modal1').closeModal();
                console.log("SUCCESS");
                $('#newusermodal, #loginmodal').addClass('hide');
                $('#usernameTitleBar').text(name);
                //$('#usernameTitleBar').append("<i class='material-icons right'>arrow_drop_down</i>");
                $('#usernameTitleBar').removeClass('hide');
                var u=getCookie('username');
                getUserDetails(u);
                booksList();
            } else {
                console.log("FAILURE");
                $("#errorAlertuname").removeClass("hide");
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
                name=getCookie('username');
                console.log("second time"+name);
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
                $("#modalsigninerror").removeClass("hide");
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
                var bookshelf=data.Attempt.bookshelf;
                console.log("b"+bookshelf);

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
                $('#showuser_bshelf').text(bookshelf);

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
    
     var currentuser = getCookie('username');
    
    

    $.ajax({
        url: "http://localhost:3000/favbookuser/" + currentuser,
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        success: function (data) {

            console.log(data.Attempt);
            if (data) {
            
                $("#test4 .collapsible").empty();
                var str="";
                 for (var i = 0; i < data.Attempt.length; i++) {
                var item = data.Attempt[i];

                str += "<li><div class=\"collapsible-header\">";
                if (item.title) {
                    str += item.title;
                }
                str += "</div><div id=\"bagColor\" class=\"collapsible-body\"><div class=\"col s6\"><img id=\"bookImg\" class=\"materialboxed\" width=\"200\"";
                // if(item.volumeInfo.imageLinks){alert("hello"); console.log(item.imageLinks);}else{alert("zero");console.log(item.imageLinks);}

                if (item.imageLinks) {
                    str += "src=" + item.imageLinks.thumbnail + ">";
                } else {
                    str += "src=http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg>";
                }
                str += "</div><div class=\"col s6\" id=\"desc\">";
                if (item.description) {
                    str += item.description;
                } else {
                    str += "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                }
                      if(item.averageRating==undefined){
                 item.averageRating=0;
             }
                        
                        str += "<p>Average Rating : "+item.averageRating+"</p>"
               
            }
                
            console.log(str);
            $("#test4 .collapsible").append(str);
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                
                
            }
            else {
                
                console.log(" Noo books");
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

    
    
}
function booksList() {
    var user = getCookie("username");
   
        $("#test1 .collapsible").empty();
        $("#test1").removeClass("hide");
        $("#mainDiv").addClass("hide");
        var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
        $.getJSON(googleAPI, function (response) {
            // console.log("JSON Data: " + JSON.stringify(response.items[0]));
            var str = "";
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];

                str += "<li><div class=\"collapsible-header\">";
                if (item.volumeInfo.title) {
                    str += item.volumeInfo.title;
                }
                str += "</div><div id=\"bagColor\" class=\"collapsible-body\"><div class=\"col s6\"><img id=\"bookImg\" class=\"materialboxed\" width=\"200\"";
                // if(item.volumeInfo.imageLinks){alert("hello"); console.log(item.imageLinks);}else{alert("zero");console.log(item.imageLinks);}

                if (item.volumeInfo.imageLinks) {
                    str += "src=" + item.volumeInfo.imageLinks.thumbnail + ">";
                } else {
                    str += "src=http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg>";
                }
                str += "</div><div class=\"col s6\" id=\"desc\">";
                if (item.volumeInfo.description) {
                    str += item.volumeInfo.description;
                    
                  
                } else {
                    str += "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                }
                
                
                
                //using isbn display book
              //  str+="<div class=\"card-action\" id=\"preview\">";
              // str+="<script> GBS_insertPreviewButtonPopup('ISBN:9780198250548');</script>";
                
                if(user){
                    
                     if(item.volumeInfo.averageRating==undefined){
                 item.volumeInfo.averageRating=0;
             }
                       
                        str += "<br><br></div><p>Average Rating: "+item.volumeInfo.averageRating+"</p><a onClick=\"addBook(\'" + item.volumeInfo.title + "');\" class=\"waves-effect waves-light btn\">Add to Favourite</a></div></li>"
                    
                }
            }
            console.log(str);
            $("#test1 .collapsible").append(str);
            // onclick=\"addBook(\"" +item.id+ "\");\" 
            //  $('.collapsible').collapsible();
            //  setTimeout(function(){
            //      $('.collapsible').collapsible({
            //         accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            //     });
            //  },1000);
        });
    
    
}

 

function genresType() {
    $("#test2").removeClass("hide");
    $("#mainDiv").addClass("hide");
    $("#details_view").empty();
}
function detailBook(id) {

}
function follow(uname) {
    var currentuser = getCookie('username');
    var j = JSON.parse('{"follow":"' + uname + '"}');
    console.log(j);

    $.ajax({
        url: "http://localhost:3000/follow/" + currentuser,
        type: "POST",
        dataType: "json",
        contentType: "Application/Json",
        data: JSON.stringify(j),
        success: function (data) {

            console.log(data);
            if (data) {
                alert("Succesfully followed");

                $('#btn-follow').text("done");

                console.log("Success");
            }
            else {
                alert("follow Failed");
                console.log(" follow Failed");
            }
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });

}
function back1(){
    $('#personalDetails').addClass("hide");
    $('#homeContent').removeClass("hide");
}
//follow users
function people() {
    var user = getCookie("username");
    if (user) {
        $.ajax({
            url: "http://localhost:3000/allusers",
            type: "GET",
            dataType: "json",
            contentType: "Application/Json",
            success: function (data) {

                var data2=data;

                console.log(data);
                if (data != null) {

                    $("#test3").removeClass("hide");
                    $("#mainDiv").addClass("hide");
                    $("#test3 .collection").empty();

                    var str = "";
                    var uname = getCookie('username');
                    console.log(uname);

                    for (var i = 0; i < data.length; i++) {

                        var item = data[i];
                        if (item.username != uname) {

                            str += "<li class=\"collection-item avatar people col s6 offset-s3\"><br>";

                            str += "<img src=\"images/user.png\" alt=\"no display image\" class=\"circle\">";

                            str += "<span class=\"title\">";

                            if (item.firstname != null || item.lastname != null) {
                                str += item.firstname + "  " + item.lastname;
                            }
                            str += "</span><p>";
                            str += item.username;
                            if (item.favourite != "") {
                                str += "<br><br>Favorite Books: " + item.favourite + "</p>";
                            }
                            for(var k=0;k<data2.length;k++){
                                if(data2[k].username==uname){

                                    console.log(data2[k]);
                                    console.log(data2[k].follow.length);
                                    if(data2[k].follow.length!=0){
                                    for(var j=0;j<data2[k].follow.length;j++){
                                    if(item.username==data2[k].follow[j]){
                                        str+="<br><br>Bookshelf: " + item.bookshelf + "</p>";
                                        str += "<a class=\"waves-effect waves-light btn right\" onClick=\"follow(\'" + item.username + "');\"><i id=\"btn-follow\" class=\"material-icons left\">done</i>follow</a><br><br></li>";
                                        console.log("following");
                                    }else{
                                        console.log("not following");
                                        str += "<a class=\"waves-effect waves-light btn right\" onClick=\"follow(\'" + item.username + "');\"><i id=\"btn-follow\" class=\"material-icons left\"></i>follow</a><br><br></li>";
                                    }
                                    }
                                }else{
                                    str += "<a class=\"waves-effect waves-light btn right\" onClick=\"follow(\'" + item.username + "');\"><i id=\"btn-follow\" class=\"material-icons left\"></i>follow</a><br><br></li>";

                                }

                                }
                            }

                        }
                    }
                    console.log(str);
                    $("#test3 .collection").append(str);
                    console.log("Success");
                }
                else {
                    alert("follow list Failed");
                    console.log(" follow list Failed");
                }
            },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });
    } else {
        $("#test3").addClass("hide");
        $("#mainDiv").removeClass("hide");
    }


}

function find(type) {
    $("#details_view").empty();
    var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=" + type;
    $.getJSON(googleAPI, function (response) {
        // console.log("JSON Data: " + JSON.stringify(response.items[0]));
        var str = "";
        for (var i = 0; i < response.items.length; i++) {
            var item = response.items[i];

            str += "<li><div class=\"collapsible-header\">";
            if (item.volumeInfo.title) {
                str += item.volumeInfo.title;
            }
            str += "</div><div id=\"bagColor\" class=\"collapsible-body\"><div class=\"col s6\"><img id=\"bookImg\" onClick=\"detailBook(\'" + item.id + "');\" class=\"materialboxed\" width=\"200\"";
            // if(item.volumeInfo.imageLinks){alert("hello"); console.log(item.imageLinks);}else{alert("zero");console.log(item.imageLinks);}

            if (item.volumeInfo.imageLinks) {
                str += "src=" + item.volumeInfo.imageLinks.thumbnail + ">";
            } else {
                str += "src=http://th01.deviantart.net/fs70/PRE/i/2013/126/1/e/nature_portrait_by_pw_fotografie-d63tx0n.jpg>";
            }
            str += "</div><div class=\"col s6\" id=\"desc\">";
            if (item.volumeInfo.description) {
                str += item.volumeInfo.description;
            } else {
                str += "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
            }
              if(item.volumeInfo.averageRating==undefined){
                 item.volumeInfo.averageRating=0;
             }
                        
                        str += "<br><br></div><p>Average Rating: "+item.volumeInfo.averageRating+"</p><a onClick=\"addBook(\'" + item.volumeInfo.title + "');\" class=\"waves-effect waves-light btn\">Add to Favourite</a></div></li>"
        }
        console.log(str);
        $("#details .collapsible").append(str);
        // onclick=\"addBook(\"" +item.id+ "\");\" 
        //  $('.collapsible').collapsible();
        //  setTimeout(function(){
        //      $('.collapsible').collapsible({
        //         accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        //     });
        //  },1000);
    });
}
$(document).ready(function () {
    $('.carousel').carousel({ full_width: true });
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
