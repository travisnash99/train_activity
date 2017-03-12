$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTCKTh8YtgFLqNsaS_e7X_itlsnI9y3jU",
    authDomain: "trains-d49a7.firebaseapp.com",
    databaseURL: "https://trains-d49a7.firebaseio.com",
    storageBucket: "trains-d49a7.appspot.com",
    messagingSenderId: "420387976402"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// values
  var aName = "";
  var aDestination = "";
  var aFrequency = "";
  var aNextarrival = "";
  var aMinaway = "";
  var aFirst = "";

  $("#submit").on('click', function(event){
 	 event.preventDefault();
 	 console.log("works");
		
	 aName = $("#bname").val().trim();
	  	console.log(aName);
 	 aDestination = $("#bdestination").val().trim();
 	  	console.log(aDestination);
 	 aFrequency = $("#bfrequency").val();
 	 aFirst = $("#bfirst").val();

 	  console.log(aName, aDestination, aFrequency, aFirst);
 	   database.ref().push({ aName: aName,
						        aDestination: aDestination,
							    aFrequency: aFrequency,
							    aFirst: aFirst,
							  });

	});

 	database.ref().limitToLast(1).on('child_added', function(data){
		console.log("from database", data.val());
		//create a new row
	function calcTime(aFirst,afrequency){
		var currentTime = moment().format('HH:mm');
			console.log("Current Time is " + currentTime);
		var firstMoment = moment(aFirst, 'HH:mm')
				console.log('firstMoment', firstMoment);
	  var tDiff = currentTime.diff(firstMoment);
	  			console.log('tDiff', tDiff);
	  var totalTime = moment.duration(tDiff).asMinutes();
	  		console.log('totalTime', totalTime);

	  	var freqMoment = moment(aFrequency, 'HH:mm');
	  var timeRemain = totalTime % freqMoment;
      
      var aMinaway = freqMoment.diff(timeRemain);

      var aNextarrival = moment(currentTime).add(aMinaway, 'HH:mm');
		}; 
 	calcTime();

 		var markup = $ ("<tr><td>" + (data.val().aName) + "</td><td>" 
 		    +(data.val().aDestination) + "</td><td>"
 		    +(data.val().freqMoment) + "</td><td>" 
 		    +aNextarrival + "</td><td>" 
 		    +aMinaway + "</td></tr>");
         
         $("#currenttrains").append(markup);
  
 								});//update for next time

})//document tags