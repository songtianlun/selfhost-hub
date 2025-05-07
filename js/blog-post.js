/**
 * Selfhost Hub - 博客文章详情页面 JavaScript
 * 处理单篇博客文章详情页面的功能
 */

$(document).ready(function () {
    // 获取文章ID
    const postId = getUrlParameter('id');

    if (!postId) {
        showError('未指定文章ID');
        return;
    }

    // 加载文章详情
    loadBlogPostDetail(postId);

    // 加载侧边栏内容
    loadSidebar();

    // 分享按钮事件
    initShareButtons();
});

/**
 * 加载文章详情
 */
function loadBlogPostDetail(postId) {
    // 显示加载中
    $('#blog-post-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="blogPost.loading">正在加载文章内容...</span>
        </div>
    `);

    // 加载文章元数据
    $.getJSON('data/blog/' + postId + '.json')
        .done(function (post) {
            // 更新页面标题
            document.title = post.title + ' - Selfhost Hub';

            // 渲染文章基本信息
            renderPostInfo(post);

            // 加载文章Markdown内容
            loadPostContent(postId);

            // 加载相关文章
            loadRelatedPosts(post);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading blog post details:', textStatus, errorThrown);
            showError('无法加载文章详情');
        });
}

/**
 * 渲染文章基本信息
 */
function renderPostInfo(post) {
    const container = $('#blog-post-container');

    // 清空加载中提示
    container.empty();

    // 添加文章头部信息
    const postHeader = $(`
        <header class="blog-post-header">
            <h1 class="blog-post-title">${post.title}</h1>
            <div class="blog-post-meta">
                <span class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                ${post.author ? `<span class="post-author"><i class="far fa-user"></i> ${post.author}</span>` : ''}
                ${post.readTime ? `<span class="post-read-time"><i class="far fa-clock"></i> ${post.readTime} ${translate('blogPost.minuteRead') || '分钟阅读'}</span>` : ''}
            </div>
        </header>
    `);

    container.append(postHeader);

    // 添加封面图（如果有）
    if (post.coverImage) {
        const coverImage = $(`
            <div class="blog-post-cover">
                <img src="${post.coverImage}" alt="${post.title}" class="img-fluid">
            </div>
        `);
        container.append(coverImage);
    }

    // 添加文章内容容器
    container.append('<div class="blog-post-content-container"></div>');

    // 添加文章底部
    const postFooter = $(`
        <footer class="blog-post-footer">
            ${post.tags && post.tags.length > 0 ? `
                <div class="blog-post-tags">
                    <span class="tags-label"><i class="fas fa-tags"></i> ${translate('blogPost.tags') || '标签'}:</span>
                    <div class="tags-list">
                        ${post.tags.map(tag => `<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="blog-post-share">
                <span class="share-label"><i class="fas fa-share-alt"></i> ${translate('blogPost.share') || '分享'}:</span>
                <div class="share-buttons">
                    <button class="share-button share-twitter" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="share-button share-facebook" data-platform="facebook">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button class="share-button share-linkedin" data-platform="linkedin">
                        <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button class="share-button share-copy" data-platform="copy">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            </div>
        </footer>
    `);

    container.append(postFooter);

    // 添加相关文章容器
    container.append(`
        <div class="related-posts-section">
            <h3 data-i18n="blogPost.relatedPosts">相关文章</h3>
            <div class="related-posts-container">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span data-i18n="blogPost.loadingRelated">正在加载相关文章...</span>
                </div>
            </div>
        </div>
    `);
}

/**
 * 加载文章Markdown内容
 */
function loadPostContent(postId) {
    const contentContainer = $('.blog-post-content-container');

    // 显示加载中
    contentContainer.html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="blogPost.loadingContent">正在加载内容...</span>
        </div>
    `);

    // 根据当前语言确定需要加载的内容
    const currentLang = getCurrentLanguage();
    const contentPath = `data/blog/content/${postId}_${currentLang}.md`;
    const fallbackPath = `data/blog/content/${postId}_en.md`; // 英文作为备选

    // 尝试加载当前语言内容
    $.ajax({
        url: contentPath,
        dataType: 'text',
        success: function (markdownContent) {
            renderMarkdownContent(markdownContent, contentContainer);
        },
        error: function () {
            // 如果当前语言内容不存在，尝试加载英文内容
            $.ajax({
                url: fallbackPath,
                dataType: 'text',
                success: function (markdownContent) {
                    renderMarkdownContent(markdownContent, contentContainer);
                },
                error: function () {
                    // 如果英文内容也不存在，显示错误信息
                    contentContainer.html(`
                        <div class="error-message">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p data-i18n="blogPost.contentNotFound">未找到文章内容</p>
                        </div>
                    `);
                }
            });
        }
    });
}

/**
 * 渲染Markdown内容
 */
function renderMarkdownContent(markdownContent, container) {
    // 使用marked.js转换Markdown内容为HTML
    const html = marked.parse(markdownContent);

    // 创建内容容器
    const contentSection = $('<div class="blog-post-content"></div>');

    // 添加内容
    contentSection.html(html);

    // 清空并填充容器
    container.empty().append(contentSection);

    // 处理内容中的图片，添加lightbox功能
    initContentImages();

    // 添加目录
    generateTableOfContents();

    // 初始化语法高亮
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

/**
 * 加载相关文章
 */
function loadRelatedPosts(currentPost) {
    if (!currentPost.tags || currentPost.tags.length === 0) {
        // 如果没有标签，隐藏相关文章区域
        $('.related-posts-section').hide();
        return;
    }

    // 基于当前文章的标签找相关文章
    loadBlogList(function (posts) {
        // 排除当前文章
        const relatedPosts = posts.filter(post =>
            post.id !== currentPost.id &&
            post.tags &&
            post.tags.some(tag => currentPost.tags.includes(tag))
        );

        // 最多显示3个相关文章
        const postsToShow = relatedPosts.slice(0, 3);

        renderRelatedPosts(postsToShow);
    });
}

/**
 * 渲染相关文章
 */
function renderRelatedPosts(posts) {
    const container = $('.related-posts-container');

    // 检查是否有相关文章
    if (!posts || posts.length === 0) {
        $('.related-posts-section').hide();
        return;
    }

    // 清空容器
    container.empty();

    // 添加相关文章
    const relatedPostsRow = $('<div class="related-posts-row"></div>');

    posts.forEach(post => {
        const postCard = $(`
            <div class="related-post-card">
                <a href="blog-post.html?id=${post.id}" class="related-post-link">
                    <div class="related-post-image">
                        ${post.coverImage ?
                `<img src="${post.coverImage}" alt="${post.title}">` :
                `<div class="post-placeholder-image"><i class="fas fa-file-alt"></i></div>`
            }
                    </div>
                    <div class="related-post-content">
                        <h4 class="related-post-title">${post.title}</h4>
                        <p class="related-post-date">${formatDate(post.date)}</p>
                    </div>
                </a>
            </div>
        `);

        relatedPostsRow.append(postCard);
    });

    container.append(relatedPostsRow);
}

/**
 * 加载侧边栏内容
 */
function loadSidebar() {
    // 加载热门标签
    loadPopularTags();

    // 加载最新文章
    loadLatestPosts();
}

/**
 * 加载热门标签
 */
function loadPopularTags() {
    $.getJSON('data/tags.json', function (tags) {
        // 按count属性排序，取前N个
        tags.sort((a, b) => (b.count || 0) - (a.count || 0));
        const popularTags = tags.slice(0, 15);

        const container = $('#popular-tags');
        container.empty();

        popularTags.forEach(tag => {
            const tagElement = $(`<a href="tags.html?tags=${encodeURIComponent(tag.name)}" class="tag">${tag.name}</a>`);
            container.append(tagElement);
        });
    });
}

/**
 * 加载最新文章
 */
function loadLatestPosts() {
    // 显示加载中
    $('#recent-posts').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="blogPost.loadingPosts">正在加载文章...</span>
        </div>
    `);

    // 加载博客列表
    loadBlogList(function (posts) {
        // 取最新的5篇文章
        const recentPosts = posts.slice(0, 5);

        const container = $('#recent-posts');
        container.empty();

        if (recentPosts.length === 0) {
            container.html(`<p class="no-posts" data-i18n="blogPost.noPosts">暂无文章</p>`);
            return;
        }

        recentPosts.forEach(post => {
            const postItem = $(`
                <div class="recent-post-item">
                    <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                    <div class="post-meta">
                        <span class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                    </div>
                </div>
            `);

            container.append(postItem);
        });
    });
}

/**
 * 初始化分享按钮
 */
function initShareButtons() {
    // 社交媒体分享
    $('.share-button').on('click', function () {
        const platform = $(this).data('platform');
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        let shareUrl = '';

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'copy':
                copyToClipboard(window.location.href);
                showCopiedMessage($(this));
                return;
        }

        // 打开分享窗口
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
}

/**
 * 复制到剪贴板
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

/**
 * 显示复制成功消息
 */
function showCopiedMessage(button) {
    const originalIcon = button.html();

    // 更改按钮图标和添加提示
    button.html('<i class="fas fa-check"></i>');

    // 创建提示
    const tooltip = $(`<div class="copy-tooltip">${translate('blogPost.copied') || '已复制!'}</div>`);
    button.append(tooltip);

    // 2秒后恢复原样
    setTimeout(function () {
        button.html(originalIcon);
        tooltip.remove();
    }, 2000);
}

/**
 * 生成文章目录
 */
function generateTableOfContents() {
    const container = $('.blog-post-content');
    const headings = container.find('h2, h3, h4').toArray();

    if (headings.length < 3) {
        return; // 如果标题太少，不生成目录
    }

    // 创建目录容器
    const tocContainer = $(`
        <div class="table-of-contents">
            <div class="toc-header">
                <h3 data-i18n="blogPost.tableOfContents">目录</h3>
                <button class="toc-toggle">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <ul class="toc-list"></ul>
        </div>
    `);

    const tocList = tocContainer.find('.toc-list');

    // 为每个标题生成ID和目录项
    headings.forEach((heading, index) => {
        const $heading = $(heading);
        const headingText = $heading.text();
        const headingId = 'heading-' + index;

        // 为标题添加ID
        $heading.attr('id', headingId);

        // 创建目录项
        const tocItem = $(`<li class="toc-item toc-${heading.tagName.toLowerCase()}"><a href="#${headingId}">${headingText}</a></li>`);
        tocList.append(tocItem);
    });

    // 添加到内容开头
    container.prepend(tocContainer);

    // 添加目录折叠功能
    $('.toc-toggle').on('click', function () {
        $('.toc-list').slideToggle();
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
    });
}

/**
 * 处理内容中的图片
 */
function initContentImages() {
    $('.blog-post-content img').each(function () {
        const img = $(this);

        // 添加点击查看大图功能
        img.on('click', function () {
            const imgSrc = $(this).attr('src');

            // 创建遮罩和大图
            const overlay = $(`
                <div class="image-overlay">
                    <div class="image-overlay-content">
                        <img src="${imgSrc}" alt="Large view">
                        <button class="close-overlay"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `);

            // 添加到body
            $('body').append(overlay);

            // 处理关闭
            overlay.on('click', function (e) {
                if ($(e.target).closest('.image-overlay-content img').length === 0) {
                    overlay.remove();
                }
            });

            $('.close-overlay').on('click', function () {
                overlay.remove();
            });
        });

        // 添加样式
        img.css('cursor', 'pointer');
    });
}

/**
 * 显示错误信息
 */
function showError(message) {
    $('#blog-post-container').html(`
        <div class="error-container">
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h2 class="error-title" data-i18n="blogPost.errorTitle">出错了</h2>
            <p class="error-message">${message}</p>
            <a href="blog.html" class="btn btn-primary" data-i18n="blogPost.backToBlog">返回博客列表</a>
        </div>
    `);
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);

    // 获取当前语言
    const lang = getCurrentLanguage();

    // 不同语言的日期格式
    if (lang === 'zh') {
        // 中文格式: 2023年1月1日
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    } else {
        // 英文格式: January 1, 2023
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
} 