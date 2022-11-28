var user;
var groupsOwner;
var groupsUser;

firebase.auth().onAuthStateChanged(async (firebaseUser) => {
  if (firebaseUser) {
    user = firebaseUser;
    getGroups();
  }
});

function getGroups() {
  db.collection("groups")
    .where("owner", "==", user.uid)
    .get()
    .then((groups) => {
      groupsOwner = groups;
      db.collection("groups")
        .where("users", "array-contains", user.uid)
        .get()
        .then((groups) => {
          groupsUser = groups;
          document.getElementById("spinner").remove();
          let content = document.getElementById("content");
          let noGroupsFound = document
            .getElementById("noGroupsFoundTemplate")
            .content.cloneNode(true);
          if (groupsOwner.empty && groupsUser.empty) {
            content.appendChild(noGroupsFound);
          } else {
            let groupsTable = document
              .getElementById("groupsTableTemplate")
              .content.cloneNode(true);
            let groupItemTemplate =
              document.getElementById("groupItemTemplate");
            groupsOwner.forEach((group) => {
              let groupItem = groupItemTemplate.content.cloneNode(true);
              groupItem.querySelector("#groupName").innerText =
                group.data().name;
              groupItem.querySelector("#groupStatus").innerText = "Owner";
              groupItem
                .querySelector("#groupStatus")
                .classList.add("is-success");
              groupsTable
                .querySelector("#groupTableBody")
                .appendChild(groupItem);
            });
            groupsUser.forEach((group) => {
              let groupItem = groupItemTemplate.content.cloneNode(true);
              groupItem.querySelector("#groupName").innerText =
                group.data().name;
              groupItem.querySelector("#groupStatus").innerText = "User";
              groupItem.querySelector("#groupStatus").classList.add("is-info");
              groupItem.querySelector("#share").id = group.id;
              groupsTable
                .querySelector("#groupTableBody")
                .appendChild(groupItem);
            });
            content.appendChild(groupsTable);
          }
        })
        .then(() => {
          addshare();
        });
    });
}

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

function addshare() {
  const shareBtn = document.querySelectorAll(".share-btn");
  const shareOptions = document.querySelector(".share-options");

  shareBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      shareOptions.classList.toggle("active");
      // shareOptions.querySelector(".link").innerText = 
    });
  });
}
