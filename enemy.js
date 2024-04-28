



function enemyMove(){
    let enemies = document.querySelectorAll('.enemy');
        enemyMovementInterval= setInterval(function enemyMovement(){
            enemies.forEach(function enemyMovements(enemy){
            let enemyTop = parseInt(enemy.style.top) || 0;
            let enemyLeft = parseInt(enemy.style.left) || 0;
            let randnum = Math.floor(Math.random() * 4 + 1); 
    
            if (enemy.interval){
                clearInterval(enemy.interval);
            }
            enemy.interval = setInterval(function(){
                    let enemyPostion = enemy.getBoundingClientRect();
                    
                    if (randnum === 1){
                        //bottom
                        let newBottom = enemyPostion.bottom + 1;
                        let btmL = document.elementFromPoint(enemyPostion.left, newBottom);
                        let btmR = document.elementFromPoint(enemyPostion.right , newBottom);
    
                        if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                            enemyTop++;
                            enemy.style.top = enemyTop + 'px';
    
                        }
                    }
                    else if(randnum === 2){
                        //top
                        let newTop = enemyPostion.top - 1;
                        let topL = document.elementFromPoint(enemyPostion.left, newTop);
                        let topR = document.elementFromPoint(enemyPostion.right , newTop);
    
                        if (topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                            enemyTop--;
                            enemy.style.top = enemyTop + 'px';
    
                        }
                       
                    }
                    else if(randnum === 3){
    
                    
                        //left
                        let newLeft = enemyPostion.left - 1;
                        let leftT = document.elementFromPoint(newLeft, enemyPostion.top);
                        let leftB = document.elementFromPoint(newLeft, enemyPostion.bottom);
    
                        if (leftT.classList.contains('wall') == false && leftB.classList.contains('wall') == false) {
                            enemyLeft--;
                            enemy.style.left = enemyLeft + 'px';
                        }
                    }
                    else if(randnum === 4){
                        //right
                        let newRight = enemyPostion.right + 1;
                        let rightT = document.elementFromPoint(newRight, enemyPostion.top);
                        let rightB = document.elementFromPoint(newRight, enemyPostion.bottom);
    
                        if (rightT.classList.contains('wall') == false && rightB.classList.contains('wall') == false) {
                            enemyLeft++;
                            enemy.style.left = enemyLeft + 'px';
                        }
                        
                    }
                    
            },10);
            });
        },1000);
}