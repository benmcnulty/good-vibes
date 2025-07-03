/**
 * Unit Tests for Good Vibes Utilities
 * Tests core utility functions for reliability and correctness
 */

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Setup DOM environment for browser-like testing
import { JSDOM } from 'jsdom';

let jsdomInstance;
let window;
let document;

function setupDom() {
    jsdomInstance = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = jsdomInstance.window;
    document = window.document;
    global.window = window;
    global.document = document;
}

function cleanupDom() {
    if (jsdomInstance) {
        jsdomInstance.window.close();
    }
    delete global.window;
    delete global.document;
}

// Import utilities for testing
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const utilsPath = join(__dirname, '../../src/utils.js');
const utilsCode = readFileSync(utilsPath, 'utf8');

// Functions to hold references to utilities
let select,
    selectAll,
    escapeHTML,
    formatDate,
    getRelativeTime,
    validateRequired,
    showOnlySection,
    updateNavigation;

function loadUtils() {
    eval(utilsCode);
    ({
        select,
        selectAll,
        escapeHTML,
        formatDate,
        getRelativeTime,
        validateRequired,
        showOnlySection,
        updateNavigation
    } = window.VibeUtils || {});
}
describe('DOM Utilities', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
    });

    afterEach(() => {
        cleanupDom();
    });

    test('select() should find elements by selector', () => {
        document.body.innerHTML = '<div class="test">Hello</div>';
        const element = select('.test');
        assert.strictEqual(element.textContent, 'Hello');
    });

    test('select() should return null for invalid selectors', () => {
        const element = select('.nonexistent');
        assert.strictEqual(element, null);
    });

    test('selectAll() should find multiple elements', () => {
        document.body.innerHTML = `
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
        `;
        const elements = selectAll('.item');
        assert.strictEqual(elements.length, 3);
        assert.strictEqual(elements[1].textContent, '2');
    });

    test('selectAll() should return empty NodeList for invalid selectors', () => {
        const elements = selectAll('.nonexistent');
        assert.strictEqual(elements.length, 0);
    });
});

describe('Data Utilities', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
    });

    afterEach(() => {
        cleanupDom();
    });

    test('escapeHTML() should escape dangerous characters', () => {
        const dangerous = '<script>alert("xss")</script>';
        const safe = escapeHTML(dangerous);
        assert.strictEqual(safe, '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#47;script&gt;');
    });

    test('escapeHTML() should handle non-string inputs', () => {
        assert.strictEqual(escapeHTML(null), null);
        assert.strictEqual(escapeHTML(undefined), undefined);
        assert.strictEqual(escapeHTML(123), 123);
    });

    test('formatDate() should format valid dates', () => {
        const date = '2025-01-03';
        const formatted = formatDate(date);
        assert.strictEqual(formatted, 'January 3, 2025');
    });

    test('formatDate() should handle invalid dates gracefully', () => {
        const result = formatDate('invalid-date');
        assert.strictEqual(result, 'Invalid date');
    });

    test('formatDate() should handle empty input', () => {
        assert.strictEqual(formatDate(''), '');
        assert.strictEqual(formatDate(null), '');
    });

    test('getRelativeTime() should calculate relative time correctly', () => {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
        const result = getRelativeTime(fiveMinutesAgo);
        assert.strictEqual(result, '5 minutes ago');
    });

    test('getRelativeTime() should handle "just now" correctly', () => {
        const now = new Date();
        const result = getRelativeTime(now);
        assert.strictEqual(result, 'Just now');
    });

    test('validateRequired() should validate required fields', () => {
        const data = { name: 'John', email: 'john@example.com' };
        const result = validateRequired(data, ['name', 'email']);
        assert.strictEqual(result.isValid, true);
        assert.strictEqual(result.missing.length, 0);
    });

    test('validateRequired() should detect missing fields', () => {
        const data = { name: 'John' };
        const result = validateRequired(data, ['name', 'email', 'phone']);
        assert.strictEqual(result.isValid, false);
        assert.deepStrictEqual(result.missing, ['email', 'phone']);
    });

    test('validateRequired() should handle empty/null values', () => {
        const data = { name: '', email: null, phone: undefined };
        const result = validateRequired(data, ['name', 'email', 'phone']);
        assert.strictEqual(result.isValid, false);
        assert.deepStrictEqual(result.missing, ['name', 'email', 'phone']);
    });
});

describe('State Management Utilities', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
    });

    afterEach(() => {
        cleanupDom();
    });

    test('showOnlySection() should manage section visibility', () => {
        document.body.innerHTML = `
            <section id="intro" class="content-section active">Intro</section>
            <section id="about" class="content-section">About</section>
            <section id="contact" class="content-section">Contact</section>
        `;

        showOnlySection('about');

        const intro = document.getElementById('intro');
        const about = document.getElementById('about');
        const contact = document.getElementById('contact');

        assert.strictEqual(intro.classList.contains('active'), false);
        assert.strictEqual(about.classList.contains('active'), true);
        assert.strictEqual(contact.classList.contains('active'), false);

        assert.strictEqual(intro.getAttribute('aria-hidden'), 'true');
        assert.strictEqual(about.getAttribute('aria-hidden'), 'false');
        assert.strictEqual(contact.getAttribute('aria-hidden'), 'true');
    });

    test('updateNavigation() should manage nav link states', () => {
        document.body.innerHTML = `
            <nav>
                <a href="#intro" class="nav-link active" aria-current="page">Intro</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#contact" class="nav-link">Contact</a>
            </nav>
        `;

        updateNavigation('about');

        const introLink = document.querySelector('a[href="#intro"]');
        const aboutLink = document.querySelector('a[href="#about"]');
        const contactLink = document.querySelector('a[href="#contact"]');

        assert.strictEqual(introLink.classList.contains('active'), false);
        assert.strictEqual(aboutLink.classList.contains('active'), true);
        assert.strictEqual(contactLink.classList.contains('active'), false);

        assert.strictEqual(introLink.getAttribute('aria-current'), null);
        assert.strictEqual(aboutLink.getAttribute('aria-current'), 'page');
        assert.strictEqual(contactLink.getAttribute('aria-current'), null);
    });
});

describe('Edge Cases and Error Handling', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
    });

    afterEach(() => {
        cleanupDom();
    });

    test('utilities should handle null/undefined inputs gracefully', () => {
        assert.doesNotThrow(() => {
            select(null);
            selectAll(undefined);
            escapeHTML(null);
            formatDate(undefined);
            validateRequired(null, []);
        });
    });

    test('DOM utilities should work with different contexts', () => {
        document.body.innerHTML = `
            <div class="container">
                <div class="item">Item 1</div>
            </div>
            <div class="item">Item 2</div>
        `;

        const container = select('.container');
        const itemInContainer = select('.item', container);
        const allItems = selectAll('.item');

        assert.strictEqual(itemInContainer.textContent, 'Item 1');
        assert.strictEqual(allItems.length, 2);
    });
});
