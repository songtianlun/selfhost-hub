/**
 * Selfhost Hub - 博客列表页面 JavaScript
 * 处理博客文章列表页面的功能
 */

$(document).ready(function () {
    // 获取URL参数
    const urlCategory = getUrlParameter('category');
    const urlSearch = getUrlParameter('search');
    const urlPage = parseInt(getUrlParameter('page')) || 1;

    // 设置初始筛选值
    if (urlCategory) {
        $('#category-filter').val(urlCategory);
    }

    if (urlSearch) {
        $('#blog-search').val(urlSearch);
    }

    // 初始化筛选功能
    initFilters();

    // 加载侧边栏内容
    loadSidebar();

    // 加载博客文章
    loadBlogPosts({
        category: urlCategory,
        search: urlSearch,
        page: urlPage
    });

    // 博客搜索
    $('#blog-search-btn').on('click', function () {
        const searchTerm = $('#blog-search').val().trim();
        if (searchTerm !== '') {
            loadBlogPosts({
                category: $('#category-filter').val(),
                search: searchTerm,
                page: 1
            });
        }
    });

    $('#blog-search').on('keypress', function (e) {
        if (e.which === 13) {
            const searchTerm = $(this).val().trim();
            if (searchTerm !== '') {
                loadBlogPosts({
                    category: $('#category-filter').val(),
                    search: searchTerm,
                    page: 1
                });
            }
        }
    });
});

/**
 * 初始化筛选功能
 */
function initFilters() {
    // 加载分类列表
    $.getJSON('data/categories.json', function (categories) {
        const categoryFilter = $('#category-filter');

        categories.forEach(category => {
            categoryFilter.append(`<option value="${category.id}">${category.name}</option>`);
        });

        // 设置初始值
        const urlCategory = getUrlParameter('category');
        if (urlCategory) {
            categoryFilter.val(urlCategory);
        }
    });

    // 筛选变化事件
    $('#category-filter').on('change', function () {
        loadBlogPosts({
            category: $(this).val(),
            search: $('#blog-search').val().trim(),
            page: 1
        });
    });
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
            <span data-i18n="blog.loadingPosts">正在加载文章...</span>
        </div>
    `);

    // 加载博客列表
    loadBlogList(function (posts) {
        // 取最新的5篇文章
        const recentPosts = posts.slice(0, 5);

        const container = $('#recent-posts');
        container.empty();

        if (recentPosts.length === 0) {
            container.html(`<p class="no-posts" data-i18n="blog.noPosts">暂无文章</p>`);
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
 * 加载博客文章
 */
function loadBlogPosts(options = {}) {
    // 显示加载中
    $('#blog-posts-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="blog.loadingPosts">正在加载文章...</span>
        </div>
    `);

    // 更新URL参数
    updateUrlParams(options);

    // 加载博客列表
    loadBlogList(function (allPosts) {
        // 过滤文章
        let filteredPosts = allPosts;

        // 按分类过滤
        if (options.category && options.category !== 'all') {
            filteredPosts = filteredPosts.filter(post =>
                post.categories && post.categories.includes(options.category)
            );
        }

        // 按搜索词过滤
        if (options.search) {
            const searchTerm = options.search.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.description.toLowerCase().includes(searchTerm) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }

        // 按日期排序（最新的在前）
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 分页
        const postsPerPage = 10;
        const page = options.page || 1;
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pageItems = filteredPosts.slice(start, end);

        // 渲染文章
        renderBlogPosts(pageItems, {
            page: page,
            totalPages: totalPages,
            totalPosts: filteredPosts.length
        });
    });
}

/**
 * 渲染博客文章
 */
