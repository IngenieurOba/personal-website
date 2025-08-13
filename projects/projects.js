// Projects page specific JavaScript

// Sample financial model data
const modelData = {
    'dcf-tech-company': {
        title: 'Technology Company DCF Analysis',
        overview: {
            company: 'TechCorp Inc.',
            sector: 'Software as a Service',
            modelType: 'Discounted Cash Flow',
            dateCreated: 'December 2024',
            keyMetrics: {
                'Enterprise Value': '$2.3B',
                'Equity Value': '$1.9B',
                'Share Price Target': '$47.50',
                'Upside/(Downside)': '23.4%'
            }
        },
        spreadsheetData: [
            ['', '2024E', '2025E', '2026E', '2027E', '2028E'],
            ['Revenue ($M)', 450, 585, 731, 878, 1024],
            ['Growth Rate (%)', '15%', '30%', '25%', '20%', '17%'],
            ['EBITDA ($M)', 90, 146, 219, 307, 399],
            ['EBITDA Margin (%)', '20%', '25%', '30%', '35%', '39%'],
            ['Capex ($M)', -23, -29, -37, -44, -51],
            ['Free Cash Flow ($M)', 67, 117, 182, 263, 348],
            ['Terminal Value ($M)', '', '', '', '', 4205],
            ['PV of FCF ($M)', 60, 97, 137, 180, 2890],
            ['Enterprise Value ($M)', '', '', '', '', 3364]
        ],
        analysis: `
            <h3>Investment Thesis</h3>
            <p>TechCorp represents a compelling investment opportunity in the rapidly growing SaaS market. The company has demonstrated strong recurring revenue growth and improving margins.</p>
            
            <h3>Key Drivers</h3>
            <ul>
                <li><strong>Revenue Growth:</strong> Sustained 20%+ growth driven by customer acquisition and expansion</li>
                <li><strong>Margin Expansion:</strong> Operating leverage driving EBITDA margins from 20% to 39%</li>
                <li><strong>Market Position:</strong> Leading position in enterprise software segment</li>
                <li><strong>Recurring Revenue:</strong> 95% of revenue is recurring with low churn rates</li>
            </ul>
            
            <h3>Sensitivity Analysis</h3>
            <p>Base case assumes 8.5% WACC and 3% terminal growth. Sensitivity to these assumptions:</p>
            <ul>
                <li>WACC ±100bp: $39-56 price range</li>
                <li>Terminal growth ±100bp: $42-53 price range</li>
                <li>Revenue growth ±500bp: $35-60 price range</li>
            </ul>
        `,
        methodology: `
            <h3>Valuation Approach</h3>
            <p>This DCF model employs a detailed bottom-up approach with the following components:</p>
            
            <h3>Revenue Forecasting</h3>
            <ul>
                <li>Customer cohort analysis for new customer acquisition</li>
                <li>Net revenue retention modeling for existing customers</li>
                <li>Product mix analysis across different service tiers</li>
                <li>Geographic expansion assumptions</li>
            </ul>
            
            <h3>Cost Structure</h3>
            <ul>
                <li>Variable costs scaled with customer growth</li>
                <li>Fixed costs with operational leverage assumptions</li>
                <li>R&D investment as percentage of revenue</li>
                <li>Sales & marketing efficiency improvements</li>
            </ul>
            
            <h3>Key Assumptions</h3>
            <ul>
                <li><strong>WACC:</strong> 8.5% (Cost of Equity: 9.2%, Cost of Debt: 4.5%)</li>
                <li><strong>Terminal Growth:</strong> 3.0% (in line with long-term GDP)</li>
                <li><strong>Terminal EBITDA Margin:</strong> 39% (best-in-class SaaS)</li>
                <li><strong>Working Capital:</strong> Minimal impact given SaaS model</li>
            </ul>
        `
    },
    
    'lbo-retail-chain': {
        title: 'Retail Chain LBO Analysis',
        overview: {
            company: 'RetailMax Holdings',
            sector: 'Consumer Retail',
            modelType: 'Leveraged Buyout',
            dateCreated: 'November 2024',
            keyMetrics: {
                'Purchase Price': '$850M',
                'Equity Investment': '$255M',
                'Debt Financing': '$595M',
                'Projected IRR': '28.7%'
            }
        },
        spreadsheetData: [
            ['', '2024E', '2025E', '2026E', '2027E', '2028E'],
            ['Revenue ($M)', 1200, 1260, 1323, 1389, 1458],
            ['EBITDA ($M)', 120, 139, 158, 180, 204],
            ['EBITDA Margin (%)', '10.0%', '11.0%', '12.0%', '13.0%', '14.0%'],
            ['Interest Expense ($M)', -42, -38, -33, -27, -20],
            ['Cash Taxes ($M)', -19, -25, -31, -38, -46],
            ['Capex ($M)', -24, -25, -26, -28, -29],
            ['Free Cash Flow ($M)', 35, 51, 68, 87, 109],
            ['Debt Paydown ($M)', -35, -41, -48, -57, -67],
            ['Ending Debt ($M)', 595, 560, 519, 471, 414, 347]
        ],
        analysis: `
            <h3>Investment Thesis</h3>
            <p>RetailMax represents a classic LBO opportunity with stable cash flows, potential for operational improvements, and a clear exit strategy.</p>
            
            <h3>Value Creation Strategy</h3>
            <ul>
                <li><strong>Operational Improvements:</strong> Margin expansion through supply chain optimization</li>
                <li><strong>Revenue Growth:</strong> Store expansion and e-commerce development</li>
                <li><strong>Cost Reduction:</strong> Technology investments and process improvements</li>
                <li><strong>Financial Engineering:</strong> Optimal capital structure with 70% debt financing</li>
            </ul>
            
            <h3>Exit Scenarios</h3>
            <ul>
                <li><strong>Strategic Sale (Year 5):</strong> 12x EBITDA multiple = $2.4B enterprise value</li>
                <li><strong>IPO (Year 4-5):</strong> Public market comparable multiples</li>
                <li><strong>Secondary Buyout:</strong> Sale to another financial sponsor</li>
            </ul>
        `,
        methodology: `
            <h3>Transaction Structure</h3>
            <ul>
                <li><strong>Purchase Price:</strong> 7.1x LTM EBITDA</li>
                <li><strong>Debt Financing:</strong> 5.0x EBITDA (Term Loan + Revolving Credit)</li>
                <li><strong>Equity Contribution:</strong> 30% of purchase price</li>
                <li><strong>Management Rollover:</strong> 10% equity participation</li>
            </ul>
            
            <h3>Debt Structure</h3>
            <ul>
                <li><strong>Term Loan A:</strong> $300M at L+350bp</li>
                <li><strong>Term Loan B:</strong> $250M at L+450bp</li>
                <li><strong>Revolving Credit:</strong> $45M at L+300bp</li>
                <li><strong>Cash Sweep:</strong> 75% of excess cash for debt paydown</li>
            </ul>
            
            <h3>Key Assumptions</h3>
            <ul>
                <li><strong>Revenue Growth:</strong> 5% annually driven by same-store sales and expansion</li>
                <li><strong>EBITDA Expansion:</strong> 400bp margin improvement over 5 years</li>
                <li><strong>Exit Multiple:</strong> 12x EBITDA (premium to entry due to improvements)</li>
                <li><strong>Debt Paydown:</strong> $248M over 5 years from free cash flow</li>
            </ul>
        `
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize modal functionality
    initModalFunctionality();
    
    // Initialize tab switching
    initTabSwitching();
});

