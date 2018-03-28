
var friends 		= require('../data/friend.js');

module.exports = function(app){
    app.get('/api/friends', function(req, res){
    res.json(friends);
});


app.post('/api/friends', function(req, res){
    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: 1000
    };

var userData 	= req.body;
var userName 	= userData.name;
var userPhoto 	= userData.photo;
var userScores 	= userData.scores;

var totalDifference = 0;

for  (var i=0; i< friends.length; i++) {

    console.log(friends[i].name);
    totalDifference = 0;

    for (var k=0; k< friends[i].scores[k]; k++){

        totalDifference += Math.abs(parseInt(userScores[k]) - parseInt(friends[i].scores[k]));

        if (totalDifference <= bestMatch.friendDifference){

            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
        }
    }
}

friends.push(userData);
res.json(bestMatch);

});

}