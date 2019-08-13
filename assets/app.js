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

// updates clock

setInterval(function() {
  $("#current-time").html(moment(moment()).format("hh:mm:ss"));
}, 1000);

// 2. Button for adding Trains
$("#addtrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();

  var destination = $("#destinationInput")
    .val()
    .trim();

  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");

  var frequency = $("#frequencyInput")
    .val()
    .trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };
  //pushes to database
  database.ref().push(newTrain);

  console.log(newTrain.firstTrain);
  console.log(newTrain.destination);
  console.log(newTrain.trainName);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destinationinput").val("");
  $("#firstTraininput").val("");
  $("#frequencyinput").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  
});

