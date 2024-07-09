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
    alert('Response logged. A coordinator will contact you securely with further instructions.');
}

// Display a random alert when the page loads
window.addEventListener('load', displayRandomAlert);

// Refresh the alert every 5 minutes
setInterval(displayRandomAlert, 300000);
