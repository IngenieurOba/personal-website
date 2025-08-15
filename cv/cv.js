// CV Dynamic Content System

// CV Templates and Configurations
const cvTemplates = {
    'investment-banking': {
        title: 'Investment Banking Analyst',
        position: 'Investment Banking Analyst',
        summary: 'Results-driven financial professional with 7+ years of experience in investment banking, M&A advisory, and capital markets. Specialized in building sophisticated financial models, executing complex transactions, and delivering strategic insights to Fortune 500 clients. Proven track record in deal execution exceeding $10B in aggregate transaction value.',
        experienceEmphasis: ['M&A', 'Financial Modeling', 'Due Diligence', 'Valuation'],
        skillsEmphasis: ['DCF Models', 'LBO Analysis', 'Merger Models', 'Pitch Book Creation'],
        projectsFilter: ['merger', 'dcf'],
        additionalSkills: ['Pitchbook Creation', 'Client Presentations', 'Transaction Execution', 'Market Research']
    },
    
    'private-equity': {
        title: 'Private Equity Associate',
        position: 'Private Equity Associate',
        summary: 'Experienced investment professional with deep expertise in leveraged buyouts, growth equity investments, and portfolio company value creation. Track record of identifying, analyzing, and executing transactions across multiple sectors with aggregate transaction value exceeding $5B. Strong operational finance background with focus on driving EBITDA growth and exit value optimization.',
        experienceEmphasis: ['LBO', 'Portfolio Management', 'Value Creation', 'Exit Strategy'],
        skillsEmphasis: ['LBO Models', 'Management Presentations', 'Due Diligence', 'Portfolio Monitoring'],
        projectsFilter: ['lbo', 'trading'],
        additionalSkills: ['Portfolio Optimization', 'Management Consulting', 'Operational Improvements', 'Board Reporting']
    },
    
    'corporate-finance': {
        title: 'Corporate Finance Manager',
        position: 'Senior Corporate Finance Manager',
        summary: 'Strategic finance leader with extensive experience in corporate development, capital allocation, and financial planning & analysis. Proven ability to support C-suite decision making through comprehensive financial analysis, M&A evaluation, and strategic planning. Led cross-functional initiatives resulting in $200M+ in identified value creation opportunities.',
        experienceEmphasis: ['Strategic Planning', 'Corporate Development', 'FP&A', 'Capital Allocation'],
        skillsEmphasis: ['Strategic Planning', 'Budget Management', 'Business Case Development', 'Executive Reporting'],
        projectsFilter: ['dcf', 'merger'],
        additionalSkills: ['Strategic Planning', 'Budget Management', 'Process Improvement', 'Cross-functional Leadership']
    },
    
    'consulting': {
        title: 'Management Consultant',
        position: 'Senior Management Consultant',
        summary: 'Strategic consultant with strong quantitative background and expertise in financial analysis, business transformation, and operational improvement. Experience working with Fortune 500 clients across multiple industries to drive performance improvements and strategic initiatives. Combines analytical rigor with practical business insights to deliver measurable results.',
        experienceEmphasis: ['Strategic Analysis', 'Client Management', 'Process Improvement', 'Change Management'],
        skillsEmphasis: ['Business Case Development', 'Strategic Analysis', 'Client Presentations', 'Project Management'],
        projectsFilter: ['dcf', 'trading'],
        additionalSkills: ['Change Management', 'Process Optimization', 'Stakeholder Management', 'Business Strategy']
    }
};

// Company-specific customizations
const companyCustomizations = {
    'goldman-sachs': {
        emphasizeSkills: ['Equity Research', 'Trading Models', 'Risk Management'],
        projectOrder: ['trading', 'merger', 'dcf', 'lbo']
    },
    'blackstone': {
        emphasizeSkills: ['Real Estate Finance', 'Alternative Investments', 'Fund Management'],
        projectOrder: ['lbo', 'merger', 'dcf', 'trading']
    },
    'mckinsey': {
        emphasizeSkills: ['Strategic Consulting', 'Change Management', 'Digital Transformation'],
        projectOrder: ['dcf', 'merger', 'trading', 'lbo']
    },
    'jpmorgan': {
        emphasizeSkills: ['Credit Analysis', 'Commercial Banking', 'Relationship Management'],
        projectOrder: ['dcf', 'lbo', 'merger', 'trading']
    }
};

// Initialize CV on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCV();
    setGeneratedDates();
    trackCVView();
});

