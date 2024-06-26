//this js file is responsible for the leaderborad logic 

// this function creats an object with a userame and score to organise localStorage with the scores

function leaderBoard() {
    // gets the user to enter a name for the leaderBoard 
    let username = prompt('Enter your name to go on to the leaderboard');
    
    if(username == null || username.trim == '') {
        leaderBoard();
        return;
    }

    // checks if the username is already in the localStorage
    username = username.trim();
    if (sameUsername(username)==false) {
        leaderBoard();
        return;
    }
    // checks if the username isnt empty
    if (username != '' ) {
        let points = {};
        

        // Get all scores from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let lastDot = value.lastIndexOf('.');
            let score = parseInt(value.substring(lastDot + 1));
            points[key] = score;
        }

        // Add the current user's score
        points[username] = score; 

        // Convert the points object to an array of objects
        let scores = Object.keys(points).map(key => ({ username: key, score: points[key] }));

        // Sort the scores in descending order
        scores.sort((a, b) => b.score - a.score);

        // If there are more than 5 scores, remove the ones with the lowest scores
        

        
        for (let i = 0; i < scores.length; i++) {
            localStorage.setItem(scores[i].username, scores[i].username + '......' + scores[i].score);
        }
        
    }
    else{
        leaderBoard();
    }

    }

    // this functions displays the score at the start of each round 
    function leaderboardAlways() {
        const scoresElement = document.querySelector('.leaderboard ol');

        // Get all scores from localStorage
        let scoresList = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            let lastDot = value.lastIndexOf('.');
            let score = parseInt(value.substring(lastDot + 1));
            scoresList.push({ username: key, score: score });
        }

        // Sort the scores in descending order
        scoresList.sort((a, b) => b.score - a.score);

        if (scoresList.length > 5){
            
            
            scoresList.length = 5
            
            
        }
        // Display the scores
        for (let i = 0; i < scoresList.length; i++) {
            let listItem = document.createElement('li');
            listItem.textContent = scoresList[i].username + '......' + scoresList[i].score;
            scoresElement.appendChild(listItem);
        }

        
    }
    //function for checking if username is the same 
    function sameUsername(username){
        for (let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            
            if (key === username){
                return false;
            }
            
        }
    }