/**
 * Unit Tests for Loading State Utilities
 * Tests loading, content, and error state management functions
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
let showLoadingState;
let showContentState;
let showErrorState;

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
    ({ showLoadingState, showContentState, showErrorState } = window.VibeUtils || {});
}

function cleanupDom() {
    if (jsdomInstance) {
        jsdomInstance.window.close();
    }
    delete global.window;
    delete global.document;
}

function createTestElements() {
    // Create test DOM structure similar to actual application
    document.body.innerHTML = `
        <div id="test-container">Content goes here</div>
        <div id="test-loading" style="display: none;">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
        <div id="test-error" style="display: none;">
            <p>Error occurred</p>
            <button>Retry</button>
        </div>
    `;
}

describe('Loading State Utilities', () => {
    beforeEach(() => {
        setupDom();
        loadUtils();
        createTestElements();
    });

    afterEach(() => {
        cleanupDom();
    });

    describe('showLoadingState', () => {
        test('should show loading and hide content and error', () => {
            showLoadingState('test-container', 'test-loading', 'test-error');

            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'block');
            assert.strictEqual(error.style.display, 'none');
        });

        test('should handle missing elements gracefully', () => {
            // Should not throw when elements don\'t exist
            assert.doesNotThrow(() => {
                showLoadingState('nonexistent', 'also-missing', 'not-there');
            });
        });

        test('should work with only some elements present', () => {
            // Remove error element
            document.getElementById('test-error').remove();

            assert.doesNotThrow(() => {
                showLoadingState('test-container', 'test-loading', 'test-error');
            });

            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');

            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'block');
        });
    });

    describe('showContentState', () => {
        test('should show content and hide loading and error with default display', () => {
            showContentState('test-container', 'test-loading', 'test-error');

            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            assert.strictEqual(container.style.display, 'grid');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'none');
        });

        test('should show content with custom display type', () => {
            showContentState('test-container', 'test-loading', 'test-error', 'flex');

            const container = document.getElementById('test-container');
            assert.strictEqual(container.style.display, 'flex');
        });

        test('should handle missing elements gracefully', () => {
            assert.doesNotThrow(() => {
                showContentState('nonexistent', 'also-missing', 'not-there');
            });
        });

        test('should work with custom display types', () => {
            const displayTypes = ['block', 'flex', 'inline-block', 'table'];

            displayTypes.forEach(displayType => {
                showContentState('test-container', 'test-loading', 'test-error', displayType);
                const container = document.getElementById('test-container');
                assert.strictEqual(container.style.display, displayType);
            });
        });
    });

    describe('showErrorState', () => {
        test('should show error and hide content and loading', () => {
            showErrorState('test-container', 'test-loading', 'test-error');

            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'block');
        });

        test('should handle missing elements gracefully', () => {
            assert.doesNotThrow(() => {
                showErrorState('nonexistent', 'also-missing', 'not-there');
            });
        });
    });

    describe('State Transitions', () => {
        test('should handle complete loading workflow', () => {
            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            // Initial state: content visible
            assert.strictEqual(container.style.display, '');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'none');

            // Start loading
            showLoadingState('test-container', 'test-loading', 'test-error');
            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'block');
            assert.strictEqual(error.style.display, 'none');

            // Loading complete - show content
            showContentState('test-container', 'test-loading', 'test-error');
            assert.strictEqual(container.style.display, 'grid');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'none');
        });

        test('should handle loading to error transition', () => {
            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            // Start loading
            showLoadingState('test-container', 'test-loading', 'test-error');
            assert.strictEqual(loading.style.display, 'block');

            // Loading failed - show error
            showErrorState('test-container', 'test-loading', 'test-error');
            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'block');

            // Retry - back to loading
            showLoadingState('test-container', 'test-loading', 'test-error');
            assert.strictEqual(container.style.display, 'none');
            assert.strictEqual(loading.style.display, 'block');
            assert.strictEqual(error.style.display, 'none');
        });

        test('should handle multiple rapid state changes', () => {
            // Simulate rapid state changes that might occur in real applications
            showLoadingState('test-container', 'test-loading', 'test-error');
            showErrorState('test-container', 'test-loading', 'test-error');
            showLoadingState('test-container', 'test-loading', 'test-error');
            showContentState('test-container', 'test-loading', 'test-error');

            const container = document.getElementById('test-container');
            const loading = document.getElementById('test-loading');
            const error = document.getElementById('test-error');

            // Final state should be content
            assert.strictEqual(container.style.display, 'grid');
            assert.strictEqual(loading.style.display, 'none');
            assert.strictEqual(error.style.display, 'none');
        });
    });

    describe('Real-world Usage Scenarios', () => {
        test('should work with actual application element IDs', () => {
            // Create DOM structure like the actual application
            document.body.innerHTML = `
                <div id="repos-container">Repository cards here</div>
                <div id="repos-loading" style="display: none;">Loading repos...</div>
                <div id="repos-error" style="display: none;">Failed to load repos</div>
                
                <div id="articles-container">Article cards here</div>
                <div id="articles-loading" style="display: none;">Loading articles...</div>
                <div id="articles-error" style="display: none;">Failed to load articles</div>
            `;

            // Test repositories workflow
            showLoadingState('repos-container', 'repos-loading', 'repos-error');
            assert.strictEqual(document.getElementById('repos-loading').style.display, 'block');

            showContentState('repos-container', 'repos-loading', 'repos-error');
            assert.strictEqual(document.getElementById('repos-container').style.display, 'grid');

            // Test articles workflow
            showLoadingState('articles-container', 'articles-loading', 'articles-error');
            assert.strictEqual(document.getElementById('articles-loading').style.display, 'block');

            showErrorState('articles-container', 'articles-loading', 'articles-error');
            assert.strictEqual(document.getElementById('articles-error').style.display, 'block');
        });

        test('should preserve other element properties', () => {
            const container = document.getElementById('test-container');
            container.className = 'custom-class';
            container.setAttribute('data-test', 'value');

            showLoadingState('test-container', 'test-loading', 'test-error');

            // Properties should be preserved
            assert.strictEqual(container.className, 'custom-class');
            assert.strictEqual(container.getAttribute('data-test'), 'value');
            // Only display should change
            assert.strictEqual(container.style.display, 'none');
        });
    });
});