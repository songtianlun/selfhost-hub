/**
 * Selfhost Hub - 博客页面JavaScript
 */

$(document).ready(function () {
    // 初始化分类和排序选项
    initBlogFilters();

    // 处理URL参数
    const searchQuery = getUrlParameter('search');
    const category = getUrlParameter('category');
    const tag = getUrlParameter('tag');
    const page = parseInt(getUrlParameter('page')) || 1;

    // 如果有搜索查询，则将其显示在搜索框中
    if (searchQuery) {
        $('#blog-search-input').val(searchQuery);
    }

    // 如果有分类参数，则选择相应的分类
    if (category) {
        $('#category-filter').val(category);
    }

    // 加载博客文章数据
    loadBlogPostsData(page);

    // 搜索按钮点击事件
    $('#blog-search-button').on('click', function () {
        loadBlogPostsData(1);
    });

    // 回车键搜索
    $('#blog-search-input').on('keypress', function (e) {
        if (e.which === 13) {
            loadBlogPostsData(1);
        }
    });

    // 分类筛选变化事件
    $('#category-filter').on('change', function () {
        loadBlogPostsData(1);
    });

    // 排序选项变化事件
    $('#sort-options').on('change', function () {
        loadBlogPostsData(1);
    });

    // 清除筛选器按钮
    $('#clear-filters').on('click', function () {
        $('#blog-search-input').val('');
        $('#category-filter').val('all');
        $('#sort-options').val('newest');
        loadBlogPostsData(1);
    });
});

// 初始化博客筛选器
function initBlogFilters() {
    // 加载分类选项
    $.getJSON('data/categories.json', function (data) {
        const categoryFilter = $('#category-filter');
        categoryFilter.empty();

        // 添加"全部"选项
        categoryFilter.append(`<option value="all">${translate('blog.filters.allCategories')}</option>`);

        // 添加其他分类
        data.forEach(category => {
            categoryFilter.append(`<option value="${category.id}">${category.name}</option>`);
        });
    }).fail(function () {
        console.error('Failed to load categories data');
    });

    // 初始化排序选项
    const sortOptions = $('#sort-options');
    sortOptions.empty();

    // 添加排序选项
    sortOptions.append(`<option value="newest">${translate('blog.filters.newest')}</option>`);
    sortOptions.append(`<option value="oldest">${translate('blog.filters.oldest')}</option>`);
}

// 加载博客文章数据
function loadBlogPostsData(page = 1) {
    // 获取筛选参数
    const searchQuery = $('#blog-search-input').val().trim();
    const category = $('#category-filter').val();
    const sortOption = $('#sort-options').val() || 'newest';
    const tag = getUrlParameter('tag');

    // 显示加载状态
    const postsContainer = $('#blog-posts-container');
    postsContainer.html('<div class="loading-spinner"><div></div><div></div><div></div><div></div></div>');

    // 更新URL参数（用于分享和刷新）
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    if (searchQuery) {
        params.set('search', searchQuery);
    } else {
        params.delete('search');
    }

    if (category && category !== 'all') {
        params.set('category', category);
    } else {
        params.delete('category');
    }

    if (tag) {
        params.set('tag', tag);
    }

    if (page > 1) {
        params.set('page', page);
    } else {
        params.delete('page');
    }

    window.history.replaceState({}, '', `${url.pathname}?${params}`);

    // 加载博客文章
    loadBlogPosts(function (posts) {
        renderBlogPosts(posts, page);
    }, {
        search: searchQuery,
        category: category,
        tag: tag,
        sort: sortOption
    });

    // 加载侧边栏内容
    loadSidebarContent();
}

