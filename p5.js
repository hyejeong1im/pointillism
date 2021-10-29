let cnv;
let img;
let size = 5;
let minSize = 5;
let maxSize = 30;
let x, y;

function preload() {
   img = loadImage('seurat.jpg');
}

function setup() {
   cnv = createCanvas(img.width, img.height);
   cnv.parent('canvas');
}

function draw() {
   background(0);

   // 이미지의 픽셀 정보 접근
   for (let col = 0; col < img.width; col += size) {
      for (let row = 0; row < img.height; row += size) {
         let c = img.get(col, row);
         stroke(color(c));
         strokeWeight(size);
         point(col, row);
      }
   }
}

// 마우스 드래그 방향을 알기 위한 좌표 값 저장
function mousePressed() {
   x = mouseX;
   y = mouseY;
}


// 마우스 드래그 이벤트
function mouseDragged() {
   resize(mouseY, y);
}


// 마우스 휠 이벤트
function mouseWheel(e) {
   resize(e.deltaY, 0);
}


function resize(low, high) {
   // 이미지 위에 커서가 있는지 테스트
   if(
      mouseX > 0 && mouseX < img.width &&
      mouseY > 0 && mouseY < img.height
   ) {
      if (low < high) {
         if (size > minSize) {
            size -= 1;
         }
      }
      else {
         if (size < maxSize) {
            size += 1;
         }
      }
   }
}