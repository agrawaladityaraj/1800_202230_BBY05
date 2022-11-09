const user = firebase.auth().currentUser;

function createGroup() {
  db.collection("groups").add({});
}
