document.addEventListener("DOMContentLoaded", function () {
    let userrepo = document.getElementById("userrepo");
    let userprofile = document.getElementById("userprofile");
    let userviewbody = document.getElementById("userviewbody");
    let userrepotable = document.getElementById("userrepotable");
    let userprofileform = document.getElementById("userprofileform");

    // let users = JSON.parse(localStorage.getItem('users')) || [];
    // let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    // let dvds = JSON.parse(localStorage.getItem('dvds')) || [];

    // Event listeners for navigation between sections
    userrepo.addEventListener("click", function (event) {
        event.preventDefault();
        userviewbody.style.display = "none";
        userrepotable.style.display = "block";
        userprofileform.style.display = "none";
        loadReports();
    });

    userprofile.addEventListener("click", function (event) {
        event.preventDefault();
        userviewbody.style.display = "none";
        userrepotable.style.display = "none";
        userprofileform.style.display = "block";
    });

    // Get current user's NIC from localStorage
    const currentUserNic = localStorage.getItem("currentUserNic");

    if (currentUserNic) {
        const user = users.find(user => user.userNic === currentUserNic);
        if (user) {
            document.getElementById("profile-name").value = user.userName;
            document.getElementById("profile-nicno").value = user.userNic;
            document.getElementById("profile-password").value = user.password;
            document.getElementById("profile-email").value = user.email;
            document.getElementById("profile-mobile").value = user.mobile;
        }
    }

    // Save profile changes
    const saveProfileBtn = document.getElementById("saveProfileBtn");

    saveProfileBtn.addEventListener("click", function () {
        const updatedName = document.getElementById("profile-name").value;
        const updatedPassword = document.getElementById("profile-password").value;
        const updatedEmail = document.getElementById("profile-email").value;
        const updatedMobile = document.getElementById("profile-mobile").value;

        // Find the user and update their details in the users array
        const userIndex = users.findIndex(user => user.userNic === currentUserNic);
        if (userIndex !== -1) {
            users[userIndex].userName = updatedName;
            users[userIndex].password = updatedPassword;
            users[userIndex].email = updatedEmail;
            users[userIndex].mobile = updatedMobile;

            // Update the user data in localStorage
            localStorage.setItem('users', JSON.stringify(users));

            alert("Profile updated successfully!");
        }
    });

    // Get the current date and return date (7 days later)
    function getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    function getReturnDate() {
        let returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 7); // Adds 7 days
        let dd = String(returnDate.getDate()).padStart(2, '0');
        let mm = String(returnDate.getMonth() + 1).padStart(2, '0');
        let yyyy = returnDate.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    // Search functionality
    let searchInput = document.querySelector(".searchdvd");

    searchInput.addEventListener("input", function () {
        let query = searchInput.value.toLowerCase();
        let filteredDvds = dvds.filter(dvd => {
            return dvd.dvdName.toLowerCase().includes(query) ||
                dvd.category.toLowerCase().includes(query) ||
                dvd.director.toLowerCase().includes(query);
        });
        populateGridView(filteredDvds);
    });

    // Populate the gridview with DVDs
    function populateGridView(dvdArray) {
        let gridview = document.getElementById("gridview");
        gridview.innerHTML = ""; // Clear existing DVDs

        dvdArray.forEach(dvd => {
            let grid = document.createElement("div");
            grid.innerHTML = `
                <h3>${dvd.dvdName}</h3>
                <img src="${dvd.dvdimg}" alt="" width="150px" height="200px">
                <h4>${dvd.category}</h4>
                <h4>${dvd.director}</h4>
                <h4>${dvd.releasedate}</h4>
                <h4>RS.${dvd.price}</h4>
                <button class="rentbtn" data-dvdname="${dvd.dvdName}">Rent</button>
            `;
            grid.className = "grid";
            gridview.appendChild(grid);
        });

        addRentButtonListeners();
    }

    // Add event listeners to all rent buttons
    function addRentButtonListeners() {
        document.querySelectorAll('.rentbtn').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();

                const dvdName = event.target.getAttribute('data-dvdname');
                const rentDate = getCurrentDate();
                const returnDate = getReturnDate();
                const currentUser = users.find(user => user.userNic === currentUserNic).userName;

                const rentRequest = {
                    userName: currentUser,
                    dvdName: dvdName,
                    rentDate: rentDate,
                    returnDate: returnDate,
                    status: 'Pending'
                };

                // Save to notifications
                notifications.push(rentRequest);
                localStorage.setItem('notifications', JSON.stringify(notifications));

                alert("Rent request sent to manager! Wait a few minutes.");
                location.reload(); // Reload the page to reflect updates
            });
        });
    }

    // Load reports into the table (filtered by current user)
    function loadReports() {
        let reportBody = document.getElementById("userepotable");
        reportBody.innerHTML = ""; // Clear existing rows

        // Filter notifications to show only those for the current user
        const userReports = notifications.filter(notification => notification.userName === users.find(user => user.userNic === currentUserNic).userName);

        userReports.forEach(notification => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${notification.userName}</td>
                <td>${notification.dvdName}</td>
                <td>${notification.rentDate}</td>
                <td>${notification.returnDate}</td>
                <td>${notification.status}</td>
            `;
            reportBody.appendChild(row);
        });
    }

    // Initial population of DVDs in gridview
    populateGridView(dvds);
});
