var data
var img

function preload() {
  data = loadJSON('https://qrng.anu.edu.au/API/jsonI.php?length=10&type=uint8', loaded);
}

function loaded(){
  
  console.log(data.data[0])
  let d = map(data.data[0], 0, 255, 0, 100)
  
  var name = "/images/j-"+round(d)+".jpg"
  console.log(name)
  img = loadImage(name)
  img.resize(0, height)
  
 
}

function reload(){
  data = loadJSON('https://qrng.anu.edu.au/API/jsonI.php?length=10&type=uint8', loaded);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)
  // img = loadImage(name)
}

function draw() {
  background(220);
  image(img, width/2, height/2)
}