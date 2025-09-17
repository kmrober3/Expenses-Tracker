class ExpensesTracker { 
    constructor () {
        this.information = []; 
        this.totalBalance = 0; 
    }  

    addValues(expenses) {
        this.information.push(expenses);  
        let divAE = document.getElementById("activeExpenses");
        divAE.innerHTML = "";
        this.information.forEach(t => { 
            let category = document.createElement("li"); 
            category.textContent = t[0];
            let description = document.createElement("li"); 
            description.textContent = t[1];
            let amount = document.createElement("li"); 
            amount.textContent = t[2]; 
            let ul =  document.createElement("ul"); 
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = description; 
            category.appendChild(description);
            category.appendChild(amount); 
            category.appendChild(input);
            //ul.appendChild(category);
            //ul.appendChild(description); 
            //ul.appendChild(amount);   
            //ul.appendChild(input); 
            divAE.append(category);

        })
        //ToDo
    }  

}  

let instance = new ExpensesTracker();

document.getElementById("addExpense").addEventListener("click", (event) => {
    let arr = []; 
    let category = document.getElementById("category").value;  
    console.log(category);
    let description = document.getElementById("description").value; 
    console.log(description);
    let amount = document.getElementById("amount").value;  
    console.log(amount);
    arr.push(category);
    arr.push(description);
    arr.push(amount);  
    console.log(arr);
    instance.addValues(arr);
})