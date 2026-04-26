// Konfigurasi Chart
const ctx = document.getElementById('gasChart').getContext('2d');
let gasData = [100, 120, 115, 130, 125, 140, 135, 150, 145, 160];
let labels = ['', '', '', '', '', '', '', '', '', ''];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Konsentrasi Gas (PPM)',
            data: gasData,
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 1000 } }
    }
});

// Fungsi Simulasi Update Data
function updateSensorData() {
    // Simulasi Nilai
    const newGas = Math.floor(Math.random() * 500) + 50; 
    const newTemp = Math.floor(Math.random() * 5) + 25;

    document.getElementById('gas-val').innerText = newGas + " PPM";
    document.getElementById('temp-val').innerText = newTemp + "°C";

    // Update Grafik
    gasData.push(newGas);
    gasData.shift();
    chart.update();

    // Logika Keamanan
    const statusCard = document.getElementById('status-card');
    const statusText = document.getElementById('status-text');
    const gasCard = document.getElementById('gas-card');

    if (newGas > 400) {
        statusText.innerText = "BAHAYA!";
        statusCard.className = "card p-3 border-start border-danger border-5 shadow-sm danger-pulse";
        gasCard.classList.add("text-danger");
        document.getElementById('buzzer-status-text').innerText = "BERBUNYI!";
        document.getElementById('btn-buzzer').className = "btn btn-lg btn-danger w-100 py-3";
    } else {
        statusText.innerText = "AMAN";
        statusCard.className = "card p-3 border-start border-success border-5 shadow-sm";
        gasCard.classList.remove("text-danger");
    }
}

// Fungsi Tombol Buzzer
let buzzerOn = false;
function toggleBuzzer() {
    buzzerOn = !buzzerOn;
    const btn = document.getElementById('btn-buzzer');
    const label = document.getElementById('buzzer-label');

    if (buzzerOn) {
        btn.className = "btn btn-lg btn-danger w-100 py-3";
        label.innerText = "MATIKAN";
        alert("Buzzer Dinyalakan secara Manual!");
    } else {
        btn.className = "btn btn-lg btn-outline-secondary w-100 py-3";
        label.innerText = "BUNYIKAN";
    }
}

// Update data setiap 3 detik
setInterval(updateSensorData, 3000);