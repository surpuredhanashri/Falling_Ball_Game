var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

//create a variable equal to the current left position of the character, and then set a new left position for the 
// character subtracting 2 pixels. 
function moveLeft(){           
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 2 + "px";   
    }
}

//create a variable equal to the current right position of the character, and then set a new right position for the character 
//adding 2 pixels. 
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));   //move ball right side
    if(left<380){
        character.style.left = left + 2 + "px";    
    }
}

// Create an event listener that runs whenever you press the left and right arrow keys. Inside create an interval that runs the 
// right function depending which arrow key they pressed. 
document.addEventListener("keydown", event => {     
    if(both==0){    
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);       
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});

// Create another event listener, when you unpress any of the keys, clears the interval and stops the ball from moving. 
document.addEventListener("keyup", event => {   
    clearInterval(interval);
    both=0;
});

//style for blocks and holes. Create new HTML elements, Add some attributes to them, classes and IDs. 
// Now append them to our game div. Create a variable “random”
var blocks = setInterval(function(){    
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));

    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if(blockLastTop<400||counter==0){  
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter); 
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";   
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() *360);      
        hole.style.left = random + "px";
        game.appendChild(block);           
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }

    // if the character top is above the top, then the game is over,  
    // alert game over with the users score, and then refresh when they click okay.
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        alert("Game over. Score: "+(counter-9));    
        clearInterval(blocks);
        location.reload();
    }

    // Created an array called current blocks, whenever we create a new block and hole, append the counter to the array. 
    // ihole and iblock which are equal to the blocks and hole same as the current variable. 
    // Then set new top positions for the block and hole , but then removing 0.5px from it.

    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5  + "px"; 
        ihole.style.top = iblockTop -0.5 + "px";

        if(iblockTop < -20){   
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }

        // first if - increments the drop variable if the character is currently on top of a block. 
        // Second if - that will set drop back to 0 if you’re currently over a hole. 
        if(iblockTop-20<characterTop && iblockTop>characterTop){       
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+30>=characterLeft){
                drop = 0;
            }       
        }
    }

    // makes the ball fall if drop == 0 or makes it raise up if drop != 0. 
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},1);
