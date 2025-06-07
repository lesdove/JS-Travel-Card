document.getElementById("changeLanguage").addEventListener("click", function (e) {
    e.preventDefault();
    alert("Oops, language switching is not available yet!");
  });
  
const dataSources = {
    emergencyContacts: ["My Info", "Mom", "Dad", "Friend", "Sister", "All"],
    highPriority: ["Chronic Conditions", "Allergies", "Pregnant", "All"],
    lowPriority: ["Daily Medications", "Blood Type", "Insurance Provider", "Past Surgeries", "Relevant Immunizations", "All"],
    travelDetail: ["Lodging address", "Days Abroad", "Embassy Address", "All"]
  };


  function createChecklist(categoryName, items) {
    const section = document.createElement("div");
  
    const title = document.createElement("h2");
    title.textContent = categoryName;
    section.appendChild(title);
  
    items.forEach(item => {
      const label = document.createElement("label");
      label.style.display = "block";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = categoryName;
      checkbox.value = item;
  
      label.appendChild(checkbox);
      label.append(" " + item);
  
      section.appendChild(label);
    });
  
    return section;
  }
  

  window.addEventListener("DOMContentLoaded", function () {
    const checklistContainer = document.getElementById("checklistContainer");
    const form = document.getElementById("infoForm");
    const display = document.getElementById("displayArea");
  

    for (let category in dataSources) {
      const section = createChecklist(category, dataSources[category]);
      checklistContainer.appendChild(section);
    }
  

    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
  
      const selected = {};
  
      for (let category in dataSources) {
        const checkboxes = document.querySelectorAll(`input[name="${category}"]:checked`);
        selected[category] = [];
  
        checkboxes.forEach(function (checkbox) {
          if (checkbox.value === "All") {
            selected[category] = dataSources[category].filter(item => item !== "All");
          } else {
            if (!selected[category].includes(checkbox.value)) {
              selected[category].push(checkbox.value);
            }
          }
        });
      }
  

      form.style.display = "none";
      display.innerHTML = "";
  
      for (let category in selected) {
        const section = document.createElement("div");
        const title = document.createElement("h2");
  
        
        title.textContent = category
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, function (letter) {
            return letter.toUpperCase();
          });
  
        section.appendChild(title);
  
        if (selected[category].length === 0) {
          const none = document.createElement("p");
          none.textContent = "None selected.";
          section.appendChild(none);
        } else {
          const list = document.createElement("ul");
          selected[category].forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
          });
          section.appendChild(list);
        }
  
        display.appendChild(section);
      }
    });
  });
  