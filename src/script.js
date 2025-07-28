document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initializeNavigation();

    // Initialize UX enhancements
    initializeScrollToTop();
    initializeActiveNavigation();
    initializeKeyboardNavigation();

    // Load default content for landing section if visible (e.g., articles)
    const articlesSection = VibeUtils.select('#articles-section');
    if (articlesSection && !articlesSection.classList.contains('hidden')) {
        loadArticles();
    }
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

    // Load dynamic content based on section
    if (targetId === 'repositories') {
        loadRepositories();
    } else if (targetId === 'articles') {
        loadArticles();
    }
}

// GitHub API integration for dynamic repository loading
async function loadRepositories() {
    const container = VibeUtils.select('#repos-container');
    const error = VibeUtils.select('#repos-error');

    if (!container) {
        console.warn('Repository container not found');
        return;
    }

    // Show loading state
    VibeUtils.showLoadingState('repos-container', 'repos-loading', 'repos-error');

    try {
        // Load repositories using GitHub service
        // eslint-disable-next-line no-undef
        const repos = await GitHubService.loadRepositories({
            username: 'benmcnulty',
            maxRepos: 6,
            timeout: 8000
        });

        // Hide loading, show container
        VibeUtils.showContentState('repos-container', 'repos-loading', 'repos-error');

        // Generate repository cards from API data
        container.innerHTML = repos.map(repo => generateRepoCard(repo)).join('');

        // Log cache status for debugging
        // eslint-disable-next-line no-undef
        const cacheStatus = GitHubService.getCacheStatus();
        if (cacheStatus.hasCache) {
            // eslint-disable-next-line no-console
            console.log(`Repositories loaded (cached: ${Math.floor(cacheStatus.age)}s ago)`);
        } else {
            // eslint-disable-next-line no-console
            console.log('Repositories loaded from API');
        }

    } catch (err) {
        console.error('Error loading repositories:', err);

        // Show error state
        VibeUtils.showErrorState('repos-container', 'repos-loading', 'repos-error');

        // Update error message with more details
        if (error) {
            // eslint-disable-next-line no-undef
            const isRateLimited = GitHubService.isRateLimited();
            const errorMessage = isRateLimited
                ? 'GitHub rate limit reached. Using cached data. Please try again later.'
                : 'Unable to load repositories. Please check your connection and try again.';

            error.querySelector('p').textContent = errorMessage;
        }
    }
}

