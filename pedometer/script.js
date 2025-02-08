let steps = 0;
let lastY = null;

// Function to start tracking
function startTracking() {
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", detectSteps);
        alert("Step tracking started! Walk normally to see the count.");
    } else {
        alert("Your device does not support motion sensors.");
    }
}

// Function to detect steps using acceleration
function detectSteps(event) {
    let acceleration = event.accelerationIncludingGravity;

    if (acceleration && acceleration.y) {
        if (lastY !== null) {
            let change = Math.abs(acceleration.y - lastY);

            if (change > 2) { // Threshold for detecting a step
                steps++;
                document.getElementById("steps").innerText = `Steps: ${steps}`;
            }
        }
        lastY = acceleration.y;
    }
}

