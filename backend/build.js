"use strict";
const esbuild = require("esbuild");
const sass = require("sass");
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// Path configuration
const paths = {
  build: {
    css: "styles/css/",
    js: "js/",
  },
  src: {
    styles: "styles/sass/*.scss",
    css: "styles/css",
    sass: "styles/sass",
    vendorjs: [
      "theme/js/vendor/jquery-3.6.0.min.js",
      "theme/js/vendor/slick.js",
      "theme/js/vendor/toastr.min.js",
      "theme/js/vendor/jquery.fancybox.min.js",
      "theme/js/vendor/jquery.justifiedGallery.min.js"
    ],
  },
  watch: {
    styles: "/styles/sass/**/*.scss",
  },
};

// Process CSS with Sass and PostCSS
async function processCss() {
  try {
    // Get all SCSS files
    const sassFiles = fs.readdirSync(paths.src.sass)
      .filter(file => file.endsWith('.scss') && !file.startsWith('_'));
    
    for (const file of sassFiles) {
      const inputPath = path.join(paths.src.sass, file);
      const outputPath = path.join(paths.build.css, file.replace('.scss', '.css'));
      
      // Compile SCSS to CSS with sourcemap
      const result = sass.compile(inputPath, {
        sourceMap: true,
        sourceMapIncludeSources: true
      });
      
      // Convert Sass sourcemap to PostCSS format and fix source paths
      const sourceMap = result.sourceMap;
      sourceMap.sources = sourceMap.sources.map(source => {
        if (source.startsWith('file://')) {
          const fullPath = source.replace('file://', '');
          const relativePath = path.relative(process.cwd(), fullPath);
          // Remove full path prefix and sass folder for cleaner dev tools
          return relativePath.replace('styles/sass/', '');
        }
        return source;
      });
      const sassSourceMap = JSON.stringify(sourceMap);
      
      // Process with PostCSS (autoprefixer and cssnano)
      const processed = await postcss([
        autoprefixer({
          overrideBrowserslist: ["> 1%", "last 3 versions"],
        }),
        cssnano()
      ]).process(result.css, {
        from: inputPath,
        to: outputPath,
        map: {
          prev: sassSourceMap,
          inline: false,
          annotation: true,
          sourcesContent: true
        }
      });
      
      // Ensure directory exists
      if (!fs.existsSync(paths.build.css)) {
        fs.mkdirSync(paths.build.css, { recursive: true });
      }
      
      // Write CSS file
      fs.writeFileSync(outputPath, processed.css);
      
      // Write source map
      if (processed.map) {
        fs.writeFileSync(`${outputPath}.map`, processed.map.toString());
      }
      
      console.log(`✅ Compiled ${file} to ${outputPath}`);
    }
  } catch (error) {
    console.error(" CSS Error:", error.message);
    if (error.span) {
      console.error(`  at ${error.span.url || 'unknown'}:${error.span.start.line + 1}:${error.span.start.column + 1}`);
    }
  }
}

// Bundle vendor JS files
async function bundleVendorJs() {
  try {
    // Simple concatenation approach
    const vendorJsContent = paths.src.vendorjs
      .map(file => fs.readFileSync(file, 'utf8'))
      .join('\n');

    // Ensure directory exists
    if (!fs.existsSync(paths.build.js)) {
      fs.mkdirSync(paths.build.js, { recursive: true });
    }

    // Use esbuild just for minification without bundling
    const result = await esbuild.transform(vendorJsContent, {
      minify: true,
      sourcemap: false,
    });

    // Write output files
    fs.writeFileSync(path.join(paths.build.js, 'vendor.min.js'), result.code);
    if (result.map) {
      fs.writeFileSync(path.join(paths.build.js, 'vendor.min.js.map'), result.map);
    }

    console.log(' Vendor JS bundled successfully');
  } catch (error) {
    console.error(" Vendor JS Error:", error);
  }
}

// Watch for file changes
function watch() {
  let timeout;
  console.log('Watching for file changes...');
  // Watch the sass directory instead of using a glob pattern
  fs.watch(paths.src.sass, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.scss')) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(`File ${filename} changed, rebuilding CSS...`);
        processCss();
      }, 100);
    }
  });
}


// Command line interface
const args = process.argv.slice(2);
if (args.includes('vjs')) {
  bundleVendorJs();
} else if (args.includes('watch')) {
  processCss();
  watch();
} else {
  // Default: just build CSS
  processCss();
}


// "build": "node build.js",
// "watch": "node build.js watch",
// "vjs": "node build.js vjs"