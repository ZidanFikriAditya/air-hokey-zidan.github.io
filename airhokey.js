var map = document.getElementById("field");
var mapContext = map.getContext("2d");
document.addEventListener("mousemove", mouse)
var reset = document.getElementById('reset')
var audio = document.getElementById('audio')
map.width = 500;
map.height = 700;
var pScore = 0;
var cScore = 0;
var ps = 10;
var xs = 0;
var ys = 0;

///////////////////////////////////////////////////// VARIABLE FOR AI /////////////////////////////////////////
var difficulty = false;
var random = 1;
var speed;
var bounceSFX = new Audio("bounce.wav")

// Object for the puck
var puck = {
    x: 250,
    y: 350,
    r: 20,
    sA: 0,
    eA: Math.PI *2,
    c: "grey",
    c2: "orange",
    lw: 3
}
// Object for the player
var player = {
    x: 250,
    y: 650,
    r: 25,
    sA: 0,
    eA: Math.PI * 2,
    c: "grey",
    c2: "blue",
    lw: 3
}
// Object for the Computer
var computer = {
    x: 250,
    y: 50,
    r: 25,
    sA: 0,
    eA: Math.PI * 2,
    c: "grey",
    c2: "red",
    lw: 3
}
var audioCheck = false

audio.onclick = function () {
    if (audioCheck){
        audioCheck = false
        audio.innerHTML = "Turn On Audio"
    } else {
        audioCheck = true
        audio.innerHTML = "Mute Audio"
    }
}

main()

function main() {
    setInterval(update, 10)
}
function update() {
    background()
    drawCircles(puck.x, puck.y, puck.r, puck.sA, puck.eA, puck.c, puck.c2, puck.lw)
    drawCircles(player.x, player.y, player.r, player.sA, player.eA, player.c, player.c2, player.lw)
    drawCircles(computer.x, computer.y, computer.r, computer.sA, computer.eA, computer.c, computer.c2, computer.lw)
    logic()
}

// Drawing func

function background()
{
    mapContext.fillStyle = 'black'
    mapContext.fillRect(0, 0, map.width, map.height);
    drawLines(0, 350, 500, 350, "grey", 5)
    drawLines(0, 350, 0, 0, "red", 10)
    drawLines(0, 0,200, 0, "red", 10)
    drawLines(500, 350,500, 0, "yellow", 10)
    drawLines(300, 0,500, 0, "yellow", 10)
    drawLines(0, 700,0, 350, "blue", 10)
    drawLines(0,700 ,200, 700, "blue", 10)
    drawLines(500,700 ,500, 350, "green", 10)
    drawLines(300,700,500, 700, "green", 10)

    // Draw Circles
    drawCircles(250, 350, 50, 0, Math.PI * 2, "grey", 0, 5);
    drawCircles(250, 0, 50, 0, Math.PI * 2, "grey", 0, 5)
    drawCircles(250, 700, 50, 0, Math.PI * 2, "grey", 0, 5)

    // Draw Rectangle
    drawRectangle(200, -25, 100, 30, "white",5)
    drawRectangle(200, 695, 100, 30, "white",5)

    // Draw Score
    drawScore(cScore, 450, 330, "white")
    drawScore(pScore, 450, 410, "white")

    // Logo Zidan
    drawScore("ZFA", 220, 270, 'grey')
    drawScore("ZIDAN PROJECT", 120, 470, 'grey')

}

function drawLines(x,y,xt,xy,color,lwidth)
{
    mapContext.beginPath();
    mapContext.moveTo(x,y);
    mapContext.lineTo(xt, xy);
    mapContext.strokeStyle = color;
    mapContext.lineWidth = lwidth;
    mapContext.stroke();
    mapContext.closePath();
}

function drawCircles(x, y, radius, sAngel, eAngel, color, color2, lWidth)
{
    mapContext.beginPath();
    mapContext.arc(x, y, radius, sAngel, eAngel);
    mapContext.strokeStyle = color;
    mapContext.fillStyle = color2;
    mapContext.lineWidth = lWidth;
    mapContext.stroke();
    mapContext.fill()
    mapContext.closePath();
}

function drawRectangle(x, y, w, h, color, lWidth){
    mapContext.beginPath();
    mapContext.strokeStyle = color;
    mapContext.lineWidth = lWidth;
    mapContext.strokeRect(x,y,w,h)
    mapContext.closePath()
}