// 渲染博客文章列表
function renderBlogPosts(posts, currentPage) {
    const postsContainer = $('#blog-posts-container');
    postsContainer.empty();

    if (posts.length === 0) {
        postsContainer.html(`
            <div class="no-results">
                <img src="images/no-results.svg" alt="No results" class="no-results-image">
                <h3>${translate('blog.noResults')}</h3>
                <p>${translate('blog.tryDifferent')}</p>
                <button id="clear-filters" class="btn btn-primary">${translate('blog.clearFilters')}</button>
            </div>
        `);

        // 重新添加清除筛选器按钮事件
        $('#clear-filters').on('click', function () {
            $('#blog-search-input').val('');
            $('#category-filter').val('all');
            $('#sort-options').val('newest');
            loadBlogPostsData(1);
        });

        return;
    }

    // 每页显示的文章数
    const postsPerPage = 5;

    // 计算分页
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // 确保当前页面有效
    currentPage = Math.max(1, Math.min(currentPage, totalPages));

    // 获取当前页面的文章
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, posts.length);
    const currentPosts = posts.slice(startIndex, endIndex);

    // 添加结果计数
    postsContainer.append(`
        <div class="results-count">
            ${translate('blog.showing')} ${currentPosts.length} ${translate('blog.of')} ${posts.length} ${translate('blog.posts')}
        </div>
    `);

    // 创建博客文章列表
    const postsGrid = $('<div class="blog-posts-list"></div>');
    postsContainer.append(postsGrid);

    // 填充博客文章
    currentPosts.forEach(post => {
        // 构建标签HTML
        let tagsHtml = '';
        if (post.tags && post.tags.length > 0) {
            tagsHtml = '<div class="tags">' +
                post.tags.map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join('') +
                '</div>';
        }

        // 格式化日期
        const currentLang = getCurrentLanguage();
        const formattedDate = formatDate(post.date, currentLang === 'zh' ? 'zh-CN' : 'en-US');

        const postCard = `
            <div class="blog-post-card">
                <div class="blog-post-image">
                    <a href="blog-post.html?id=${post.id}">
                        <img src="${post.image || 'images/blog-placeholder.jpg'}" alt="${post.title}">
                    </a>
                </div>
                <div class="blog-post-content">
                    <div class="blog-post-meta">
                        <span class="date">${formattedDate}</span>
                        <span class="author">${post.author}</span>
                        ${post.category ? `<span class="category">${post.category}</span>` : ''}
                    </div>
                    <h2 class="blog-post-title"><a href="blog-post.html?id=${post.id}">${post.title}</a></h2>
                    <p class="blog-post-excerpt">${post.excerpt}</p>
                    ${tagsHtml}
                    <a href="blog-post.html?id=${post.id}" class="btn btn-text">${translate('blog.readMore')} →</a>
                </div>
            </div>
        `;

        postsGrid.append(postCard);
    });

    // 添加分页
    if (totalPages > 1) {
        const pagination = $('<div class="pagination"></div>');
        postsContainer.append(pagination);

        // 上一页按钮
        if (currentPage > 1) {
            pagination.append(`<a href="#" class="pagination-prev" data-page="${currentPage - 1}">${translate('blog.previous')}</a>`);
        } else {
            pagination.append(`<span class="pagination-prev disabled">${translate('blog.previous')}</span>`);
        }

        // 页码
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        // 添加第一页和省略号
        if (startPage > 1) {
            pagination.append(`<a href="#" class="pagination-number" data-page="1">1</a>`);
            if (startPage > 2) {
                pagination.append(`<span class="pagination-ellipsis">...</span>`);
            }
        }

        // 添加中间页码
        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                pagination.append(`<span class="pagination-number active">${i}</span>`);
            } else {
                pagination.append(`<a href="#" class="pagination-number" data-page="${i}">${i}</a>`);
            }
        }

        // 添加最后一页和省略号
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pagination.append(`<span class="pagination-ellipsis">...</span>`);
            }
            pagination.append(`<a href="#" class="pagination-number" data-page="${totalPages}">${totalPages}</a>`);
        }

        // 下一页按钮
        if (currentPage < totalPages) {
            pagination.append(`<a href="#" class="pagination-next" data-page="${currentPage + 1}">${translate('blog.next')}</a>`);
        } else {
            pagination.append(`<span class="pagination-next disabled">${translate('blog.next')}</span>`);
        }

        // 添加分页事件
        $('.pagination a').on('click', function (e) {
            e.preventDefault();
            const page = parseInt($(this).data('page'));
            if (page) {
                loadBlogPostsData(page);
                // 滚动到顶部
                scrollToTop();
            }
        });
    }

    // 处理标签点击事件
    $('.tag').on('click', function (e) {
        e.preventDefault();
        const tagText = $(this).text().trim();
        window.location.href = `blog.html?tag=${encodeURIComponent(tagText)}`;
    });
}

