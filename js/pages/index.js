/**
 * Selfhost Hub - 首页特定JavaScript
 */

$(document).ready(function () {
    // 加载精选服务
    loadFeaturedServices();

    // 加载最新博客文章
    loadLatestBlogPosts();

    // 轮播图自动切换
    initHeroSlider();

    // 为"查看更多服务"按钮添加点击事件
    $('.view-more-services').on('click', function () {
        window.location.href = 'services.html';
    });

    // 为"阅读更多博客"按钮添加点击事件
    $('.view-more-posts').on('click', function () {
        window.location.href = 'blog.html';
    });
});

// 加载精选服务
function loadFeaturedServices() {
    // 这里我们只获取几个精选的服务
    loadServices(function (services) {
        // 获取前3个（或可配置数量）精选服务
        const featuredServices = services
            .filter(service => service.featured)
            .slice(0, 3);

        // 如果没有足够的精选服务，则使用最热门的服务补充
        if (featuredServices.length < 3) {
            const popularServices = services
                .sort((a, b) => (b.stars || 0) - (a.stars || 0))
                .filter(service => !service.featured)
                .slice(0, 3 - featuredServices.length);

            featuredServices.push(...popularServices);
        }

        // 显示这些精选服务
        renderFeaturedServices(featuredServices);
    });
}

// 渲染精选服务
function renderFeaturedServices(services) {
    const container = $('.featured-services .service-grid');
    container.empty();

    if (services.length === 0) {
        container.html('<p class="text-center">' + translate('home.noServicesFound') + '</p>');
        return;
    }

    services.forEach(service => {
        // 构建标签HTML
        let tagsHtml = '';
        if (service.tags && service.tags.length > 0) {
            tagsHtml = '<div class="tags">' +
                service.tags.slice(0, 3).map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join('') +
                '</div>';
        }

        const serviceCard = `
            <div class="service-card">
                <img src="${service.logo || 'images/service-placeholder.png'}" alt="${service.name}" class="service-logo">
                <h3>${service.name}</h3>
                <p>${service.description.substring(0, 100)}${service.description.length > 100 ? '...' : ''}</p>
                ${tagsHtml}
                <a href="service-detail.html?id=${service.id}" class="btn btn-secondary">${translate('home.services.learnMore') || 'Learn More'}</a>
            </div>
        `;

        container.append(serviceCard);
    });
}

// 加载最新博客文章
function loadLatestBlogPosts() {
    loadBlogPosts(function (posts) {
        // 获取最新的3篇博客文章
        const latestPosts = posts.slice(0, 3);
        renderLatestPosts(latestPosts);
    });
}

// 渲染最新博客文章
function renderLatestPosts(posts) {
    const container = $('.latest-blog-posts .blog-grid');
    container.empty();

    if (posts.length === 0) {
        container.html('<p class="text-center">' + translate('home.noPostsFound') + '</p>');
        return;
    }

    posts.forEach(post => {
        // 构建标签HTML
        let tagsHtml = '';
        if (post.tags && post.tags.length > 0) {
            tagsHtml = '<div class="tags">' +
                post.tags.slice(0, 2).map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join('') +
                '</div>';
        }

        const currentLang = getCurrentLanguage();
        const formattedDate = formatDate(post.date, currentLang === 'zh' ? 'zh-CN' : 'en-US');

        const postCard = `
            <div class="blog-card">
                <div class="blog-image">
                    <img src="${post.image || 'images/blog-placeholder.jpg'}" alt="${post.title}">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="date">${formattedDate}</span>
                        <span class="author">${post.author}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    ${tagsHtml}
                    <a href="blog-post.html?id=${post.id}" class="btn btn-text">${translate('home.blog.readMore') || 'Read More'} →</a>
                </div>
            </div>
        `;

        container.append(postCard);
    });
}

// 初始化Hero轮播
function initHeroSlider() {
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const totalSlides = slides.length;

    if (totalSlides <= 1) return;

    // 显示第一张幻灯片
    slides.eq(0).addClass('active');

    // 创建指示器
    const indicators = $('.slider-indicators');

    for (let i = 0; i < totalSlides; i++) {
        const indicator = $('<button class="slider-indicator"></button>');
        if (i === 0) indicator.addClass('active');

        indicator.on('click', function () {
            goToSlide(i);
        });

        indicators.append(indicator);
    }

    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);

    // 悬停时暂停轮播
    $('.hero-slider').hover(
        function () { clearInterval(slideInterval); },
        function () { slideInterval = setInterval(nextSlide, 5000); }
    );

    // 下一张幻灯片
    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');

        $('.slider-indicator').removeClass('active');
        $('.slider-indicator').eq(index).addClass('active');

        currentSlide = index;
    }

    // 为箭头添加事件
    $('.slider-prev').on('click', function () {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    });

    $('.slider-next').on('click', function () {
        goToSlide((currentSlide + 1) % totalSlides);
    });
} 