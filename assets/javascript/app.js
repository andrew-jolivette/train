  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDwM80gg3txQ3xN7S9gLDc4d2tvdyMZokM",
    authDomain: "ajbootcamp-train-database.firebaseapp.com",
    databaseURL: "https://ajbootcamp-train-database.firebaseio.com",
    projectId: "ajbootcamp-train-database",
    storageBucket: "",
    messagingSenderId: "1003326509698",
    appId: "1:1003326509698:web:be973cf9a9c8c301469a9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database(); // setting up reference to the firebase Database
/////////////////////////////////////////////////////////////

var databaseKeys = 0;


$('#trainSubmit').on('click', () => {
  event.preventDefault();

  const trainName = $('#train-name').val().trim()
  const trainDest = $('#train-destination').val().trim()
  const trainTime = $('#train-time').val().trim()
  const trainFreq = $('#train-interval').val().trim()

  // checks to make sure all fields have values
    // if not, it ends function
  if (!trainName || !trainDest || !trainTime || !trainFreq){
    return;
  }

  database.ref(databaseKeys).set({
    trainName,
    trainDest,
    trainTime,
    trainFreq
  });
  

  console.log(trainName, trainDest, trainTime, trainFreq + " mins")
  $('#train-name').val('');
  $('#train-destination').val('');
  $('#train-time').val('');
  $('#train-interval').val(''); 

})

database.ref().on('value', snapshot => {
  databaseKeys = snapshot.val().length;
  console.log(snapshot.val())
  console.log("number of keys: " + snapshot.val().length)
  
  renderSched()
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function renderSched() {
  $('#trainData').empty();
  for (let i = 0; i < databaseKeys; i++){
    database.ref(i).once('value', snapshot => {
      var trainData = snapshot.val()
      var firstTimeConverted = moment(trainData.trainTime, "HH:mm").subtract(1, "years")
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % trainData.trainFreq;
      var tMinutesTilTrain = trainData.trainFreq - tRemainder;
      var nextTrain = moment().add(tMinutesTilTrain, "minutes");

      var newRow = $('<tr>').append(
        $('<td>').text(trainData.trainName),
        $('<td>').text(trainData.trainDest),
        $('<td>').text(trainData.trainFreq),
        $('<td>').text(moment(nextTrain).format("hh:mm A")),
        $('<td>').text(tMinutesTilTrain)
      )
      $('#trainData').append(newRow) 
    })
  }
}
function clear() {
  database.ref().set(null)
  renderSched();
  databaseKeys = 0;
}

$('#schedClear').on('click', () => {
  event.preventDefault();
  clear()
})

var timeZero = false;
function checkTime() {
  return;
}