// Initialize CV with URL parameters
function initializeCV() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'investment-banking';
    const company = urlParams.get('company') || 'generic';
    const expires = urlParams.get('expires');
    
    // Check if CV has expired
    if (expires && new Date(expires) < new Date()) {
        showExpiredMessage();
        return;
    }
    
    loadCVTemplate(role, company);
}

// Load and apply CV template
function loadCVTemplate(roleKey, companyKey) {
    const template = cvTemplates[roleKey];
    const customization = companyCustomizations[companyKey];
    
    if (!template) {
        console.error('CV template not found:', roleKey);
        return;
    }
    
    // Update page title and meta
    document.title = `${template.title} - Toba Kudehinbu`;
    document.getElementById('pageTitle').textContent = document.title;
    
    // Update header information
    document.getElementById('positionTitle').textContent = template.title;
    document.getElementById('companyName').textContent = formatCompanyName(companyKey);
    document.getElementById('cvPosition').textContent = template.position;
    
    // Update professional summary
    document.getElementById('professionalSummary').textContent = template.summary;
    
    // Customize experience section based on role
    customizeExperience(template.experienceEmphasis);
    
    // Customize skills section
    customizeSkills(template.skillsEmphasis, template.additionalSkills, customization);
    
    // Customize projects section
    customizeProjects(template.projectsFilter, customization);
    
    // Add role-specific styling
    addRoleSpecificStyling(roleKey);
}

// Customize experience section
function customizeExperience(emphasis) {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        const achievements = item.querySelectorAll('.experience-achievements li');
        
        // Reorder achievements based on emphasis
        const achievementArray = Array.from(achievements);
        const prioritized = [];
        const others = [];
        
        achievementArray.forEach(achievement => {
            const text = achievement.textContent;
            const isPriority = emphasis.some(keyword => 
                text.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (isPriority) {
                prioritized.push(achievement);
            } else {
                others.push(achievement);
            }
        });
        
        // Reorder in DOM
        const container = item.querySelector('.experience-achievements');
        container.innerHTML = '';
        
        [...prioritized, ...others].forEach(achievement => {
            container.appendChild(achievement);
        });
    });
}

// Customize skills section
function customizeSkills(skillsEmphasis, additionalSkills, customization) {
    const skillsGrid = document.getElementById('skillsGrid');
    
    // Add emphasized skills to Financial Modeling category
    const modelingCategory = skillsGrid.querySelector('.skill-category');
    const modelingList = modelingCategory.querySelector('.skill-list');
    
    skillsEmphasis.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        li.style.fontWeight = '600';
        li.style.color = '#2563eb';
        modelingList.insertBefore(li, modelingList.firstChild);
    });
    
    // Add company-specific skills if available
    if (customization && customization.emphasizeSkills) {
        const newCategory = document.createElement('div');
        newCategory.className = 'skill-category';
        newCategory.innerHTML = `
            <h4 class="skill-category-title">Specialized Skills</h4>
            <ul class="skill-list">
                ${customization.emphasizeSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        `;
        skillsGrid.appendChild(newCategory);
    }
}

// Customize projects section
function customizeProjects(projectsFilter, customization) {
    const projectsContainer = document.getElementById('projectsContent');
    const allProjects = projectsContainer.querySelectorAll('.project-item');
    
    // Hide projects not in filter
    allProjects.forEach(project => {
        const projectTitle = project.querySelector('.project-title').textContent.toLowerCase();
        const shouldShow = projectsFilter.some(filter => {
            if (filter === 'dcf') return projectTitle.includes('dcf') || projectTitle.includes('valuation');
            if (filter === 'lbo') return projectTitle.includes('lbo') || projectTitle.includes('buyout');
            if (filter === 'merger') return projectTitle.includes('merger') || projectTitle.includes('m&a');
            if (filter === 'trading') return projectTitle.includes('trading') || projectTitle.includes('investment');
            return false;
        });
        
        if (!shouldShow) {
            project.style.display = 'none';
        }
    });
    
    // Reorder projects based on company preference
    if (customization && customization.projectOrder) {
        const visibleProjects = Array.from(allProjects).filter(p => p.style.display !== 'none');
        const reordered = [];
        
        customization.projectOrder.forEach(orderType => {
            const matching = visibleProjects.find(project => {
                const title = project.querySelector('.project-title').textContent.toLowerCase();
                if (orderType === 'dcf') return title.includes('dcf') || title.includes('valuation');
                if (orderType === 'lbo') return title.includes('lbo') || title.includes('buyout');
                if (orderType === 'merger') return title.includes('merger') || title.includes('m&a');
                if (orderType === 'trading') return title.includes('trading') || title.includes('investment');
                return false;
            });
            if (matching && !reordered.includes(matching)) {
                reordered.push(matching);
            }
        });
        
        // Add any remaining projects
        visibleProjects.forEach(project => {
            if (!reordered.includes(project)) {
                reordered.push(project);
            }
        });
        
        // Reorder in DOM
        projectsContainer.innerHTML = '';
        reordered.forEach(project => {
            projectsContainer.appendChild(project);
        });
    }
}

