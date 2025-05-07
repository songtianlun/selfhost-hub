/**
 * Selfhost Hub - 主要JavaScript文件
 * 处理全站通用功能
 */

$(document).ready(function () {
    // 移动端菜单切换
    $('.mobile-menu-toggle').on('click', function () {
        $('nav ul').toggleClass('active');
        $(this).toggleClass('active');
    });

    // 点击页面其他地方关闭菜单
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.mobile-menu-toggle, nav ul').length) {
            $('nav ul').removeClass('active');
            $('.mobile-menu-toggle').removeClass('active');
        }
    });

    // 模态框操作
    $(document).on('click', '.modal-close', function () {
        closeModal();
    });

    $(document).on('click', '.modal', function (e) {
        if ($(e.target).hasClass('modal')) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // 标签点击事件
    $(document).on('click', '.tag', function (e) {
        const tagText = $(this).text().trim();
        // 将标签作为搜索条件传递给标签页面
        if (window.location.pathname.includes('tags.html')) {
            e.preventDefault();
            handleTagClick(tagText);
        } else {
            e.preventDefault();
            window.location.href = 'tags.html?tags=' + encodeURIComponent(tagText);
        }
    });

    // 切换标签页
    $(document).on('click', '.tab-btn', function () {
        const tabId = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // 复制按钮
    $(document).on('click', '.copy-btn', function () {
        const codeId = $(this).data('copy');
        const codeText = $('#' + codeId).text();
        copyToClipboard(codeText);

        // 显示复制成功提示
        const originalText = $(this).find('span').text();
        $(this).find('span').text(translate('service.copied') || 'Copied!');
        setTimeout(() => {
            $(this).find('span').text(originalText);
        }, 2000);
    });

    // 搜索提交
    $('#search-button').on('click', function () {
        handleSearch();
    });

    $('#search-input').on('keypress', function (e) {
        if (e.which === 13) {
            handleSearch();
        }
    });

    // 订阅表单提交
    $(document).on('submit', '#newsletter-form', function (e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val().trim();
        if (email) {
            subscribeNewsletter(email);
        }
    });

    // 加载页面特定的初始化函数
    initPageSpecific();
});

// 打开模态框
function openModal(modalId) {
    $('#' + modalId).fadeIn(300);
    $('body').addClass('modal-open');
}

// 关闭模态框
function closeModal() {
    $('.modal').fadeOut(300);
    $('body').removeClass('modal-open');
}

// 复制到剪贴板
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// 处理搜索
function handleSearch() {
    const searchTerm = $('#search-input').val().trim();
    if (searchTerm) {
        window.location.href = 'services.html?search=' + encodeURIComponent(searchTerm);
    }
}

// 订阅通讯
function subscribeNewsletter(email) {
    // 实际项目中，这里应该是一个AJAX请求到后端API
    console.log('Subscribing email:', email);

    // 显示成功消息
    const form = $('#newsletter-form');
    const successMsg = $('<p class="success-message">' + (translate('blog.sidebar.subscribeSuccess') || 'Thank you for subscribing!') + '</p>');
    form.html(successMsg);

    setTimeout(() => {
        form.html(`
            <input type="email" placeholder="${translate('blog.sidebar.emailPlaceholder') || 'Your email address'}" required>
            <button type="submit" class="btn btn-primary">${translate('blog.sidebar.subscribe') || 'Subscribe'}</button>
        `);
    }, 3000);
}

// 根据当前页面初始化特定功能
function initPageSpecific() {
    const path = window.location.pathname;

    // 标记当前页面的导航链接为活动状态
    if (path.includes('index.html') || path === '/' || path === '') {
        $('nav a[href="index.html"]').addClass('active');
    } else if (path.includes('services.html')) {
        $('nav a[href="services.html"]').addClass('active');
    } else if (path.includes('tags.html')) {
        $('nav a[href="tags.html"]').addClass('active');
    } else if (path.includes('blog.html') || path.includes('/blog/')) {
        $('nav a[href="blog.html"]').addClass('active');
    } else if (path.includes('about.html')) {
        $('nav a[href="about.html"]').addClass('active');
    }

    // 扩展功能可以在此添加
}

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 加载服务数据
function loadServices(callback, options = {}) {
    $.getJSON('data/services.json', function (data) {
        let services = data;

        // 应用筛选
        if (options.category && options.category !== 'all') {
            services = services.filter(service => service.category === options.category);
        }

        if (options.search) {
            const searchLower = options.search.toLowerCase();
            services = services.filter(service =>
                service.name.toLowerCase().includes(searchLower) ||
                service.description.toLowerCase().includes(searchLower) ||
                (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }

        if (options.tags && options.tags.length) {
            services = services.filter(service =>
                options.tags.every(tag =>
                    service.tags && service.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
                )
            );
        }

        // 应用排序
        if (options.sort) {
            switch (options.sort) {
                case 'popular':
                    services.sort((a, b) => (b.stars || 0) - (a.stars || 0));
                    break;
                case 'name-asc':
                    services.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    services.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'newest':
                    services.sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0));
                    break;
            }
        }

        callback(services);
    }).fail(function () {
        console.error('Failed to load services data');
        callback([]);
    });
}

// 加载博客文章数据
function loadBlogPosts(callback, options = {}) {
    $.getJSON('data/blog-posts.json', function (data) {
        let posts = data;

        // 应用筛选
        if (options.category && options.category !== 'all') {
            posts = posts.filter(post => post.category === options.category);
        }

        if (options.search) {
            const searchLower = options.search.toLowerCase();
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }

        if (options.tag) {
            posts = posts.filter(post =>
                post.tags && post.tags.map(t => t.toLowerCase()).includes(options.tag.toLowerCase())
            );
        }

        // 应用排序
        if (options.sort === 'oldest') {
            posts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            // 默认按日期降序排序（最新的在前）
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        callback(posts);
    }).fail(function () {
        console.error('Failed to load blog posts data');
        callback([]);
    });
}

// 格式化日期
function formatDate(dateString, locale = 'zh-CN') {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(locale, options);
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 处理标签点击（用于标签页面）
function handleTagClick(tag) {
    // 实现将在tags.js中
} 