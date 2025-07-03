document.addEventListener("DOMContentLoaded", function() {
    // Initialize navigation functionality
    initializeNavigation();
});

function initializeNavigation() {
    const navLinks = VibeUtils.selectAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        VibeUtils.addListener(link, 'click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the href
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active states and show the selected section
            updateActiveStates(targetId);
        });
    });
}

function updateActiveStates(targetId) {
    // Update navigation and section visibility using utilities
    VibeUtils.updateNavigation(targetId);
    VibeUtils.showOnlySection(targetId);
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
// Use utility function for HTML escaping

function generateRepoCard(repo) {
    // Safely escape all user-controlled data to prevent XSS using utilities
    const name = VibeUtils.escapeHTML(repo.name);
    const html_url = VibeUtils.escapeHTML(repo.html_url);
    const language = VibeUtils.escapeHTML(repo.language || 'Unknown');
    const stars = Number(repo.stargazers_count) || 0;
    const description = VibeUtils.escapeHTML(repo.description || 'No description available');
    const topics = Array.isArray(repo.topics)
        ? repo.topics.map(topic => `<span class="topic-tag">${VibeUtils.escapeHTML(topic)}</span>`).join('')
        : '';
    const updated_at = VibeUtils.escapeHTML(repo.updated_at);
    const updated_date = repo.updated_at ? VibeUtils.formatDate(repo.updated_at) : '';

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
    // Future implementation would create HTML from article data using utilities
    const title = VibeUtils.escapeHTML(article.title);
    const slug = VibeUtils.escapeHTML(article.slug);
    const excerpt = VibeUtils.escapeHTML(article.excerpt || '');
    const publishedDate = article.published_date ? VibeUtils.formatDate(article.published_date) : '';
    const readTime = VibeUtils.escapeHTML(article.read_time || '5 min read');
    const tags = Array.isArray(article.tags)
        ? article.tags.map(tag => `<span class="article-tag">${VibeUtils.escapeHTML(tag)}</span>`).join('')
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

// Event listener setup for retry buttons using utilities
document.addEventListener('DOMContentLoaded', function() {
    // Load articles on initial page load
    loadArticles();

    const retryArticlesBtn = VibeUtils.select('#retry-articles-btn');
    if (retryArticlesBtn) {
        VibeUtils.addListener(retryArticlesBtn, 'click', loadArticles);
    }
    
    const retryReposBtn = VibeUtils.select('#retry-repos-btn');
    if (retryReposBtn) {
        VibeUtils.addListener(retryReposBtn, 'click', loadRepositories);
    }
});