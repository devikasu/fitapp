let steps = 0;
let lastAcceleration = 0;

// Function to start step tracking
function startTracking() {
    if ('Accelerometer' in window) {
        let sensor = new Accelerometer({ frequency: 10 });

        sensor.addEventListener("reading", () => {
            let acceleration = Math.sqrt(sensor.x ** 2 + sensor.y ** 2 + sensor.z ** 2);
            
            // Detect step if acceleration difference crosses a threshold
            if (Math.abs(acceleration - lastAcceleration) > 2) {
                steps++;
                document.getElementById("steps").innerText = `Steps: ${steps}`;
            }

            lastAcceleration = acceleration;
        });

        sensor.start();
    } else {
        alert("Your device does not support motion sensors.");
    }
}