function renderBlogPosts(posts, pagination) {
    const container = $('#blog-posts-container');
    container.empty();

    // 检查是否有文章
    if (posts.length === 0) {
        container.html(`
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${translate('blog.noResults') || '未找到匹配的文章'}</h3>
                <p>${translate('blog.tryAgain') || '请尝试使用不同的搜索词或筛选条件'}</p>
            </div>
        `);
        return;
    }

    // 添加文章内容
    posts.forEach(post => {
        const postElement = $(`
            <article class="blog-post">
                <div class="blog-post-inner">
                    ${post.coverImage ?
                `<div class="blog-post-image">
                            <img src="${post.coverImage}" alt="${post.title}">
                        </div>` : ''
            }
                    <div class="blog-post-content">
                        <h2 class="blog-post-title">
                            <a href="blog-post.html?id=${post.id}">${post.title}</a>
                        </h2>
                        <div class="blog-post-meta">
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                            ${post.author ? `<span class="post-author"><i class="far fa-user"></i> ${post.author}</span>` : ''}
                            ${post.readTime ? `<span class="post-read-time"><i class="far fa-clock"></i> ${post.readTime} ${translate('blog.minuteRead') || '分钟阅读'}</span>` : ''}
                        </div>
                        <div class="blog-post-description">
                            <p>${post.description}</p>
                        </div>
                        ${post.tags && post.tags.length > 0 ?
                `<div class="blog-post-tags">
                                ${post.tags.map(tag => `<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join('')}
                            </div>` : ''
            }
                        <a href="blog-post.html?id=${post.id}" class="read-more-link">
                            ${translate('blog.readMore') || '阅读更多'} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `);

        container.append(postElement);
    });

    // 添加分页
    if (pagination.totalPages > 1) {
        const paginationElement = createPagination(pagination);
        container.append(paginationElement);
    }
}

/**
 * 创建分页控件
 */
function createPagination(pagination) {
    const { page, totalPages } = pagination;

    // 创建分页容器
    const paginationContainer = $('<div class="pagination-container"></div>');
    const paginationInner = $('<div class="pagination"></div>');

    // 添加上一页按钮
    const prevButton = $(`
        <a href="#" class="pagination-link pagination-prev${page <= 1 ? ' disabled' : ''}" 
           data-page="${page - 1}" aria-label="Previous page">
            <i class="fas fa-chevron-left"></i>
        </a>
    `);

    if (page > 1) {
        prevButton.on('click', function (e) {
            e.preventDefault();
            loadBlogPosts({
                category: $('#category-filter').val(),
                search: $('#blog-search').val().trim(),
                page: page - 1
            });
        });
    }

    paginationInner.append(prevButton);

    // 添加页码按钮
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // 调整起始页确保显示5个页码按钮
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = $(`
            <a href="#" class="pagination-link${i === page ? ' active' : ''}" 
               data-page="${i}" aria-label="Page ${i}">
                ${i}
            </a>
        `);

        if (i !== page) {
            pageButton.on('click', function (e) {
                e.preventDefault();
                loadBlogPosts({
                    category: $('#category-filter').val(),
                    search: $('#blog-search').val().trim(),
                    page: i
                });
            });
        }

        paginationInner.append(pageButton);
    }

    // 添加下一页按钮
    const nextButton = $(`
        <a href="#" class="pagination-link pagination-next${page >= totalPages ? ' disabled' : ''}" 
           data-page="${page + 1}" aria-label="Next page">
            <i class="fas fa-chevron-right"></i>
        </a>
    `);

    if (page < totalPages) {
        nextButton.on('click', function (e) {
            e.preventDefault();
            loadBlogPosts({
                category: $('#category-filter').val(),
                search: $('#blog-search').val().trim(),
                page: page + 1
            });
        });
    }

    paginationInner.append(nextButton);

    // 添加结果计数
    const resultCount = $(`
        <div class="result-count">
            ${translate('blog.showing') || '显示'} ${pagination.totalPosts} ${translate('blog.results') || '条结果'}
        </div>
    `);

    paginationContainer.append(paginationInner);
    paginationContainer.append(resultCount);

    return paginationContainer;
}

/**
 * 更新URL参数
 */
function updateUrlParams(options) {
    const url = new URL(window.location);

    // 清除现有参数
    url.searchParams.delete('category');
    url.searchParams.delete('search');
    url.searchParams.delete('page');

    // 添加新参数
    if (options.category && options.category !== 'all') {
        url.searchParams.set('category', options.category);
    }

    if (options.search) {
        url.searchParams.set('search', options.search);
    }

    if (options.page && options.page > 1) {
        url.searchParams.set('page', options.page);
    }

    // 更新URL（不刷新页面）
    window.history.replaceState({}, '', url);
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