const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active");
}
});
},{threshold:0.2});

reveals.forEach(r=>observer.observe(r));

/* NETWORK BACKGROUND */

const canvas = document.getElementById("bg-network");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];

const NODE_COUNT = 45;

for(let i=0;i<NODE_COUNT;i++){
nodes.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* move nodes */

nodes.forEach(n=>{
n.x += n.vx;
n.y += n.vy;

if(n.x<0 || n.x>canvas.width) n.vx*=-1;
if(n.y<0 || n.y>canvas.height) n.vy*=-1;
});

/* draw connections */

for(let i=0;i<nodes.length;i++){
for(let j=i+1;j<nodes.length;j++){

let dx = nodes[i].x - nodes[j].x;
let dy = nodes[i].y - nodes[j].y;

let dist = Math.sqrt(dx*dx+dy*dy);

if(dist < 150){

ctx.beginPath();
ctx.moveTo(nodes[i].x,nodes[i].y);
ctx.lineTo(nodes[j].x,nodes[j].y);

ctx.strokeStyle = "rgba(56,189,248,"+(1-dist/150)*0.2+")";
ctx.lineWidth = 1;
ctx.stroke();

}

}

}

/* draw nodes */

nodes.forEach(n=>{
ctx.beginPath();
ctx.arc(n.x,n.y,1.5,0,Math.PI*2);
ctx.fillStyle="rgba(56,189,248,0.6)";
ctx.fill();
});

requestAnimationFrame(animate);

}

animate();

window.addEventListener("resize",()=>{
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
});