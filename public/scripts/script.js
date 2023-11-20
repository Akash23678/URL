
const signin = document.getElementById("signin");
const signup = document.getElementById("signup");

// COPY btn
const copy = document.getElementById("copy-btn");
const target_url = document.getElementById("target-url");

if (copy) {
  copy.addEventListener("click", () => {
    navigator.clipboard
      .writeText(target_url.innerText)
      .then(() => {
        console.log("Copied To Clipboard");
      })
      .catch(() => {
        console.log("Unable to Copy To Clipboard");
      });
  });
}

// POPUP PAGES
const popup1 = document.querySelector(".popup1");
const popup2 = document.querySelector(".popup2");

if (signin) {
  signin.addEventListener("click", () => {
    popup2.style.display = "flex"; // to popup in the middle of the page
    popup1.style.backdropFilter = "blur(10px)";
  });
}

if (signup) {
  signup.addEventListener("click", () => {
    popup1.style.display = "flex"; // to popup in the middle of the page
    popup1.style.backdropFilter = "blur(10px)";
  });
}

// CLOSE ICON in sign-in and sign-up
const close1 = document.getElementById("close-img1");
if (close1) {
  close1.addEventListener("click", () => {
    window.location.href = "../"; // redirect to root of curr domain it will go back double and redirect
    // window.location.href = "http://localhost:8002/";
  });
}

const close2 = document.getElementById("close-img2");
if (close2) {
  close2.addEventListener("click", () => {
    window.location.href = "../";
    // // window.location.href = "http://localhost:8002/";
  });
}


// // document.getElementById('shorten-btn').addEventListener('click', function () {
// //     this.disabled = true;
// // });