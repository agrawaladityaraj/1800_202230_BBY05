var docRef;

function populateInfo() {

    let params = new URL(window.location.href);
    let currentAssignment = params.searchParams.get("AssignID");
    console.log(currentAssignment);

    docRef = db.collection("assignments").doc(currentAssignment);

    docRef.get()
    .then((doc) => {
        var assignname = doc.data().name; //gets the value of name key
        var date = doc.data().date; //gets the value of the date lkey
        var coursename = doc.data().coursename;
        var coursetype = doc.data().assignmenttype;
        var assignmentstatus = doc.data().status;
        console.log(date);
        console.log(firbaseId);
        if (assignname != null) {
            document.getElementById("NameOfAssignment").value = assignname;
        }
         if (date != null) {
           document.getElementById("Assignmentdate").value = date;
        }

        if (coursename != null) {
          document.getElementById("CourseName").value= coursename;
        }

        if (coursetype != null) {
          document.getElementById("AssignmentType").value = coursetype;
        }

        if (assignmentstatus != null) {
          document.getElementById("status").value = assignmentstatus;
        }

    

        
        
    });


}

function editAssignmentInfo() {
    
  document.getElementById('assignmentInfoFields').disabled = false;
}

function saveAssignmentInfo() { 
  docRef.update({
  name: document.getElementById("NameOfAssignment").value, //"users" collection
  coursename: document.getElementById("CourseName").value, //"users" collection
  assignmenttype: document.getElementById("AssignmentType").value, //"users" collection
  date: document.getElementById("Assignmentdate").value, //with authenticated user's ID (user.uid)
  status: document.getElementById("status").value,
})
.then(() => {
    console.log("Document successfully updated!");
})

document.getElementById('assignmentInfoFields').disabled = true;

}

function deleteAssignment() {
  
  docRef.delete().then(() => {
    console.log("Document successfully deleted!");
    window.location.assign("/app/main/main.html");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}
populateInfo();




document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log(error);
    });
}
