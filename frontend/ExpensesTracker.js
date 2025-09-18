class ExpensesTracker { 
    constructor () {
        this.information = []; 
        this.totalBalance = 0; 
    }  

    addValues(expenses) {
        this.information.push(expenses);  
        let divAE = document.getElementById("activeExpenses"); 
        let h1TC = document.getElementById("Total Cost");
        divAE.innerHTML = ""; 
        h1TC.innerHTML = ""; 
        this.totalBalance = 0; 
        let max = this.information.length;
        let count = 0;
        this.information.forEach(t => { 
            let category = document.createElement("li"); 
            category.textContent = t[0] + " "; 
            category.style.display = "inline-block"; 
            let description = document.createElement("li"); 
            description.textContent = t[1]; 
            description.style.display = "inline-block"; 
            description.style.marginRight = "10px";
            let amount = document.createElement("li"); 
            amount.textContent = t[2];  
            amount.style.display = "inline-block"; 
            amount.style.marginRight = "10px";
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = description;  
            this.totalBalance += Number.parseFloat(t[2]);    
            let totalBalanceUSD = document.createElement("li");
            totalBalanceUSD.textContent = this.formatedAmount(this.totalBalance); 
            let tcClone = this.formatedAmount(this.totalBalance);
            totalBalanceUSD.style.display = "inline-block";
            totalBalanceUSD.style.marginRight = "10px";
            category.appendChild(description);
            category.appendChild(totalBalanceUSD); 
            category.appendChild(input); 
            console.log(category); 
            divAE.append(category);   
            count++; 
            if (count == max) { 
                h1TC.append(tcClone);
            }
        })
    }    





    formatedAmount(num) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num);
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