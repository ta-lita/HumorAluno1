function updateValue(id) {
    const value = document.getElementById(id).value;
    document.getElementById(id + 'Value').textContent = value;
}

function saveData(time) {
    const mood = document.getElementById('mood').value;
    const confidence = document.getElementById('confidence').value;
    const nervousness = document.getElementById('nervousness').value;

    const data = {
        mood,
        confidence,
        nervousness,
        timestamp: new Date().toISOString(),
        time // Salva se é "before" ou "after"
    };

    let records = JSON.parse(localStorage.getItem('moodRecords')) || [];
    records.push(data);
    localStorage.setItem('moodRecords', JSON.stringify(records));

    document.getElementById('moodForm').reset();
    updateValue('mood');
    updateValue('confidence');
    updateValue('nervousness');
    showFeedback();

    // Não recarrega a página aqui
}

function concludeLesson() {
    // Recarregar a página para atualizar os gráficos
    location.reload();
}

function showFeedback() {
    const records = JSON.parse(localStorage.getItem('moodRecords')) || [];
    const labels = records.map(record => new Date(record.timestamp).toLocaleDateString());
    const moodData = records.map(record => record.mood);
    const confidenceData = records.map(record => record.confidence);
    const nervousnessData = records.map(record => record.nervousness);

    const moodCtx = document.getElementById('moodChart').getContext('2d');
    const confidenceCtx = document.getElementById('confidenceChart').getContext('2d');
    const nervousnessCtx = document.getElementById('nervousnessChart').getContext('2d');

    new Chart(moodCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humor',
                data: moodData,
                borderColor: 'blue',
                borderWidth: 1,
                fill: false
            }]
        }
    });

    new Chart(confidenceCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Autoconfiança',
                data: confidenceData,
                borderColor: 'green',
                borderWidth: 1,
                fill: false
            }]
        }
    });

    new Chart(nervousnessCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nervosismo',
                data: nervousnessData,
                borderColor: 'red',
                borderWidth: 1,
                fill: false
            }]
        }
    });
}

// Show feedback on page load
document.addEventListener('DOMContentLoaded', showFeedback);