// Helper function to generate repository card HTML
// Use utility function for HTML escaping
// eslint-disable-next-line no-unused-vars
function generateRepoCard(repo) {
    // Safely escape all user-controlled data to prevent XSS using utilities
    const name = VibeUtils.escapeHTML(repo.name);
    const html_url = VibeUtils.escapeHTML(repo.html_url);
    const language = VibeUtils.escapeHTML(repo.language || 'Unknown');
    const stars = Number(repo.stargazers_count) || 0;
    const description = VibeUtils.escapeHTML(repo.description || 'No description available');
    const topics = Array.isArray(repo.topics)
        ? repo.topics.map(topic =>
            `<span class="topic-tag">${VibeUtils.escapeHTML(topic)}</span>`
        ).join('')
        : '';
    const updated_at = VibeUtils.escapeHTML(repo.updated_at);
    const updatedDate = repo.updated_at ? VibeUtils.formatDate(repo.updated_at) : '';

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
                    Updated ${updatedDate}
                </time>
            </footer>
        </article>
    `;
}

// Articles integration for dynamic content loading
async function loadArticles() {
    const container = VibeUtils.select('#articles-container');
    const error = VibeUtils.select('#articles-error');

    if (!container) {
        console.warn('Articles container not found');
        return;
    }

    // Show loading state
    VibeUtils.showLoadingState('articles-container', 'articles-loading', 'articles-error');

    try {
        // Load articles using Articles service
        // eslint-disable-next-line no-undef
        const articles = await ArticlesService.loadArticles({
            sortBy: 'date',
            order: 'desc'
        });

        // Hide loading, show container
        VibeUtils.showContentState('articles-container', 'articles-loading', 'articles-error');

        // Generate article cards from data
        container.innerHTML = articles.map(article => generateArticleCard(article)).join('');

        // Log cache status for debugging
        // eslint-disable-next-line no-undef
        const cacheStatus = ArticlesService.getCacheStatus();
        if (cacheStatus.hasCache) {
            // eslint-disable-next-line no-console
            console.log(`Articles loaded (cached: ${Math.floor(cacheStatus.age)}s ago)`);
        } else {
            // eslint-disable-next-line no-console
            console.log('Articles loaded from data');
        }

    } catch (err) {
        console.error('Error loading articles:', err);

        // Show error state
        VibeUtils.showErrorState('articles-container', 'articles-loading', 'articles-error');

        // Update error message
        if (error) {
            error.querySelector('p').textContent =
                'Unable to load articles at this time. Please try again ' +
                'later.';
        }
    }
}

// Helper function to generate article card HTML
// eslint-disable-next-line no-unused-vars
function generateArticleCard(article) {
    // Use pre-processed safe data from ArticlesService
    const title = article.title_safe || VibeUtils.escapeHTML(article.title);
    const slug = VibeUtils.escapeHTML(article.slug);
    const excerpt = article.excerpt_safe || VibeUtils.escapeHTML(article.excerpt || '');
    const publishedDate = article.published_date_formatted ||
        VibeUtils.formatDate(article.published_date);
    const readTime = VibeUtils.escapeHTML(article.read_time || '5 min read');
    const author = article.author_safe || VibeUtils.escapeHTML(article.author || 'Unknown');
    const category = VibeUtils.escapeHTML(article.category || '');
    const tags = Array.isArray(article.tags)
        ? article.tags.map(tag =>
            `<span class="article-tag">${VibeUtils.escapeHTML(tag)}</span>`
        ).join('')
        : '';

    // Add featured badge if article is featured
    const featuredBadge = article.featured
        ? '<span class="featured-badge">Featured</span>'
        : '';

    return `
        <article class="article-card ${article.featured ? 'featured' : ''}">
            <header class="article-header">
                <div class="article-title-row">
                    <h3 class="article-title">
                        <a href="#" class="article-link" data-slug="${slug}">${title}</a>
                    </h3>
                    ${featuredBadge}
                </div>
                <div class="article-meta">
                    <time class="article-date" 
                          datetime="${article.published_date}">${publishedDate}</time>
                    <span class="article-author">by ${author}</span>
                    <span class="article-read-time">${readTime}</span>
                </div>
            </header>
            <p class="article-excerpt">
                ${excerpt}
            </p>
            <footer class="article-footer">
                <div class="article-footer-left">
                    <span class="article-category">${category}</span>
                    <div class="article-tags">
                        ${tags}
                    </div>
                </div>
            </footer>
        </article>
    `;
}

// =============================================================================
// UX Enhancements
// =============================================================================

/**
 * Initialize scroll to top functionality
 */
function initializeScrollToTop() {
    const scrollButton = VibeUtils.select('#scrollToTop');
    if (!scrollButton) {
        return;
    }

    // Threshold in pixels to show the scroll-to-top button
    const SCROLL_TO_TOP_THRESHOLD = 300;

    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const scrolled = window.pageYOffset > SCROLL_TO_TOP_THRESHOLD;
        scrollButton.classList.toggle('visible', scrolled);
    }

    // Scroll to top when clicked
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add event listeners
    window.addEventListener('scroll', toggleScrollButton);
    VibeUtils.addListener(scrollButton, 'click', scrollToTop);

    // Initial check
    toggleScrollButton();
}

/**
 * Initialize active navigation highlighting based on scroll position
 */
function initializeActiveNavigation() {
    const sections = VibeUtils.selectAll('.content-section');
    const navLinks = VibeUtils.selectAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) {
        return;
    }

    // Update active navigation based on scroll position
    function updateActiveNav() {
        const HEADER_OFFSET = 100; // Offset in pixels for fixed header
        let currentSection = '';
        const scrollPos = window.pageYOffset + HEADER_OFFSET; // Add offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Update navigation classes
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === ('#' + currentSection);

            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Add scroll listener with throttling
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initial check
    updateActiveNav();
}

/**
 * Add keyboard navigation support
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Skip if user is typing in an input
        if (event.target.matches('input, textarea, select')) {
            return;
        }

        switch (event.key) {
        case 'Home':
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'End':
            event.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            break;
        default:
            // Let other keys work normally
            break;
        }
    });
}

