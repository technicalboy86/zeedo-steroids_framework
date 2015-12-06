$(function(){
	deviceReady();
});

var playgrounds_id = 1;

/*
function games_page_init(){
    $.getJSON("http://zeedo.apiary.io/api/games/list", {email:user_email, token:'-c8d9y1hVMumQ-dzyW6J', type:"available"}, function(results) {
              var available_games = results["available_games"];
              //console.log(results);
              $("#available_games_content .games_list").empty();
              $.each(available_games, function(i, form) {
                     var row = available_games[i];
                     if(row.winner_points == 0)
                     var str_winner_points ="Yes";
                     else
                     var str_winner_points = "No";
                     
                     var date =row.expired_at.split("/");
                $("#available_games_content .games_list").append('<li><ul class="games"><li><ul><li class="game-img"><a href="#game-page"><img src="'+row.pattern_images[i]["url"]+'" style="width:50px;height:50px;" alt="" ></a></li><li class="game-name">'+row.title+'</li><li class="game-details"><ul><li><i class="fa fa-calendar"></i> <span>'+date[0]+'</span></li>     <li><i class="fa fa-user"></i><span>'+row.active_players_count+'</span></li><li><i class="fa fa-camera"></i><span>'+row.game_snapshots_taken_count+'</span></li><li><i class="fa fa-gift"></i><span>'+str_winner_points+'</span></li></ul></li><li class="photo-capture"><a onclick="capturePhoto();"> <i class="fa fa-arrow-circle-right"></i></a></li></ul></li></ul></li>');
               });
      });
	$.getJSON("http://zeedo.apiary.io/api/games/list", {email:"jakub.kuchar@hotmail.com", token:'-c8d9y1hVMumQ-dzyW6J', type:"playing"}, function(results) {
		var forms = results;
		var created_games_array = forms["created_games"];
		$.each(created_games_array, function(i, form) {
			var temp = created_games_array[i];		
			$.each(temp, function(i, form) {
				//alert(form);			
			});
		});
	});
}
*/
function onSuccess(position) {
   // console.log("Your position : " + position.coords.latitude + "/"+ position.coords.longitude);
}

