const alerts = [
    { type: 'violence', location: 'Watson District', description: 'Corporate enforcers harassing street vendors. Solidarity needed.' },
    { type: 'aid', location: 'Pacifica', description: 'Food distribution center running low on supplies. Donations urgently required.' },
    { type: 'violence', location: 'Santo Domingo', description: 'Forced evictions in progress. Resistance organizing at central plaza.' },
    { type: 'aid', location: 'Heywood', description: 'Underground clinic needs medical supplies and volunteers.' },
    { type: 'violence', location: 'City Center', description: 'Protest against AI surveillance turning violent. Medics and legal observers needed.' }
];

function displayRandomAlert() {
    const alertElement = document.getElementById('action-alert');
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    
    alertElement.innerHTML = `
        <h3>${randomAlert.type === 'violence' ? 'Urgent: Violence Reported' : 'Community Aid Needed'}</h3>
        <p><strong>Location:</strong> ${randomAlert.location}</p>
        <p>${randomAlert.description}</p>
        <button onclick="respondToAlert('${randomAlert.type}', '${randomAlert.location}')">Respond</button>
    `;
    alertElement.style.display = 'block';
}

function respondToAlert(type, location) {
    console.log(`Responding to ${type} alert in ${location}`);
    showPopup('Response logged. A coordinator will contact you securely with further instructions.');
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button class="close-popup" onclick="closePopup(this.parentNode.parentNode)">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';
}

function closePopup(popup) {
    popup.style.display = 'none';
    document.body.removeChild(popup);
}

// Display a random alert when the page loads
window.addEventListener('load', displayRandomAlert);

// Refresh the alert every 5 minutes
setInterval(displayRandomAlert, 300000);
