/**
 * Selfhost Hub - 博客文章详情页面JavaScript
 */

$(document).ready(function () {
    // 获取文章ID
    const postId = getUrlParameter('id');

    if (!postId) {
        showErrorMessage('未找到博客文章ID');
        return;
    }

    // 加载博客文章详情
    loadBlogPostDetail(postId);

    // 评论表单提交
    $(document).on('submit', '#comment-form', function (e) {
        e.preventDefault();
        handleCommentSubmit();
    });

    // 分享按钮
    $('.share-button').on('click', function () {
        const platform = $(this).data('platform');
        shareBlogPost(platform);
    });

    // 复制链接按钮
    $('#copy-link').on('click', function () {
        copyCurrentUrl();
    });
});

// 加载博客文章详情
function loadBlogPostDetail(postId) {
    $.getJSON('data/blog-posts.json', function (data) {
        // 查找指定ID的文章
        const post = data.find(p => p.id.toString() === postId);

        if (!post) {
            showErrorMessage('未找到博客文章信息');
            return;
        }

        // 渲染文章详情
        renderBlogPostDetail(post);

        // 加载相关文章
        loadRelatedPosts(post);

        // 加载Markdown内容
        if (post.contentFile) {
            loadPostContent(post.contentFile);
        }
    }).fail(function () {
        showErrorMessage('加载博客文章数据失败');
    });
}

// 渲染博客文章详情
function renderBlogPostDetail(post) {
    // 设置页面标题
    document.title = post.title + ' - Selfhost Hub';

    // 渲染基本信息
    $('#post-title').text(post.title);

    // 渲染特色图片
    if (post.image) {
        $('#post-image').attr('src', post.image).attr('alt', post.title);
    } else {
        $('#post-image').attr('src', 'images/blog-placeholder.jpg').attr('alt', post.title);
    }

    // 渲染元数据
    const currentLang = getCurrentLanguage();
    const formattedDate = formatDate(post.date, currentLang === 'zh' ? 'zh-CN' : 'en-US');

    $('#post-meta').html(`
        <span class="date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
        <span class="author"><i class="far fa-user"></i> ${post.author}</span>
        ${post.category ? `<span class="category"><i class="far fa-folder"></i> ${post.category}</span>` : ''}
        ${post.views ? `<span class="views"><i class="far fa-eye"></i> ${post.views} ${translate('blogPost.views')}</span>` : ''}
    `);

    // 渲染标签
    const tagsContainer = $('#post-tags');
    tagsContainer.empty();

    if (post.tags && post.tags.length > 0) {
        post.tags.forEach(tag => {
            tagsContainer.append(`<a href="blog.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`);
        });
    }

    // 设置分享链接
    setupShareLinks(post);

    // 渲染作者信息
    if (post.authorBio) {
        $('#author-bio').html(`
            <div class="author-avatar">
                <img src="${post.authorAvatar || 'images/default-avatar.png'}" alt="${post.author}">
            </div>
            <div class="author-info">
                <h4>${post.author}</h4>
                <p>${post.authorBio}</p>
            </div>
        `);
    } else {
        $('#author-info-section').hide();
    }
}

// 加载文章的Markdown内容
function loadPostContent(contentFile) {
    $.get('data/blog/' + contentFile, function (markdown) {
        // 使用一个Markdown解析库（如marked.js）来渲染内容
        // 注意：需要引入marked.js库
        if (typeof marked !== 'undefined') {
            $('#post-content').html(marked(markdown));

            // 为代码块添加复制按钮
            addCopyButtonsToCodeBlocks();

            // 为标题添加锚点和链接
            addHeadingAnchors();

            // 生成目录
            generateTableOfContents();
        } else {
            // 简单的后备方案，如果没有marked库
            $('#post-content').html('<pre>' + markdown + '</pre>');
        }
    }).fail(function () {
        $('#post-content').html(`<p class="error-message">${translate('blogPost.contentError')}</p>`);
    });
}

// 为代码块添加复制按钮
function addCopyButtonsToCodeBlocks() {
    $('pre code').each(function (i) {
        const codeId = 'code-block-' + i;
        $(this).attr('id', codeId);

        const copyButton = $(`
            <button class="copy-btn" data-copy="${codeId}">
                <i class="fas fa-copy"></i> <span>${translate('blogPost.copy')}</span>
            </button>
        `);

        $(this).parent().addClass('code-container').append(copyButton);
    });
}

// 为标题添加锚点和链接
function addHeadingAnchors() {
    $('#post-content h2, #post-content h3, #post-content h4').each(function () {
        const id = $(this).text().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        $(this).attr('id', id);

        const anchor = $(`<a href="#${id}" class="heading-anchor">#</a>`);
        $(this).append(anchor);
    });
}

// 生成目录
function generateTableOfContents() {
    const toc = $('#table-of-contents');
    if (toc.length === 0) return;

    const headings = $('#post-content h2, #post-content h3, #post-content h4').toArray();

    if (headings.length === 0) {
        toc.parent().hide();
        return;
    }

    const tocList = $('<ul class="toc-list"></ul>');
    toc.append(tocList);

    let lastLevel = 2;
    let currentList = tocList;
    const listStack = [tocList];

    headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        const text = $(heading).text().replace('#', '');
        const id = $(heading).attr('id');

        if (level > lastLevel) {
            const newSubList = $('<ul class="toc-sublist"></ul>');
            listStack[listStack.length - 1].children('li:last-child').append(newSubList);
            listStack.push(newSubList);
            currentList = newSubList;
        } else if (level < lastLevel) {
            // 回到合适的级别
            const stepsBack = lastLevel - level;
            for (let i = 0; i < stepsBack; i++) {
                listStack.pop();
            }
            currentList = listStack[listStack.length - 1];
        }

        const listItem = $(`<li><a href="#${id}">${text}</a></li>`);
        currentList.append(listItem);

        lastLevel = level;
    });
}

