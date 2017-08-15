var friends = require("../data/friends.js");

module.exports = function (app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });
    
    app.post("/api/friends", function(req, res){
        var newBestie = {
            name:"",
            photo:"",
            Diff: Infinity
        };

//        code below will take the results and parse it
        var userData = req.body;
        var Scores = userData.scores;
        
//        code below will calc the difference in user scores
        var totalDiff;
        
//        looping through all the possibilities in database
        for (var i = 0; i < friends.length; i++){
            var currentbestie = friends[i];
            totalDiff = 0;
             
            console.log(currentbestie.name);
            
//            looping through all friends
            for (var k = 0; k < currentbestie.scores.length; k++){
                var currentbestiescore = currentbestie.scores[k];
                var currentUserScore = Scores[k];
//                calculating deiff btwn scores and sums
                totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentbestiescore));
            }
//            if sum of diff is less than diff of currenbestie 
            if (totalDiff <= newBestie.Diff){
                newBestie.name = currentbestie.name;
                newBestie.photo = currentbestie.photo;
                newBestie.Diff = totalDiff;
            }
        }
        
        friends.push(userData);
        
        res.json(newBestie);
        
    });
    
};