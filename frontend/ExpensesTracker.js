class ExpensesTracker { 
    constructor () {
        this.information = []; 
        this.totalBalance = 0;  
        this.currCount = 0; 
        this.ls = localStorage;  
        this.reloadCount = 0; 
    }  

    addValues(expenses) { 
        let divAE = document.getElementById("activeExpenses"); 
        let h1TC = document.getElementById("Total Cost");
        divAE.innerHTML = ""; 
        h1TC.innerHTML = "";    
        this.information.push(expenses); 
        let max = this.information.length;  
        //console.log(this.information);
        this.totalBalance = 0; 
        let count = 0; 
        //this.ls.clear();
        this.information.forEach(t => {  
            // Create list items 
            let date = document.createElement("li");
            date.textContent = t[0] + " "; 
            //date.style.marginRight = "10px";

            let category = document.createElement("li"); 
            category.textContent = t[1] + " ";    
            category.style.display = "inline-block"; 
            category.style.marginRight = "10px";

            let description = document.createElement("li"); 
            description.textContent = t[2]; 
            description.style.display = "inline-block"; 
            description.style.marginRight = "10px"; 

            let amount = document.createElement("li"); 
            amount.textContent = this.formatedAmount(Number.parseFloat(t[3]));  
            amount.style.display = "inline-block"; 
            amount.style.marginRight = "10px";  

            // Create checkbox
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = description;   

            //  Update balance 
            this.totalBalance += Number.parseFloat(t[3]);    
            let totalBalanceUSD = document.createElement("li");
            totalBalanceUSD.textContent = this.formatedAmount(this.totalBalance); 
            totalBalanceUSD.style.display = "inline-block";
            totalBalanceUSD.style.marginRight = "10px";   

            // Create local storage data
            let lsArray = [];
            lsArray.push(t[0], t[1], t[2], t[3]);

            let tcClone = this.formatedAmount(this.totalBalance); 

            // Build Structure
            date.appendChild(category); 
            date.appendChild(description);
            date.appendChild(amount);
            date.appendChild(input);

            divAE.append(date); 

            count++; 
            
            // Update local storage
            this.ls.setItem(JSON.stringify(lsArray), "in progress");    
            //console.log(this.ls);

            // Add to header when max reached
            if (count == max && this.currCount > 0) {  
                h1TC.innerHTML = "";
                h1TC.append(tcClone);
            }

            if(this.currCount == 0) { 
                h1TC.append(tcClone); 
                this.currCount++;
            }
        })
    }     

    reloadContent() { 
        let divAE = document.getElementById("activeExpenses"); 
        let h1TC = document.getElementById("Total Cost");
        divAE.innerHTML = ""; 
        h1TC.innerHTML = "";   
        let max = this.ls.length;   
        this.totalBalance = 0;  
        for (let i = 0; i < this.ls.length; i++) {   
            let rawKey = this.ls.key(i);
            let key = JSON.parse(rawKey);
            //let values = JSON.parse(rawValue);
            //Create list items 
            let date = document.createElement("li");
            date.textContent = key[0] + " ";   
            //console.log("HI: " + this.ls.key(count));

            let category = document.createElement("li"); 
            category.textContent = key[1] + " ";    
            category.style.display = "inline-block"; 
            category.style.marginRight = "10px"; 

            let description = document.createElement("li"); 
            description.textContent = key[2];  
            //console.log(key[2]);
            description.style.display = "inline-block"; 
            description.style.marginRight = "10px";  

            let amount = document.createElement("li"); 
            amount.textContent = this.formatedAmount(key[3]);  
            amount.style.display = "inline-block"; 
            amount.style.marginRight = "10px"; 

            // Create checkbox
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = description;   

            //  Update balance 
            this.totalBalance += Number.parseFloat(key[3]);    
            let totalBalanceUSD = document.createElement("li");
            totalBalanceUSD.textContent = this.formatedAmount(this.totalBalance); 
            totalBalanceUSD.style.display = "inline-block";
            totalBalanceUSD.style.marginRight = "10px";  
            
            let tcClone = this.formatedAmount(this.totalBalance); 

            let lsArray = [];
            lsArray.push(key[0], key[1], key[2], key[3]); 
            let rawlsArray = JSON.stringify(lsArray);
            let actuallsArray = JSON.parse(rawlsArray);
            
            this.information.push(actuallsArray);

            // Build Structure
            date.appendChild(category); 
            date.appendChild(description);
            date.appendChild(amount);
            date.appendChild(input); 

            divAE.append(date);    

            // Add to header when max reached
            if (i == max - 1 && this.reloadCount > 0) {  
                console.log("Why am i here"); 
                h1TC.innerHTML = "";
                h1TC.append(tcClone);
            }

            if(this.reloadCount == 0) {  
                console.log("HI: " + tcClone);
                h1TC.append(tcClone); 
                this.reloadCount++;
            } 
        } 
        //console.log(this.ls);
    } 

    removeExpense(expense) {
        //ToDo
    }

    formatedAmount(num) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num);
    }  

    formatMonth(month) {
        if (month < 10) {
            month = '0' + month;
        }  
        return month;
    } 

    formatDay(day) {
        if (day < '10') {
            day = 0 + day;
        } 
        return day;
    } 

    clearLS() {
        this.ls.clear();
    }
}  

let instance = new ExpensesTracker();

document.getElementById("addExpense").addEventListener("click", (event) => {
    let arr = []; 
    let category = document.getElementById("category").value;  
    let description = document.getElementById("description").value; 
    let amount = document.getElementById("amount").value;    
    // Get and format date
    let today = new Date(); 
    let day = formatDay(today.getDay());
    let month = formatMonth(today.getMonth() + 1);
    let year = today.getFullYear();  
    const formatDate = `${day}/${month}/${year}`;
    arr.push(formatDate, category, description, amount);
    instance.addValues(arr);
});

document.addEventListener("DOMContentLoaded", (event) => { 
    instance.reloadContent(); 
});

function formatMonth(month) {
        if (month < 10) {
            month = '0' + month;
        }  
        return month;
    } 

function formatDay(day) {
    if (day < '10') {
        day = 0 + day;
    } 
    return day;
} 

/*document.addEventListener("DOMContentLoaded", (event) => {  
    instance.clearLS();   
});*/