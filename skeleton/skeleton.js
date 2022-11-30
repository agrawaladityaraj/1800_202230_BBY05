//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------

function mobileClickMenu() {
  let menu = document.getElementById("navbarBasicExample");
  document.getElementById("mobileMenuButton").addEventListener("click", () => {
    menu.classList.toggle("is-active");
  });
}

(() => {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      $("#navPlaceholder").load("/skeleton/nav1.html");
    } else {
      $("#navPlaceholder").load("/skeleton/nav.html");
    }
    $("#footPlaceholder").load("/skeleton/foot.html", () => {
      mobileClickMenu();
    });
  });
})();

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
