

let dvds = JSON.parse(localStorage.getItem("dvds")) ||
    [
        {
            dvdid: "001",
            dvdName: "Valimai",
            dvdimg: "./images/Dvd_01_Valimai.jpg",
            category: "Action",
            director: "H.Vinoth",
            releasedate: "09-06-2022",
            quantity: "10",
            price: "100"
        },
        {
            dvdid: "002",
            dvdName: "Bahubali",
            dvdimg: "./images/Dvd_02_Bahubali.jpg",
            category: "Fantacy",
            director: "S.RajaMouli",
            releasedate: "05-01-2019",
            quantity: "20",
            price: "150"
        }
    ]

let users = [];
fetch("http://localhost:3000/Users")
    .then(data => data.json())
    .then(data => {
        users.push(...data)
        console.log(users)
    })


let admins = JSON.parse(localStorage.getItem("admins")) ||
    [
        {
            userName: "Devid",
            userNic: "123456",
            password: "1234",
            email: "Devid@gmail.com",
            mobile: "0754305965"
        },
        {
            userName: "Billa",
            userNic: "234567",
            password: "2345",
            email: "Billa@gmail.com",
            mobile: "0773423214"
        }
    ]


localStorage.setItem("admins", JSON.stringify(admins));


let notifications = JSON.parse(localStorage.getItem("notifications")) || [];










// ,
//         {
//             dvdid: "003",
//             dvdName: "Kanguwa",
//             dvdimg: "Dvd_03_Kanguwa.jpg",
//             category: "Fantacy",
//             director: "S.Siva",
//             releasedate: "01-05-2024",
//             quantity: "20",
//             price: "200"
//         },
//         {
//             dvdid: "004",
//             dvdName: "Mahaan",
//             dvdimg: "Dvd_04_Mahaan.jpg",
//             category: "Action",
//             director: "S.Karthick",
//             releasedate: "01-10-2020",
//             quantity: "22",
//             price: "100"
//         },
//         {
//             dvdid: "005",
//             dvdName: "Naanee_Varuvean",
//             dvdimg: "Dvd_05_NaaneeVaruvean.jpg",
//             category: "Horror",
//             director: "D.Selvaragavan",
//             releasedate: "04-07-2022",
//             quantity: "14",
//             price: "220"
//         }