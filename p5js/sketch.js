var serial;          // variable to hold an instance of the serialport library
var sensorValue = 0;  // fill in your serial port name here
let yoff = 0.0;
let phase = 0;
let zoff = 0;
let slider;


function setup() {
  createCanvas(600, 600);
   slider = createSlider(0, 10, 3, 0.1);
  serial = new p5.SerialPort();     
  serial.on('list', printList); 
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.list();
  serial.open('/dev/tty.usbmodem143401'); // open a serial port
}

function draw(){
  background(0);
  fill(255);
  //ellipse(sensorValue,height/2,20,20);

  
  //circle
   fill(random(sensorValue), random(sensorValue), random(25));
    ellipse(100+sensorValue, 300, 100+sensorValue, 100+sensorValue); 
 //shape 
   stroke(255,255,255,50);
      strokeWeight(2);
      line(sensorValue, 30, -90, sensorValue);
      line(-90, sensorValue, sensorValue, 300);
      line(sensorValue,300,505,180);
      line(505,180,sensorValue,30);

  //perlin 
    fill(random(255-sensorValue), random(255-sensorValue), random(25));
  beginShape();

  let xoff = 0; 
  for (let x = 0; x <= width; x += 10) {
 
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

   
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
 vertex(width, sensorValue);
  vertex(0, sensorValue);
  endShape(CLOSE);
 
//loop
 
  strokeWeight(2);
  noFill();
  beginShape();
  let noiseMax = slider.value();
  for (let a = 0; a < TWO_PI; a += radians(5)) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, width/2, height);
    let x = r * cos(a*sensorValue);
    let y = r * sin(a*sensorValue);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.009;
  zoff += 0.01;
  
  
 //text 
  text(sensorValue,20,20);
}


function printList(portList){
  for(var i=0; i<portList.length;i++){
  console.log(i + " " + portList[i]);
  }
}

function serialEvent(){
  var inString = serial.readLine();
  if(inString.length>0){
    inString = inString.trim();
    sensorValue = Number(inString);
  }
}