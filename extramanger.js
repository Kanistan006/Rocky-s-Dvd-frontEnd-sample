


// Existing code for buttons (DVD Details, Customer Details, Notification)
let dvddetailsbtn = document.getElementById("dvddetailsbtn");
let cusdetailsbtn = document.getElementById("cusdetailsbtn");
let notificationbtn = document.getElementById("notificationbtn");

let dvddetails = document.getElementById("dvddetails");
let cusdetails = document.getElementById("cusdetails");
let notification = document.getElementById("notification");
let welcomecnt = document.getElementById("welcomecnt");


dvddetailsbtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    welcomecnt.style.display = "none";
    dvddetails.style.display = "block";
    cusdetails.style.display = "none";
    notification.style.display = "none";
    inventoryrepo.style.display = "none";
    rentalrepo.style.display = "none";
    customerrepo.style.display = "none";
});

cusdetailsbtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    welcomecnt.style.display = "none";
    dvddetails.style.display = "none";
    cusdetails.style.display = "block";
    notification.style.display = "none";
    inventoryrepo.style.display = "none";
    rentalrepo.style.display = "none";
    customerrepo.style.display = "none";
});

notificationbtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    welcomecnt.style.display = "none";
    dvddetails.style.display = "none";
    cusdetails.style.display = "none";
    notification.style.display = "block";
    inventoryrepo.style.display = "none";
    rentalrepo.style.display = "none";
    customerrepo.style.display = "none";
});

// New code to handle report selection
let reportSelect = document.getElementById("reportSelect");
let inventoryrepo = document.querySelector(".inventoryrepo");
let rentalrepo = document.querySelector(".rentalrepo");
let customerrepo = document.querySelector(".customerrepo");

reportSelect.addEventListener("change", function () {
    let selectedReport = reportSelect.value;

    // Hide all report sections initially
    inventoryrepo.style.display = "none";
    rentalrepo.style.display = "none";
    customerrepo.style.display = "none";
    welcomecnt.style.display = "none";
    dvddetails.style.display = "none";
    cusdetails.style.display = "none";
    notification.style.display = "none";

    // Show the selected report section based on the value
    if (selectedReport === "inventory_Report") {
        inventoryrepo.style.display = "block";
    } else if (selectedReport === "rental_Report") {
        rentalrepo.style.display = "block";
    } else if (selectedReport === "customer_Report") {
        customerrepo.style.display = "block";
    }
});



const adddvd = document.getElementById("adddvd");
// Get open modal button
const addbtn = document.getElementById("addbtn");
// Get close button (the "x")
const closeBtn = document.querySelector(".close-btn");
// Open modal when the button is clicked
addbtn.addEventListener("click", () => {
    adddvd.style.display = "block";
});
// Close modal when the close button is clicked
closeBtn.addEventListener("click", () => {
    adddvd.style.display = "none";
});
// Close modal when clicking anywhere outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === adddvd) {
        adddvd.style.display = "none";
    }
});














// Function to render the DVD table
function renderDvdTable() {
    let dvdtbody = document.getElementById("dvdtbody");
    dvdtbody.innerHTML = ''; // Clear the table

    dvds.forEach((element, index) => {
        let tablerow = document.createElement("tr");
        tablerow.innerHTML = `
            <td>${element.dvdid}</td> 
            <td>${element.dvdName}</td>
            <td><img src="${element.dvdimg}" alt="" width="130px" height="180px"></td>
            <td>${element.category}</td>
            <td>${element.director}</td>
            <td>${element.releasedate}</td>
            <td>${element.quantity}</td>
            <td>${element.price}</td>
            <td>
                <button class="editbtn" style="background-color: green; color: aliceblue;" data-index="${index}">Edit</button>
                <button class="deletebtn" style="background-color: red; color: aliceblue;" data-index="${index}">Delete</button>
            </td>
        `;
        dvdtbody.appendChild(tablerow);
    });

    attachDeleteListeners();
    attachEditListeners();
}

// Function to attach delete listeners
function attachDeleteListeners() {
    document.querySelectorAll(".deletebtn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            deleteDvd(index);
        });
    });
}

// Function to attach edit listeners
function attachEditListeners() {
    document.querySelectorAll(".editbtn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            editDvd(index);
        });
    });
}

