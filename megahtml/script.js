// Mock daily data (yesterday vs today in kWh)
const dailyData = [
  { name: "TV", yesterday: 0.8, today: 0.6 },
  { name: "Fridge", yesterday: 3.5, today: 3.6 },
  { name: "Microwave", yesterday: 0.3, today: 0.4 },
  { name: "Oven", yesterday: 0.8, today: 0.5 },
  { name: "Switch1", yesterday: 0.2, today: 0.3 },
  { name: "Air Conditioner", yesterday: 5.0, today: 6.2 }
];

function renderDailyCards() {
  const container = document.getElementById('daily-cards');
  container.innerHTML = '';
  dailyData.forEach(item => {
    const diff = item.today - item.yesterday;
    const change = diff > 0 ? `↑ ${diff.toFixed(1)}` : diff < 0 ? `↓ ${Math.abs(diff).toFixed(1)}` : '→ 0';
    const changeColor = diff > 0 ? '#ff4444' : diff < 0 ? '#44ff44' : '#666';

    const card = document.createElement('div');
    card.className = 'usage-card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Yesterday: ${item.yesterday} kWh<br>Today: ${item.today} kWh</p>
      <div class="compare" style="color:${changeColor};">${change} kWh</div>
      <small>Est. cost today: $${(item.today * 0.15).toFixed(2)}</small>
    `;
    container.appendChild(card);
  });
}

// Tab switching
document.querySelectorAll('.bottom-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.remove('active'));
    
    const tabId = btn.dataset.tab;
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');

    if (tabId === 'stats-tab') {
      renderDailyCards();
    }
  });
});

// Initial render
renderDailyCards();