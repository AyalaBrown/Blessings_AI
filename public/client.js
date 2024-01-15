async function generateBlessing() {
    const event = document.getElementById("event").value;
  
    const formData = new FormData();
    formData.append("prompt-input", event);
  
    const response = await fetch('/prompts', {
      method: 'POST',
      body: formData,
    });
  
    const result = await response.json();
  
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
  