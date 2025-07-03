document.addEventListener("DOMContentLoaded", function() {
    // Initialize navigation functionality
    initializeNavigation();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the href
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active states and show the selected section
            updateActiveStates(this, targetId);
        });
    });
}

function updateActiveStates(clickedLink, targetId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });

    // Add active class to clicked link
    clickedLink.classList.add('active');
    clickedLink.setAttribute('aria-current', 'page');

    // Show the target section and hide others
    showSection(targetId);
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Future: GitHub API integration for dynamic repository loading
// This function would fetch repositories from GitHub API
function loadRepositories() {
    // Placeholder for future implementation
    // Would make API call to GitHub and populate repos-container
    console.log('loadRepositories called - implement GitHub API integration');
    
    // Example implementation structure:
    // const container = document.getElementById('repos-container');
    // const loading = document.getElementById('repos-loading');
    // const error = document.getElementById('repos-error');
    
    // Show loading state
    // loading.style.display = 'block';
    // container.style.display = 'none';
    // error.style.display = 'none';
    
    // Fetch from GitHub API
    // fetch('https://api.github.com/users/username/repos')
    //   .then(response => response.json())
    //   .then(data => {
    //     // Hide loading, show container
    //     loading.style.display = 'none';
    //     container.style.display = 'grid';
    //     
    //     // Generate repository cards from API data
    //     container.innerHTML = data.map(repo => generateRepoCard(repo)).join('');
    //   })
    //   .catch(err => {
    //     // Show error state
    //     loading.style.display = 'none';
    //     error.style.display = 'block';
    //   });
}

// Helper function to generate repository card HTML
// Helper function to escape HTML special characters
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"'`=\/]/g, function (s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;',
            '=': '&#61;',
            '/': '&#47;'
        })[s];
    });
}

function generateRepoCard(repo) {
    // Safely escape all user-controlled data to prevent XSS
    const name = escapeHTML(repo.name);
    const html_url = escapeHTML(repo.html_url);
    const language = escapeHTML(repo.language || 'Unknown');
    const stars = Number(repo.stargazers_count) || 0;
    const description = escapeHTML(repo.description || 'No description available');
    const topics = Array.isArray(repo.topics)
        ? repo.topics.map(topic => `<span class="topic-tag">${escapeHTML(topic)}</span>`).join('')
        : '';
    const updated_at = escapeHTML(repo.updated_at);
    const updated_date = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : '';

    return `
        <article class="repo-card">
            <header class="repo-header">
                <h3 class="repo-name">
                    <a href="${html_url}" target="_blank" rel="noopener noreferrer">
                        ${name}
                    </a>
                </h3>
                <div class="repo-meta">
                    <span class="repo-language">${language}</span>
                    <span class="repo-stars">⭐ ${stars}</span>
                </div>
            </header>
            <p class="repo-description">
                ${description}
            </p>
            <footer class="repo-footer">
                <div class="repo-topics">
                    ${topics}
                </div>
                <time class="repo-updated" datetime="${updated_at}">
                    Updated ${updated_date}
                </time>
            </footer>
        </article>
    `;
}