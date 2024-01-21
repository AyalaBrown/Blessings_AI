let responseData = null
let currentIndex = 1;

function sendData() {
  const event = document.getElementById('event').value;
  const atmosphere = document.getElementById('atmosphere').value;
  const type = document.getElementById('type').value;
  const age = document.getElementById('age').value;

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
    document.getElementById('generateButton').disabled = true; // Disable "Generate Blessing" button after initial click

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
    document.getElementById('generateButton').disabled = false;
  }