// Delete DVD from the array and update localStorage
function deleteDvd(index) {
    dvds.splice(index, 1); // Remove the DVD at the given index
    localStorage.setItem("dvds", JSON.stringify(dvds)); // Update localStorage
    alert("DVD deleted successfully!");
    renderDvdTable(); // Re-render the table after deletion
}

// Edit DVD details
function editDvd(index) {
    let dvd = dvds[index];

    // Pre-fill the form fields with the selected DVD data
    document.getElementById("dvdid").value = dvd.dvdid;
    document.getElementById("dvdname").value = dvd.dvdName;
    document.getElementById("category").value = dvd.category;
    document.getElementById("director").value = dvd.director;
    document.getElementById("reldate").value = dvd.releasedate;
    document.getElementById("quantity").value = dvd.quantity;
    document.getElementById("price").value = dvd.price;

    // Set editing state
    isEditing = true;
    adddvd.style.display = "block";

    // Handle form submission for editing
    registerbtn.onclick = function (event) {
        event.preventDefault();
        updateDvd(index); // Pass the index to the update function
    };
}


// Update DVD details and save to localStorage
function updateDvd(index) {
    let dvdid = document.getElementById("dvdid").value;
    let dvdname = document.getElementById("dvdname").value;
    let category = document.getElementById("category").value;
    let director = document.getElementById("director").value;
    let reldate = document.getElementById("reldate").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let dvdimage = document.getElementById("dvdimage").files[0];

    if (dvdimage) {
        let reader = new FileReader();
        reader.readAsDataURL(dvdimage);
        reader.onload = function () {
            // Create a DVD object with updated values including the new image
            let updatedDvd = {
                dvdid: dvdid,
                dvdName: dvdname,
                dvdimg: reader.result, // Use the base64 image from FileReader
                category: category,
                director: director,
                releasedate: reldate,
                quantity: quantity,
                price: price
            };

            // Update the DVD in the array
            dvds[index] = updatedDvd;

            // Save changes to localStorage
            localStorage.setItem("dvds", JSON.stringify(dvds));

            alert("DVD updated successfully!");
            adddvd.style.display = "none"; // Close the modal
            renderDvdTable(); // Re-render the table to show updated values
        };
    } else {
        // If no new image is uploaded, retain the old image
        let updatedDvd = {
            dvdid: dvdid,
            dvdName: dvdname,
            dvdimg: dvds[index].dvdimg, // Retain the existing image
            category: category,
            director: director,
            releasedate: reldate,
            quantity: quantity,
            price: price
        };

        // Update the DVD in the array
        dvds[index] = updatedDvd;

        // Save changes to localStorage
        localStorage.setItem("dvds", JSON.stringify(dvds));

        alert("DVD updated successfully!");
        adddvd.style.display = "none"; // Close the modal
        renderDvdTable(); // Re-render the table to show updated values
    }
}


// Add new DVD
document.getElementById("registerbtn").addEventListener("click", function (event) {
    event.preventDefault();
    if (isEditing) {
        // If currently editing, do not add a new DVD
        return;
    }
    addNewDvd();
});

// Function to add a new DVD
function addNewDvd() {
    let dvdid = document.getElementById("dvdid").value;
    let dvdname = document.getElementById("dvdname").value;
    let category = document.getElementById("category").value;
    let director = document.getElementById("director").value;
    let reldate = document.getElementById("reldate").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let dvdimage = document.getElementById("dvdimage").files[0];

    if (dvdimage) {
        let reader = new FileReader();
        reader.readAsDataURL(dvdimage);
        reader.onload = function () {
            dvds.push({
                dvdid: dvdid,
                dvdName: dvdname,
                dvdimg: reader.result,
                category: category,
                director: director,
                releasedate: reldate,
                quantity: quantity,
                price: price
            });
            localStorage.setItem("dvds", JSON.stringify(dvds));
            alert("DVD added successfully!");
            adddvd.style.display = "none";
            renderDvdTable(); // Re-render the table after adding
        };
    }
}


// Clear form fields
function clearForm() {
    document.getElementById("dvdid").value = '';
    document.getElementById("dvdname").value = '';
    document.getElementById("category").value = '';
    document.getElementById("director").value = '';
    document.getElementById("reldate").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
    document.getElementById("dvdimage").value = ''; // Clear image input
}

// Variable to track if currently editing
let isEditing = false;

// Render the initial DVD table
renderDvdTable();































