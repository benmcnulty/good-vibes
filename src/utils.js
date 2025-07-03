/**
 * Good Vibes Utilities
 * Core utility functions for the Good Vibes SPA
 *
 * These utilities provide reusable helper functions for:
 * - DOM manipulation and selection
 * - Data formatting and validation
 * - State management
 * - Content loading and error handling
 */

// =============================================================================
// DOM Utilities
// =============================================================================

/**
 * Enhanced DOM selector with built-in error handling
 * @param {string} selector - CSS selector string
 * @param {Element} context - Optional context element (defaults to document)
 * @returns {Element|null} - Selected element or null if not found
 *
 * Example: const header = select('.site-header');
 */
function select(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return null;
    }
}

/**
 * Enhanced DOM selector for multiple elements
 * @param {string} selector - CSS selector string
 * @param {Element} context - Optional context element (defaults to document)
 * @returns {NodeList} - NodeList of selected elements
 *
 * Example: const cards = selectAll('.repo-card');
 */
function selectAll(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Invalid selector: ${selector}`, error);
        return [];
    }
}

/**
 * Toggle class on element with optional callback
 * @param {Element} element - Target element
 * @param {string} className - Class to toggle
 * @param {Function} callback - Optional callback when toggle completes
 *
 * Example: toggleClass(element, 'active', () => console.log('Toggled!'));
 */
function toggleClass(element, className, callback) {
    if (!element || !className) {
        return;
    }

    element.classList.toggle(className);

    if (callback && typeof callback === 'function') {
        callback(element.classList.contains(className));
    }
}

/**
 * Add event listener with automatic cleanup tracking
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler function
 * @param {Object} options - Event listener options
 *
 * Example: addListener(button, 'click', handleClick);
 */
// Central WeakMap to track listeners for cleanup without polluting DOM nodes
const elementListeners = new WeakMap();

function addListener(element, event, handler, options = {}) {
    if (!element || !event || !handler) {
        return;
    }

    element.addEventListener(event, handler, options);

    // Store reference for potential cleanup in WeakMap
    if (!elementListeners.has(element)) {
        elementListeners.set(element, []);
    }
    elementListeners.get(element).push({ event, handler, options });
}

// =============================================================================
// Data Utilities
// =============================================================================

/**
 * Safely escape HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 *
 * Example: const safe = escapeHTML(userInput);
 */
function escapeHTML(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/[&<>"'`=/]/g, function (s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '`': '&#96;',
            '=': '&#61;',
            '/': '&#47;'
        })[s];
    });
}

/**
 * Format date for display with fallback
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 *
 * Example: const formatted = formatDate('2025-01-03', { dateStyle: 'medium' });
 */
function formatDate(date, options = {}) {
    if (!date) {
        return '';
    }

    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
    } catch (error) {
        console.warn('Invalid date format:', date);
        return 'Invalid date';
    }
}

/**
 * Calculate relative time (e.g., "3 days ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} - Relative time string
 *
 * Example: const relative = getRelativeTime('2024-12-28');
 */
function getRelativeTime(date) {
    if (!date) {
        return '';
    }

    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const secondsInMinute = 60;
        const secondsInHour = 3600;
        const secondsInDay = 86400;
        const secondsInMonth = 2592000;
        const secondsInYear = 31536000;
        const millisecondsInSecond = 1000;

        const diffInSeconds = Math.floor((now - dateObj) / millisecondsInSecond);

        if (diffInSeconds < secondsInMinute) {
            return 'Just now';
        }
        if (diffInSeconds < secondsInHour) {
            const mins = Math.floor(diffInSeconds / secondsInMinute);
            return `${mins} minute${mins === 1 ? '' : 's'} ago`;
        }
        if (diffInSeconds < secondsInDay) {
            return `${Math.floor(diffInSeconds / secondsInHour)} hours ago`;
        }
        if (diffInSeconds < secondsInMonth) {
            return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
        }
        if (diffInSeconds < secondsInYear) {
            return `${Math.floor(diffInSeconds / secondsInMonth)} months ago`;
        }

        return `${Math.floor(diffInSeconds / secondsInYear)} years ago`;
    } catch (error) {
        console.warn('Invalid date for relative time:', date);
        return '';
    }
}

/**
 * Validate required fields in an object
 * @param {Object} obj - Object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result with isValid and missing fields
 *
 * Example: const result = validateRequired(data, ['title', 'description']);
 */
function validateRequired(obj, requiredFields) {
    if (!obj || !requiredFields) {
        return { isValid: false, missing: requiredFields || [] };
    }

    const missing = requiredFields.filter(field =>
        !Object.prototype.hasOwnProperty.call(obj, field) ||
        obj[field] === null ||
        obj[field] === undefined ||
        obj[field] === ''
    );

    return {
        isValid: missing.length === 0,
        missing
    };
}

