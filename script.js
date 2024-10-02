
const signinmodal = document.getElementById("signinmodal");
const signupmodal = document.getElementById("signupmodal");

// Get open modal button
const signinBtn = document.getElementById("signinbtn");
const signupBtn = document.getElementById("signupbtn")

// Get close button (the "x")
const signinclose = document.getElementById("signinclose");
const signupclose = document.getElementById("signupclose");

// Open modal when the button is clicked
signinBtn.addEventListener("click", () => {
    signinmodal.style.display = "block";
});
signupBtn.addEventListener("click", () => {
    signupmodal.style.display = "block";
});

// Close modal when the close button is clicked
signinclose.addEventListener("click", () => {
    signinmodal.style.display = "none";
});
signupclose.addEventListener("click", () => {
    signupmodal.style.display = "none";
});

// Close modal when clicking anywhere outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === signinmodal) {
        signinmodal.style.display = "none";
    }
});
window.addEventListener("click", (event) => {
    if (event.target === signupmodal) {
        signupmodal.style.display = "none";
    }
});



let signup = document.getElementById("signup");
signup.addEventListener("click", function (event) {
    event.preventDefault();
    let signupname = document.getElementById("signup-name").value;
    let signupnic = document.getElementById("signup-nicno").value;
    let signuppawd = document.getElementById("signup-password").value;
    let signupemail = document.getElementById("signup-email").value;
    let signupmobile = document.getElementById("signup-mobile").value;

    newusers = {
        userName: signupname,
        userNic: signupnic,
        password: signuppawd,
        email: signupemail,
        mobile: signupmobile

    }


    fetch("http://localhost:3000/Users",{
        method:'POST',
        headers:{
            'Content-Type':'application/json-server'
        },
        body:JSON.stringify(newusers)
    })
    alert("signup successfully")
    signupmodal.style.display = "none";
    location.reload();


});

document.getElementById("signin").addEventListener("click", function(event) {
    event.preventDefault();

    const signinNic = document.getElementById("signin-nicno").value;
    const signinPassword = document.getElementById("signin-password").value;

    const user = users.find(user => user.userNic === signinNic && user.password === signinPassword);
    const admin = admins.find(admin => admin.userNic === signinNic && admin.password === signinPassword);

    let TembArray={
        id:signinNic
    }
    if (user) {
        alert("User Sign In successful");
        let tembCheck=[]
         fetch(`http://localhost:3000/CurrentUser/id=${signinNic}`)
         .then(data=>data.json())
         .then(data=>{
            tembCheck.push(...tembCheck)
         })
          if (tembCheck==null) {
            fetch("http://localhost:3000/CurrentUser",{

            method : 'POST',
            headers : {
             'Content-Type' : 'applicaation/json-server'
            },
            body : JSON.stringify(TembArray)
         })
         localStorage.setItem("currentUserNic", signinNic); // Set current user NIC
          }
        signinmodal.style.display = "none";
        window.location.href = 'user.html';

    } else if (admin) {
        alert("Admin Sign In successful");
        signinmodal.style.display = "none";
        window.location.href = 'manager.html';

    } else {
        alert("Invalid NIC Number or Password");
    }
});


