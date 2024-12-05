// Data
const environmentalData = [
    { time: '09:00', pressure: 2.1, salinity: 35, temperature: 25 },
    { time: '10:00', pressure: 2.2, salinity: 34, temperature: 26 },
    { time: '11:00', pressure: 2.0, salinity: 35, temperature: 26 }
];

const diseaseData = [
    { pathogen: 'Fetching disease data from backend...', risk: 'Fetching disease data from backend...', symptoms: 'Fetching disease data from backend...', conditions: 'Fetching disease data from backend...' },
];

const capturedImages = [
    { id: 1, date: '2024-03-01', url: '/api/placeholder/300/300', title: 'Morning inspection' },
    { id: 2, date: '2024-03-01', url: '/api/placeholder/300/300', title: 'Afternoon check' },
    { id: 3, date: '2024-03-02', url: '/api/placeholder/300/300', title: 'Growth monitoring' },
    { id: 4, date: '2024-03-02', url: '/api/placeholder/300/300', title: 'Surface analysis' }
];

// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and hide all content
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        
        // Add active class to clicked button and show corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.remove('hidden');
    });
});

// Live camera functionality
document.getElementById('startCamera').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.getElementById('live-feed');
                video.srcObject = stream;
            })
            .catch(err => console.log("Error accessing camera: ", err));
    }
});

// Image view functionality
let isGridView = true;
let isDescOrder = true;

document.getElementById('viewToggle').addEventListener('click', () => {
    const imageGrid = document.getElementById('imageGrid');
    isGridView = !isGridView;
    imageGrid.classList.toggle('list-view');
    renderImages();
});

document.getElementById('sortToggle').addEventListener('click', () => {
    isDescOrder = !isDescOrder;
    renderImages();
});

function renderImages() {
    const imageGrid = document.getElementById('imageGrid');
    const sortedImages = [...capturedImages].sort((a, b) => {
        return isDescOrder 
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
    });

    imageGrid.innerHTML = sortedImages.map(image => `
        <div class="image-item">
            <img src="${image.url}" alt="${image.title}">
            <div class="image-info">
                <p>${image.date}</p>
                <p>${image.title}</p>
            </div>
        </div>
    `).join('');
}

// Initialize images
renderImages();

// Populate disease alerts
const diseaseAlertsContainer = document.getElementById('diseaseAlerts');
diseaseAlertsContainer.innerHTML = diseaseData.map(disease => `
    <div class="disease-alert ${disease.risk.toLowerCase()}">
        <h4>${disease.pathogen}</h4>
        <p><strong>Risk Level:</strong> ${disease.risk}</p>
        <p><strong>Symptoms:</strong> ${disease.symptoms}</p>
        <p><strong>Conditions:</strong> ${disease.conditions}</p>
    </div>
`).join('');

// Initialize charts (using a simple canvas API for demonstration)
// Note: In a real application, you might want to use a proper charting library like Chart.js
function initializeCharts() {
    // This is a placeholder for chart initialization
    // You would need to implement actual chart rendering using your preferred library
    console.log('Charts would be initialized here');
}

initializeCharts();