// 加载侧边栏内容
function loadSidebarContent() {
    // 加载热门文章
    loadBlogPosts(function (posts) {
        // 获取前5篇最受欢迎的文章
        const popularPosts = posts
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);

        renderPopularPosts(popularPosts);
    });

    // 加载博客分类
    $.getJSON('data/categories.json', function (categories) {
        renderCategories(categories);
    }).fail(function () {
        console.error('Failed to load categories data');
    });

    // 加载标签云
    $.getJSON('data/services.json', function (services) {
        // 收集所有博客标签和它们的计数
        const tagCounts = {};

        // 假设我们从博客文章中提取标签
        loadBlogPosts(function (posts) {
            posts.forEach(post => {
                if (post.tags && post.tags.length > 0) {
                    post.tags.forEach(tag => {
                        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                    });
                }
            });

            // 将标签转换为数组并按使用频率排序
            const tags = Object.entries(tagCounts)
                .map(([tag, count]) => ({ tag, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 15); // 只显示前15个标签

            renderSidebarTags(tags);
        });
    }).fail(function () {
        console.error('Failed to load service data for tags');
    });
}

// 渲染热门文章
function renderPopularPosts(posts) {
    const container = $('#popular-posts');
    container.empty();

    if (posts.length === 0) {
        container.html(`<p class="text-center">${translate('blog.sidebar.noPopularPosts')}</p>`);
        return;
    }

    posts.forEach(post => {
        const currentLang = getCurrentLanguage();
        const formattedDate = formatDate(post.date, currentLang === 'zh' ? 'zh-CN' : 'en-US');

        const postItem = `
            <div class="sidebar-post">
                <a href="blog-post.html?id=${post.id}" class="sidebar-post-image">
                    <img src="${post.image || 'images/blog-placeholder.jpg'}" alt="${post.title}">
                </a>
                <div class="sidebar-post-info">
                    <h4><a href="blog-post.html?id=${post.id}">${post.title}</a></h4>
                    <div class="sidebar-post-meta">
                        <span class="date">${formattedDate}</span>
                    </div>
                </div>
            </div>
        `;

        container.append(postItem);
    });
}

// 渲染分类
function renderCategories(categories) {
    const container = $('#blog-categories');
    container.empty();

    if (categories.length === 0) {
        container.html(`<p class="text-center">${translate('blog.sidebar.noCategories')}</p>`);
        return;
    }

    const categoryList = $('<ul class="category-list"></ul>');
    container.append(categoryList);

    // 添加"全部"选项
    categoryList.append(`
        <li>
            <a href="blog.html" class="category-item">
                <span class="category-name">${translate('blog.sidebar.allCategories')}</span>
            </a>
        </li>
    `);

    // 为每个分类加载文章计数
    loadBlogPosts(function (posts) {
        const categoryCounts = {};

        // 统计每个分类的文章数量
        posts.forEach(post => {
            if (post.category) {
                categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
            }
        });

        // 渲染分类列表
        categories.forEach(category => {
            const count = categoryCounts[category.name] || 0;

            categoryList.append(`
                <li>
                    <a href="blog.html?category=${encodeURIComponent(category.id)}" class="category-item">
                        <span class="category-name">${category.name}</span>
                        <span class="category-count">(${count})</span>
                    </a>
                </li>
            `);
        });
    });
}

// 渲染侧边栏标签
function renderSidebarTags(tags) {
    const container = $('#blog-tags');
    container.empty();

    if (tags.length === 0) {
        container.html(`<p class="text-center">${translate('blog.sidebar.noTags')}</p>`);
        return;
    }

    tags.forEach(({ tag }) => {
        const tagElement = $(`<a href="blog.html?tag=${encodeURIComponent(tag)}" class="sidebar-tag">${tag}</a>`);
        container.append(tagElement);
    });
} 