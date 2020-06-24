const cvs = document.getElementById('canvas');
cvs.width = 608;
cvs.height = 608;
            const ctx = cvs.getContext('2d');

            //create the unit
            const box = 32; //its a unit that our snake will move by

            //load images

            const ground = new Image(608,608);
            ground.src = "./ground.png"
            let imagefood = new Image();
            imagefood.src = "./food.png";

            const dead = new Audio();
            const eat = new Audio();
            const up = new Audio();
            const right = new Audio();
            const down = new Audio();
            const left = new Audio();

            dead.src = "./dead.mp3"
            eat.src = "./eat.mp3"
            up.src = "./up.mp3"
            right.src = "./right.mp3"
            left.src = "./left.mp3"
            down.src = "./down.mp3"
            //create the snake
            let snake = [];
            snake[0] = {
                x : 9 * box,
                y : 10 * box
            }

            let d;
            //control the snake

            document.addEventListener("keydown", direction);

            function direction(event){
                let key = event.keyCode;
                if (key == 37 && d != "RIGHT"){
                    left.play();
                    d = "LEFT";
                }
                else if (key == 38 && d != "DOWN"){
                    d = "UP";
                    up.play();
                }
                else if (key == 39 && d != "LEFT"){
                    d = "RIGHT";
                    right.play();
                }
                else if (key == 40 && d != "UP"){
                    d = "DOWN";
                    down.play();
                }
            }

            //create the food

            let food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }

            // create the score var 
            let score = 0;
            
            // draw everything in canvas

            function draw (){
                ctx.drawImage(ground,0,0);

                for( let i = 0; i < snake.length; i++){
                    ctx.fillStyle = ( i == 0 )? "green" : "white";
                    ctx.fillRect(snake[i].x, snake[i].y,box,box);

                    ctx.strokeStyle = "red";
                    ctx.strokeRect(snake[i].x, snake[i].y,box,box);
                }

                ctx.drawImage(imagefood, food.x, food.y);
                // old head position
                let snakeX = snake[0].x;
                let snakeY = snake[0].y;
                //remove the tail
                //which direction

                if (d == "LEFT") snakeX -= box;
                if (d == "UP") snakeY -= box;
                if (d == "RIGHT") snakeX += box;
                if (d == "DOWN") snakeY += box; 

                // snake size if it eats the food

                if(snakeX == food.x && snakeY == food.y){
                    eat.play();
                    score++;
                    food = {
                        x : Math.floor(Math.random()*17+1) * box,
                        y : Math.floor(Math.random()*15+3) * box
                    }
                }else{
                    snake.pop();
                }

                //add new Head

                let newHead = {
                    x : snakeX,
                    y : snakeY
                }

                function collision(head, array) {
                    for(let i = 0; i < array.length; i++){
                        if(head.x == array[i].x && head.y == array[i].y){
                        return true;
                        }
                    }
                    return false;
                }

                if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
                    clearInterval(game);
                    dead.play();
                }

                snake.unshift(newHead);

                ctx.fillStyle = "white";
                ctx.font = "45px Changa one";
                ctx.fillText(score, 2*box, 1.6*box);
                }

            // call the function every 100ms

            let game = setInterval(draw,100);
