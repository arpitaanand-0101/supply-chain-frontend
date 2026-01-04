// ===== DUMMY DATA =====
const dashboardData = {
  totalSuppliers: 14,
  totalOrders: 128,
  tempAlerts: 3,
  shipments: 6,
  inventoryCategories: ["Vegetables", "Meat", "Seafood", "Ready Meals", "Dairy"],
  inventoryValues: [120, 90, 70, 150, 50],
  orderLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  orderValues: [12, 18, 10, 22, 19, 30, 27]
};

// ===== UPDATE SUMMARY CARDS =====
document.getElementById("total-suppliers").innerText = dashboardData.totalSuppliers;
document.getElementById("total-orders").innerText = dashboardData.totalOrders;
document.getElementById("temp-alerts").innerText = dashboardData.tempAlerts;
document.getElementById("shipments-on-route").innerText = dashboardData.shipments;

// ===== CHART.JS GLOBAL CONFIGURATION =====
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = '#64748b';

// ===== INVENTORY BAR CHART =====
const invCtx = document.getElementById("inventoryChart").getContext("2d");

new Chart(invCtx, {
  type: "bar",
  data: {
    labels: dashboardData.inventoryCategories,
    datasets: [{
      label: "Stock (units)",
      data: dashboardData.inventoryValues,
      backgroundColor: [
        '#10b981',
        '#ef4444', 
        '#3b82f6',
        '#8b5cf6',
        '#f59e0b'
      ],
      borderRadius: 8,
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + ' units';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            weight: 600
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        },
        ticks: {
          callback: function(value) {
            return value + ' units';
          }
        }
      }
    }
  }
});

// ===== ORDERS LINE CHART =====
const ordersCtx = document.getElementById("ordersChart").getContext("2d");

new Chart(ordersCtx, {
  type: "line",
  data: {
    labels: dashboardData.orderLabels,
    datasets: [{
      label: "Orders",
      data: dashboardData.orderValues,
      borderColor: '#3b82f6',
      backgroundColor: function(context) {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: '#3b82f6',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#334155',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return 'Orders: ' + context.parsed.y;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            weight: 600
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        },
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ADD LOADING ANIMATION =====
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  
  setTimeout(function() {
    document.body.style.opacity = '1';
  }, 100);
});

console.log('✅ FreezeFlow Dashboard Loaded Successfully!');
console.log('📊 Total Suppliers:', dashboardData.totalSuppliers);
console.log('📦 Total Orders:', dashboardData.totalOrders);
console.log('🌡️ Temperature Alerts:', dashboardData.tempAlerts);
console.log('🚚 Active Shipments:', dashboardData.shipments);