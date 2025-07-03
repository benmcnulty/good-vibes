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

// Future: Articles/CMS integration for dynamic article loading
// This function would fetch articles from a CMS or static files
function loadArticles() {
    // Placeholder for future implementation
    // Would load articles from markdown files, CMS API, or static JSON
    console.log('loadArticles called - implement article loading system');
    
    // Example implementation structure:
    // const container = document.getElementById('articles-container');
    // const loading = document.getElementById('articles-loading');
    // const error = document.getElementById('articles-error');
    
    // Show loading state
    // loading.style.display = 'block';
    // container.style.display = 'none';
    // error.style.display = 'none';
    
    // Fetch articles data (from CMS, markdown files, or API)
    // fetch('/api/articles') // or load from static JSON/markdown
    //   .then(response => response.json())
    //   .then(data => {
    //     // Hide loading, show container
    //     loading.style.display = 'none';
    //     container.style.display = 'grid';
    //     
    //     // Generate article cards from data
    //     container.innerHTML = data.map(article => generateArticleCard(article)).join('');
    //   })
    //   .catch(err => {
    //     // Show error state
    //     loading.style.display = 'none';
    //     error.style.display = 'block';
    //   });
}

// Helper function to generate article card HTML
function generateArticleCard(article) {
    // Future implementation would create HTML from article data
    // This is a placeholder structure for reference
    const title = escapeHTML(article.title);
    const slug = escapeHTML(article.slug);
    const excerpt = escapeHTML(article.excerpt || '');
    const publishedDate = article.published_date ? new Date(article.published_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }) : '';
    const readTime = escapeHTML(article.read_time || '5 min read');
    const tags = Array.isArray(article.tags)
        ? article.tags.map(tag => `<span class="article-tag">${escapeHTML(tag)}</span>`).join('')
        : '';
    
    return `
        <article class="article-card">
            <header class="article-header">
                <h3 class="article-title">
                    <a href="/articles/${slug}" class="article-link">${title}</a>
                </h3>
                <div class="article-meta">
                    <time class="article-date" datetime="${article.published_date}">${publishedDate}</time>
                    <span class="article-read-time">${readTime}</span>
                </div>
            </header>
            <p class="article-excerpt">
                ${excerpt}
            </p>
            <footer class="article-footer">
                <div class="article-tags">
                    ${tags}
                </div>
                <a href="/articles/${slug}" class="article-read-more">Read more →</a>
            </footer>
        </article>
    `;
}

// Event listener setup for article retry button
document.addEventListener('DOMContentLoaded', function() {
    // Load articles on initial page load
    loadArticles();

    const retryArticlesBtn = document.getElementById('retry-articles-btn');
    if (retryArticlesBtn) {
        retryArticlesBtn.addEventListener('click', loadArticles);
    }
    
    const retryReposBtn = document.getElementById('retry-repos-btn');
    if (retryReposBtn) {
        retryReposBtn.addEventListener('click', loadRepositories);
    }
});