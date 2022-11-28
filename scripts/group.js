var user;
var groupId;

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
        document.getElementById("spinner").remove();
        content.appendChild(assignmentTable);
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
  ).href = `/app/groups/createGroup.html?groupId=${groupId}`;
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