function drawScore(text, x, y, color) {
    mapContext.font = '50px Fantasy';
    mapContext.strokeStyle = color;
    mapContext.strokeText(text, x, y);
}

// Login FUnction

function calculateDistance(mX, mY, pX, pY) {
    var tx = Math.pow((pX-mX), 2);
    var ty = Math.pow((pY-mY), 2);
    var temp = Math.sqrt(tx+ty);
    return temp;
}

function mouse(event){
    var mouse_x = event.clientX - (map.offsetLeft - (map.width/2));
    var mouse_y = event.clientY - (map.offsetTop - (map.height/2));

    if (mouse_x > 30 && mouse_x < map.width - 30)
    {
        player.x = mouse_x
    }

    if (mouse_y > 375 && mouse_y < map.height - 30)
    {
        player.y = mouse_y
    }
}

function logic() {
    reset.onclick = function (){
        player.x =  250;
        player.y = 650;
        computer.x = 250;
        computer.y = 50;
        puck.x = 250;
        puck.y = 350;
        xs = 0
        ys = 0
        pScore = 0;
        cScore = 0;
    }


    // LEFT WALL
    if ((puck.x + xs) < (puck.r + 10))
    {
        xs *= -1;
    }

    // RIGHT WALL
    if((puck.x + xs) > (map.width - puck.r - 10))
    {
        xs *= -1
    }

    // LOGIC GOAL
    if (puck.x > 200 && puck.x < 300 )
    {
        // GOAL BOTTOM
        if ((puck.y + ys) > (map.height - puck.r - 10))
        {
            puck.x = map.width/2
            puck.y = map.height/2
            cScore += 1
            xs = 0
            ys = 0
        }

        // GOAL TOP
        else if ((puck.y + ys) < (puck.r + 10))
        {
            puck.x = map.width/2
            puck.y = map.height/2
            pScore += 1
            xs = 0
            ys = 0
        }
    }

    // TOP WALL
    else if ((puck.y + ys) < (puck.r + 10))
    {
        ys *= -1;
    }

    // BOTTOM WALL
    else if((puck.y + ys) > (map.height - puck.r -10))
    {
        ys *= -1;
    }

    // y axis Movement
    if ((Math.abs(xs) + Math.abs(ys)) < 10 && puck.y <= map.height/2)
    {
        if (puck.y - 20 > computer.y) // Puck is ahead of computer
        {
            computer.y += 1.5
        }

        else if(puck.y + 20 < computer.y) // Puck is behind of computer
        {
            computer.y -= 1.5
        }
    }

    else if (computer.y <  50)
    {
        computer.y += 2;
    }
    else if (computer.y > 50)
    {
        computer.y -= 2
    }

    // BORDER CONDITIONS
    if (computer.x < 10)
    {
        computer.x = 10+25
    }

    if (computer.x > 490)
    {
        computer.x = 500 - 10 - 25;
    }

    if (computer.y < 10)
    {
        computer.y = 10+ 25;
    }

    if (computer.y > 690)
    {
        computer.y = 700 - 10 -25;
    }

    // x axis Movement
    if (difficulty == true)
    {
        random = 50;
    }
    if (difficulty == false)
    {
        speed = 5;
    }
    else{
        speed -= 2
    }

    if (puck.y < computer.y && puck.x > computer.x + 25 && puck.x < computer.x -25)
    {
        speed = -2;
    }

    if (computer.x < puck.x - 20)
    {
        computer.x += speed
    }

    if (computer.x > puck.x + 20 - random)
    {
        computer.x -= speed
    }

    var computerDistance = calculateDistance(computer.x, computer.y, puck.x, puck.y);
    var playerDistance = calculateDistance(player.x, player.y, puck.x, puck.y)

    if(computerDistance < 45)
    {
        if (audioCheck){
            bounceSFX.play()
        }
        var compTempx = puck.x - computer.x;
        var compTempy = puck.y - computer.y;
        compTempx/=45;
        compTempy/=45;
        xs = compTempx*ps
        ys = compTempy*ps
    }

    if(playerDistance < 45)
    {
        if (audioCheck){
            bounceSFX.play()
        }
        var playTempx = puck.x - player.x;
        var playTempy = puck.y - player.y;
        playTempx/=45;
        playTempy/=45;
        xs = playTempx*ps
        ys = playTempy*ps
    }

    puck.x += xs;
    puck.y += ys;

    xs *= 0.99;
    ys *= 0.99;
}

