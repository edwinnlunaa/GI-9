// Define a class called BudgetTracker
class BudgetTracker {
    constructor() {
        // arrays to store income and expenses
        this.income = [];
        this.expenses = [];
        // variables to store total income, total expenses, and total budget
        this.totalIncome = 0;
        this.totalExpenses = 0;
        this.totalBudget = 0;
        // arrays to store income history and expenses history
        this.incomeHistory = [];
        this.expenseHistory = [];
    }

    // Method to add income with a description and amount
    addIncome(description, amount) {
        this.income.push({ description, amount }); // Add the income object {description, amount} to the income array
        this.calculateTotals(); // Recalculate total income, total expenses, and total budget
        this.updateUI(); // Update the user interface with the new totals

        // Add income to history log
        this.incomeHistory.push({ description, amount, timestamp: new Date() });
        this.updateIncomeHistory();
    }

    // Method to add expense with a description and amount
    addExpense(description, amount) {
        this.expenses.push({ description, amount });  // Add the expense object {description, amount} to the expenses array
        this.calculateTotals(); // Recalculate total income, total expenses, and total budget
        this.updateUI();// Update the user interface with the new totals

        // Add expense to history log
        this.expenseHistory.push({ description, amount, timestamp: new Date() });
        this.updateExpenseHistory();
    }

    // Method to calculate total income, total expenses, and total budget
    calculateTotals() {
        this.totalIncome = this.income.reduce((total, item) => total + item.amount, 0); // Sum up all income amounts in the income array
        this.totalExpenses = this.expenses.reduce((total, item) => total + item.amount, 0); // Sum up all expense amounts in the expenses array
        this.totalBudget = this.totalIncome - this.totalExpenses; // Calculate total budget by subtracting total expenses from total income
    }

    updateUI() {
        document.getElementById('total-income').textContent = `$${this.totalIncome}`; // Update the total income element in the HTML with the calculated total income
        document.getElementById('total-expenses').textContent = `$${this.totalExpenses}`; // Update the total expenses element in the HTML with the calculated total expenses
        document.getElementById('total-budget').textContent = `$${this.totalBudget}`; // Update the total budget element in the HTML with the calculated total budget
    }

    // This function updates the list of income history displayed on the webpage.
    updateIncomeHistory() {
        const incomeHistoryList = document.getElementById('income-history'); // Get the HTML element that represents the list of income history.
        incomeHistoryList.innerHTML = ''; // Clear previous history
        this.incomeHistory.forEach(income => { // Loop through each income entry in the income history array.
            const listItem = document.createElement('li');  // Create a new list item element for each income entry.
            listItem.textContent = `${income.description}: $${income.amount}`; // Set the text content of the list item to display the income description and amount.
            incomeHistoryList.appendChild(listItem); // Add the newly created list item to the income history list on the webpage.
        });
    }

    // This function updates the list of expense history displayed on the webpage.
    updateExpenseHistory() {
        const expenseHistoryList = document.getElementById('expense-history'); // Get the HTML element that represents the list of expense history.
        expenseHistoryList.innerHTML = ''; // Clear previous history
        this.expenseHistory.forEach(expense => { // Loop through each expense entry in the expense history array.
            const listItem = document.createElement('li');  // Create a new list item element for each expense entry.
            listItem.textContent = `${expense.description}: $${expense.amount}`; // Set the text content of the list item to display the expense description and amount.
            expenseHistoryList.appendChild(listItem); // Add the newly created list item to the expense history list on the webpage.
        });
    }
}

// Create an instance of the BudgetTracker class
const budgetTracker = new BudgetTracker();
document.getElementById('add-income-btn').addEventListener('click', () => { // Add event listeners to the 'Add Income' and 'Add Expense' buttons in the HTML
    // Get the description and amount input values from the HTML and trim any whitespace
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value.trim());
    // Check if description is not empty and amount is a valid number greater than 0
    if (description && !isNaN(amount) && amount > 0) {
        // If conditions are met, call the addIncome method of the budgetTracker instance
        budgetTracker.addIncome(description, amount);
    } else {
        // If conditions are not met, show an alert to the user
        alert('Please enter a valid income description and amount.');
    }
});

document.getElementById('add-expense-btn').addEventListener('click', () => { // Add event listener to the 'Add Expense' button in the HTML
     // Get the description and amount input values from the HTML and trim any whitespace
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value.trim());
    // Check if description is not empty and amount is a valid number greater than 0
    if (description && !isNaN(amount) && amount > 0) {
         // If conditions are met, call the addExpense method of the budgetTracker instance
        budgetTracker.addExpense(description, amount);
    } else {
         // If conditions are not met, show an alert to the user
        alert('Please enter a valid expense description and amount.');
    }
});