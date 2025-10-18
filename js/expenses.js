const API_BASE = 'http://localhost:8080/api/expenses';
const CATEGORY_API = 'http://localhost:8080/api/categories';
const CURRENT_USER_ID = 4;
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

async function addCategories(){
    const dropdown = document.getElementById('categoryDropdown');
    try{
        const res = await fetch(CATEGORY_API);
        if(!res.ok){
            document.getElementById("createExpense").innerText = "Failed To Fetch Categories";
        }
        const result = await res.json();
        for (let i = 0; i < result.length; i++) {
            const option = document.createElement("option");
            option.value = result[i].categoryId;
            option.textContent = result[i].categoryName;
            dropdown.appendChild(option);
        }
    }catch(error){
        document.getElementById("createExpense").innerText = "Error Loading Categories";
        console.log(error);
    }
}

async function createExpense(){
    // const userId = document.getElementById("userId").value;
    const categoryId = document.getElementById("categoryDropdown").value;
    const amount = document.getElementById("expenseAmount").value;
    const date = document.getElementById("expenseDate").value;
    const description = document.getElementById("expenseDescription").value;
    const expense = {
        userId: CURRENT_USER_ID,
        categoryId: categoryId,
        expenseAmount: amount,
        expenseDate: date,
        note: description
    };
    try{
        const res = await postData('',expense,'POST');
        if(!res.ok){
            document.getElementById("createExpense").innerText = "Failed To Create Expense";
            return;
        }
        document.getElementById("createExpense").innerText = "Created Expense";
        document.getElementById("expenseForm").reset();
    }catch(error){
        document.getElementById("createExpense").innerText = "Error In Creating Expense";
        console.log(error);
    }
}

async function addCategory(){
    const name = prompt("Enter Category");
    if(!name){
        return;
    }
    const description = prompt("Enter description for this category (optional):");
    try{
        const res = await fetch(CATEGORY_API,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({categoryName : name, description: description}),
        });
        if(!res.ok){
            alert("Failed to Create Category");
            return;
        }
        const category = await res.json();
        const dropDown = document.getElementById('categoryDropdown');
        const option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.categoryName;
        dropDown.appendChild(option);
    }catch(error){
        console.error(error);
        alert("Error Adding Category");
    }
}

window.addEventListener("DOMContentLoaded", function() {
    addCategories();
});