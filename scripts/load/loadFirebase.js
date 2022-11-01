function loadScript(url) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  head.appendChild(script);
}

function loadStyles(url) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  head.appendChild(link);
}

const scripts = [
  "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js",
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js",
];

const styles = [
  "https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css",
];

scripts.forEach((script) => {
  loadScript(script);
  console.log(document.getElementsByTagName("head")[0]);
});

styles.forEach((style) => {
  loadStyles(style);
});
