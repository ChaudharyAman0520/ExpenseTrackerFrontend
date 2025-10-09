const BASE_URL = "http://localhost:8080/api/auth"

async function registerUser(){
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    if(!name || !email || !password){
        alert("All fields Are Required");
    }
    try{
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password})
        });

        if(res.ok){
            alert("Successfully Registered");
            window.location.href = "login.html";
        }else{
            const data = await res.json();
            alert(data.message || "Registration Failed");
        }
    }catch(error){
        console.log(error);
        alert("Something Went Wrong");
    }
}

async function loginUser(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    if(!email || !password){
        alert("All fields Are Required");
    }

    try{
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        });

        if(res.ok){
            alert("Successfull Login Redirecting");
            window.location.href = "Users.html";
        }else{
            const data = await res.json();
            alert(data.message || "Login Failed");
        }
    }catch(error){
        console.log(error);
        alert("Something Went Wrong");
    }
}