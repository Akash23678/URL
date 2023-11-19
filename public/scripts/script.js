const signin = document.getElementById("signin");
const signup = document.getElementById("signup");


//COPY btn
const copy = document.getElementById("copy-btn");
const target_url = document.getElementById("target-url");
if(copy){
    copy.addEventListener("click", ()=>{
        navigator.clipboard.writeText(target_url.innerText)
        .then(()=>{
            console.log("Copied To ClipBoard");
        }).catch(()=>{
            console.log("Unable Copied To ClipBoard");
        })
    })
}


//POPUP PAGE
const popup1 = document.querySelector(".popup1")
const popup2 = document.querySelector(".popup2")

signin.addEventListener("click", ()=>{
    popup2.style.display="flex";  //to popup on middle of page
    popup2.style.backdropFilter = 'blur(10px)';

})

signup.addEventListener("click", ()=>{
    popup1.style.display="flex";  //to popup on middle of page
    popup1.style.backdropFilter = 'blur(10px)';
})


//CLOSE ICON in signin up
const close1 = document.getElementById("close-img1");
close1.addEventListener("click", ()=>{
    popup1.style.display="none";
})
const close2 = document.getElementById("close-img2");
close2.addEventListener("click", ()=>{
    popup2.style.display="none";
})

// document.getElementById('shorten-btn').addEventListener('click', function () {
//     this.disabled = true;
// });
