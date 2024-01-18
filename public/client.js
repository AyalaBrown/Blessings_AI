async function generateBlessing() {
    console.log("Generating")
    const event = document.getElementById("event").value;
    const atmosphere = document.getElementById("atmosphere").value;
    const type = document.getElementById("type").value;
    const age = document.getElementById("age").value;
    const formData = new FormData();
    formData.append("event", event);
    formData.append("atmosphere", atmosphere);
    formData.append("type", type);
    formData.append("age", age);

    console.log("formData", formData)
  
    const response = await fetch('/prompts', {
      method: 'POST',
      body: {"event":event, "atmosphere": atmosphere, "type": type, "age": age},
    });
  
    const result = await response.json();
    console.log("result", result)
    const blessingsList = document.getElementById("blessingsList");
    blessingsList.innerHTML = "";
  
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        const li = document.createElement("li");
        li.textContent = result[key];
        blessingsList.appendChild(li);
      }
    }
  
    document.getElementById("result").style.display = "block";
  }

  
  function requestDifferentBlessing() {
    // Logic to reset or modify user inputs if needed
    // ...
  
    // Hide the result section
    document.getElementById("result").style.display = "none";
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
  