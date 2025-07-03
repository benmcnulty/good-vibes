/**
 * Unit Tests for Content Generation Utilities
 * Tests DOM creation and safe HTML functions
 */

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Setup DOM environment
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let jsdomInstance;
let window;
let document;
let createElement;
let safeSetHTML;

function setupDom() {
    jsdomInstance = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    window = jsdomInstance.window;
    document = window.document;
    global.window = window;
    global.document = document;
}

function loadUtils() {
    const utilsPath = join(__dirname, '../../src/utils.js');
    const utilsCode = readFileSync(utilsPath, 'utf8');
    eval(utilsCode);
    ({ createElement, safeSetHTML } = window.VibeUtils || {});
}

function cleanupDom() {
    if (jsdomInstance) {
        jsdomInstance.window.close();
    }
    delete global.window;
    delete global.document;
}

describe('Content Generation Utilities', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
    });

    afterEach(() => {
        cleanupDom();
    });

    describe('createElement', () => {
        test('should create basic HTML element', () => {
            const div = createElement('div');
            assert.strictEqual(div.tagName, 'DIV');
            assert.strictEqual(div.textContent, '');
        });

        test('should create element with attributes', () => {
            const button = createElement('button', {
                type: 'button',
                class: 'btn primary',
                'data-action': 'submit'
            });

            assert.strictEqual(button.tagName, 'BUTTON');
            assert.strictEqual(button.type, 'button');
            assert.strictEqual(button.className, 'btn primary');
            assert.strictEqual(button.getAttribute('data-action'), 'submit');
        });

        test('should create element with content', () => {
            const p = createElement('p', {}, 'Hello World');
            assert.strictEqual(p.tagName, 'P');
            assert.strictEqual(p.innerHTML, 'Hello World');
        });

        test('should handle className attribute specially', () => {
            const div = createElement('div', { className: 'test-class' });
            assert.strictEqual(div.className, 'test-class');
        });

        test('should create complex element with all features', () => {
            const link = createElement('a', {
                href: '#test',
                className: 'nav-link active',
                'aria-current': 'page'
            }, 'Test Link');

            assert.strictEqual(link.tagName, 'A');
            assert.strictEqual(link.href, 'about:blank#test');
            assert.strictEqual(link.className, 'nav-link active');
            assert.strictEqual(link.getAttribute('aria-current'), 'page');
            assert.strictEqual(link.innerHTML, 'Test Link');
        });
    });

    describe('safeSetHTML', () => {
        test('should set safe HTML content', () => {
            const div = document.createElement('div');
            const template = '<h1>{{title}}</h1><p>{{content}}</p>';
            const data = { title: 'Test Title', content: 'Test content' };

            safeSetHTML(div, template, data);

            assert.strictEqual(
                div.innerHTML,
                '<h1>Test Title</h1><p>Test content</p>'
            );
        });

        test('should escape HTML in data', () => {
            const div = document.createElement('div');
            const template = '<div>{{userInput}}</div>';
            const data = { userInput: '<script>alert("xss")</script>' };

            safeSetHTML(div, template, data);

            assert.strictEqual(
                div.innerHTML,
                '<div>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>'
            );
        });

        test('should handle missing data gracefully', () => {
            const div = document.createElement('div');
            const template = '<p>{{missing}}</p>';
            const data = {};

            safeSetHTML(div, template, data);

            assert.strictEqual(div.innerHTML, '<p>{{missing}}</p>');
        });

        test('should handle multiple occurrences of same variable', () => {
            const div = document.createElement('div');
            const template = '<h1>{{name}}</h1><p>Hello {{name}}!</p>';
            const data = { name: 'John' };

            safeSetHTML(div, template, data);

            assert.strictEqual(div.innerHTML, '<h1>John</h1><p>Hello John!</p>');
        });

        test('should handle null/undefined inputs gracefully', () => {
            const div = document.createElement('div');

            // Should not throw with null element
            assert.doesNotThrow(() => {
                safeSetHTML(null, '<p>test</p>', {});
            });

            // Should not throw with null template
            assert.doesNotThrow(() => {
                safeSetHTML(div, null, {});
            });

            // Element should remain unchanged
            assert.strictEqual(div.innerHTML, '');
        });

        test('should handle complex nested HTML structures', () => {
            const div = document.createElement('div');
            const template = `
                <article class="card">
                    <header>
                        <h2>{{title}}</h2>
                        <time datetime="{{date}}">{{formattedDate}}</time>
                    </header>
                    <p>{{description}}</p>
                    <footer>
                        <span class="author">By {{author}}</span>
                    </footer>
                </article>
            `;
            const data = {
                title: 'Test Article',
                date: '2025-01-03',
                formattedDate: 'January 3, 2025',
                description: 'This is a test description',
                author: 'Test Author'
            };

            safeSetHTML(div, template, data);

            // Check that the structure is correct
            const article = div.querySelector('article');
            const header = div.querySelector('header');
            const h2 = div.querySelector('h2');
            const time = div.querySelector('time');
            const p = div.querySelector('p');
            const footer = div.querySelector('footer');

            assert.ok(article);
            assert.ok(header);
            assert.ok(h2);
            assert.ok(time);
            assert.ok(p);
            assert.ok(footer);

            assert.strictEqual(h2.textContent, 'Test Article');
            assert.strictEqual(time.getAttribute('datetime'), '2025-01-03');
            assert.strictEqual(time.textContent, 'January 3, 2025');
            assert.strictEqual(p.textContent, 'This is a test description');
            assert.strictEqual(footer.textContent.trim(), 'By Test Author');
        });
    });

    describe('Integration with DOM', () => {
        test('createElement and safeSetHTML should work together', () => {
            // Create a container using createElement
            const container = createElement('div', { className: 'content' });

            // Add it to the document
            document.body.appendChild(container);

            // Use safeSetHTML to populate it
            const template = '<h1>{{title}}</h1><p>{{content}}</p>';
            const data = { title: 'Dynamic Content', content: 'Generated dynamically' };

            safeSetHTML(container, template, data);

            // Verify the result
            assert.strictEqual(container.className, 'content');
            assert.strictEqual(container.querySelector('h1').textContent, 'Dynamic Content');
            assert.strictEqual(container.querySelector('p').textContent, 'Generated dynamically');

            // Verify it exists in the document
            const foundContainer = document.querySelector('.content');
            assert.strictEqual(foundContainer, container);
        });

        test('should handle real-world card generation scenario', () => {
            const cardData = {
                title: 'Good Vibes Utils',
                description: 'Utility functions for the Good Vibes project',
                language: 'JavaScript',
                stars: '42',
                topics: 'utilities,javascript,spa'
            };

            // Create card using createElement
            const card = createElement('article', { className: 'repo-card' });

            // Define template similar to actual repo card
            const template = `
                <header class="repo-header">
                    <h3>{{title}}</h3>
                    <div class="repo-meta">
                        <span>{{language}}</span>
                        <span>⭐ {{stars}}</span>
                    </div>
                </header>
                <p>{{description}}</p>
                <footer class="repo-footer">
                    <div class="topics">{{topics}}</div>
                </footer>
            `;

            safeSetHTML(card, template, cardData);

            // Verify structure
            assert.ok(card.querySelector('.repo-header'));
            assert.ok(card.querySelector('h3'));
            assert.ok(card.querySelector('.repo-meta'));
            assert.ok(card.querySelector('p'));
            assert.ok(card.querySelector('.repo-footer'));

            // Verify content
            assert.strictEqual(card.querySelector('h3').textContent, 'Good Vibes Utils');
            assert.strictEqual(
                card.querySelector('p').textContent,
                'Utility functions for the Good Vibes project'
            );
            assert.strictEqual(
                card.querySelector('.topics').textContent,
                'utilities,javascript,spa'
            );
        });
    });
});
