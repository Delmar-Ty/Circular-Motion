//Setup
const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const randomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const colors = [
    '#E86A92',
    '#f7e733',
    '#41E2BA'
]


//Particle object
function Particle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = colors[randomNum(0, colors.length)];
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.025;
    this.dFromCenter = {
        x: randomNum(25, 125),
        y: randomNum(25, 125)
    };
    this.lastMouse = {
        x: x,
        y: y
    }

    this.update = () => {

        //Updating last point as well as the velocity
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radians += this.velocity; 

        //Drag Effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        //Figuring out the next x and y in a circular motion
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.dFromCenter.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.dFromCenter.y;
        this.draw(lastPoint);
    }
    
    this.draw = (lastPoint) => {

        //Using last and current points to draw a trail
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.r;
        c.lineCap = 'round';
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}

let particles = [];

//Init Function
function init() {
    particles = [];
    for (let i = 0; i < 75; i++) {
        const r = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, r));
    }
    console.log();
}

let count = 0;

//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (count > 20) {
        c.fillStyle = 'rgba(0, 0, 0, 0.2)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        count = 0;
    }
    
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
    count++;
}

init();
animate();