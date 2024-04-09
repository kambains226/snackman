// 1. need to loop through all the enimies 

// 2. create a random number from 1 to 4 which decides the direction 

// 3 use the movement code from the player to do this 

// 4. add collision decteion to the player 


function enemyMovement(enemiesArray,enemiesPos){
        

    for(i =0; i< enemiesArray.length; i++){
        let randomMovement = Math.floor(Math.random() * 4) + 1;
        let aiTop =0;
        let aiLeft =0;

        if (randomMovement ==1){
            //bottom
        //    how do i make the enemies move 
            let newBottom = enemiesPos.bottom +1;

            let btmL = document.elementFromPoint(enemiesPos.left,newBottom);
            let btmR = document.elementFromPoint(enemyPos.right,newBottom);

            // if(btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false){
            //    aiTop++;
            //    enemiesPos.style.top = aiTop + 'px';

            // }
            aiTop++;
            enemiesPos.style.top = aiTop + 'px';
        }
        else if (randomMovement ==2){
            //top
            aiTop--;
            enemiesPos.style.top = aiTop + 'px';
        }
        else if (randomMovement ==3){
            //left
            aiLeft--;
            enemiesPos.style.top = aiLeft + 'px';

        }
        else if (randomMovement ==4){
            // right
        
            aiLeft--;
            enemiesPos.style.top = aiLeft + 'px';


        }
    }
    }



    function enemyMovement(enemiesArray){
        

        for(i =0; i< enemiesArray.length; i++){
            let randomMovement = Math.floor(Math.random() * 4) + 1;
            let aiTop = parseInt(enemiesArray[i].style.top);
            let aiLeft = parseInt(enemiesArray[i].style.left);
            console.log(randomMovement);
    
            if (randomMovement ==1){
                //bottom
            //    how do i make the enemies move 
                // let newBottom = enemiesPos.bottom +1;
    
                // let btmL = document.elementFromPoint(enemiesPos.left,newBottom);
                // let btmR = document.elementFromPoint(enemyPos.right,newBottom);
    
                // if(btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false){
                //    aiTop++;
                //    enemiesPos.style.top = aiTop + 'px';
    
                // }
                aiTop++;
                enemiesArray[i].style.top = aiTop + 'px';
                
            }
            // else if (randomMovement ==2){
            //     //top
            //      aiTop++;
            //     enemiesArray[i].style.top = aiTop + 'px';
            // }
            // else if (randomMovement ==3){
            //     //left
            //     aiLeft--;
            //     enemiesArray[i].style.left = aiLeft + 'px';
    
            // }
            // else if (randomMovement ==4){
            //     // right
            
            //     aiLeft--;
            //     enemiesArray[i].style.left = aiLeft + 'px';
    
    
            // }
            console.log("Updated Top:", aiTop);
            console.log("Updated Left:", aiLeft);
        }
        
        }