// 设置分享链接
function setupShareLinks(post) {
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const summary = encodeURIComponent(post.excerpt || '');

    // 社交媒体分享链接
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${title}&summary=${summary}`,
        weibo: `http://service.weibo.com/share/share.php?url=${pageUrl}&title=${title}`
    };

    // 更新分享按钮链接
    $('.share-button').each(function () {
        const platform = $(this).data('platform');
        if (shareLinks[platform]) {
            $(this).attr('href', shareLinks[platform]);
        }
    });
}

// 处理评论提交
function handleCommentSubmit() {
    const name = $('#comment-name').val().trim();
    const email = $('#comment-email').val().trim();
    const content = $('#comment-content').val().trim();

    if (!name || !email || !content) {
        alert(translate('blogPost.fillAllFields'));
        return;
    }

    // 在实际项目中，这里应该是一个AJAX请求到后端API
    console.log('Comment submitted:', { name, email, content });

    // 显示成功消息
    $('#comment-form').html(`
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>${translate('blogPost.commentSuccess')}</p>
        </div>
    `);

    // 如果需要的话，可以在短暂延迟后重置表单
    setTimeout(() => {
        $('#comment-form').html(`
            <div class="form-group">
                <label for="comment-name">${translate('blogPost.name')}</label>
                <input type="text" id="comment-name" required>
            </div>
            <div class="form-group">
                <label for="comment-email">${translate('blogPost.email')}</label>
                <input type="email" id="comment-email" required>
            </div>
            <div class="form-group">
                <label for="comment-content">${translate('blogPost.comment')}</label>
                <textarea id="comment-content" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">${translate('blogPost.submitComment')}</button>
        `);
    }, 5000);
}

// 复制当前URL
function copyCurrentUrl() {
    copyToClipboard(window.location.href);

    // 显示复制成功提示
    const copyLink = $('#copy-link');
    const originalText = copyLink.find('span').text();
    copyLink.find('span').text(translate('blogPost.copied'));

    setTimeout(() => {
        copyLink.find('span').text(originalText);
    }, 2000);
}

// 加载相关博客文章
function loadRelatedPosts(currentPost) {
    loadBlogPosts(function (posts) {
        // 移除当前文章
        posts = posts.filter(p => p.id !== currentPost.id);

        // 查找具有相同标签或分类的文章
        let relatedPosts = [];

        if (currentPost.tags && currentPost.tags.length > 0) {
            posts.forEach(post => {
                if (post.tags) {
                    // 计算标签匹配的数量
                    const matchingTags = post.tags.filter(tag =>
                        currentPost.tags.includes(tag)
                    ).length;

                    if (matchingTags > 0) {
                        // 添加匹配程度作为排序依据
                        relatedPosts.push({
                            ...post,
                            matchingScore: matchingTags
                        });
                    }
                }
            });

            // 按匹配程度排序
            relatedPosts.sort((a, b) => b.matchingScore - a.matchingScore);
        }

        // 如果相关文章不足，则添加同一分类的文章
        if (relatedPosts.length < 3 && currentPost.category) {
            const remainingNeeded = 3 - relatedPosts.length;

            // 查找当前不在relatedPosts中的同一分类的文章
            const sameCategoryPosts = posts
                .filter(p => p.category === currentPost.category && !relatedPosts.some(r => r.id === p.id))
                .slice(0, remainingNeeded);

            relatedPosts = [...relatedPosts, ...sameCategoryPosts];
        }

        // 如果仍然不足，添加最新的文章
        if (relatedPosts.length < 3) {
            const remainingNeeded = 3 - relatedPosts.length;

            // 查找当前不在relatedPosts中的最新文章
            const recentPosts = posts
                .filter(p => !relatedPosts.some(r => r.id === p.id))
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, remainingNeeded);

            relatedPosts = [...relatedPosts, ...recentPosts];
        }

        // 显示最多3个相关文章
        renderRelatedPosts(relatedPosts.slice(0, 3));
    });
}

// 渲染相关博客文章
function renderRelatedPosts(posts) {
    const container = $('#related-posts');
    container.empty();

    if (posts.length === 0) {
        container.html(`<p class="text-center">${translate('blogPost.noRelatedPosts')}</p>`);
        return;
    }

    const relatedPostsGrid = $('<div class="related-posts-grid"></div>');
    container.append(relatedPostsGrid);

    posts.forEach(post => {
        const currentLang = getCurrentLanguage();
        const formattedDate = formatDate(post.date, currentLang === 'zh' ? 'zh-CN' : 'en-US');

        const postCard = `
            <div class="related-post-card">
                <a href="blog-post.html?id=${post.id}" class="related-post-image">
                    <img src="${post.image || 'images/blog-placeholder.jpg'}" alt="${post.title}">
                </a>
                <div class="related-post-content">
                    <div class="related-post-meta">
                        <span class="date">${formattedDate}</span>
                    </div>
                    <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                    <a href="blog-post.html?id=${post.id}" class="btn btn-text">${translate('blogPost.readMore')} →</a>
                </div>
            </div>
        `;

        relatedPostsGrid.append(postCard);
    });
}

// 显示错误消息
function showErrorMessage(message) {
    const container = $('#blog-post-container');
    container.html(`
        <div class="error-container">
            <img src="images/error.svg" alt="Error" class="error-image">
            <h2>${translate('blogPost.error')}</h2>
            <p>${message}</p>
            <a href="blog.html" class="btn btn-primary">${translate('blogPost.backToBlog')}</a>
        </div>
    `);
} 