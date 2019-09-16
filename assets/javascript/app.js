$('#trainSubmit').on('click', () => {
  event.preventDefault();

  const trainName = $('#train-name').val().trim()
  const trainDest = $('#train-destination').val().trim()
  const trainTime = $('#train-time').val().trim()
  const trainFreq = $('#train-interval').val().trim()

})