/**
 * Selfhost Hub - 共用功能 JavaScript
 * 包含网站通用功能和帮助函数
 */

$(document).ready(function () {
    // 初始化导航菜单
    initNavigation();

    // 初始化语言切换
    initLanguageSwitcher();

    // 初始化主题切换
    initThemeToggle();

    // 初始化搜索框
    initGlobalSearch();

    // 加载页脚内容
    loadFooterContent();

    // 初始化回到顶部按钮
    initBackToTop();

    // 翻译页面内容（根据当前语言）
    translatePage();
});

/**
 * 初始化导航菜单
 */
function initNavigation() {
    // 移动端菜单切换
    $('.menu-toggle').on('click', function () {
        $('.main-nav').toggleClass('active');
        $(this).toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // 关闭菜单（点击外部区域）
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.main-nav').length &&
            !$(e.target).closest('.menu-toggle').length &&
            $('.main-nav').hasClass('active')) {
            $('.main-nav').removeClass('active');
            $('.menu-toggle').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });

    // 下拉菜单处理
    $('.has-dropdown').each(function () {
        const $this = $(this);

        // 移动端点击处理
        $this.find('> a').on('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                $this.toggleClass('active');
                $this.find('.dropdown-menu').slideToggle(200);
            }
        });

        // 桌面端悬停处理
        $this.on('mouseenter', function () {
            if (window.innerWidth >= 992) {
                $this.addClass('active');
            }
        }).on('mouseleave', function () {
            if (window.innerWidth >= 992) {
                $this.removeClass('active');
            }
        });
    });

    // 设置当前页面的导航项为活动状态
    setActiveNavItem();
}

/**
 * 设置当前页面对应的导航项为活动状态
 */
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    // 清除所有活动状态
    $('.nav-item').removeClass('active');

    // 设置当前页面的导航项为活动状态
    $('.nav-item a').each(function () {
        const href = $(this).attr('href');
        if (href === filename ||
            (filename === '' && href === 'index.html') ||
            (href === 'index.html' && filename === 'index.html')) {
            $(this).closest('.nav-item').addClass('active');
        }
    });
}

/**
 * 初始化语言切换功能
 */
function initLanguageSwitcher() {
    // 设置当前语言
    const currentLang = getCurrentLanguage();
    $('.language-switcher .current-lang').text(currentLang.toUpperCase());

    // 语言切换点击事件
    $('.language-option').on('click', function () {
        const lang = $(this).data('lang');

        // 如果选择的不是当前语言，则切换
        if (lang !== currentLang) {
            // 保存语言选择到LocalStorage
            localStorage.setItem('selectedLanguage', lang);

            // 刷新页面应用新语言
            window.location.reload();
        }

        // 关闭语言切换下拉菜单
        $('.language-switcher').removeClass('active');
    });

    // 点击当前语言显示/隐藏下拉菜单
    $('.current-lang-wrapper').on('click', function (e) {
        e.stopPropagation();
        $('.language-switcher').toggleClass('active');
    });

    // 点击页面其他区域关闭语言切换下拉菜单
    $(document).on('click', function () {
        $('.language-switcher').removeClass('active');
    });
}

/**
 * 初始化主题切换
 */
function initThemeToggle() {
    // 从LocalStorage获取保存的主题
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 如果没有保存的主题，则根据系统偏好设置
    if (!savedTheme) {
        setTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
        setTheme(savedTheme);
    }

    // 切换主题按钮点击事件
    $('.theme-toggle').on('click', function () {
        const currentTheme = $('body').hasClass('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * 设置网站主题
 */
function setTheme(theme) {
    if (theme === 'dark') {
        $('body').addClass('dark-theme');
        $('.theme-toggle').html('<i class="fas fa-sun"></i>');
    } else {
        $('body').removeClass('dark-theme');
        $('.theme-toggle').html('<i class="fas fa-moon"></i>');
    }
}

/**
 * 初始化全局搜索
 */
function initGlobalSearch() {
    // 搜索框展开/收起
    $('.search-toggle').on('click', function () {
        $('.global-search-wrapper').toggleClass('active');

        if ($('.global-search-wrapper').hasClass('active')) {
            $('#global-search-input').focus();
        }
    });

    // 搜索提交
    $('#global-search-form').on('submit', function (e) {
        e.preventDefault();

        const searchTerm = $('#global-search-input').val().trim();
        if (searchTerm) {
            performGlobalSearch(searchTerm);
        }
    });

    // 点击外部关闭搜索框
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.global-search-wrapper').length &&
            !$(e.target).closest('.search-toggle').length) {
            $('.global-search-wrapper').removeClass('active');
        }
    });

    // ESC键关闭搜索框
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.global-search-wrapper').removeClass('active');
        }
    });
}

