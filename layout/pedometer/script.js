const CLIENT_ID = "515345527131-r1pmgec89gr6uuv4sadk2vtunklqtum7.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read";
let accessToken = null;

// Initialize Google Identity Services (GIS) authentication
function initAuth() {
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
            if (response.error) {
                console.error("Auth failed", response);
                return;
            }
            accessToken = response.access_token;
            getStepData(); // Call the API after successful authentication
        },
    });

    document.getElementById("signInButton").addEventListener("click", () => {
        tokenClient.requestAccessToken();
    });
}

// Fetch step count from Google Fit API using fetch
function getStepData() {
    if (!accessToken) {
        console.error("User is not authenticated.");
        return;
    }

    const startTimeMillis = Date.now() - 86400000; // 24 hours ago
    const endTimeMillis = Date.now();

    const url = `https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate`;

    const requestBody = {
        aggregateBy: [{
            dataTypeName: "com.google.step_count.delta",
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTimeMillis.toString(),
        endTimeMillis: endTimeMillis.toString(),
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
        let steps = data?.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;
        document.getElementById("stepCounter").innerText = `Steps: ${steps}`;
    })
    .catch(error => console.error("Error fetching steps:", error));
}

// Load APIs when page is ready
document.addEventListener("DOMContentLoaded", () => {
    initAuth(); // Initialize auth first
});
