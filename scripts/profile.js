var currentUser; //global variable points to who is logged in

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user.uid);
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userSchool = userDoc.data().school;
        var userCountry = userDoc.data().country;
        var userEmail = userDoc.data().email;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("name").value = userName;
        }
        if (userSchool != null) {
          document.getElementById("school").value = userSchool;
        }
        if (userCountry != null) {
          document.getElementById("country").value = userCountry;
        }
        if (userEmail != null) {
          document.getElementById("email").value = userEmail;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  console.log("inside save user info");

  userName = document.getElementById("name").value; //get the value of the field with id="name"
  userSchool = document.getElementById("school").value; //get the value of the field with id="school"
  userCountry = document.getElementById("country").value; //get the value of the field with id="country"
  userEmail = document.getElementById("email").value; //get the value of the field with id="email"

  currentUser
    .update({
      name: userName,
      school: userSchool,
      country: userCountry,
      email: userEmail,
    })
    .then(() => {
      console.log("Document successfully updated!");
      window.location.assign("/app/main/main.html");
    });
  document.getElementById("personalInfoFields").disabled = true;
}
