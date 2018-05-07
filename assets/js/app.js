$(document).ready(function () {
    var database = firebase.database();

    database.ref().on("child_added", function (snapshot) {
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().first;
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var tMinutesTillTrain = frequency - tRemainder;
        var comingTrain = currentTime.add(tMinutesTillTrain, "minutes");
        var tr = $("<tr>");
        var trainName = $("<td>");
        snapshot.val().train;
        trainName.text(snapshot.val().train);
        var city = $("<td>");
        city.text(snapshot.val().destination);
        var frequency = $("<td>");
        frequency.text(snapshot.val().frequency);
        var next = $("<td>");
        next.text(moment(comingTrain).format('LT'));
        var away = $("<td>");
        away.text(tMinutesTillTrain);
        tr.append(trainName);
        tr.append(city);
        tr.append(frequency);
        tr.append(next);
        tr.append(away);
        $("#tableBody").append(tr);

        
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var train = $("#trainName").val().trim();
        var dest = $("#destination").val().trim();
        var firstTrain = $("#trainTime").val();
        var frequency = $("#freq").val().trim();
        var obj = {
            train: train,
            destination: dest,
            first: firstTrain,
            frequency: frequency
        }
        database.ref().push(obj);
    })
})