# 🏁 Pointillism
<br/>

![10](https://user-images.githubusercontent.com/84780174/139401901-8f5b53ba-8c76-4682-b53b-9fcdda230ba0.jpg)

![doc](https://user-images.githubusercontent.com/84780174/139401824-3c289d8e-0ebe-4569-93cf-e0a590edd53e.jpg)

<br/><br/>

# ⛳️ 제작 의도

점묘화는 점을 찍어서 그림을 그리는 화법으로, 프랑스의 화가 조르주 쇠라가 개발한 화법이다.

조르주 쇠라의 대표적인 그림 '그랑드자트 섬의 일요일 오후'를

p5.js의 이미지 정보를 얻는 방법으로 픽셀화해보았다.
<br/><br/><br/>

# 🧩 인터랙션

- 마우스 드래그와 휠로 점(픽셀)의 사이즈 변경

<br/><br/>

# 🎨 구현 방법 & 코드
<br/>

## 1. 사진 불러오기

```jsx
function preload() {
   img = loadImage('seurat.jpg');
}
```

preload()는 setup()이 실행되기 전에 호출되는 함수이며,

외부 파일의 비동기 불러오기를 차단하기 위해 사용된다.

<br/><br/><br/>

## 2. 이미지 픽셀화

```jsx
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
```

img.get으로 이미지 정보를 불러온 후, 행과 열에 맞게 픽셀을 배치하였다.

point가 아닌 rect 등의 다른 도형 함수를 쓰면 다른 모양의 픽셀이 된다.

<br/><br/><br/>

## 3. 마우스 이벤트

```jsx
// 마우스 드래그 이벤트
function mouseDragged() {
   // 이미지 위에 커서가 있는지 테스트
   if(
      mouseX > 0 && mouseX < img.width &&
      mouseY > 0 && mouseY < img.height
   ) {
      // 아래로 끌어내리면 size 축소
      if (mouseY < y) {
         if (size > minSize) {
            size -= 1;
         }
      }
      // 위로 끌어올리면 size 확대
      else {
         if (size < maxSize) {
            size += 1;
         }
      }
   }
}
```

```jsx
// 마우스 휠 이벤트
function mouseWheel(e) {
   // 이미지 위에 커서가 있는지 테스트
   if(
      mouseX > 0 && mouseX < img.width &&
      mouseY > 0 && mouseY < img.height
   ) {
      // 휠을 올리고 있다면 deltaY값이 음수
      if (e.deltaY < 0) {
         if (size > minSize) {
            size -= 1;
         }
      }
      // 휠을 내리고 있다면 deltaY값이 양수
      else {
         if (size < maxSize) {
            size += 1;
         }
      }
   }
}
```

마우스 드래그와 휠로 픽셀의 사이즈를 변경할 수 있게 하였다.

두 함수의 중복되는 부분을 resize 함수를 생성하여 리팩토링하였다.

```jsx
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
```
