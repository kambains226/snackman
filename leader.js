
// this function creats an object with a userame and score to organise localStorage with the scores




function leaderBoard() {
    let username = prompt('Enter your name to go on to the leaderboard');
if (username != '') {
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
    points[username] = score; // Assuming 'score' is a global variable

    // Convert the points object to an array of objects
    let scores = Object.keys(points).map(key => ({ username: key, score: points[key] }));

    // Sort the scores in descending order
    scores.sort((a, b) => b.score - a.score);

    // If there are more than 5 scores, remove the ones with the lowest scores
    

    // Clear localStorage and add the top 5 scores
    // localStorage.clear();
    for (let i = 0; i < scores.length; i++) {
        localStorage.setItem(scores[i].username, scores[i].username + '......' + scores[i].score);
    }
    
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
