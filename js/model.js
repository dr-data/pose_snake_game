/**
 * model.js
 * content: Teachable Machine模型的获取与应用
 */

// 模型URL
const URL = "https://teachablemachine.withgoogle.com/models/xCQggMsXx/";
let model, webcam, maxPredictions;

// 初始化模型
init();
// 识别的方向
var dir;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 加载模型
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    var webcamele = document.getElementById("webcam-container");
    // 当模型加载完成以后，加载网页摄像头，并清空等待提示
    webcamele.innerHTML="";
    webcamele.setAttribute("style","");
    webcamele.appendChild(webcam.canvas);
}
// 更新帧
async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

// 预测
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