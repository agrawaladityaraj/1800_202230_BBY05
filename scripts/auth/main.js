var firbaseId;

function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      firbaseId = user.uid;
      //gets the template created in the main.html
      let assigntemplate = document.getElementById("assign-template");

      console.log(firbaseId);

      //all the assignments with the speific userid
      db.collection("assignments")
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
            console.log(assignmentID);
            console.log(date);
            console.log(firbaseId);

            let newcard = assigntemplate.content.cloneNode(true); //what does this mean

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

      // Do something for the currently logged-in user here:
      console.log(firbaseId); //print the uid in the browser console
      console.log(user.displayName); //print the user name in the browser console
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

console.log(firbaseId);

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

function setAssignmentData(id) {
  localStorage.setItem("hikeID", id);
  console.log(id);
}
