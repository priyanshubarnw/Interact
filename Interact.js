var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//Enabling interaction using event listeners

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 70;
var minRadius = Math.floor(Math.random() * 4 + 1);

var colorArray = [
    '#2CE50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#ff1100',
]

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener('resize', function() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    
    init();
});

//creating circle object 
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = Math.floor(Math.random() * 4 + 1);
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy; 

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if(this.radius < maxRadius) {
                    this.radius += 2;
                }
        }
        else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];

    for(var i = 0; i < 2000; i++) {
        var x = Math.random() * (innerWidth - radius*2) + radius;
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = minRadius;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.fillStyle = 'white';
    c.fillRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();