// Project filtering functionality
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });
}

// Modal functionality
function initModalFunctionality() {
    const modal = document.getElementById('modelModal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModel();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModel();
        }
    });
}

// Tab switching functionality
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// Open model modal
function openModel(modelId) {
    const modal = document.getElementById('modelModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (!modelData[modelId]) {
        window.siteUtils.showMessage('Model data not found', 'error');
        return;
    }
    
    const model = modelData[modelId];
    
    // Set modal title
    modalTitle.textContent = model.title;
    
    // Load content for each tab
    loadModelOverview(model);
    loadModelSpreadsheet(model);
    loadModelAnalysis(model);
    loadModelMethodology(model);
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Reset to first tab
    document.querySelector('.tab-btn[data-tab="overview"]').click();
}

// Close model modal
function closeModel() {
    const modal = document.getElementById('modelModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Load model overview
function loadModelOverview(model) {
    const container = document.getElementById('modelOverview');
    
    let html = `
        <div class="model-summary">
            <h3>Model Summary</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Company:</strong> ${model.overview.company}
                </div>
                <div class="summary-item">
                    <strong>Sector:</strong> ${model.overview.sector}
                </div>
                <div class="summary-item">
                    <strong>Model Type:</strong> ${model.overview.modelType}
                </div>
                <div class="summary-item">
                    <strong>Date Created:</strong> ${model.overview.dateCreated}
                </div>
            </div>
        </div>
        
        <div class="key-metrics">
            <h3>Key Metrics</h3>
            <div class="metrics-grid">
    `;
    
    Object.entries(model.overview.keyMetrics).forEach(([key, value]) => {
        html += `
            <div class="metric-item">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${key}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="model-disclaimer">
            <p><strong>Disclaimer:</strong> This model is for demonstration purposes. All financial data is illustrative and should not be used for actual investment decisions.</p>
        </div>
    `;
    
    container.innerHTML = html;
}

// Load model spreadsheet
function loadModelSpreadsheet(model) {
    const container = document.getElementById('spreadsheetContainer');
    
    let html = `
        <div class="spreadsheet-toolbar">
            <div class="toolbar-title">Interactive Financial Model</div>
            <div class="toolbar-actions">
                <button class="btn-small" onclick="window.siteUtils.showMessage('Full model available upon request', 'info')">Request Full Model</button>
            </div>
        </div>
        <table class="spreadsheet-table">
    `;
    
    model.spreadsheetData.forEach((row, rowIndex) => {
        html += '<tr>';
        row.forEach((cell, cellIndex) => {
            if (rowIndex === 0) {
                // Header row
                html += `<th>${cell}</th>`;
            } else if (cellIndex === 0) {
                // Row headers
                html += `<td class="row-header">${cell}</td>`;
            } else {
                // Data cells
                let cellClass = '';
                if (typeof cell === 'string' && cell.includes('%')) {
                    cellClass = 'formula-cell';
                } else if (typeof cell === 'number' && cell < 0) {
                    cellClass = 'input-cell';
                } else if (rowIndex === model.spreadsheetData.length - 1) {
                    cellClass = 'output-cell';
                }
                
                html += `<td class="${cellClass}">${cell}</td>`;
            }
        });
        html += '</tr>';
    });
    
    html += '</table>';
    
    container.innerHTML = html;
}

// Load model analysis
function loadModelAnalysis(model) {
    const container = document.getElementById('modelAnalysis');
    container.innerHTML = model.analysis;
}

// Load model methodology
function loadModelMethodology(model) {
    const container = document.getElementById('modelMethodology');
    container.innerHTML = model.methodology;
}

// Add some CSS for the modal content
const modalStyles = `
<style>
.model-summary, .key-metrics {
    margin-bottom: 2rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.summary-item {
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    border-left: 4px solid #2563eb;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.metric-item {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border-radius: 12px;
}

.metric-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1d4ed8;
    margin-bottom: 0.5rem;
}

.metric-label {
    color: #64748b;
    font-size: 0.9rem;
}

.model-disclaimer {
    margin-top: 2rem;
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
}

.spreadsheet-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
}

.toolbar-title {
    font-weight: 600;
    color: #1a202c;
}

.btn-small {
    padding: 0.5rem 1rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background 0.2s ease;
}

.btn-small:hover {
    background: #1d4ed8;
}
</style>
`;

// Add styles to head
document.head.insertAdjacentHTML('beforeend', modalStyles);
