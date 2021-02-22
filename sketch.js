var gui;
var scribble;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  d = select('.div-block');
  d.position(0,0);
  
  scribble = new Scribble();
  gui = new Gui();
  let gui_setup = new dat.GUI();

  gui_setup.addColor(gui, "color");
  gui_setup.addColor(gui, "color2");
  gui_setup.addColor(gui, "color3");
  gui_setup.add(gui, 'squares', 1, 50).step(1);
  gui_setup.add(gui, 'distance', 10, 200).step(1);
  gui_setup.add(gui, 'strokeWeight', 1, 10).step(1);
  gui_setup.add(gui, 'roughness', 1, 10).step(1);
  gui_setup.add(gui, "rotate", 0, 100).step(1);
  gui_setup.add(gui, "translateX", -1000, 3000).step(1);
  gui_setup.add(gui, "translateY", -1000, 1000).step(1);
  gui_setup.add(gui, "text");
  gui_setup.add(gui, "textsize", 0, 150).step(1);
  gui_setup.add(gui, "showDescription").onChange(description);



  noFill();
}

function draw() {
  background(gui.color)

  translate(gui.translateX, gui.translateY);

  rotate(PI / gui.rotate);


  swing = 10;
  cNum = 5;
  for (let i = windowWidth * .25; i <= windowWidth * .75; i += windowWidth * .25) {
    for (let y = windowHeight * .25; y <= windowHeight * .75; y += windowHeight * .25) {
      cube(i, y, gui.distance, gui.squares);
    }
  }
  textAlign(CENTER, CENTER);
  drawWords(width * 0.75);
  noLoop();
}

function description(){
  if(gui.showDescription){
    d.style('display','block');
}else {
  d.style('display' , 'none')
}
}

function cube(xPos, yPos, steps, num) {

  for (var i = 0; i <= num; i++) {


    strokeWeight(gui.strokeWeight);
    stroke(gui.color2);
    scribble.roughness = (gui.roughness);
    scribble.scribbleRect(xPos, yPos, steps * i, steps * i);
  }
  fill(gui.color3);

}

function drawWords() {
  text(gui.text, random(windowWidth/2), random(windowHeight/2));
  textSize(gui.textsize);
}

function mousePressed() {
  redraw();

}

function mouseDragged() {
  redraw();
}

function Gui() {
  this.color = '#fc88d1';
  this.color2 = '#ffffff';
  this.color3 = '#ff0000';
  this.squares = 4;
  this.distance = 50;
  this.strokeWeight = 3;
  this.roughness = 2;
  this.rotate = 2;
  this.translateX = 1500
  this.translateY = -375
  this.text = 'Hello Hello Hello';
  this.textsize = 64
  this.showDescription=true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
