<!-- These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
    //               alert('auth.login event');
                   });

FB.Event.subscribe('auth.logout', function(response) {
     //              alert('auth.logout event');
                   });

FB.Event.subscribe('auth.sessionChange', function(response) {
     //              alert('auth.sessionChange event');
                   });

FB.Event.subscribe('auth.statusChange', function(response) {
     //              alert('auth.statusChange event');
                   });

/*function getSession() {
 alert("session: " + JSON.stringify(FB.getSession()));
 }
 */
function getLoginStatus() {
    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                      alert('logged in');
                      } else {
                      alert('not logged in');
                      }
                      });
}
var friendIDs = [];
var fdata;
function me() {
    FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
           if (response.error) {
           alert(JSON.stringify(response.error));
           } else {
           var data = document.getElementById('data');
           fdata=response.data;
           console.log("fdata: "+fdata);
           response.data.forEach(function(item) {
                                 var d = document.createElement('div');
                                 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                 data.appendChild(d);
                                 });
           }
           var friends = response.data;
           console.log(friends.length);
           for (var k = 0; k < friends.length && k < 200; k++) {
           var friend = friends[k];
           var index = 1;
           
           friendIDs[k] = friend.id;
           //friendsInfo[k] = friend;
           }
           console.log("friendId's: "+friendIDs);
           });
}

function logout() {
    FB.logout(function(response) {
              alert('logged out');
              });
}
function handleStatusChange(response) {
    if (response.authResponse) {
        //console.log(response);
        updateUserInfo(response);
    } else {
        console.log(response);
    }
}
function updateUserInfo(response) {
    FB.api('/me',
           {fields:"name,first_name,picture"},
           function(response) {
           //console.log(response);
           $("#fb_profile_image").attr("src", response.picture.data.url);
           $("#fb_profile_detail_image").attr("src", response.picture.data.url);
           });
}
var user_email = "jakub.kuchar@hotmail.com";
var user_token = "";
var user_first_name = "";
var user_last_name = "";
var user_username = "";
function login() {
//  $.mobile.changePage("#games", {transition: "slide"});
//    return;
   // $("#login-first").popup("close");
 //   if($("#terms").prop("checked") == false)
//        return;
    
    FB.login(
             function(response) {
             if (response.status == "connected") {
             FB.api("/me",  function(response) {
                    if (response.error) {
                    console.log(response.error);
                    }
                    else {  //first_name":"Jin","last_name
                    //console.log(response);
                    //console.log(response.email);
                    user_first_name = response.first_name;
                    user_last_name = response.last_name;
                    user_username= response.username;
                    user_email = response.email;
                //    console.log(response.id);
                   $.ajax({ type:"POST", beforeSend: function (request) { request.setRequestHeader("Accept", "application/json");request.setRequestHeader("Content-Type", "application/json"); }, url: "http://ec2-54-220-53-82.eu-west-1.compute.amazonaws.com:8080/mobile/facebook/register", data: '{"provider":"facebook", "uid":\"'+response.id+'\"}', processData: false, success: function(msg) {
                          if(msg.notice == "user authenticated")
                          {
                          user_email = msg.email;
                          user_token = msg.token;
                          }else{
                          alert("Unregistered user.");
                          }
                          $.mobile.changePage("#games", {transition: "slide"});
                          } });
                    
                    $("#fb_profile_name").html(response.name);
                    FB.getLoginStatus(handleStatusChange);
                    
                    }
                    });
             }
             else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
}


function facebookWallPost() {
    console.log('Debug 1');
    var params = {
    method: 'feed',
    name: 'Facebook Dialogs',
    link: 'https://developers.facebook.com/docs/reference/dialogs/',
    picture: 'http://fbrell.com/f8.jpg',
    caption: 'Reference Documentation',
    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    };
    console.log(params);
    FB.ui(params, function(obj) { console.log(obj);});
}

function publishStoryFriend() {
    randNum = Math.floor ( Math.random() * friendIDs.length );
    
    var friendID = friendIDs[randNum];
    if (friendID == undefined){
        alert('please click the me button to get a list of friends first');
    }else{
        console.log("friend id: " + friendID );
        console.log('Opening a dialog for friendID: ', friendID);
        var params = {
        method: 'feed',
        to: friendID.toString(),
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        };
        FB.ui(params, function(obj) { console.log(obj);});
    }
}

document.addEventListener('deviceready', function() {
                          try {
                    //      alert('Device is ready! Make sure you set your app_id below this alert.');
                          FB.init({ appId: "443543518991736", nativeInterface: CDV.FB, useCachedDialogs: false });
                     //     document.getElementById('data').innerHTML = "";
                          } catch (e) {
                          alert(e);
                          }
                          }, false);
