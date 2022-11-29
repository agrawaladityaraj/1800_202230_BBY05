var firbaseId;

var x = document.getElementById("resetButton");
function hidebuttons() {
  console.log("it worked");
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    console.log("button is none");
    x.style.display = "block";
  }
}

function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      firbaseId = user.uid;
      //gets the template created in the main.html
      let assigntemplate = document.getElementById("assign-template");

      //all the assignments with the speific userid
      db.collection("assignments")
        .orderBy("date")
        .where("made_by_user", "==", firbaseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var assignmentID = doc.id;
            var assignname = doc.data().name; //gets the value of name key
            var date = doc.data().date; //gets the value of the date lkey
            var coursename = doc.data().coursename;
            var coursetype = doc.data().assignmenttype;
            var assignmentstatus = doc.data().status;

            let newcard = assigntemplate.content.cloneNode(true); //what does this mean

            //update the assigments rows.
            newcard.querySelector("#assign-name").innerHTML = assignname;

            newcard.querySelector("#assign-date").innerHTML = new Date(
              date
            ).toDateString();

            newcard.querySelector("#course-name").innerHTML = coursename;

            newcard.querySelector("#assign-type").innerHTML = coursetype;

            newcard.querySelector("#assignment-status").innerHTML =
              assignmentstatus;

            newcard.querySelector("a").href =
              "/app/assignments/editAssigment.html?AssignID=" + assignmentID;

            document
              .getElementById("assignments" + "-go-here")
              .appendChild(newcard);
          });
        });

      // Do something for the currently logged-in user here:
      //print the user name in the browser console
      user_Name = user.displayName;

      //method #1:  insert with html only
      //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
      //method #2:  insert using jquery
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
      // No user is signed in.
    }
  });
}

insertName(); //run the function

// function to get assignments of each user
// function displayAssignments(collection) {
//   //gets the template created in the main.html
//   let assigntemplate = document.getElementById("assign-template");

//   console.log(firbaseId);

//   //all the assignments with the speific userid
//   db.collection(collection)
//     .doc(firbaseId)
//     .collection("assignments")
//     .get()
//     .then((snap) => {
//       snap.forEach((doc) => {
//         var assignname = doc.data().name; //gets the value of name key
//         var date = doc.data().date; //gets the value of the date lkey
//         console.log(date);
//         console.log(firbaseId);

//         let newcard = assigntemplate.content.cloneNode(true); //what does this mean

//         //update the assigments rows.
//         newcard.querySelector("#assign-name").innerHTML = assignname;

//         newcard.querySelector("#assign-date").innerHTML = date;

//         document.getElementById(collection + "-go-here").appendChild(newcard);
//       });
//     });
// }

// displayAssignments("users");

function searchAssignments() {
  document.getElementById("assignments" + "-go-here").innerHTML = "";

  hidebuttons();

  let stringUser = document.getElementById("searchBar").value;

  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      let firbaseId2 = user.uid;
      //gets the template created in the main.html
      let assigntemplate = document.getElementById("assign-template");

      //all the assignments with the speific userid
      db.collection("assignments")
        .where("made_by_user", "==", firbaseId2)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var assignmentID = doc.id;
            var assignname = doc.data().name; //gets the value of name key
            var date = doc.data().date; //gets the value of the date lkey
            var coursename = doc.data().coursename;
            var coursetype = doc.data().assignmenttype;
            var assignmentstatus = doc.data().status;

            let newcard = assigntemplate.content.cloneNode(true); //what does this mean
            var inassignname = assignname
              .toLowerCase()
              .includes(stringUser.toLowerCase());

            var incoursename = coursename
              .toLowerCase()
              .includes(stringUser.toLowerCase());

            var incoursetype = coursetype
              .toLowerCase()
              .includes(stringUser.toLowerCase());

            var inassignmentstatus = assignmentstatus
              .toLowerCase()
              .includes(stringUser.toLowerCase());

            if (
              inassignname ||
              incoursename ||
              incoursetype ||
              inassignmentstatus
            ) {
              //update the assigments rows.
              newcard.querySelector("#assign-name").innerHTML = assignname;

              newcard.querySelector("#assign-date").innerHTML = date;

              newcard.querySelector("#course-name").innerHTML = coursename;

              newcard.querySelector("#assign-type").innerHTML = coursetype;

              newcard.querySelector("#assignment-status").innerHTML =
                assignmentstatus;

              newcard.querySelector("a").href =
                "/app/assignments/editAssigment.html?AssignID=" + assignmentID;

              document
                .getElementById("assignments" + "-go-here")
                .appendChild(newcard);
            }
          });
        });

      // Do something for the currently logged-in user here:
      //print the user name in the browser console
      user_Name = user.displayName;

      //method #1:  insert with html only
      //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
      //method #2:  insert using jquery
      $("#name-goes-here").text(user_Name); //using jquery
    } else {
      // No user is signed in.
    }
  });
}
function setAssignmentData(id) {
  localStorage.setItem("hikeID", id);
}

$("#searchBar").keypress(function (event) {
  if (event.keyCode === 13) {
    searchAssignments();
  }
});

function test() {
  console.log("Hello it worked");
}

function filterAssignments(value) {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      firbaseId = user.uid;
      //gets the template created in the main.html
      let assigntemplate = document.getElementById("assign-template");

      var div = document.getElementById("assignments-go-here");
      div.innerHTML = "";
      console.log(value);

      //all the assignments with the speific userid
      db.collection("assignments")
        .orderBy(value)
        .where("made_by_user", "==", firbaseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var assignmentID = doc.id;
            var assignname = doc.data().name; //gets the value of name key
            var date = doc.data().date; //gets the value of the date key
            var coursename = doc.data().coursename;
            var coursetype = doc.data().assignmenttype;
            var assignmentstatus = doc.data().status;

            let newcard = assigntemplate.content.cloneNode(true);

            //update the assigments rows.
            newcard.querySelector("#assign-name").innerHTML = assignname;
            newcard.querySelector("#assign-date").innerHTML = date;
            newcard.querySelector("#course-name").innerHTML = coursename;
            newcard.querySelector("#assign-type").innerHTML = coursetype;
            newcard.querySelector("#assignment-status").innerHTML =
              assignmentstatus;

            newcard.querySelector("a").href =
              "/app/assignments/editAssigment.html?AssignID=" + assignmentID;

            document
              .getElementById("assignments" + "-go-here")
              .appendChild(newcard);
          });
        });

      user_Name = user.displayName;

      $("#name-goes-here").text(user_Name); //using jquery
    }
  });
}
