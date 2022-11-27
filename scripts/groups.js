var user;

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    user = firebaseUser;
    getGroups();
  }
});

async function getGroups() {
  db.collection("groups")
    .where("owner", "==", user.uid)
    .get()
    .then((groups) => {
      document.getElementById("spinner").remove();
      let content = document.getElementById("content");
      let noGroupsFound = document
        .getElementById("noGroupsFoundTemplate")
        .content.cloneNode(true);
      if (groups.docs.length) {
        let groupsTable = document
          .getElementById("groupsTableTemplate")
          .content.cloneNode(true);
        let groupItemTemplate = document.getElementById("groupItemTemplate");
        // console.log(groupsTable.children[0].children[1]);
        groups.forEach((group) => {
          console.log(group.data());
          let groupItem = groupItemTemplate.content.cloneNode(true);

          groupItem.querySelector("#groupName").innerText = group.data().name;
          groupsTable.querySelector("#groupTableBody").appendChild(groupItem);
        });
        content.appendChild(groupsTable);
      } else {
        content.appendChild(noGroupsFound);
      }
      // console.log(groups.docs);
      // groups.forEach((group) => {
      //   console.log(group.data());
      // });
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
