


function createAssignment(){

    var user = firebase.auth().currentUser;
    
    var createdAssignments = db.collection("users").doc(user.uid).collection("assignments");

    createdAssignments.add({
        //write to firestore. We are using the UID for the ID in users collection
        name: document.getElementById("NameOfAssignment").value, //"users" collection
        date: document.getElementById("Assignmentdate").value, //with authenticated user's ID (user.uid)
        madebyuser: user.uid,
    })
    .then(function () {
      console.log("New assignment added to firestore");
      window.location.assign("/app/main/main.html"); //re-direct to main.html after signup
    })
    .catch(function (error) {
      console.log("Error adding new assignment: " + error);
    });


}
