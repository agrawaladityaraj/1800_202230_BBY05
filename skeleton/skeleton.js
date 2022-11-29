//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------

(() => {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      $("#navPlaceholder").load("/skeleton/nav1.html");
    } else {
      $("#navPlaceholder").load("/skeleton/nav.html");
    }
  });
  $("#footPlaceholder").load("/skeleton/foot.html");
})();
