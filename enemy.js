// 1.Create an enemy movement function 
// 2. needs to get all the enemies and create a random num to decided the direction
// 3. based on the direction i need to constanly move them in that direction 
// 4. if they hit the wall they need to another direction
// 5. if they hit the player they need to kill the player







const speed = 20;

 
// function enemyStartMovement(){
//     let enemiesSelect = document.querySelectorAll('.enemy');
//     for (let enemy of enemiesSelect){
        
//         enemy.style.top = '0px';
//         enemy.style.left = '0px';
//         // let enemyTop = 0;
//         // let enemyLeft = 0;
//         enemy.direction = Math.floor(Math.random() * 1) + 1; // Assign a random direction to each enemy
//         setInterval(() => enemyMovement(enemy,), 200);
//     }
// }


// i need to sort out the speed of the enemies and the wall collision 

// function enemyMovement(enemy) {
//     let enemyTop = parseInt(enemy.style.top);
//     let enemyLeft = parseInt(enemy.style.left);
   
//     switch (enemy.direction) {
//         case 1: // Move down
//             let new_bottom = enemyTop  + 1;
//             let btmL = document.elementFromPoint(enemyLeft, new_bottom);
//             let btmR = document.elementFromPoint(enemyLeft + enemy.offsetWidth, new_bottom);
//             if (btmL && !btmL.classList.contains('wall') && btmR && !btmR.classList.contains('wall')) {
//                 enemyTop += speed;
//                 enemy.style.top = enemyTop + 'px';
//             }
//             else{
//                 enemy.direction = Math.floor(Math.random() * 1) + 1;
//             }
//             break;
//         case 2: // Move up
//             let new_top = enemyTop - 1;
//             let topL = document.elementFromPoint(enemyLeft, new_top);
//             let topR = document.elementFromPoint(enemyLeft + enemy.offsetWidth, new_top);
//             if (topL && !topL.classList.contains('wall') && topR && !topR.classList.contains('wall')) {
//                 enemyTop -= speed;
//                 enemy.style.top = enemyTop + 'px';
//             }
//             else{
//                 enemy.direction = Math.floor(Math.random() * 4) + 1;
//             }
//             break;
//         case 3: // Move left
//             let new_left = enemyLeft - 1;
//             let leftT = document.elementFromPoint(new_left, enemyTop);
//             let leftB = document.elementFromPoint(new_left, enemyTop + enemy.offsetHeight);
//             if (leftT && !leftT.classList.contains('wall') && leftB && !leftB.classList.contains('wall')) {
//                 enemyLeft -= speed;
//                 enemy.style.left = enemyLeft + 'px';
//             }
//             else{
//                 enemy.direction = Math.floor(Math.random() * 4) + 1;
//             }
//             break;
            
//         case 4: // Move right
//             let new_right = enemyLeft + enemy.offsetWidth + 1;
//             let rightT = document.elementFromPoint(new_right, enemyTop);
//             let rightB = document.elementFromPoint(new_right, enemyTop + enemy.offsetHeight);
//             if (rightT && !rightT.classList.contains('wall') && rightB && !rightB.classList.contains('wall')) {
//                 enemyLeft += speed;
//                 enemy.style.left = enemyLeft + 'px';
//             }
//             else{
//                 enemy.direction = Math.floor(Math.random() * 4) + 1;
//             }
//             break;
//     }
// }
function enemyMovement(enemy) {
    // Initialize the enemy's position and direction the first time the function is called
    if (!enemy.initialized) {
        enemy.style.top = '0px';
        enemy.style.left = '0px';
        enemy.direction = Math.floor(Math.random() * 4) + 1;
        enemy.initialized = true;
    }

    let enemyTop = parseInt(enemy.style.top);
    let enemyLeft = parseInt(enemy.style.left);
   
    switch (enemy.direction) {
        case 1: // Move down
            let new_bottom = enemyTop  + speed;
            enemy.style.pointerEvents = 'none';
            let btmL = document.elementFromPoint(enemyLeft, new_bottom);
            let btmR = document.elementFromPoint(enemyLeft , new_bottom);
            enemy.style.pointerEvents = 'auto';
            if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                enemyTop += speed;
                enemy.style.top = enemyTop + 'px';
            }
            
            else{
                enemy.direction = Math.floor(Math.random() * 4) + 1;
            }
            break;
        case 2: // Move up
            let new_top = Math.max(enemyTop - speed, 0);
            enemy.style.pointerEvents = 'none';
            let topL = document.elementFromPoint(enemyLeft, new_top);
            let topR = document.elementFromPoint(enemyLeft , new_top);
            enemy.style.pointerEvents = 'auto';
            if (topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                enemyTop -= speed;
                enemy.style.top = enemyTop + 'px';
            }
            else{
                enemy.direction = Math.floor(Math.random() * 4) + 1;
            }
            break;
        case 3: // Move left
            let new_left = Math.max(enemyLeft - speed, 0);
            enemy.style.pointerEvents = 'none';
            let leftT = document.elementFromPoint(new_left, enemyTop);
            let leftB = document.elementFromPoint(new_left, enemyTop );
            enemy.style.pointerEvents = 'auto';
            if (leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false ) {
                enemyLeft -= speed;
                enemy.style.left = enemyLeft + 'px';
            }
            else{
                enemy.direction = Math.floor(Math.random() * 4) + 1;
            }
            break;
        case 4: // Move right
            let new_right = (enemyLeft + speed);
            enemy.style.pointerEvents = 'none';
            let rightT = document.elementFromPoint(new_right, enemyTop);
            let rightB = document.elementFromPoint(new_right, enemyTop );
            enemy.style.pointerEvents = 'auto';
            if (rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false) {
                enemyLeft += speed;
                enemy.style.left = enemyLeft + 'px';
            }
            else{
                enemy.direction = Math.floor(Math.random() * 4) + 1;
            }
            break;
}
}