//customer details
let custbody = document.getElementById("custbody");

users.forEach(element => {
    let custr = document.createElement("tr");
    custr.innerHTML = `
     <td>${element.userName}</td> 
            <td>${element.userNic}</td>
            <td>${element.email}</td>
            <td>${element.mobile}</td>
       
      
    `;
    custbody.appendChild(custr);

});
localStorage.setItem("users", JSON.stringify(users));



//notifications
let notifitbody = document.getElementById("notifitbody");

notifications.forEach((notification, index) => {
    let row = document.createElement("tr");
    let actionsHTML = '';

    if (notification.status === 'Pending') {
        // Show Accept and Reject buttons if the status is 'Pending'
        actionsHTML = `
            <button class="acceptbtn" style="background-color: green; color: aliceblue;" data-index="${index}">Accept</button>
            <button class="rejectbtn" style="background-color: red; color: aliceblue;" data-index="${index}">Reject</button>
        `;
    } else if (notification.status === 'Accepted') {
        // Show Return button if the status is 'Accepted'
        actionsHTML = `
            <button class="returnbtn" style="background-color: blue; color: aliceblue;" data-index="${index}">Return</button>
        `;
    } // No buttons for 'Returned' status

    row.innerHTML = `
        <td>${notification.userName}</td>
        <td>${notification.dvdName}</td>
        <td class="rentDate">${notification.rentDate}</td>
        <td class="returnDate">${notification.returnDate}</td>
        <td class="status">${notification.status}</td>
        <td class="actions">
            ${actionsHTML}
        </td>
    `;
    notifitbody.appendChild(row);
});

// Add event listeners to the accept, reject, and return buttons
notifitbody.addEventListener('click', function(event) {
    let index = event.target.getAttribute('data-index');
    
    if (event.target.classList.contains('acceptbtn')) {
        // Accept button clicked
        notifications[index].status = 'Accepted';
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        // Update the UI: Remove accept/reject buttons and add a return button
        let row = event.target.closest('tr');
        row.querySelector('.status').textContent = 'Accepted';
        let actionsCell = row.querySelector('.actions');
        actionsCell.innerHTML = `
            <button class="returnbtn" style="background-color: blue; color: aliceblue;" data-index="${index}">Return</button>
        `; // Replace the accept/reject buttons with the return button
        
        // Decrease DVD quantity
        let dvdName = notifications[index].dvdName;
        let dvd = dvds.find(dvd => dvd.dvdName === dvdName);
        if (dvd && dvd.quantity > 0) {
            dvd.quantity--; // Decrease the quantity
            localStorage.setItem('dvds', JSON.stringify(dvds)); // Save updated DVD data to localStorage
            alert(`The quantity of ${dvdName} has been decreased. Remaining quantity: ${dvd.quantity}`);
        } else {
            alert(`Sorry, the DVD "${dvdName}" is out of stock.`);
        }
        
    } else if (event.target.classList.contains('rejectbtn')) {
        // Reject button clicked
        notifications[index].status = 'Rejected';
        notifications[index].rentDate = '';
        notifications[index].returnDate = '';
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        // Update the UI: Clear rent/return dates and update the status
        let row = event.target.closest('tr');
        row.querySelector('.status').textContent = 'Rejected';
        row.querySelector('.rentDate').textContent = '';
        row.querySelector('.returnDate').textContent = '';
        
        // Remove accept/reject buttons (if you also want them to disappear on rejection)
        row.querySelector('.actions').innerHTML = ''; 
    } else if (event.target.classList.contains('returnbtn')) {
        // Return button clicked
        notifications[index].status = 'Returned';
        localStorage.setItem('notifications', JSON.stringify(notifications));

        // Update UI to reflect the return status
        let row = event.target.closest('tr');
        row.querySelector('.status').textContent = 'Returned';
        
        // Remove the return button after clicking it
        row.querySelector('.actions').innerHTML = '';
        
        // Increase DVD quantity back after return
        let dvdName = notifications[index].dvdName;
        let dvd = dvds.find(dvd => dvd.dvdName === dvdName);
        if (dvd) {
            dvd.quantity++; // Increase the quantity
            localStorage.setItem('dvds', JSON.stringify(dvds)); // Save updated DVD data to localStorage
            alert(`The quantity of ${dvdName} has been increased. Current quantity: ${dvd.quantity}`);
        }
    }
});