
showNotes();

// adding a note and updating it to local storage

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("title");

  let imag;
  let checkBx = document.getElementById("checkBx");
  if(checkBx.checked){
    imag = `<img class="image" id="image" src="./assets/img/star.png">`;
  }
  else{
    imag = "";
  }


  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value, 
    text: addTxt.value,
    checkbox: imag
  }
  
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  checkBx.checked = false;
  

  showNotes();
});

// function for showing the notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        </style>
        <div class="notecard mx-3 my-3 card" style="width: 18rem">
        <div class="card-body">
          <div class = "design">
          <h5 class="card-title">${element.title}</h5>
          ${element.checkbox}
          </div>
          
          <p class="card-text">
            ${element.text}
          </p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>

        </div>
      </div> `;
      
  });
  

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    
    
  } else {
    notesElm.innerHTML = `<center><b>Nothing to show! Use "Add Note" to add your first note.</b></center>`;
    
    
  }
}

// code for checkbox

addbtn.addEventListener("click", function (e) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let image = document.getElementById("image");

  if(notesObj.checkbox == true){
    
    
    image.classList.add('dispBlock');
  }
  else{
    
    
    image.classList.add('dispNone');
  }

  showNotes();

});

// function for deleting a note

function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


// function for editing the note

function editNote(index){
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let popped = notesObj[index];
  

  let addTitle = document.getElementById("title");
  let addTxt = document.getElementById('addTxt');
  addTitle.value = `${popped.title}`;
  addTxt.value =`${popped.text}`;
  
  deleteNote();
}


// code for the search bar

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
