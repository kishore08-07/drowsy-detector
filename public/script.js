const URL = "./my_model/";
let model, webcam, labelContainer, maxPredictions, ws;
let cooldown = false;  // To avoid spamming alerts
let lastDrowsyTime = 0;
const DROWSY_THRESHOLD = 0.95;
const COOLDOWN_MS = 5000; // 5 secs

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    ws = new WebSocket(`ws://${window.location.host}`);
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

function stopAlert() {
    const audio = document.getElementById("alert-audio");
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("stop-alert-btn").style.display = "none";
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let detected = "Normal";
    let drowsyProb = 0;

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        if (prediction[i].className === "Drowsy") {
            drowsyProb = prediction[i].probability;
        }
    }

    if (drowsyProb > DROWSY_THRESHOLD) {
        detected = "Drowsy";
        const now = Date.now();
        if (now - lastDrowsyTime > COOLDOWN_MS) {
            // Play alert sound
            const audio = document.getElementById("alert-audio");
            if (audio) {
                audio.play();
                document.getElementById("stop-alert-btn").style.display = "inline-block";
            }
            // Send WebSocket alert if open
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ status: "Drowsy Detected", time: now }));
            }
            lastDrowsyTime = now;
        }
    }
    document.getElementById("status").innerText = "Status: " + detected;
}
