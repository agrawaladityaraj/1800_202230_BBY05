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
        console.log(group);
        if (group.exists) {
          const data = group.data();
          if (data.owner == user.uid) {
            notValid("You own this group.");
          }
          if (data?.users.find((item) => item === user.uid)) {
            notValid("You are already in this group.");
          } else {
            areYouSure(data);
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

function areYouSure(data) {
  document.getElementById("spinner").remove();
  let content = document.getElementById("content");
  let areYouSure = document
    .getElementById("areYouSureTemplate")
    .content.cloneNode(true);
  areYouSure.querySelector("#groupName").innerText = data.name;
  content.appendChild(areYouSure);
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

function joinedSuccessfully() {
  document.getElementById("not-found").remove();
  let content = document.getElementById("content");
  let groupNotValid = document
    .getElementById("groupJoinedSuccessfully")
    .content.cloneNode(true);
  content.appendChild(groupNotValid);
}

function joinGroup() {
  db.collection("groups")
    .doc(groupId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
    .then(() => {
      joinedSuccessfully();
    });
}
