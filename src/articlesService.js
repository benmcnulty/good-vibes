/**
 * Articles Service
 * Handles article data integration for dynamic content loading
 *
 * Features:
 * - Load articles from static JSON data
 * - Cache results in localStorage with offline fallback
 * - Safe HTML conversion for article excerpts
 * - Retry logic and error handling
 */

// =============================================================================
// Constants and Configuration
// =============================================================================

const CACHE_KEY = 'goodVibes_articles';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// Sample articles data - in a real app this would come from a CMS or API
const ARTICLES_DATA = [
    {
        id: 'philosophy-of-vibe-coding',
        title: 'The Philosophy of Vibe Coding',
        slug: 'philosophy-of-vibe-coding',
        excerpt: 'Exploring how positive energy and mindful development practices can transform the way we build software. Discover the core principles that make coding a joyful experience.',
        content: `# The Philosophy of Vibe Coding

Vibe coding is more than just a development methodology—it's a mindset that transforms how we approach software creation. At its core, vibe coding emphasizes the importance of maintaining positive energy, fostering collaboration, and building with intention.

## Core Principles

1. **Positive Energy**: Approach every line of code with enthusiasm and curiosity
2. **Mindful Development**: Be present and intentional in your coding decisions
3. **Collaborative Spirit**: Build bridges, not walls, with your fellow developers
4. **Sustainable Practices**: Write code that future you will thank present you for

When we embrace these principles, coding becomes less about grinding through problems and more about crafting elegant solutions with care and consideration.`,
        published_date: '2025-01-05T10:00:00Z',
        updated_date: '2025-01-05T10:00:00Z',
        author: 'Ben McNulty',
        read_time: '5 min read',
        tags: ['philosophy', 'methodology', 'mindfulness'],
        featured: true,
        category: 'Philosophy'
    },
    {
        id: 'building-communities-through-code',
        title: 'Building Communities Through Code',
        slug: 'building-communities-through-code',
        excerpt: 'How collaborative coding practices and inclusive environments foster creativity and innovation. Learn practical strategies for creating positive development culture.',
        content: `# Building Communities Through Code

Great software isn't built in isolation—it emerges from strong communities of developers who support, challenge, and inspire each other. Here's how to foster that environment.

## Creating Inclusive Spaces

- Use welcoming language in documentation and comments
- Provide clear contribution guidelines
- Celebrate diverse perspectives and approaches
- Mentor newcomers with patience and enthusiasm

## Collaborative Practices

Code reviews become opportunities for learning rather than criticism. Pair programming sessions turn into knowledge-sharing adventures. Open source contributions become acts of generosity that strengthen the entire community.`,
        published_date: '2025-01-03T14:30:00Z',
        updated_date: '2025-01-03T14:30:00Z',
        author: 'Ben McNulty',
        read_time: '7 min read',
        tags: ['community', 'collaboration', 'culture'],
        featured: true,
        category: 'Community'
    },
    {
        id: 'sustainable-development-practices',
        title: 'Sustainable Development Practices',
        slug: 'sustainable-development-practices',
        excerpt: 'Maintaining good vibes while meeting deadlines and managing technical debt. Practical approaches to sustainable software development that prioritize well-being.',
        content: `# Sustainable Development Practices

Sustainability in software development means creating practices that can be maintained over time without burning out teams or accumulating insurmountable technical debt.

## Balancing Speed and Quality

- Implement code review processes that catch issues early
- Invest in automated testing to prevent regression
- Refactor regularly to keep code maintainable
- Document decisions to help future team members

## Team Well-being

The best code comes from rested, motivated developers who feel valued and supported in their work.`,
        published_date: '2025-01-01T09:15:00Z',
        updated_date: '2025-01-01T09:15:00Z',
        author: 'Ben McNulty',
        read_time: '6 min read',
        tags: ['sustainability', 'practices', 'well-being'],
        featured: false,
        category: 'Practices'
    },
    {
        id: 'art-of-code-review',
        title: 'The Art of Code Review',
        slug: 'art-of-code-review',
        excerpt: 'Transforming code reviews from stressful experiences into opportunities for growth and learning. Techniques for giving and receiving feedback with good vibes.',
        content: `# The Art of Code Review

Code reviews don't have to be adversarial. When done with care and intention, they become powerful tools for knowledge sharing, quality improvement, and team building.

## Giving Constructive Feedback

- Start with what's working well
- Ask questions rather than making demands
- Suggest alternatives with explanations
- Focus on the code, not the person

## Receiving Feedback Gracefully

- Approach reviews with curiosity, not defensiveness
- Ask for clarification when feedback isn't clear
- Thank reviewers for their time and insights
- View criticism as an opportunity to improve

When everyone approaches code review with good vibes, the entire team grows stronger.`,
        published_date: '2024-12-28T11:45:00Z',
        updated_date: '2024-12-28T11:45:00Z',
        author: 'Ben McNulty',
        read_time: '4 min read',
        tags: ['code-review', 'feedback', 'growth'],
        featured: false,
        category: 'Process'
    },
    {
        id: 'mindful-debugging-techniques',
        title: 'Mindful Debugging Techniques',
        slug: 'mindful-debugging-techniques',
        excerpt: 'Approaching bugs with curiosity instead of frustration. How mindfulness practices can improve problem-solving and reduce stress in development.',
        content: `# Mindful Debugging Techniques

Bugs are inevitable in software development, but our approach to debugging can make all the difference in our stress levels and problem-solving effectiveness.

## The Mindful Debugging Process

1. **Pause and Breathe**: Take a moment to center yourself before diving in
2. **Observe Without Judgment**: Look at the error messages and symptoms objectively
3. **Form Hypotheses**: Generate potential explanations without getting attached to any one theory
4. **Test Systematically**: Validate or invalidate hypotheses one at a time
5. **Reflect and Learn**: Consider what this bug teaches you about the system

## Staying Positive During Difficult Bugs

- Remember that every bug is a learning opportunity
- Take breaks when frustration builds up
- Ask for help when you need a fresh perspective
- Celebrate the small victories along the way

Debugging with mindfulness transforms a potentially stressful experience into a fascinating detective story.`,
        published_date: '2024-12-25T16:20:00Z',
        updated_date: '2024-12-25T16:20:00Z',
        author: 'Ben McNulty',
        read_time: '8 min read',
        tags: ['debugging', 'mindfulness', 'problem-solving'],
        featured: true,
        category: 'Techniques'
    },
    {
        id: 'creative-constraints-in-development',
        title: 'Creative Constraints in Development',
        slug: 'creative-constraints-in-development',
        excerpt: 'How limitations can spark innovation and lead to elegant solutions. Exploring the creative potential of working within technical and business constraints.',
        content: `# Creative Constraints in Development

Constraints aren't limitations—they're catalysts for creativity. Some of the most elegant solutions emerge when developers work within thoughtful boundaries.

## Types of Beneficial Constraints

- **Technical Constraints**: Limited memory or processing power
- **Time Constraints**: Tight deadlines that force focus
- **Resource Constraints**: Small teams that require efficiency
- **Platform Constraints**: Specific browser or device requirements

## Turning Constraints into Opportunities

When faced with limitations, ask yourself:
- What creative solutions become possible within these bounds?
- How can constraints guide us toward simpler, more elegant solutions?
- What innovative approaches haven't we considered?

The most beautiful software often emerges from the most challenging constraints.`,
        published_date: '2024-12-20T13:10:00Z',
        updated_date: '2024-12-20T13:10:00Z',
        author: 'Ben McNulty',
        read_time: '5 min read',
        tags: ['creativity', 'constraints', 'innovation'],
        featured: false,
        category: 'Creativity'
    }
];

