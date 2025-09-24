class ExpensesTracker { 
    constructor () {
        this.information = []; 
        this.totalBalance = 0;  
        this.currCount = 0; 
        this.ls = localStorage;  
        this.reloadCount = 0;  
        this.removeCount = 0;

        // Add event listener once here
        document.getElementById("completed").addEventListener("click", (event) => {
            this.removeExpense(document.getElementById("activeExpenses"));
        })
    }  

    addValues(expenses) { 
        let divAE = document.getElementById("activeExpenses"); 
        let h1TC = document.getElementById("Total Cost");
        divAE.innerHTML = ""; 
        h1TC.innerHTML = "";    
        this.information.push(expenses); 
        let max = this.information.length;  
        this.totalBalance = 0; 
        let count = 0; 

        this.information.forEach(t => {  
            // Create list items 
            let date = document.createElement("li");
            date.textContent = t[0] + " "; 

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

            // Use description string for ID
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = t[2];   

            // Update balance 
            this.totalBalance += Number.parseFloat(t[3]);    
            let tcClone = this.formatedAmount(this.totalBalance);  

            // Build Structure
            date.appendChild(category); 
            date.appendChild(description);
            date.appendChild(amount);
            date.appendChild(input);

            divAE.append(date); 

            count++; 
            
            // Update local storage
            this.ls.setItem(JSON.stringify(t), "in progress");    

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

            let date = document.createElement("li");
            date.textContent = key[0] + " ";   

            let category = document.createElement("li"); 
            category.textContent = key[1] + " ";    
            category.style.display = "inline-block"; 
            category.style.marginRight = "10px"; 

            let description = document.createElement("li"); 
            description.textContent = key[2];  
            description.style.display = "inline-block"; 
            description.style.marginRight = "10px";  

            let amount = document.createElement("li"); 
            amount.textContent = this.formatedAmount(key[3]);  
            amount.style.display = "inline-block"; 
            amount.style.marginRight = "10px"; 

            // Use description string
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = key[2];   

            this.totalBalance += Number.parseFloat(key[3]);    
            let tcClone = this.formatedAmount(this.totalBalance);  

            let lsArray = [];
            lsArray.push(key[0], key[1], key[2], key[3]); 
            this.information.push(lsArray);

            date.appendChild(category); 
            date.appendChild(description);
            date.appendChild(amount);
            date.appendChild(input); 

            divAE.append(date);    

            if (i == max - 1 && this.reloadCount > 0) {  
                h1TC.innerHTML = "";
                h1TC.append(tcClone);
            }

            if(this.reloadCount == 0) {  
                h1TC.append(tcClone); 
                this.reloadCount++;
            } 
        } 
    } 

    removeExpense(divAE) {
        let h1TC = document.getElementById("Total Cost"); 
        h1TC.innerHTML = "";

        this.information = this.information.filter(t => { 
            let cb = document.getElementById(t[2]);  
            if (cb && cb.checked) { 
                // Remove from localStorage completely
                this.ls.removeItem(JSON.stringify(t));
                return false;
            } 
            return true;
        });   
        
        divAE.innerHTML = ""; 
        let max = this.information.length;
        let count = 0; 
        this.totalBalance = 0;
        
        this.information.forEach(t => { 
            let date = document.createElement("li");
            date.textContent = t[0] + " "; 

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

            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = t[2];   

            this.totalBalance += Number.parseFloat(t[3]);   
            let tcClone = this.formatedAmount(this.totalBalance);   

            date.appendChild(category); 
            date.appendChild(description);
            date.appendChild(amount);
            date.appendChild(input);

            divAE.append(date); 

            count++; 
            
            this.ls.setItem(JSON.stringify(t), "in progress");    

            if (count == max && this.removeCount > 0) {  
                h1TC.innerHTML = "";
                h1TC.append(tcClone);
            }

            if(this.removeCount == 0) { 
                h1TC.append(tcClone); 
                this.removeCount++;
            }
        })
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
        if (day < 10) {
            day = '0' + day;
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

    let today = new Date(); 
    let day = instance.formatDay(today.getDate());
    let month = instance.formatMonth(today.getMonth() + 1);
    let year = today.getFullYear();  
    const formatDate = `${day}/${month}/${year}`;

    arr.push(formatDate, category, description, amount);
    instance.addValues(arr);
});

document.addEventListener("DOMContentLoaded", (event) => { 
    instance.reloadContent(); 
});


//Testing purposes
/*document.addEventListener("DOMContentLoaded", (event) => {  
    instance.clearLS();   
});*/