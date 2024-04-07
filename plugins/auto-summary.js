const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const cheerio = require('cheerio');

module.exports = (options, context) => ({
    name: 'auto-summary',
    extendPageData($page) {
        debugger
        const content = $page._strippedContent || $page.content;
        if (!content) {
            return;
        }

        // const summary = content.match(/^(?:\s|\S)*?(?:[^\\]|\A)\n(?!-)\s*?(?:\n+|$)/gm);

        // 使用 markdown-it 解析内容
        const html = md.render(content);

        // 使用 cheerio 加载 HTML 并移除所有标题标签
        const $ = cheerio.load(html);
        $('h1, h2, h3, h4, h5, h6').remove();

        // 获取第一张图片
        const firstImage = $('img').first();

        // 如果找到了图片，提取其 src 属性作为图片的 URL
        let imageUrl = '';
        if (firstImage.length > 0) {
            imageUrl = firstImage.attr('src');
            $page.firstImage = imageUrl;
        }

        // 清理所有HTML标签，只留下文本内容
        const textContent = $.text().trim();

        // 提取摘要逻辑
        // 例如: 取前 200 个字符作为摘要
        const summary = textContent.slice(0, 200) + '...';

        if (summary) {
            $page.summary = summary;
        }
    }
});