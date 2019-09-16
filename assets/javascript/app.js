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

  console.log(trainName, trainDest, trainTime, trainFreq + " mins")
  $('#train-name').val('');
  $('#train-destination').val('');
  $('#train-time').val('');
  $('#train-interval').val('');
  

})