// =============================================================================
// State Management Utilities
// =============================================================================

/**
 * Manage section visibility with ARIA support
 * @param {string} activeId - ID of section to show
 * @param {string} containerSelector - Selector for section container
 *
 * Example: showOnlySection('introduction', '.content-section');
 */
function showOnlySection(activeId, containerSelector = '.content-section') {
    const sections = selectAll(containerSelector);

    sections.forEach(section => {
        const isActive = section.id === activeId;
        section.classList.toggle('active', isActive);
        section.setAttribute('aria-hidden', !isActive);
    });
}

/**
 * Update navigation active states
 * @param {string} activeId - ID of active section
 * @param {string} navSelector - Selector for navigation links
 *
 * Example: updateNavigation('repositories', '.nav-link');
 */
function updateNavigation(activeId, navSelector = '.nav-link') {
    const navLinks = selectAll(navSelector);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === `#${activeId}`;

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// =============================================================================
// Loading and Error State Utilities
// =============================================================================

/**
 * Show loading state for a container
 * @param {string} containerId - ID of content container
 * @param {string} loadingId - ID of loading element
 * @param {string} errorId - ID of error element
 *
 * Example: showLoadingState('repos-container', 'repos-loading', 'repos-error');
 */
function showLoadingState(containerId, loadingId, errorId) {
    const container = select(`#${containerId}`);
    const loading = select(`#${loadingId}`);
    const error = select(`#${errorId}`);

    if (container) {
        container.style.display = 'none';
    }
    if (loading) {
        loading.style.display = 'block';
    }
    if (error) {
        error.style.display = 'none';
    }
}

/**
 * Show content state (hide loading and error)
 * @param {string} containerId - ID of content container
 * @param {string} loadingId - ID of loading element
 * @param {string} errorId - ID of error element
 * @param {string} displayType - Display type for container (default: 'grid')
 *
 * Example: showContentState('repos-container', 'repos-loading', 'repos-error');
 */
function showContentState(containerId, loadingId, errorId, displayType = 'grid') {
    const container = select(`#${containerId}`);
    const loading = select(`#${loadingId}`);
    const error = select(`#${errorId}`);

    if (container) {
        container.style.display = displayType;
    }
    if (loading) {
        loading.style.display = 'none';
    }
    if (error) {
        error.style.display = 'none';
    }
}

/**
 * Show error state
 * @param {string} containerId - ID of content container
 * @param {string} loadingId - ID of loading element
 * @param {string} errorId - ID of error element
 *
 * Example: showErrorState('repos-container', 'repos-loading', 'repos-error');
 */
function showErrorState(containerId, loadingId, errorId) {
    const container = select(`#${containerId}`);
    const loading = select(`#${loadingId}`);
    const error = select(`#${errorId}`);

    if (container) {
        container.style.display = 'none';
    }
    if (loading) {
        loading.style.display = 'none';
    }
    if (error) {
        error.style.display = 'block';
    }
}

// =============================================================================
// Content Generation Utilities
// =============================================================================

/**
 * Create DOM element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string} content - Inner content
 * @returns {Element} - Created element
 *
 * Example: const button = createElement('button', { class: 'btn', type: 'button' }, 'Click me');
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    if (content) {
        element.innerHTML = content;
    }

    return element;
}

/**
 * Safely set innerHTML with HTML escaping for dynamic content
 * @param {Element} element - Target element
 * @param {string} template - HTML template
 * @param {Object} data - Data to interpolate (will be escaped)
 *
 * Example: safeSetHTML(container, '<h3>{{title}}</h3>', { title: userTitle });
 */
function safeSetHTML(element, template, data = {}) {
    if (!element || !template) {
        return;
    }

    let safeHTML = template;

    Object.entries(data).forEach(([key, value]) => {
        const escaped = escapeHTML(value);
        safeHTML = safeHTML.replace(new RegExp(`{{${key}}}`, 'g'), escaped);
    });

    element.innerHTML = safeHTML;
}

// =============================================================================
// Export utilities for modular usage
// =============================================================================

// Make utilities available globally for this project
window.VibeUtils = {
    // DOM utilities
    select,
    selectAll,
    toggleClass,
    addListener,

    // Data utilities
    escapeHTML,
    formatDate,
    getRelativeTime,
    validateRequired,

    // State management
    showOnlySection,
    updateNavigation,

    // Loading states
    showLoadingState,
    showContentState,
    showErrorState,

    // Content generation
    createElement,
    safeSetHTML
};