// Add role-specific styling
function addRoleSpecificStyling(roleKey) {
    document.body.setAttribute('data-cv-role', roleKey);
    
    // Add custom CSS for different roles
    const roleStyles = {
        'investment-banking': '#1d4ed8',
        'private-equity': '#7c3aed',
        'corporate-finance': '#059669',
        'consulting': '#dc2626'
    };
    
    if (roleStyles[roleKey]) {
        const style = document.createElement('style');
        style.textContent = `
            .cv-header { background: linear-gradient(135deg, ${roleStyles[roleKey]} 0%, ${roleStyles[roleKey]}cc 100%) !important; }
            .section-title { border-bottom-color: ${roleStyles[roleKey]}; }
            .company-name { color: ${roleStyles[roleKey]} !important; }
            .skill-category { border-left-color: ${roleStyles[roleKey]}; }
        `;
        document.head.appendChild(style);
    }
}

// Utility functions
function formatCompanyName(companyKey) {
    const companyNames = {
        'goldman-sachs': 'Goldman Sachs',
        'jpmorgan': 'JPMorgan Chase',
        'blackstone': 'Blackstone',
        'kkr': 'KKR',
        'apollo': 'Apollo Global Management',
        'mckinsey': 'McKinsey & Company',
        'bain': 'Bain & Company',
        'bcg': 'Boston Consulting Group',
        'generic': 'Target Company'
    };
    
    return companyNames[companyKey] || companyKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function setGeneratedDates() {
    const now = new Date();
    const validUntil = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
    
    document.getElementById('generatedDate').textContent = now.toLocaleDateString();
    document.getElementById('validUntil').textContent = validUntil.toLocaleDateString();
}

function trackCVView() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const company = urlParams.get('company');
    
    // Simple analytics (you could send this to Google Analytics or your own tracking)
    console.log('CV View:', { role, company, timestamp: new Date().toISOString() });
}

function showExpiredMessage() {
    const main = document.querySelector('.cv-main');
    main.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: #64748b;">
            <h2 style="color: #ef4444; margin-bottom: 1rem;">CV Link Expired</h2>
            <p>This CV link has expired. Please contact me for an updated version.</p>
            <a href="../" class="btn btn-primary" style="margin-top: 1rem;">Visit Portfolio</a>
        </div>
    `;
}

// Share CV functionality
function shareCV() {
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: url
        }).then(() => {
            showMessage('CV link shared successfully!', 'success');
        }).catch((error) => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('CV link copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMessage('CV link copied to clipboard!', 'success');
    } catch (err) {
        showMessage('Unable to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
}

function showMessage(message, type) {
    // Reuse the message function from main.js if available
    if (window.siteUtils && window.siteUtils.showMessage) {
        window.siteUtils.showMessage(message, type);
    } else {
        alert(message); // Fallback
    }
}

// CV Builder Helper Functions (for creating new CV URLs)
window.cvBuilder = {
    generateCVUrl: function(role, company, daysValid = 30) {
        const baseUrl = window.location.origin + window.location.pathname;
        const expires = new Date(Date.now() + (daysValid * 24 * 60 * 60 * 1000)).toISOString();
        
        const params = new URLSearchParams({
            role: role,
            company: company.toLowerCase().replace(/\s+/g, '-'),
            expires: expires
        });
        
        return `${baseUrl}?${params.toString()}`;
    },
    
    availableRoles: Object.keys(cvTemplates),
    
    previewCV: function(role, company) {
        const url = this.generateCVUrl(role, company, 1); // 1 day preview
        window.open(url, '_blank');
    }
};

// Export for use in admin panel
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cvTemplates, companyCustomizations };
}
