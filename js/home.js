/**
 * Selfhost Hub - 首页 JavaScript
 * 处理首页的功能
 */

$(document).ready(function () {
    // 加载精选服务
    loadFeaturedServices();

    // 加载分类
    loadCategories();

    // 加载最新博客文章
    loadLatestBlogPosts();
});

/**
 * 加载精选服务
 */
function loadFeaturedServices() {
    $.getJSON('data/services.json', function (services) {
        // 筛选出精选的服务
        const featuredServices = services.filter(service => service.featured).slice(0, 3);
        renderFeaturedServices(featuredServices);
    }).fail(function () {
        // 显示错误消息
        $('#featured-services-container').html(`
            <div class="error-message">
                <p>${translate('home.featured.error') || '无法加载精选服务'}</p>
            </div>
        `);
    });
}

/**
 * 渲染精选服务
 */
function renderFeaturedServices(services) {
    const container = $('#featured-services-container');
    container.empty();

    services.forEach(service => {
        const serviceCard = `
            <div class="service-card">
                <div class="service-image">
                    <img src="${service.logo || 'images/service-placeholder.png'}" alt="${service.name}">
                </div>
                <div class="service-content">
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-description">${service.description}</p>
                    <div class="service-tags">
                        ${service.tags ? service.tags.slice(0, 3).map(tag => `<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join('') : ''}
                    </div>
                    <div class="service-meta">
                        <span class="service-stars"><i class="fas fa-star"></i> <span class="stars-count">${service.stars || 0}</span></span>
                        <a href="service-detail.html?id=${service.id}" class="service-link">${translate('services.viewDetails') || '查看详情'}</a>
                    </div>
                </div>
            </div>
        `;
        container.append(serviceCard);
    });
}

/**
 * 加载分类
 */
function loadCategories() {
    $.getJSON('data/categories.json', function (categories) {
        const container = $('#categories-container');
        container.empty();

        categories.slice(0, 6).forEach(category => {
            const categoryCard = `
                <div class="category-card">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3 class="category-title">${category.name}</h3>
                    <p class="category-description">${category.description}</p>
                    <span class="category-count">${category.count} ${translate('home.categories.services') || '项服务'}</span>
                    <a href="services.html?category=${category.id}" class="btn btn-outline category-button">${translate('home.categories.browse') || '浏览'}</a>
                </div>
            `;
            container.append(categoryCard);
        });
    }).fail(function () {
        // 显示错误消息
        $('#categories-container').html(`
            <div class="error-message">
                <p>${translate('home.categories.error') || '无法加载分类'}</p>
            </div>
        `);
    });
}

/**
 * 加载最新博客文章
 */
function loadLatestBlogPosts() {
    $.getJSON('data/blogs.json', function (posts) {
        // 按日期排序，获取最新的几篇
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderLatestPosts(posts.slice(0, 3));
    }).fail(function () {
        // 显示错误消息
        $('#recent-blog-container').html(`
            <div class="error-message">
                <p>${translate('home.blog.error') || '无法加载博客文章'}</p>
            </div>
        `);
    });
}

/**
 * 渲染最新博客文章
 */
function renderLatestPosts(posts) {
    const container = $('#recent-blog-container');
    container.empty();

    posts.forEach(post => {
        const postCard = `
            <article class="blog-post">
                <div class="post-image">
                    <a href="blog-post.html?id=${post.id}">
                        <img src="${post.image || 'images/blog-placeholder.jpg'}" alt="${post.title}">
                    </a>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-date">${formatDate(post.date)}</span>
                        <span class="post-author">${post.author}</span>
                    </div>
                    <h2 class="post-title"><a href="blog-post.html?id=${post.id}">${post.title}</a></h2>
                    <p class="post-excerpt">${post.summary}</p>
                    <div class="post-footer">
                        <a href="blog-post.html?id=${post.id}" class="read-more">${translate('blog.readMore') || '阅读更多'}</a>
                        <div class="post-tags">
                            ${post.tags ? post.tags.slice(0, 2).map(tag => `<a href="blog.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join('') : ''}
                        </div>
                    </div>
                </div>
            </article>
        `;
        container.append(postCard);
    });
} 