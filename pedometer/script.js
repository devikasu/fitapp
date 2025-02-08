let steps = 0;
let stepGoal = 100;  // Change this for a different goal
let lastY = null;

// Function to start tracking
function startTracking() {
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", detectSteps);
        alert("Step tracking started! Walk normally.");
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

            if (change > 2) { // Step detection threshold
                steps++;
                updateUI();
            }
        }
        lastY = acceleration.y;
    }
}

// Function to update progress bar and step count
function updateUI() {
    let stepText = document.getElementById("step-count");
    let donut = document.getElementById("donut");

    stepText.innerText = `Steps: ${steps} / ${stepGoal}`;

    // Move donut (max left = 100%)
    let progress = Math.min((steps / stepGoal) * 100, 100);
    donut.style.left = `${progress}%`;

    // Notify when step goal is reached
    if (steps >= stepGoal) {
        alert("🎉 Goal Reached! Well done!");
        window.removeEventListener("devicemotion", detectSteps);
    }
}


