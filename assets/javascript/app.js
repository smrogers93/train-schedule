var firebaseConfig = {
    apiKey: "AIzaSyCsDeNQq3RyzUO5dPsWCUreRjyFDFK75CM",
    authDomain: "trains-2cbea.firebaseapp.com",
    databaseURL: "https://trains-2cbea.firebaseio.com",
    projectId: "trains-2cbea",
    storageBucket: "trains-2cbea.appspot.com",
    messagingSenderId: "283015769913",
    appId: "1:283015769913:web:8ce137097dedb918"
    };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#train-button").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var freq = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: dest,
        time: time,
        frequency: freq
    }
    
    database.ref().push(newTrain);

    $("#name-input").empty();
    $("#destination-input").empty();
    $("#time-input").empty();
    $("#frequency-input").empty();
})

database.ref().on("child_added", function(childSnapshot) {

    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var time = moment(childSnapshot.val().time, "hh:mm").format("LT");
    var freq = moment(childSnapshot.val().time, "hh:mm").add((moment(childSnapshot.val().frequency, "mm")));

    console.log(freq);

    

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(freq),
    )

    $("tbody").append(newRow)
})