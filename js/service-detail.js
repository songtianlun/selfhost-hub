/**
 * Selfhost Hub - 服务详情页面 JavaScript
 * 处理单个服务详情页面的功能
 */

$(document).ready(function () {
    // 获取服务ID
    const serviceId = getUrlParameter('id');

    if (!serviceId) {
        showError('未指定服务ID');
        return;
    }

    // 加载服务详情
    loadServiceDetail(serviceId);

    // 初始化相关服务区域
    initRelatedServices();
});

/**
 * 加载服务详情信息
 */
function loadServiceDetail(serviceId) {
    // 显示加载中
    $('.service-detail-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="serviceDetail.loading">正在加载服务详情...</span>
        </div>
    `);

    // 加载服务数据
    $.getJSON('data/services/' + serviceId + '.json')
        .done(function (service) {
            renderServiceDetail(service);
            // 更新页面标题
            document.title = service.name + ' - Selfhost Hub';
            // 加载服务Markdown内容
            loadServiceContent(serviceId);
            // 加载相关服务
            loadRelatedServices(service);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading service details:', textStatus, errorThrown);
            showError('无法加载服务详情');
        });
}

/**
 * 渲染服务详情基本信息
 */
function renderServiceDetail(service) {
    const container = $('.service-detail-container');

    // 清空加载中提示
    container.empty();

    // 添加服务基本信息
    const serviceHeader = $(`
        <div class="service-header">
            <div class="service-logo">
                ${service.logo ?
            `<img src="${service.logo}" alt="${service.name}" class="service-logo-img">` :
            `<div class="service-placeholder-logo"><i class="fas fa-server"></i></div>`
        }
            </div>
            <div class="service-info">
                <h1 class="service-title">${service.name}</h1>
                <p class="service-description">${service.description}</p>
                <div class="service-meta">
                    <span class="service-stars"><i class="fas fa-star"></i> <span class="stars-count">${service.stars || 0}</span></span>
                    ${service.version ? `<span class="service-version"><i class="fas fa-code-branch"></i> ${service.version}</span>` : ''}
                    ${service.dockerPulls ? `<span class="service-downloads"><i class="fab fa-docker"></i> ${formatNumber(service.dockerPulls)} ${translate('serviceDetail.pulls') || '次拉取'}</span>` : ''}
                </div>
            </div>
        </div>
    `);

    container.append(serviceHeader);

    // 添加标签
    if (service.tags && service.tags.length > 0) {
        const tagsSection = $('<div class="service-tags-section"></div>');
        const tagsContainer = $('<div class="service-tags"></div>');

        service.tags.forEach(tag => {
            tagsContainer.append(`<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`);
        });

        tagsSection.append(tagsContainer);
        container.append(tagsSection);
    }

    // 添加服务链接按钮
    if (service.website || service.github || service.demo) {
        const linksContainer = $('<div class="service-links-container"></div>');

        if (service.website) {
            linksContainer.append(`<a href="${service.website}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> ${translate('serviceDetail.visitWebsite') || '访问官网'}</a>`);
        }

        if (service.github) {
            linksContainer.append(`<a href="${service.github}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> ${translate('serviceDetail.viewOnGithub') || '查看 GitHub'}</a>`);
        }

        if (service.demo) {
            linksContainer.append(`<a href="${service.demo}" target="_blank" class="btn btn-outline"><i class="fas fa-play-circle"></i> ${translate('serviceDetail.tryDemo') || '体验演示'}</a>`);
        }

        container.append(linksContainer);
    }

    // 添加内容容器
    container.append('<div class="service-content-container"></div>');
}

/**
 * 加载服务Markdown内容
 */
function loadServiceContent(serviceId) {
    const contentContainer = $('.service-content-container');

    // 显示加载中
    contentContainer.html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="serviceDetail.loadingContent">正在加载内容...</span>
        </div>
    `);

    // 根据当前语言确定需要加载的内容
    const currentLang = getCurrentLanguage();
    const contentPath = `data/services/content/${serviceId}_${currentLang}.md`;
    const fallbackPath = `data/services/content/${serviceId}_en.md`; // 英文作为备选

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
                            <p data-i18n="serviceDetail.contentNotFound">未找到服务详细内容</p>
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

    // 创建内容结构
    const contentSection = $(`
        <div class="service-content">
            <div class="content-header">
                <h2 data-i18n="serviceDetail.detailedInfo">详细信息</h2>
            </div>
            <div class="markdown-content"></div>
        </div>
    `);

    // 添加内容
    contentSection.find('.markdown-content').html(html);

    // 清空并填充容器
    container.empty().append(contentSection);

    // 处理内容中的图片，添加lightbox功能
    initContentImages();

    // 初始化语法高亮
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

/**
 * 加载相关服务
 */
function loadRelatedServices(currentService) {
    if (!currentService.tags || currentService.tags.length === 0) {
        // 如果没有标签，隐藏相关服务区域
        $('.related-services-section').hide();
        return;
    }

    // 基于当前服务的标签找相关服务
    loadServices(function (services) {
        // 排除当前服务
        const relatedServices = services.filter(service =>
            service.id !== currentService.id &&
            service.tags &&
            service.tags.some(tag => currentService.tags.includes(tag))
        );

        // 最多显示4个相关服务
        const servicesToShow = relatedServices.slice(0, 4);

        renderRelatedServices(servicesToShow);
    });
}

/**
 * 初始化相关服务区域
 */
function initRelatedServices() {
    // 添加相关服务区域
    $('.service-detail-container').append(`
        <div class="related-services-section">
            <h2 data-i18n="serviceDetail.relatedServices">相关服务</h2>
            <div class="related-services-container">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span data-i18n="serviceDetail.loadingRelated">正在加载相关服务...</span>
                </div>
            </div>
        </div>
    `);
}

/**
 * 渲染相关服务
 */
function renderRelatedServices(services) {
    const container = $('.related-services-container');

    // 检查是否有相关服务
    if (!services || services.length === 0) {
        $('.related-services-section').hide();
        return;
    }

    // 清空容器
    container.empty();

    // 添加服务卡片
    services.forEach(service => {
        const serviceCard = $(`
            <div class="related-service-card">
                <div class="related-service-image">
                    ${service.logo ?
                `<img src="${service.logo}" alt="${service.name}">` :
                `<div class="service-placeholder-image"><i class="fas fa-server"></i></div>`
            }
                </div>
                <div class="related-service-info">
                    <h3 class="related-service-title">${service.name}</h3>
                    <p class="related-service-description">${truncateText(service.description, 80)}</p>
                </div>
                <a href="service-detail.html?id=${service.id}" class="related-service-link" aria-label="${service.name}"></a>
            </div>
        `);

        container.append(serviceCard);
    });
}

/**
 * 处理内容中的图片
 */
function initContentImages() {
    $('.markdown-content img').each(function () {
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
    $('.service-detail-container').html(`
        <div class="error-container">
            <div class="error-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <h2 class="error-title" data-i18n="serviceDetail.errorTitle">出错了</h2>
            <p class="error-message">${message}</p>
            <a href="services.html" class="btn btn-primary" data-i18n="serviceDetail.backToServices">返回服务列表</a>
        </div>
    `);
}

/**
 * 文本截断函数
 */
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * 数字格式化函数
 */
function formatNumber(num) {
    if (!num) return '0';

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }

    return num.toString();
} 