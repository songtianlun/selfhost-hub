const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // 添加 YAML 支持
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // 添加语法高亮插件
  eleventyConfig.addPlugin(syntaxHighlight);

  // 配置 Markdown
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", md);

  // 复制静态文件
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // 配置多语言
  eleventyConfig.addGlobalData("languages", {
    zh: {
      name: "中文",
      code: "zh",
      dir: "ltr"
    },
    en: {
      name: "English",
      code: "en",
      dir: "ltr"
    }
  });

  // 添加自定义过滤器
  eleventyConfig.addFilter("replace", function(str, search, replace) {
    return str.replace(search, replace);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 