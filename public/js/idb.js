// Create a variable to hold db connection
let db;
// Establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1
const request = indexedDB.open('budget-tracker', 1);

// This event will emit if the database version changes (nonexistent to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // Save a reference to the database
    const db = event.target.result
    // Create an object store (table) called 'new_budget', set it to have an auto-incrementing primary key of sorts
    db.createObjectStore('new_budget', { autoIncrement: true }); 
};

// Upon a successful db creation
request.onsuccess = function(event) {
    // When db is successfully created with its object store (from onupgradeneeded event above)
    // or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // Check if app is online, if yes run uploadBudget() function to send all local db data to API
    if (navigator.onLine) {
        // uploadBudget();
    }
};

// If not successful db creation occurs
request.onerror = function(event) {
    // Log the error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new budget record and there's no internet connection
function saveRecord(record) {
    // Open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_budget'], 'readwrite');

    // Access the object store for 'new_budget'
    const budgetObjectStore = transaction.objectStore('new_budget');

    // Add budget record to your store with add method

    budgetObjectStore.add(record);
}