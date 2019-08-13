  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyB-XOg48Piw0h3Z08WGDgmGXaiyJEmoGwc",
      authDomain: "projectucsd-5ff85.firebaseapp.com",
      databaseURL: "https://projectucsd-5ff85.firebaseio.com",
      projectId: "projectucsd-5ff85",
      storageBucket: "",
      messagingSenderId: "97312050674",
      appId: "1:97312050674:web:f1bc355bcc0ef28e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //a variable to referance the database
  var database = firebase.database();

  //variables from form
  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;

  // updates clock

  setInterval(function () {
      $("#current-time").html(moment(moment()).format("hh:mm:ss"));
  }, 1000);

  // 2. Button for adding Trains
  $("#add-train").on("click", function (event) {
      event.preventDefault();


      trainName = $("#trainName").val().trim();

      destination = $("#destinationinput").val().trim();

      firstTrain = $("#firsttraininput").val().trim();

      frequency = $("#frequencyinput").val().trim();

      // Clears all of the text-boxes
      $("#trainName").val("");
      $("#destinationinput").val("");
      $("#firstTraininput").val("");
      $("#frequencyinput").val("");




      //pushes to database
      database.ref().push({

          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency

      });
  });



  database.ref().on("child_added", function (childSnapshot) {

      //calculations needed

      var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "days");

      var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
      //console.log("Difference in time: " + timeDiff);

      var remainder = timeDiff % childSnapshot.val().frequency;
      //console.log("Remainder: " + remainder);

      var minsUntilTrain = childSnapshot.val().frequency - remainder;
      //console.log("Time till Train: " + minsUntilTrain);

      var nextTrainTime = moment().add(minsUntilTrain, "minutes");
      //console.log("Next arrival: " + moment(nextTrainTime).format("hh:mm"));


      // Add each train's data into the table
      $("#full-train-list > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
          childSnapshot.val().frequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain + "</td></tr>");

  });