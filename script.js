// 1. Inisialisasi Grafik Ganda (Suhu & Gas)
const ctx = document.getElementById('gasChart').getContext('2d');
let gasData = [120, 130, 125, 140, 150, 160, 155, 170, 165, 180];
let tempData = [25, 26, 25, 27, 28, 27, 26, 28, 29, 28];
let labels = ['', '', '', '', '', '', '', '', '', ''];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Gas (PPM)',
                data: gasData,
                borderColor: '#f6c23e', // Kuning (Gas)
                backgroundColor: 'rgba(246, 194, 62, 0.1)',
                yAxisID: 'yGas',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Suhu (°C)',
                data: tempData,
                borderColor: '#4e73df', // Biru (Suhu)
                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                yAxisID: 'yTemp',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            yGas: { type: 'linear', position: 'left', beginAtZero: true, max: 1000, title: { display: true, text: 'PPM' } },
            yTemp: { type: 'linear', position: 'right', beginAtZero: true, max: 100, grid: { drawOnChartArea: false }, title: { display: true, text: '°C' } }
        }
    }
});

// 2. Variabel Kontrol
let isManualBuzzer = false;

// 3. Fungsi Simulasi Update Data & Logika Otomatis
function updateSensorData() {
    // Simulasi Nilai dari MQ5 dan Sensor Suhu
    const newGas = Math.floor(Math.random() * 500) + 50; 
    const newTemp = Math.floor(Math.random() * 15) + 20;

    document.getElementById('gas-val').innerText = newGas + " PPM";
    document.getElementById('temp-val').innerText = newTemp + "°C";

    // Logika Otomatis Buzzer
    // Menyala jika Gas > 400 ATAU Suhu > 35
    if (newGas > 400 || newTemp > 35) {
        setBuzzerUI(true, "OTOMATIS (BAHAYA)");
    } else if (!isManualBuzzer) {
        setBuzzerUI(false, "AMAN");
    }

    // Update Grafik
    gasData.push(newGas);
    tempData.push(newTemp);
    gasData.shift();
    tempData.shift();
    chart.update();
}

// 4. Fungsi Kendali Manual
function manualBuzzerControl() {
    const sw = document.getElementById('buzzerSwitch');
    isManualBuzzer = sw.checked;
    
    if (isManualBuzzer) {
        setBuzzerUI(true, "MANUAL (ON)");
    } else {
        setBuzzerUI(false, "SIAGA");
    }
}

// 5. Fungsi Update Tampilan Buzzer
function setBuzzerUI(isActive, message) {
    const label = document.getElementById('buzzerStatusLabel');
    const statusCard = document.getElementById('status-card');
    const statusText = document.getElementById('status-text');

    if (isActive) {
        label.innerText = "AKTIF - " + message;
        label.className = "badge bg-danger p-2 px-3";
        statusText.innerText = "ALARM AKTIF!";
        statusCard.className = "card p-3 border-start border-danger border-5 shadow-sm danger-pulse";
    } else {
        label.innerText = "MATI";
        label.className = "badge bg-secondary p-2 px-3";
        statusText.innerText = "AMAN";
        statusCard.className = "card p-3 border-start border-success border-5 shadow-sm";
    }
}

// Update data setiap 3 detik
setInterval(updateSensorData, 3000);
