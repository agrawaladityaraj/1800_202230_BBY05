var user;
var groupId;
var x;

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    user = firebaseUser;
    const urlParams = new URLSearchParams(window.location.search);
    groupId = urlParams.get("id");
    getGroup();
  }
});

function getGroup() {
  if (groupId) {
    db.collection("groups")
      .doc(groupId)
      .get()
      .then((group) => {
        if (group.exists) {
          const data = group.data();
          if (
            data.owner == user.uid ||
            (data.users && data.users.find((item) => item === user.uid))
          ) {
            getAssignments(group.data().name);
          } else {
            notValid("You are not in this group.");
          }
        } else {
          notValid("Group Not Found.");
        }
      })
      .catch((err) => {
        console.error(err);
        notValid("Group Not Found.");
      });
  } else {
    notValid("Group Not Found.");
  }
}

function notValid(message) {
  document.getElementById("spinner").remove();
  let content = document.getElementById("content");
  let groupNotValid = document
    .getElementById("groupNotValidTemplate")
    .content.cloneNode(true);
  groupNotValid.querySelector("h4").innerText = message;
  content.appendChild(groupNotValid);
}

function getAssignments(name) {
  db.collection("assignments")
    .orderBy("date")
    .where("group", "==", groupId)
    .get()
    .then((assignments) => {
      console.log(assignments);
      if (assignments.empty) {
        noAssignmentsFound();
      } else {
        let content = document.getElementById("content");
        let assignmentTemplate = document.getElementById("assign-template");
        let assignmentTable = document
          .getElementById("assignmentsTableTemplate")
          .content.cloneNode(true);
        assignmentTable.querySelector("#name-goes-here").innerText = name;
        assignments.forEach((assignment) => {
          const data = assignment.data();
          let newCard = assignmentTemplate.content.cloneNode(true);

          newCard.querySelector("#assign-name").innerHTML = data.name;
          newCard.querySelector("#assign-date").innerHTML = new Date(
            data.date
          ).toDateString();
          newCard.querySelector("#course-name").innerHTML = data.coursename;
          newCard.querySelector("#assign-type").innerHTML = data.assignmenttype;
          newCard.querySelector("#assignment-status").innerHTML = data.status;
          newCard.querySelector("a").href =
            "/app/assignments/editAssigment.html?AssignID=" + assignment.id;

          assignmentTable
            .getElementById("assignments-go-here")
            .appendChild(newCard);
        });
        let fab = document
          .getElementById("fabTemplate")
          .content.cloneNode(true);
        fab.querySelector(
          "#fab"
        ).href = `/app/assignments/createassignment.html?groupId=${groupId}`;
        document.getElementById("spinner").remove();
        content.appendChild(assignmentTable);
        document.getElementById("fab-goes-here").appendChild(fab);
        $("#searchBar").keypress(function (event) {
          if (event.keyCode === 13) {
            searchAssignments();
          }
        });
        x = document.getElementById("resetButton");
      }
    })
    .catch((err) => {
      console.error(err);
      notValid("Something went wrong!");
    });
}

function noAssignmentsFound() {
  document.getElementById("spinner").remove();
  let content = document.getElementById("content");
  let noAssignmentsFound = document
    .getElementById("noAssignmentsFoundTemplate")
    .content.cloneNode(true);
  noAssignmentsFound.querySelector(
    "a"
  ).href = `/app/assignments/createassignment.html?groupId=${groupId}`;
  content.appendChild(noAssignmentsFound);
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

      //all the assignments with the speific userid
      db.collection("assignments")
        .orderBy(value)
        .where("group", "==", groupId)
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
    }
  });
}

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

function hidebuttons() {
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    console.log("button is none");
    x.style.display = "block";
  }
}
