# Snake game based on Teachable Mechine

## About

The web game uses the **google teachable mechine image classification** to control the direction of the snake. You can get my model trained by my self [here](https://teachablemachine.withgoogle.com/models/xCQggMsXx/)

[Teachable mechine](https://teachablemachine.withgoogle.com/) is a fast, easy way to create machine learning models for your sites, apps, and more – no expertise or coding required.You can experience it on its site.

The main game logic is referred from [Snake-JS](https://github.com/betamos/Snake-JS/blob/master/snake-js.js), thanks to @betamos!

## Detail

The main method to connect the game and the model is below(how to load and use model):

```js
// 模型URL
const URL = "https://teachablemachine.withgoogle.com/models/xCQggMsXx/";
let model, webcam, maxPredictions;
// 初始化模型
init();

// 建立相机，获取每一帧...

async function predict() {
    // 获取预测
    const prediction = await model.predict(webcam.canvas);
    // 通过预测值绘制进度条
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var no = document.getElementById("no");
    up.setAttribute("style", "width: " + (parseFloat(prediction[0].probability.toFixed(2)) * 100).toString() + "%");
    down.setAttribute("style", "width: " + (parseFloat(prediction[1].probability.toFixed(2)) * 100).toString() + "%");
    left.setAttribute("style", "width: " + (parseFloat(prediction[2].probability.toFixed(2)) * 100).toString() + "%");
    right.setAttribute("style", "width: " + (parseFloat(prediction[3].probability.toFixed(2)) * 100).toString() + "%");
    no.setAttribute("style", "width: " + (parseFloat(prediction[4].probability.toFixed(2)) * 100).toString() + "%");
    // 预测方向
    if(prediction[0].probability.toFixed(2) > 0.80) dir = 0;
    else if(prediction[1].probability.toFixed(2) > 0.80) dir = 1;
    else if(prediction[2].probability.toFixed(2) > 0.80) dir = 2;
    else if(prediction[3].probability.toFixed(2) > 0.80) dir = 3;
}
```

Then use the var `dir` to control the direction of the snake.

```js
// 监听方向变化
this.lastDirection = function () {
    switch (dir) {
        // 左
        case 2:
            lastDirection = -2;
            break;
        // 上
        case 0:
            lastDirection = 1;
            break;
        // 右
        case 3:
            lastDirection = 2;
            break;
        // 下
        case 1:
            lastDirection = -1;
            break;
    }
```

## Usage

If you want to experience the game, please:

```git
$git clone https://github.com/Yaozhtj/pose_snake_game.git
```

Then open `index.html`.

## Screenshots

![screenshots](img\srceenshots.png)
