#!/usr/bin/env node

/**
 * Simple Build Script for Good Vibes
 * Minifies HTML, CSS, and JavaScript files for production
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { minify as terserMinify } from 'terser';
import postcss from 'postcss';
import { minify as htmlMinify } from 'html-minifier-terser';

const DIST_DIR = 'dist';
const SRC_DIR = 'src';

console.log('🚀 Starting Good Vibes build process...');

/**
 * Minify JavaScript files using Terser
 */
async function minifyJavaScript(filePath, outputPath) {
    try {
        const code = readFileSync(filePath, 'utf8');
        const result = await terserMinify(code, {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info']
            },
            mangle: {
                keep_fnames: false
            },
            format: {
                comments: false
            }
        });
        
        writeFileSync(outputPath, result.code);
        console.log(`✅ Minified JS: ${filePath} → ${outputPath}`);
    } catch (error) {
        console.error(`❌ Error minifying ${filePath}:`, error.message);
    }
}

/**
 * Minify CSS files using cssnano
 */
async function minifyCSS(filePath, outputPath) {
    try {
        const css = readFileSync(filePath, 'utf8');
        const result = await postcss([
            require('cssnano')({
                preset: ['default', {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    colormin: true,
                    minifySelectors: true
                }]
            })
        ]).process(css, { from: filePath, to: outputPath });
        
        writeFileSync(outputPath, result.css);
        console.log(`✅ Minified CSS: ${filePath} → ${outputPath}`);
    } catch (error) {
        console.error(`❌ Error minifying ${filePath}:`, error.message);
    }
}

/**
 * Minify HTML files using html-minifier-terser
 */
async function minifyHTML(filePath, outputPath) {
    try {
        const html = readFileSync(filePath, 'utf8');
        const result = await htmlMinify(html, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            minifyCSS: true,
            minifyJS: true
        });
        
        writeFileSync(outputPath, result);
        console.log(`✅ Minified HTML: ${filePath} → ${outputPath}`);
    } catch (error) {
        console.error(`❌ Error minifying ${filePath}:`, error.message);
    }
}

/**
/**
 * Recursively process files in the dist directory and its subdirectories
 */
async function processDistFiles(dir = DIST_DIR) {
    const files = readdirSync(dir);

    for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            await processDistFiles(filePath);
        } else if (stat.isFile()) {
            const ext = extname(file).toLowerCase();

            switch (ext) {
                case '.js':
                    await minifyJavaScript(filePath, filePath);
                    break;
                case '.css':
                    await minifyCSS(filePath, filePath);
                    break;
                case '.html':
                    await minifyHTML(filePath, filePath);
                    break;
                default:
                    console.log(`📄 Skipped: ${filePath} (not minifiable)`);
            }
        }
    }
}
/**
 * Calculate and display file size improvements
 */
function displaySizeComparison() {
    console.log('\n📊 Build Summary:');
    console.log('================');
    
    const files = readdirSync(DIST_DIR);
    let totalOriginal = 0;
    let totalMinified = 0;
    
    files.forEach(file => {
        const srcPath = join(SRC_DIR, file);
        const distPath = join(DIST_DIR, file);
        
        try {
            const srcStat = statSync(srcPath);
            const distStat = statSync(distPath);
            
            const originalSize = srcStat.size;
            const minifiedSize = distStat.size;
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
            
            console.log(`${file.padEnd(20)} ${originalSize}b → ${minifiedSize}b (${savings}% smaller)`);
            
            totalOriginal += originalSize;
            totalMinified += minifiedSize;
        } catch (error) {
            // File might not exist in src (generated file)
        }
    });
    
    const totalSavings = ((totalOriginal - totalMinified) / totalOriginal * 100).toFixed(1);
    console.log(`${'Total'.padEnd(20)} ${totalOriginal}b → ${totalMinified}b (${totalSavings}% smaller)`);
}

/**
 * Main build process
 */
async function build() {
    try {
        await processDistFiles();
        displaySizeComparison();
        console.log('\n🎉 Build completed successfully!');
        console.log(`📦 Production files are ready in the ${DIST_DIR}/ directory`);
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run the build
build();