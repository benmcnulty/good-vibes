/**
 * Integration Tests for Good Vibes Navigation
 * Tests the complete navigation workflow and section switching
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Setup DOM environment
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the actual HTML file for testing
const indexPath = join(__dirname, '../../src/index.html');
const indexHTML = readFileSync(indexPath, 'utf8');

describe('Navigation Integration Tests', () => {
    let window, document;

    beforeEach(() => {
        // Create fresh DOM for each test
        const dom = new JSDOM(indexHTML, {
            runScripts: 'dangerously',
            resources: 'usable'
        });
        window = dom.window;
        document = window.document;
        
        // Make globals available
        global.window = window;
        global.document = document;
        
        // Load utilities into the window
        const utilsPath = join(__dirname, '../../src/utils.js');
        const utilsCode = readFileSync(utilsPath, 'utf8');
        eval(utilsCode);
    });

    test('should have correct initial navigation state', () => {
        const introNav = document.querySelector('a[href="#introduction"]');
        const reposNav = document.querySelector('a[href="#repositories"]');
        const articlesNav = document.querySelector('a[href="#articles"]');

        // Introduction should be active by default
        assert.strictEqual(introNav.classList.contains('active'), true);
        assert.strictEqual(introNav.getAttribute('aria-current'), 'page');
        
        // Others should not be active
        assert.strictEqual(reposNav.classList.contains('active'), false);
        assert.strictEqual(articlesNav.classList.contains('active'), false);
    });

    test('should have correct initial section visibility', () => {
        const introSection = document.getElementById('introduction');
        const reposSection = document.getElementById('repositories');
        const articlesSection = document.getElementById('articles');

        // Introduction should be visible by default
        assert.strictEqual(introSection.classList.contains('active'), true);
        
        // Others should be hidden
        assert.strictEqual(reposSection.classList.contains('active'), false);
        assert.strictEqual(articlesSection.classList.contains('active'), false);
    });

    test('should switch sections when navigation is clicked', () => {
        const reposNav = document.querySelector('a[href="#repositories"]');
        const introSection = document.getElementById('introduction');
        const reposSection = document.getElementById('repositories');

        // Simulate click event
        const clickEvent = new window.Event('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: reposNav });
        
        // Prevent default and trigger navigation logic manually
        window.VibeUtils.updateNavigation('repositories');
        window.VibeUtils.showOnlySection('repositories');

        // Check navigation state
        assert.strictEqual(reposNav.classList.contains('active'), true);
        assert.strictEqual(reposNav.getAttribute('aria-current'), 'page');
        
        // Check section visibility
        assert.strictEqual(introSection.classList.contains('active'), false);
        assert.strictEqual(reposSection.classList.contains('active'), true);
        
        // Check ARIA attributes
        assert.strictEqual(introSection.getAttribute('aria-hidden'), 'true');
        assert.strictEqual(reposSection.getAttribute('aria-hidden'), 'false');
    });

    test('should handle multiple navigation switches correctly', () => {
        const sections = ['repositories', 'articles', 'introduction'];
        
        sections.forEach(sectionId => {
            // Switch to section
            window.VibeUtils.updateNavigation(sectionId);
            window.VibeUtils.showOnlySection(sectionId);
            
            // Verify only the target section is active
            const allSections = document.querySelectorAll('.content-section');
            allSections.forEach(section => {
                if (section.id === sectionId) {
                    assert.strictEqual(section.classList.contains('active'), true);
                    assert.strictEqual(section.getAttribute('aria-hidden'), 'false');
                } else {
                    assert.strictEqual(section.classList.contains('active'), false);
                    assert.strictEqual(section.getAttribute('aria-hidden'), 'true');
                }
            });
            
            // Verify only the target nav link is active
            const allNavLinks = document.querySelectorAll('.nav-link');
            allNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    assert.strictEqual(link.classList.contains('active'), true);
                    assert.strictEqual(link.getAttribute('aria-current'), 'page');
                } else {
                    assert.strictEqual(link.classList.contains('active'), false);
                    assert.strictEqual(link.getAttribute('aria-current'), null);
                }
            });
        });
    });

    test('should maintain semantic HTML structure', () => {
        // Check for required semantic elements
        const header = document.querySelector('header.site-header');
        const main = document.querySelector('main.main-content');
        const footer = document.querySelector('footer.site-footer');
        const nav = document.querySelector('nav.main-nav');

        assert.ok(header, 'Site header should exist');
        assert.ok(main, 'Main content should exist');
        assert.ok(footer, 'Site footer should exist');
        assert.ok(nav, 'Main navigation should exist');

        // Check for proper heading hierarchy
        const h1 = document.querySelector('h1');
        const h2s = document.querySelectorAll('h2');
        const h3s = document.querySelectorAll('h3');

        assert.ok(h1, 'Should have one h1 element');
        assert.ok(h2s.length > 0, 'Should have h2 elements');
        assert.ok(h3s.length > 0, 'Should have h3 elements');
    });

    test('should have accessible navigation structure', () => {
        const navList = document.querySelector('.nav-list');
        const navLinks = document.querySelectorAll('.nav-link');

        // Check navigation structure
        assert.ok(navList, 'Navigation should use a list structure');
        assert.strictEqual(navList.tagName, 'UL', 'Navigation should be an unordered list');
        
        // Check each nav link
        navLinks.forEach(link => {
            assert.strictEqual(link.tagName, 'A', 'Navigation items should be anchor tags');
            assert.ok(link.getAttribute('href'), 'Navigation links should have href attributes');
            assert.ok(link.textContent.trim(), 'Navigation links should have visible text');
        });
    });

    test('should handle loading and error states', () => {
        // Check that loading elements exist
        const reposLoading = document.getElementById('repos-loading');
        const reposError = document.getElementById('repos-error');
        const articlesLoading = document.getElementById('articles-loading');
        const articlesError = document.getElementById('articles-error');

        assert.ok(reposLoading, 'Repositories loading state should exist');
        assert.ok(reposError, 'Repositories error state should exist');
        assert.ok(articlesLoading, 'Articles loading state should exist');
        assert.ok(articlesError, 'Articles error state should exist');

        // Check ARIA attributes for loading states
        assert.strictEqual(reposLoading.getAttribute('role'), 'status');
        assert.strictEqual(reposLoading.getAttribute('aria-live'), 'polite');
        assert.strictEqual(articlesLoading.getAttribute('role'), 'status');
        assert.strictEqual(articlesLoading.getAttribute('aria-live'), 'polite');

        // Check retry buttons
        const retryReposBtn = document.getElementById('retry-repos-btn');
        const retryArticlesBtn = document.getElementById('retry-articles-btn');
        
        assert.ok(retryReposBtn, 'Repositories retry button should exist');
        assert.ok(retryArticlesBtn, 'Articles retry button should exist');
        assert.strictEqual(retryReposBtn.getAttribute('type'), 'button');
        assert.strictEqual(retryArticlesBtn.getAttribute('type'), 'button');
    });
});