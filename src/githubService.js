/**
 * GitHub Service
 * Handles GitHub API integration for dynamic repository loading
 *
 * Features:
 * - Fetch repositories from GitHub API
 * - Cache results in localStorage with offline fallback
 * - Rate limiting and error handling
 * - Environment variable support for API tokens
 */

// =============================================================================
// Constants and Configuration
// =============================================================================

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_KEY = 'goodVibes_github_repos';
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes
const RATE_LIMIT_KEY = 'goodVibes_github_rate_limit';

// Default repositories to show if API fails
const FALLBACK_REPOS = [
    {
        id: 1,
        name: 'good-vibes',
        html_url: 'https://github.com/benmcnulty/good-vibes',
        description: 'A single-page application showcasing the vibe coding philosophy and community projects. Built with vanilla HTML, CSS, and JavaScript.',
        language: 'JavaScript',
        stargazers_count: 42,
        topics: ['vibe-coding', 'spa', 'javascript', 'community', 'positive-development'],
        updated_at: '2025-01-03T10:30:00Z'
    },
    {
        id: 2,
        name: 'vibe-utils',
        html_url: 'https://github.com/benmcnulty/vibe-utils',
        description: 'Utility functions and helpers for maintaining positive energy in code. Includes mood tracking, team collaboration tools, and productivity enhancers.',
        language: 'TypeScript',
        stargazers_count: 28,
        topics: ['utilities', 'typescript', 'productivity'],
        updated_at: '2025-01-01T15:45:00Z'
    },
    {
        id: 3,
        name: 'positive-patterns',
        html_url: 'https://github.com/benmcnulty/positive-patterns',
        description: 'Design patterns and architectural approaches that promote team happiness and code maintainability. Includes examples and best practices.',
        language: 'Python',
        stargazers_count: 67,
        topics: ['design-patterns', 'python', 'best-practices'],
        updated_at: '2024-12-28T09:20:00Z'
    },
    {
        id: 4,
        name: 'vibe-cli',
        html_url: 'https://github.com/benmcnulty/vibe-cli',
        description: 'Command-line interface for vibe coding workflows. Includes mood tracking, project health checks, and team collaboration features.',
        language: 'Rust',
        stargazers_count: 15,
        topics: ['cli', 'rust', 'workflow'],
        updated_at: '2024-12-15T14:10:00Z'
    }
];

// =============================================================================
// Cache Management
// =============================================================================

/**
 * Get cached repositories if they exist and are not expired
 * @returns {Array|null} - Cached repositories or null if expired/missing
 */
function getCachedRepos() {
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
        console.warn('Error reading from cache:', error);
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

/**
 * Cache repositories in localStorage
 * @param {Array} repos - Repository data to cache
 */
function cacheRepos(repos) {
    try {
        const cacheData = {
            timestamp: Date.now(),
            data: repos
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Error caching repositories:', error);
    }
}

/**
 * Check if we're currently rate limited
 * @returns {boolean} - True if rate limited
 */
function isRateLimited() {
    try {
        const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
        if (!rateLimitData) {
            return false;
        }

        const { resetTime } = JSON.parse(rateLimitData);
        return Date.now() < resetTime;
    } catch (error) {
        localStorage.removeItem(RATE_LIMIT_KEY);
        return false;
    }
}

/**
 * Store rate limit information
 * @param {string} resetTime - When the rate limit resets (ISO string)
 */
function storeRateLimit(resetTime) {
    try {
        const rateLimitData = {
            resetTime: new Date(resetTime).getTime()
        };
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(rateLimitData));
    } catch (error) {
        console.warn('Error storing rate limit data:', error);
    }
}

// =============================================================================
// GitHub API Integration
// =============================================================================

/**
 * Get GitHub API token from environment or return null
 * @returns {string|null} - GitHub token or null
 */
function getGitHubToken() {
    // In a real application, this would come from environment variables
    // For demo purposes, we'll return null and use public API
    return null;
}

/**
 * Fetch repositories from GitHub API
 * @param {string} username - GitHub username to fetch repos for
 * @param {Object} options - Fetch options
 * @returns {Promise<Array>} - Promise resolving to repository array
 */
async function fetchGitHubRepos(username = 'benmcnulty', options = {}) {
    // Check rate limiting first
    if (isRateLimited()) {
        throw new Error('Rate limited - using cached data');
    }

    // Build API URL
    const url = `${GITHUB_API_BASE}/users/${username}/repos`;
    const searchParams = new URLSearchParams({
        sort: 'updated',
        direction: 'desc',
        per_page: options.perPage || '10'
    });

    // Prepare headers
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Good-Vibes-SPA/1.0'
    };

    // Add token if available
    const token = getGitHubToken();
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    try {
        const response = await fetch(`${url}?${searchParams.toString()}`, {
            headers,
            signal: options.signal // Support for AbortController
        });

        // Handle rate limiting
        if (response.status === 403) {
            const resetTime = response.headers.get('X-RateLimit-Reset');
            if (resetTime) {
                storeRateLimit(new Date(resetTime * 1000).toISOString());
            }
            throw new Error('Rate limited by GitHub API');
        }

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const repos = await response.json();

        // Filter and enhance repository data
        const processedRepos = repos
            .filter(repo => !repo.fork) // Exclude forks
            .slice(0, options.maxRepos || 6) // Limit number of repos
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description || 'No description available',
                language: repo.language || 'Unknown',
                stargazers_count: repo.stargazers_count,
                topics: repo.topics || [],
                updated_at: repo.updated_at,
                size: repo.size,
                open_issues_count: repo.open_issues_count
            }));

        return processedRepos;
    } catch (error) {
        // Re-throw with more context
        throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Load repositories with caching and fallback
 * @param {Object} options - Loading options
 * @returns {Promise<Array>} - Promise resolving to repository array
 */
async function loadRepositories(options = {}) {
    const {
        username = 'benmcnulty',
        forceRefresh = false,
        maxRepos = 6,
        timeout = 5000
    } = options;

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cached = getCachedRepos();
        if (cached) {
            return cached;
        }
    }

    // Set up timeout for API request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const repos = await fetchGitHubRepos(username, {
            maxRepos,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Cache the results
        cacheRepos(repos);

        return repos;
    } catch (error) {
        clearTimeout(timeoutId);

        console.warn('GitHub API request failed, using fallback data:', error.message);

        // Try to return cached data even if expired
        const cached = getCachedRepos();
        if (cached) {
            return cached;
        }

        // Last resort: return fallback data
        return FALLBACK_REPOS.slice(0, maxRepos);
    }
}

/**
 * Clear repository cache
 */
function clearCache() {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(RATE_LIMIT_KEY);
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

// =============================================================================
// Export API
// =============================================================================

// Export the GitHub service functions
const GitHubService = {
    loadRepositories,
    clearCache,
    getCacheStatus,
    isRateLimited
};

// Make available globally for use in other scripts
if (typeof window !== 'undefined') {
    window.GitHubService = GitHubService;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubService;
}
