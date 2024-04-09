// 1.Create an enemy movement function 
// 2. needs to get all the enemies and create a random num to decided the direction
// 3. based on the direction i need to constanly move them in that direction 
// 4. if they hit the wall they need to another direction
// 5. if they hit the player they need to kill the player



function enemy(enemy){

    let randomnum = Math.floor(Math.random() * 4) + 1;
    let enemyTop =0;
    let enemy_Left =0;
    while (randomnum ==1){
        enemyTop++;
        enemy.style.top = enemyTop+ 'px';

    }

}