// =============================================================================
// Cache Management
// =============================================================================

/**
 * Get cached articles if they exist and are not expired
 * @returns {Array|null} - Cached articles or null if expired/missing
 */
function getCachedArticles() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) {
            return null;
        }

        const { timestamp, data } = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - timestamp < CACHE_DURATION) {
            return data;
        } else {
            // Cache expired, remove it
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    } catch (error) {
        console.warn('Error reading articles from cache:', error);
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

/**
 * Cache articles in localStorage
 * @param {Array} articles - Article data to cache
 */
function cacheArticles(articles) {
    try {
        const cacheData = {
            timestamp: Date.now(),
            data: articles
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Error caching articles:', error);
    }
}

// =============================================================================
// Data Processing
// =============================================================================

/**
 * Process and enhance article data
 * @param {Array} rawArticles - Raw article data
 * @returns {Array} - Processed article data
 */
function processArticles(rawArticles) {
    return rawArticles.map(article => ({
        ...article,
        // Add computed properties
        url: `/articles/${article.slug}`,
        published_date_formatted: formatArticleDate(article.published_date),
        excerpt_safe: escapeHTML(article.excerpt),
        title_safe: escapeHTML(article.title),
        author_safe: escapeHTML(article.author)
    }));
}

/**
 * Format article date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatArticleDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Unknown date';
    }
}

// Import escapeHTML utility function
import { escapeHTML } from './utils';
// =============================================================================
// Filtering and Sorting
// =============================================================================

/**
 * Filter articles by criteria
 * @param {Array} articles - Articles to filter
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered articles
 */
function filterArticles(articles, filters = {}) {
    let filtered = [...articles];

    // Filter by featured status
    if (filters.featured !== undefined) {
        filtered = filtered.filter(article => article.featured === filters.featured);
    }

    // Filter by category
    if (filters.category) {
        filtered = filtered.filter(article =>
            article.category.toLowerCase() === filters.category.toLowerCase()
        );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(article =>
            filters.tags.some(tag => article.tags.includes(tag))
        );
    }

    // Limit number of results
    if (filters.limit && filters.limit > 0) {
        filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
}

/**
 * Sort articles by criteria
 * @param {Array} articles - Articles to sort
 * @param {string} sortBy - Sort criteria ('date', 'title', 'read_time')
 * @param {string} order - Sort order ('asc', 'desc')
 * @returns {Array} - Sorted articles
 */
function sortArticles(articles, sortBy = 'date', order = 'desc') {
    const sorted = [...articles];

    sorted.sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
        case 'date':
            aValue = new Date(a.published_date);
            bValue = new Date(b.published_date);
            break;
        case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
        case 'read_time':
            aValue = parseInt(a.read_time, 10) || 0;
            bValue = parseInt(b.read_time, 10) || 0;
            break;
        default:
            return 0;
        }

        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return sorted;
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Load articles with caching and filtering
 * @param {Object} options - Loading options
 * @returns {Promise<Array>} - Promise resolving to articles array
 */
async function loadArticles(options = {}) {
    const {
        forceRefresh = false,
        featured = undefined,
        category = null,
        tags = [],
        limit = null,
        sortBy = 'date',
        order = 'desc'
    } = options;

    // Simulate network delay for realistic loading experience
    const delay = Math.random() * 1000 + 500; // 500-1500ms

    return new Promise((resolve) => {
        setTimeout(() => {
            try {
                // Check cache first (unless force refresh)
                let articles;
                if (!forceRefresh) {
                    articles = getCachedArticles();
                }

                // Use fresh data if no cache or force refresh
                if (!articles) {
                    articles = processArticles(ARTICLES_DATA);
                    cacheArticles(articles);
                }

                // Apply filters
                const filtered = filterArticles(articles, {
                    featured,
                    category,
                    tags,
                    limit
                });

                // Apply sorting
                const sorted = sortArticles(filtered, sortBy, order);

                resolve(sorted);
            } catch (error) {
                console.error('Error loading articles:', error);
                // Return empty array on error
                resolve([]);
            }
        }, delay);
    });
}

/**
 * Get a specific article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} - Promise resolving to article or null
 */
async function getArticle(slug) {
    const articles = await loadArticles();
    return articles.find(article => article.slug === slug) || null;
}

/**
 * Clear articles cache
 */
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
}

/**
 * Get cache status information
 * @returns {Object} - Cache status object
 */
function getCacheStatus() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
        return { hasCache: false };
    }

    try {
        const { timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        const remaining = Math.max(0, CACHE_DURATION - age);

        return {
            hasCache: true,
            age: Math.floor(age / 1000), // seconds
            remaining: Math.floor(remaining / 1000), // seconds
            isExpired: remaining <= 0
        };
    } catch (error) {
        return { hasCache: false };
    }
}

/**
 * Get article categories
 * @returns {Array} - Array of unique categories
 */
function getCategories() {
    const categories = ARTICLES_DATA.map(article => article.category);
    return [...new Set(categories)].sort();
}

/**
 * Get article tags
 * @returns {Array} - Array of unique tags
 */
function getTags() {
    const allTags = ARTICLES_DATA.flatMap(article => article.tags);
    return [...new Set(allTags)].sort();
}

// =============================================================================
// Export API
// =============================================================================

// Export the Articles service functions
const ArticlesService = {
    loadArticles,
    getArticle,
    clearCache,
    getCacheStatus,
    getCategories,
    getTags
};

// Make available globally for use in other scripts
if (typeof window !== 'undefined') {
    window.ArticlesService = ArticlesService;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticlesService;
}
