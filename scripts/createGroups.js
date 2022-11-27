let control = document.getElementById("group_name_control");
let nameInput = document.getElementById("group_name_input");

function createGroup() {
  let user = firebase.auth().currentUser;
  control.classList.add("is-loading");
  nameInput.disabled = true;
  db.collection("groups")
    .add({
      name: nameInput.value,
      owner: user.uid,
    })
    .then(() => {
      window.location.href = "/app/groups/groups.html";
    })
    .catch(() => {
      control.classList.remove("is-loading");
      nameInput.disabled = false;
      console.log("Something went wrong!");
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
