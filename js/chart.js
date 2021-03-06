import html from './html.js';

function makeTemplate() {
    return html`
        <canvas id="myChart" width="400" height="400"></canvas>
    `;
}

export default class ReportChart {
    constructor(results) {
        this.results = results;
    }
    render() {
        let dom = makeTemplate();
        
        const canvas = dom.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        
        const products = JSON.parse(localStorage.getItem('results'));
        let labels = [];
        let viewCount = [];
        let clickCount = [];

        for(let i = 0; i < products.length; i++) {
            labels.push(products[i].name);
            clickCount.push(products[i].clicks);
            viewCount.push(products[i].views);
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Views',
                    data: viewCount,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: '# of Clicks',
                    data: clickCount,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        return dom;
    }
}