/**
 * 执行全局搜索
 */
function performGlobalSearch(searchTerm) {
    // 跳转到服务页面并传递搜索词
    window.location.href = `services.html?search=${encodeURIComponent(searchTerm)}`;
}

/**
 * 加载页脚内容
 */
function loadFooterContent() {
    // 加载网站配置信息
    $.getJSON('data/config.json')
        .done(function (config) {
            // 更新版权信息
            if (config.site && config.site.copyright) {
                $('.copyright-text').html(config.site.copyright);
            }

            // 更新社交媒体链接
            if (config.social && config.social.length > 0) {
                const socialContainer = $('.footer-social');
                socialContainer.empty();

                config.social.forEach(item => {
                    let iconClass = 'fas fa-link';

                    // 根据平台设置图标
                    switch (item.platform.toLowerCase()) {
                        case 'github':
                            iconClass = 'fab fa-github';
                            break;
                        case 'twitter':
                            iconClass = 'fab fa-twitter';
                            break;
                        case 'facebook':
                            iconClass = 'fab fa-facebook-f';
                            break;
                        case 'linkedin':
                            iconClass = 'fab fa-linkedin-in';
                            break;
                        case 'instagram':
                            iconClass = 'fab fa-instagram';
                            break;
                        case 'youtube':
                            iconClass = 'fab fa-youtube';
                            break;
                        case 'telegram':
                            iconClass = 'fab fa-telegram-plane';
                            break;
                        case 'discord':
                            iconClass = 'fab fa-discord';
                            break;
                    }

                    const socialLink = $(`
                        <a href="${item.url}" target="_blank" class="social-link" title="${item.platform}">
                            <i class="${iconClass}"></i>
                        </a>
                    `);

                    socialContainer.append(socialLink);
                });
            }
        })
        .fail(function () {
            console.error('Failed to load config.json');
        });
}

/**
 * 初始化回到顶部按钮
 */
function initBackToTop() {
    // 创建回到顶部按钮
    $('body').append(`
        <button id="back-to-top" class="back-to-top" title="${translate('common.backToTop') || '回到顶部'}">
            <i class="fas fa-arrow-up"></i>
        </button>
    `);

    // 控制按钮显示/隐藏
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    // 点击回到顶部
    $('#back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });
}

/**
 * 翻译页面内容
 */
function translatePage() {
    // 获取当前语言
    const currentLang = getCurrentLanguage();

    // 仅在页面加载时执行一次翻译
    $('[data-i18n]').each(function () {
        const key = $(this).data('i18n');
        const translated = translate(key);

        // 如果有翻译，则替换内容
        if (translated) {
            $(this).html(translated);
        }
    });

    // 翻译占位符文本
    $('[data-i18n-placeholder]').each(function () {
        const key = $(this).data('i18n-placeholder');
        const translated = translate(key);

        if (translated) {
            $(this).attr('placeholder', translated);
        }
    });
}

// =====================
// 全局帮助函数
// =====================

/**
 * 获取当前语言
 */
function getCurrentLanguage() {
    // 首先检查LocalStorage中是否有保存的语言选择
    const savedLang = localStorage.getItem('selectedLanguage');

    if (savedLang) {
        return savedLang;
    }

    // 如果没有保存的语言，则使用浏览器语言（默认为英文）
    const browserLang = navigator.language || navigator.userLanguage;

    // 目前支持的语言：英文和中文
    if (browserLang.startsWith('zh')) {
        return 'zh';
    }

    return 'en';
}

/**
 * 翻译文本
 */
function translate(key) {
    if (!key) return '';

    const lang = getCurrentLanguage();

    // 获取语言数据
    const langData = window[`lang_${lang}`];

    if (!langData) return '';

    // 使用点号分隔的键来访问嵌套属性
    const keyParts = key.split('.');
    let value = langData;

    for (const part of keyParts) {
        if (value && typeof value === 'object' && part in value) {
            value = value[part];
        } else {
            return ''; // 如果任何部分不存在，返回空字符串
        }
    }

    return typeof value === 'string' ? value : '';
}

/**
 * 获取URL参数
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * 加载博客文章列表
 */
function loadBlogList(callback, errorCallback) {
    $.getJSON('data/blog-list.json')
        .done(function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading blog list:', textStatus, errorThrown);
            if (typeof errorCallback === 'function') {
                errorCallback(textStatus, errorThrown);
            }
        });
}

