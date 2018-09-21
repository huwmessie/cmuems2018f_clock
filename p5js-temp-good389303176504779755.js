var introFrames = [];
var loopFrames = [];
var overpassFrames = [];
var sipFrames = []; //[[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]];
var sipMap = [11, 64, 99, 142, 183];
var playingIntro = 0;
var t = 0;
var loopState = 0;
var fg;
var light1 = [1];
var light2 = [1];
var light3 = [1];
var light4 = [1];
var sipState;//[0,"in",0];
//var mappp = [[11,11],[32,10],[16,13],[21,12],[21,11]];
var curSip;
var sipping; 
var playIntro = true;
var manualMin = -1;
var temp;

function loadAssets() {
  var introRoot = join(["assets/intro/intro",curSip,"_"],"");
  loadLightImgs();
  loadFrames(introFrames, introRoot, 137, ".png");
  loadFrames(loopFrames, "assets/loop/loop_",214,".png");
  loadFrames(overpassFrames,"assets/overpass/overpass_",241,".png");
  loadFrames(sipFrames,"assets/sips/sips_",198,".png");
}
  

function setup() {
  var m = minute();
  if (manualMin>-1) m = manualMin;
  temp = minute();
  curSip = int(m/60*5);
  createCanvas(640, 480);
  loadAssets();
  sipping = false;
  fg = sipFrames[sipMap[curSip]];
  sipState = sipMap[curSip];
}


function keyPressed() {
  if (key=="1") {
    light1[0] = (light1[0])%3+1;
    //sipping = true;
  }
  if (key=="2") {
    light2[0] = (light2[0])%3+1;
  }
  if (key=="3") {
    light3[0] = (light3[0])%3+1;
  }
  if (key=="4") {
    light4[0] = (light4[0])%3+1;
  }
  if (key=="5") {
    print("OY")
    sipping = true;
  }
}

function draw() {
  background(220);
    
  if (playingIntro<introFrames.length&&playIntro) {
    image(introFrames[playingIntro],0,0,width,height);
    if (t%3==0) playingIntro++;
  }
  else {
    drawLoop();
    drawLights();
    if (sipping&&t%4==0) {
      sipState = (sipState+1)%sipFrames.length;
      for (var i=0; i<5; i++) {
        if (sipMap[i]==sipState) {
          sipping = false;
        }
      }
      fg = sipFrames[sipState];
    }
    image(fg,0,0,width,height);
  }
  if (int(temp/5) != int(minute()/5)) {
    sipping = true;
    temp = minute();
  }
  
  var bin = binaryCon(hour()%12);
  light1[0] = bin[0]+1;
  light2[0] = bin[1]+1;
  light3[0] = bin[2]+1;
  light4[0] = bin[3]+1;
  t++;
}

function fileNameGen(root, num) {
  var ret = root;
  ret = join([root,num,".png"],"");
  return ret;
}


function drawLoop() {
  image(loopFrames[loopState%loopFrames.length],0,0,width,height);
  image(overpassFrames[loopState%overpassFrames.length],0,0,width,height);
  if (t%3==0) loopState++;
}

function loadLightImgs() {
  light1.push(loadImage("assets/lights/1r.png"));
  light1.push(loadImage("assets/lights/1g.png"));
  light1.push(loadImage("assets/lights/1y.png"));
  light2.push(loadImage("assets/lights/2r.png"));
  light2.push(loadImage("assets/lights/2g.png"));
  light2.push(loadImage("assets/lights/2y.png"));
  light3.push(loadImage("assets/lights/3r.png"));
  light3.push(loadImage("assets/lights/3g.png"));
  light3.push(loadImage("assets/lights/3y.png"));
  light4.push(loadImage("assets/lights/4r.png"));
  light4.push(loadImage("assets/lights/4g.png"));
  light4.push(loadImage("assets/lights/4y.png"));
}



function drawLights() {
  image(light1[light1[0]],0,0,width,height);
  image(light2[light2[0]],0,0,width,height);
  image(light3[light3[0]],0,0,width,height);
  image(light4[light4[0]],0,0,width,height);
}

function loadFrames(frames, root, count, ext) {
  var num;
  var fileName;
  for (var i=0; i<count; i++) {
    num = str(i);
    if (num<10) num = join(["0",num],"");
    if (num<100) num = join(["0",num],"");
    fileName = join([root,num,ext],"");
    print(fileName);
    img = loadImage(str(fileName));
    frames.push(img);
  }
}

//function loadSips() {
//  for (var i=0; i<5; i++) {
    
  
//  var mapp = [[11,11],[32,10],[16,13],[21,12],[21,11]];
//  var num;
//  var name;
//  var modd;
//  for (var i=0; i<5; i++) {
//    for (var j=0; j<2; j++) {
//      for (var k=0; k<mapp[i][j]; k++) {
//        num = str(k);
//        if (num<10) num = join(["0",num],"");
//        if (num<100) num = join(["0",num],"");
//        n = "in";
//        if (k==1) n = "out";
//        name = join(["assets/sips/sip",i,"_",n,"_",num,".png"],"");
//        sipFrames.push(loadImage(name));
//      }
//    }
//  }
//}

function sip2frame(sip) {
  var bs = [11,56,82,116,149];
  
}

function binaryCon(x) {
  if (x==0) x = 12;
  var ret = [];
  if (x>7) {
    ret.push(1);
    x -= 8;
  }
  else ret.push(0);
  if (x>3) {
    ret.push(1);
    x -= 4;
  }
  else ret.push(0);
  if (x>1) {
    ret.push(1);
    x -= 2;
  }
  else ret.push(0);
  if (x>0) {
    ret.push(1);
  }
  else ret.push(0);
  return ret;
}
