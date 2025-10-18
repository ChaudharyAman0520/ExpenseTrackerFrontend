const API_BASE = 'http://localhost:8080/api/users';

async function fetchData(endpoint){
    const res = await fetch(API_BASE + endpoint);
    return res;
}

async function postData(endpoint, data, method) {
    const res = await fetch(API_BASE + endpoint, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return res;
}

async  function createUser() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const user = {
        name: name,
        email: email,
    };
    try {
        const res = await postData('', user, 'POST');
        if (!res.ok) {
            document.getElementById("CreateUser").innerText = "Failed To Create User";
            return;
        }
        document.getElementById("CreateUser").innerText = "Created User";
        document.getElementById("createUserForm").reset();
    } catch (error) {
        document.getElementById("CreateUser").innerText = "Error In Creating User";
        console.log(error);
    }
}

async function fetchAllUsers() {
    try{
        const res = await fetchData('');
        if(!res.ok) {
            document.getElementById("GetUser").innerText = "Failed To fetch users";
            return;
        }
        const result = await res.json();
        document.getElementById("GetUser").textContent = JSON.stringify(result, null, 2);
    }catch(error) {
        document.getElementById("GetUser").innerText = "Error Fetching Users";
        console.log(error);
    }
}

async function fetchUsersByID() {
    const id = document.getElementById("userId").value;
    if(!id){
        return alert("Enter A User Id");
    }
    try{
        const res = await fetchData('/' + id);
        if(!res.ok) {
            document.getElementById("GetUserById").innerText = "Failed To fetch user";
            return;
        }
        const result = await res.json();
        document.getElementById("GetUserById").textContent = JSON.stringify(result, null, 2);
    }catch(error) {
        document.getElementById("GetUserById").innerText = "Error Fetching Users";
        console.log(error);
    }
}

async function updateUser(){
    const id = document.getElementById("updateUserId").value;
    const name = document.getElementById("updateUserName").value;
    const email = document.getElementById("updateUserEmail").value;
    const user = {
        name: name,
        email: email
    }
    try{
        const res = await postData('/' + id, user, 'PUT');
        if(!res.ok) {
            document.getElementById("UpdateUser").innerText = "Failed To Update user";
            return;
        }
        const result = await res.json();
        document.getElementById("UpdateUser").textContent = JSON.stringify(result, null, 2);
        }catch(error) {
            document.getElementById("UpdateUser").innerText = "Error Updating User";
            console.log(error);
        }
}

async function deleteUser() {
    const id = document.getElementById("deleteUserId").value;
    if (!id) {
        return alert("Enter a User ID");
    }
    try {
        const res = await postData('/' + id, null, 'DELETE');
        if (!res.ok) {
            document.getElementById("DeleteUser").innerText = "Failed To Delete User";
            return;
        }
        document.getElementById("DeleteUser").innerText = "Deleted Successfully";
    } catch (error) {
        document.getElementById("DeleteUser").innerText = "Error Deleting User";
        console.log(error);
    }
}





