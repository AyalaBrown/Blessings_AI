let responseData = null
let currentIndex = 1;

function sendData() {
  const event = document.getElementById('event').value;
  const atmosphere = document.getElementById('atmosphere').value;
  const type = document.getElementById('type').value;
  const age = document.getElementById('age').value;
  const userSelectionsContainer = document.getElementById('userSelections');

  let age_ = ''
  if (age!== undefined && age!== ''){
    age_ = ', Age - ' + age
  }
  userSelectionsContainer.innerText = `Selections: Event - ${event}, Atmosphere - ${atmosphere}, Type - ${type} ${age_}`;
  userSelectionsContainer.style.display = 'block';

  document.getElementById('newSelection').style.display = 'block';
  document.getElementById('event').style.display = 'none';
  document.getElementById('atmosphere').style.display = 'none';
  document.getElementById('type').style.display = 'none';
  document.getElementById('age').style.display = 'none';
  document.getElementById('event_label').style.display = 'none';
  document.getElementById('atmosphere_label').style.display = 'none';
  document.getElementById('type_label').style.display = 'none';
  document.getElementById('forAge').style.display = 'none';



  fetch('http://localhost:3000/processData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event, atmosphere, type, age }),
  })
  .then(response => response.json())
  .then(data => {

    responseData = data;

    // Access the properties of the response directly
    const currentResult = data[currentIndex];

    // Display the results
    document.getElementById('result').innerText = currentResult;

    // Enable the "I want another blessing" button
    document.getElementById('anotherButton').style.display = 'block';
    document.getElementById('result').style.display = 'block';
    document.getElementById('submitButton').style.display = 'none';
  })
  .catch(error => console.error('Error:', error));
}

function showNextResult() {

  currentIndex++;

  if (currentIndex<=3) {
    const nextResult = responseData[currentIndex];
    // Display the next result from the stored data
    document.getElementById('result').innerText = nextResult;
  } else {
    currentIndex = 1
    // If there's no stored data, fetch new data from the server
    sendData();
  }
}
  
  function handleEventChange() {
    const event = document.getElementById('event');
    const ageInputDiv = document.getElementById('ageInput');
    const ageInput = document.getElementById('age');

    if (event.value === 'birthday') {
      ageInputDiv.style.display = 'block';
    } else {
      ageInputDiv.style.display = 'none';
      ageInput.value = '';
    }
    currentIndex = 1;
    document.getElementById('anotherButton').style.display = 'none';
    document.getElementById('result').style.display = 'none';
  }

  function newSelection() {
    document.getElementById('event').style.display = 'block';
    document.getElementById('atmosphere').style.display = 'block';
    document.getElementById('type').style.display = 'block';
    document.getElementById('age').style.display = 'block';
    document.getElementById('event_label').style.display = 'block';
    document.getElementById('atmosphere_label').style.display = 'block';
    document.getElementById('type_label').style.display = 'block';
    document.getElementById('forAge').style.display = 'block';
    document.getElementById('submitButton').style.display = 'block';
    document.getElementById('userSelections').style.display = 'none';
    document.getElementById('newSelection').style.display = 'none';
    document.getElementById('anotherButton').style.display = 'none';
    document.getElementById('result').style.display = 'none';
  }

  