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
      body: JSON.stringify({event, atmosphere, type, age}),
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('result').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
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
  }