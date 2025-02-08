let steps = 0;
let lastY = null;

// Function to start step tracking
function startTracking() {
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", detectSteps);
        alert("Step tracking started! Shake your phone to simulate steps.");
    } else {
        alert("Your device does not support motion sensors.");
    }
}

// Function to detect steps
function detectSteps(event) {
    let acceleration = event.accelerationIncludingGravity;

    if (acceleration && acceleration.y) {
        if (lastY !== null) {
            let change = Math.abs(acceleration.y - lastY);

            if (change > 2) { // Step detection threshold
                steps++;
                updateProgress();
            }
        }
        lastY = acceleration.y;
    }
}

// Function to update progress bar
function updateProgress() {
    let stepText = document.getElementById("step-count");
    let progressBar = document.getElementById("progressBar");

    stepText.innerHTML = `Steps: ${steps}`;
    
    // Increase progress (max width = 100%)
    let progress = Math.min((steps / 100) * 100, 100); // Assuming 100 steps = full bar
    progressBar.style.width = `${progress}%`;

    if (steps >= 100) {
        alert("🎉 Goal Reached!");
        window.removeEventListener("devicemotion", detectSteps);
    }
}