function onError(error) {
  //  console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
function deviceReady() {
//	games_page_init();

	$("#games").on("pageshow",function() {
		//navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
               //    $.ajax({ type:"POST", beforeSend: function (request) { request.setRequestHeader("Accept", "application/json");request.setRequestHeader("Content-Type", "application/json"); }, url: "http://ec2-54-220-53-82.eu-west-1.compute.amazonaws.com:8080/mobile/facebook/register", data: '{"provider":"facebook", "uid":"100007091312403"}', processData: false, success: function(msg) { console.log(msg);} });
                   
               //    $.ajax({ type:"POST", beforeSend: function (request) { request.setRequestHeader("Accept", "application/json");request.setRequestHeader("Content-Type", "application/json"); }, url: "http://ec2-54-220-53-82.eu-west-1.compute.amazonaws.com:8080/mobile/facebook/register", data: '{"provider":"facebook", "uid":"43434343", "info":{"nickname":"carol", "email":"carol@hotmail.com", "name":"Carol Blond", "first_name":"Carol", "last_name":"Blond", "image":"http://graph.facebook.com/1158236411/picture", "urls":{"Facebook":"https://www.facebook.com/carol"}, "location":"LA, Wow", "verified":true}, "credentials":{"token":"CAADN2xte0MUBAN5S5D40kernZBa0dOOd4qRyYy70UxESP8SVYJiPXprGSSZCOJuykaZAgfEdfpOXLfqqryiw7SlCATNEgyrmyBBNTTdeXNOWs9bJa0yZAT8cwkwzrWHVu9Hmf1ZAhoapf9v7N64jR2H8j0rjOOrbgjVT8Y3aiLe9sZBEFkZCsWV", "expires_at":1398569130, "expires":true}, "extra":{"raw_info":{"id":"6411", "name":"Carol Blond", "first_name":"Carol", "last_name":"Blond", "link":"https://www.facebook.com/carol", "birthday":"05/11/1985", "location":{"id":"62192643", "name":"LA, Universe"}, "education":[{"school":{"id":"79391925", "name":"La College"}, "type":"College"}], "gender":"female", "email":"carolblond@hotmail.com", "timezone":7, "locale":"en_GB", "verified":true, "updated_time":"2014-02-17T11:37:50+0000", "username":"carolb"}}}', processData: false, success: function(msg) {console.log(msg); } });
	});

	$("#dashboard").on("pageshow",function() {
                       $.getJSON("http://zeedo.apiary.io/api/users/dashboard", {email:user_email, token:user_token}, function(results) {
			var dashboard = results["dashboard"];
			$(".dashboard .points").html(dashboard.points + '    Points!');
			$(".dashboard .statistics").empty();
            $(".dashboard .statistics_snapshots").empty();
                  
			$(".dashboard .statistics").append('<li><h1>'+dashboard.games_playing_count+'</h1>Open<br>Games</li>');
			$(".dashboard .statistics").append('<li><h1>'+dashboard.games_completed_count+'</h1>Completed<br>Games</li>');
			$(".dashboard .statistics").append('<li><h1>'+dashboard.games_available_count+'</h1>Available<br>Games</li>');
            $(".dashboard .statistics_snapshots").append('<li><h1>'+dashboard.snapshots_taken_count+'</h1>Open<br>Games</li>');
            $(".dashboard .statistics_snapshots").append('<li><h1>'+dashboard.snapshots_recognized_count+'</h1>Completed<br>Games</li>');
            $(".dashboard .statistics_snapshots").append('<li><h1>'+dashboard.snapshots_pending_count+'</h1>Available<br>Games</li>');
			
		});
	});

	$("#profile-statistics-edit").on("pageshow",function() {
        $.getJSON("http://zeedo.apiary.io/api/users/1", {email:user_email, token:user_token}, function(results) {
			var user = results["user"];
			$(".profile-statistics #NickName").html('Nick Name:   ' + user_username);
			$(".profile-statistics #FirstName").html('First Name:   ' + user_first_name);
			$(".profile-statistics #LastName").html('Last Name:   ' + user_last_name);
			$(".profile-statistics #Dob").html('Yob:' + user.birth_year);
			$(".profile-statistics #Email").html('Email:   ' + user_email);
		});
	});

	$("#profile-statistics").on("pageshow",function() {
		$.getJSON("http://zeedo.apiary.io/api/users/1", {email:user_email, token:user_token}, function(results) {
			var user = results["user"];
			$(".profile-statistics #PlayedGames").html('Played Games: '+ user.games_completed_count);
			$(".profile-statistics #PhotosCaptured").html('Photos Captured:'+ user.snapshots_taken_count);
			$(".profile-statistics #PointsGathered").html('Points Gathered:'+ user.points);
		});
	});
    
    $("#games").on("pageshow",function() {
         $.getJSON("http://zeedo.apiary.io/api/games/list", {email:user_email, token:user_token, type:"available"}, function(results) {
                  // console.log(results);
                   var available_games = results["available_games"];
                   var playing_playgrounds = results["playing_playgrounds"];
                   playgrounds_id = playing_playgrounds[0].id;
                   $("#available_games_content .games_list").empty();
                   $.each(available_games, function(i, form) {
                          var row = available_games[i];
                          if(row.winner_points == 0)
                            var str_winner_points ="Yes";
                          else
                            var str_winner_points = "No";
                          
                          var date =row.expired_at.split("/");
               $("#available_games_content .games_list").append('<li><a href="#game-page"><ul class="games"><li><ul><li class="game-img"><img src="'+row.pattern_images[i]["url"]+'" style="width:50px;height:50px;" alt=""></li><li class="game-name">'+row.title+'</li><li class="game-details"><ul><li><i class="fa fa-calendar"></i> <span>'+date[0]+'</span></li>     <li><i class="fa fa-user"></i><span>'+row.active_players_count+'</span></li><li><i class="fa fa-camera"></i><span>'+row.game_snapshots_taken_count+'</span></li><li><i class="fa fa-gift"></i><span>'+str_winner_points+'</span></li></ul></li><li class="photo-capture"><a onclick="gotoGamePage(\''+row.title+''+'\');"> <i class="fa fa-arrow-circle-right"></i></a></li></ul></li></ul></a></li>');
                    });
        });
    });
    
    $("#mygames").on("pageshow",function() {
          $.getJSON("http://zeedo.apiary.io/api/games/list", {email:user_email, token:user_token, type:"playing"}, function(results) {
               //     console.log(results);
              var available_games = results["available_games"];
              //console.log(results);
              $("#mygames_content .games_list").empty();
              $.each(available_games, function(i, form) {
                    var row = available_games[i];
                    if(row.winner_points == 0)
                       var str_winner_points ="Yes";
                    else
                       var str_winner_points = "No";
                                    
                    var date =row.expired_at.split("/");
               $("#mygames_content .games_list").append('<li><ul class="games"><li><ul><li class="game-img"><a onclick="popup_fistlogin();"><img src="'+row.pattern_images[i]["url"]+'" style="width:50px;height:50px;" alt=""/ id="smallImage"></a></li><li class="game-name">'+row.title+'</li><li class="game-details"><ul><li><i class="fa fa-calendar"></i> <span>'+date[0]+'</span></li>     <li><i class="fa fa-user"></i><span>'+row.active_players_count+'</span></li><li><i class="fa fa-camera"></i><span>'+row.game_snapshots_taken_count+'</span></li><li><i class="fa fa-gift"></i><span>'+str_winner_points+'</span></li></ul></li><li class="photo-capture"><a id="" onclick="takePicture()"> <i class="fa fa-camera"></i></a></li></ul></li></ul></li>');
               });
            });
                     
       });
    $("#game-page").on("pageshow",function() {
          $.getJSON("http://zeedo.apiary.io/api/playgrounds/"+playgrounds_id, {email:user_email, token:user_token, type:"playing"}, function(results) {
                    //console.log(results);
                    var playground = results.playground;
                    //console.log(results.playground.game);
                    //console.log(results.playground.game.title);
                    var  expired_at =results.playground.game.expired_at;
                    var diff_days = compareDate(results.playground.game.expired_at);
                    
                    $("#detail_game_name").html(results.playground.game.title);
                    $("#detail_game_author").html(results.playground.game.creator_name);
                    $("#detail_game_available").html("Still "+diff_days+" days");
                    $("#detail_game_target").html(results.playground.game.target_snapshots);
                    $("#detail_game_points").html(results.playground.player_points);
                    $("#detail_game_images").html(results.playground.game.game_snapshots_taken_count);
                    $("#detail_game_successful").html(results.playground.game.state);
                    $("#detail_game_pending").html('');
          });
     });
    
    $("#game_drop_btn").click(function () {
           $.getJSON("http://zeedo.apiary.io/api/playgrounds/"+playgrounds_id+"/destory_by_game_id", {email:user_email, token:user_token}, function(results) {
                    // console.log(results);
           });
           $.mobile.changePage("#games", {transition: "slide"});
    });
}
var iabRef = null;

function iabLoadStart(event) {
    alert(event.type + ' - ' + event.url);
}

function iabLoadStop(event) {
    alert(event.type + ' - ' + event.url);
}

function iabLoadError(event) {
    alert(event.type + ' - ' + event.message);
}

function iabClose(event) {
    alert(event.type);
    iabRef.removeEventListener('loadstart', iabLoadStart);
    iabRef.removeEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.removeEventListener('exit', iabClose);
}

function compareDate(str1){
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    var today = new Date();
    return parseInt((today-date1)/(24*3600*1000));
}

function takePicture()
{
    navigator.camera.getPicture(c_onSuccess, c_onFail, { quality: 50,
                                destinationType: Camera.DestinationType.DATA_URL
                                });
}

function c_onSuccess(imageData) {
    var data = {"filename":"test.jpg", "data":imageData};
   // console.log(data);
    $.getJSON("http://zeedo.apiary.io/api/playgrounds/"+playgrounds_id+"/snapshot", {email:user_email, token:user_token, snapshot:data}, function(results) {
             // console.log(results);
              });
    
    var smallImage = document.getElementById('smallImage');
    smallImage.src = "data:image/jpeg;base64," + imageData;

}

function c_onFail(message) {
    alert('Failed because: ' + message);
}

function popup_fistlogin()
{
    $("#login-first").popup("open");
}

function gotoGamePage(gametitle)
{
    $.mobile.changePage("#game-page", {transition: "slide"});
}