/**
 * 加载服务列表
 */
function loadServices(callback, options = {}, errorCallback) {
    $.getJSON('data/services-list.json')
        .done(function (data) {
            let filteredServices = data;

            // 应用过滤条件
            if (options.category && options.category !== 'all') {
                filteredServices = filteredServices.filter(service =>
                    service.categories && service.categories.includes(options.category)
                );
            }

            if (options.search) {
                const searchTerm = options.search.toLowerCase();
                filteredServices = filteredServices.filter(service =>
                    service.name.toLowerCase().includes(searchTerm) ||
                    service.description.toLowerCase().includes(searchTerm) ||
                    (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
                );
            }

            if (options.tags && options.tags.length > 0) {
                // 确保服务包含所有指定的标签
                filteredServices = filteredServices.filter(service =>
                    service.tags && options.tags.every(tag =>
                        service.tags.some(serviceTag =>
                            serviceTag.toLowerCase() === tag.toLowerCase()
                        )
                    )
                );
            }

            // 应用排序
            if (options.sort) {
                switch (options.sort) {
                    case 'name':
                        filteredServices.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'newest':
                        filteredServices.sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0));
                        break;
                    case 'popular':
                        filteredServices.sort((a, b) => (b.stars || 0) - (a.stars || 0));
                        break;
                }
            }

            if (typeof callback === 'function') {
                callback(filteredServices);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading services:', textStatus, errorThrown);
            if (typeof errorCallback === 'function') {
                errorCallback(textStatus, errorThrown);
            }
        });
}

/**
 * 初始化分页功能
 */
function initPagination(totalItems, options = {}) {
    const defaults = {
        itemsPerPage: 12,
        currentPage: 1,
        container: '.pagination-container',
        onPageChange: null
    };

    const settings = $.extend({}, defaults, options);
    const totalPages = Math.ceil(totalItems / settings.itemsPerPage);

    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        $(settings.container).empty();
        return;
    }

    // 创建分页DOM
    const paginationContainer = $(settings.container);
    paginationContainer.empty();

    const paginationInner = $('<div class="pagination"></div>');

    // 上一页按钮
    const prevButton = $(`
        <a href="#" class="pagination-link pagination-prev${settings.currentPage <= 1 ? ' disabled' : ''}" 
           data-page="${settings.currentPage - 1}" aria-label="Previous page">
            <i class="fas fa-chevron-left"></i>
        </a>
    `);

    if (settings.currentPage > 1) {
        prevButton.on('click', function (e) {
            e.preventDefault();
            if (typeof settings.onPageChange === 'function') {
                settings.onPageChange(settings.currentPage - 1);
            }
        });
    }

    paginationInner.append(prevButton);

    // 页码按钮
    let startPage = Math.max(1, settings.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // 调整起始页确保显示5个页码按钮
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = $(`
            <a href="#" class="pagination-link${i === settings.currentPage ? ' active' : ''}" 
               data-page="${i}" aria-label="Page ${i}">
                ${i}
            </a>
        `);

        if (i !== settings.currentPage) {
            pageButton.on('click', function (e) {
                e.preventDefault();
                if (typeof settings.onPageChange === 'function') {
                    settings.onPageChange(i);
                }
            });
        }

        paginationInner.append(pageButton);
    }

    // 下一页按钮
    const nextButton = $(`
        <a href="#" class="pagination-link pagination-next${settings.currentPage >= totalPages ? ' disabled' : ''}" 
           data-page="${settings.currentPage + 1}" aria-label="Next page">
            <i class="fas fa-chevron-right"></i>
        </a>
    `);

    if (settings.currentPage < totalPages) {
        nextButton.on('click', function (e) {
            e.preventDefault();
            if (typeof settings.onPageChange === 'function') {
                settings.onPageChange(settings.currentPage + 1);
            }
        });
    }

    paginationInner.append(nextButton);
    paginationContainer.append(paginationInner);
} 