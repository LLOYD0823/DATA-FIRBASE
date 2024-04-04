import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCeSy9qMibAAYCZg5cipJ8097qeh3vwF08",
    authDomain: "testingapp-589a1.firebaseapp.com",
    databaseURL: "https://testingapp-589a1-default-rtdb.firebaseio.com",
    projectId: "testingapp-589a1",
    storageBucket: "testingapp-589a1.appspot.com",
    messagingSenderId: "920622301670",
    appId: "1:920622301670:web:8937030299600fede51627",
    measurementId: "G-ZJP7HRFH98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const tbody = document.getElementById('tbody1');

function AddItemToTable(ItineraryID, Activities, Destination, EndDate, StartDate) {
    const trow = document.createElement("tr");

    const td1 = document.createElement('td');
    td1.textContent = ItineraryID;

    const td2 = document.createElement('td');
    td2.textContent = Activities;

    const td3 = document.createElement('td');
    td3.textContent = Destination;

    const td4 = document.createElement('td');
    td4.textContent = EndDate;

    const td5 = document.createElement('td');
    td5.textContent = StartDate;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}

function GetAllDataRealtime() {
    const dbRef = ref(db, "Itinerary/-NtWuPfxjJrAOjLLKqVK"); // Assuming the data is fetched based on a specific Itinerary ID
    onValue(dbRef, (snapshot) => {
        tbody.innerHTML = ""; // Clear previous data
        const data = snapshot.val();
        if (data) {
            AddItemToTable(
                "-NtWuPfxjJrAOjLLKqVK",
                data.Activities,
                data.Destination,
                data["End Date"],
                data["Start Date"]
            );
        } else {
            tbody.innerHTML = "<tr><td colspan='5'>No data available</td></tr>";
        }
    }, (error) => {
        console.error("Error fetching data:", error);
    });
}

window.onload = GetAllDataRealtime;
