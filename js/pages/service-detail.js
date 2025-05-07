/**
 * Selfhost Hub - 服务详情页面JavaScript
 */

$(document).ready(function () {
    // 获取服务ID
    const serviceId = getUrlParameter('id');

    if (!serviceId) {
        showErrorMessage('未找到服务ID');
        return;
    }

    // 加载服务详情
    loadServiceDetail(serviceId);

    // 评分星星交互
    initRatingStars();

    // 标签页切换
    $('.tab-btn').on('click', function () {
        const tabId = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('active');
        $('#' + tabId).addClass('active');
    });

    // 图片库效果
    $(document).on('click', '.gallery-thumbnail', function () {
        const imageUrl = $(this).attr('src');
        // 替换为高分辨率图像
        const highResImage = imageUrl.replace('-thumb', '');

        $('#main-image').attr('src', highResImage);
        $('.gallery-thumbnail').removeClass('active');
        $(this).addClass('active');
    });
});

// 加载服务详情
function loadServiceDetail(serviceId) {
    $.getJSON('data/services.json', function (data) {
        // 查找指定ID的服务
        const service = data.find(s => s.id.toString() === serviceId);

        if (!service) {
            showErrorMessage('未找到服务信息');
            return;
        }

        // 渲染服务详情
        renderServiceDetail(service);

        // 加载相关服务
        loadRelatedServices(service);

        // 加载Markdown内容
        if (service.contentFile) {
            loadServiceContent(service.contentFile);
        }
    }).fail(function () {
        showErrorMessage('加载服务数据失败');
    });
}

// 渲染服务详情
function renderServiceDetail(service) {
    // 设置页面标题
    document.title = service.name + ' - Selfhost Hub';

    // 渲染基本信息
    $('#service-name').text(service.name);
    $('#service-description').text(service.description);

    // 渲染服务徽标
    if (service.logo) {
        $('#service-logo').attr('src', service.logo).attr('alt', service.name);
    } else {
        $('#service-logo').attr('src', 'images/service-placeholder.png').attr('alt', service.name);
    }

    // 渲染标签
    const tagsContainer = $('#service-tags');
    tagsContainer.empty();

    if (service.tags && service.tags.length > 0) {
        service.tags.forEach(tag => {
            tagsContainer.append(`<span class="tag">${tag}</span>`);
        });
    }

    // 渲染元数据
    const metadataContainer = $('#service-metadata');
    metadataContainer.empty();

    if (service.github) {
        metadataContainer.append(`
            <div class="metadata-item">
                <i class="fab fa-github"></i>
                <a href="${service.github}" target="_blank">${translate('serviceDetail.viewGithub')}</a>
            </div>
        `);
    }

    if (service.website) {
        metadataContainer.append(`
            <div class="metadata-item">
                <i class="fas fa-globe"></i>
                <a href="${service.website}" target="_blank">${translate('serviceDetail.website')}</a>
            </div>
        `);
    }

    if (service.license) {
        metadataContainer.append(`
            <div class="metadata-item">
                <i class="fas fa-certificate"></i>
                <span>${translate('serviceDetail.license')}: ${service.license}</span>
            </div>
        `);
    }

    if (service.stars) {
        metadataContainer.append(`
            <div class="metadata-item">
                <i class="fas fa-star"></i>
                <span>${service.stars} ${translate('serviceDetail.stars')}</span>
            </div>
        `);
    }

    // 渲染操作按钮
    const actionsContainer = $('#service-actions');
    actionsContainer.empty();

    if (service.demo) {
        actionsContainer.append(`
            <a href="${service.demo}" target="_blank" class="btn btn-primary">
                <i class="fas fa-play-circle"></i> ${translate('serviceDetail.liveDemo')}
            </a>
        `);
    }

    if (service.documentation) {
        actionsContainer.append(`
            <a href="${service.documentation}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-book"></i> ${translate('serviceDetail.documentation')}
            </a>
        `);
    }

    // 渲染安装指南（如果有）
    if (service.installation) {
        const installationContainer = $('#installation-guide');
        installationContainer.empty();

        // 对于Docker安装方式
        if (service.installation.docker) {
            installationContainer.append(`
                <div class="installation-section">
                    <h4><i class="fab fa-docker"></i> ${translate('serviceDetail.dockerInstall')}</h4>
                    <pre id="docker-command" class="code-block">${service.installation.docker}</pre>
                    <button class="copy-btn" data-copy="docker-command">
                        <i class="fas fa-copy"></i> <span>${translate('serviceDetail.copy')}</span>
                    </button>
                </div>
            `);
        }

        // 对于docker-compose安装方式
        if (service.installation.compose) {
            installationContainer.append(`
                <div class="installation-section">
                    <h4><i class="fab fa-docker"></i> ${translate('serviceDetail.dockerCompose')}</h4>
                    <pre id="compose-command" class="code-block">${service.installation.compose}</pre>
                    <button class="copy-btn" data-copy="compose-command">
                        <i class="fas fa-copy"></i> <span>${translate('serviceDetail.copy')}</span>
                    </button>
                </div>
            `);
        }

        // 对于其他安装方式
        if (service.installation.other) {
            installationContainer.append(`
                <div class="installation-section">
                    <h4><i class="fas fa-code"></i> ${translate('serviceDetail.otherMethods')}</h4>
                    <pre id="other-command" class="code-block">${service.installation.other}</pre>
                    <button class="copy-btn" data-copy="other-command">
                        <i class="fas fa-copy"></i> <span>${translate('serviceDetail.copy')}</span>
                    </button>
                </div>
            `);
        }
    }

    // 渲染图片库
    if (service.screenshots && service.screenshots.length > 0) {
        const galleryContainer = $('#screenshot-gallery');
        galleryContainer.empty();

        // 主图片
        galleryContainer.append(`
            <div class="main-image-container">
                <img id="main-image" src="${service.screenshots[0]}" alt="${service.name} screenshot">
            </div>
        `);

        // 缩略图
        const thumbnailsContainer = $('<div class="gallery-thumbnails"></div>');
        galleryContainer.append(thumbnailsContainer);

        service.screenshots.forEach((screenshot, index) => {
            const thumbnailClass = index === 0 ? 'gallery-thumbnail active' : 'gallery-thumbnail';
            // 生成缩略图URL（实际项目中应有缩略图版本）
            const thumbnailUrl = screenshot.replace('.jpg', '-thumb.jpg').replace('.png', '-thumb.png');

            thumbnailsContainer.append(`
                <img src="${thumbnailUrl}" alt="Thumbnail ${index + 1}" class="${thumbnailClass}">
            `);
        });
    }
}

// 加载服务的Markdown内容
function loadServiceContent(contentFile) {
    $.get('data/content/' + contentFile, function (markdown) {
        // 使用一个Markdown解析库（如marked.js）来渲染内容
        // 注意：需要引入marked.js库
        if (typeof marked !== 'undefined') {
            $('#service-content').html(marked(markdown));
        } else {
            // 简单的后备方案，如果没有marked库
            $('#service-content').html('<pre>' + markdown + '</pre>');
        }
    }).fail(function () {
        $('#service-content').html(`<p class="error-message">${translate('serviceDetail.contentError')}</p>`);
    });
}

// 加载相关服务
function loadRelatedServices(currentService) {
    loadServices(function (services) {
        // 移除当前服务
        services = services.filter(s => s.id !== currentService.id);

        // 查找具有相同标签的服务
        let relatedServices = [];

        if (currentService.tags && currentService.tags.length > 0) {
            services.forEach(service => {
                if (service.tags) {
                    // 计算标签匹配的数量
                    const matchingTags = service.tags.filter(tag =>
                        currentService.tags.includes(tag)
                    ).length;

                    if (matchingTags > 0) {
                        // 添加匹配程度作为排序依据
                        relatedServices.push({
                            ...service,
                            matchingScore: matchingTags
                        });
                    }
                }
            });

            // 按匹配程度排序
            relatedServices.sort((a, b) => b.matchingScore - a.matchingScore);
        }

        // 如果相关服务不足，则添加其他热门服务
        if (relatedServices.length < 3) {
            const remainingNeeded = 3 - relatedServices.length;

            // 查找当前不在relatedServices中的热门服务
            const popularServices = services
                .filter(s => !relatedServices.some(r => r.id === s.id))
                .sort((a, b) => (b.stars || 0) - (a.stars || 0))
                .slice(0, remainingNeeded);

            relatedServices = [...relatedServices, ...popularServices];
        }

        // 显示最多3个相关服务
        renderRelatedServices(relatedServices.slice(0, 3));
    });
}

// 渲染相关服务
function renderRelatedServices(services) {
    const container = $('#related-services');
    container.empty();

    if (services.length === 0) {
        container.html(`<p class="text-center">${translate('serviceDetail.noRelatedServices')}</p>`);
        return;
    }

    services.forEach(service => {
        const serviceCard = `
            <div class="related-service-card">
                <img src="${service.logo || 'images/service-placeholder.png'}" alt="${service.name}" class="related-service-logo">
                <div class="related-service-info">
                    <h4>${service.name}</h4>
                    <p>${service.description.substring(0, 80)}${service.description.length > 80 ? '...' : ''}</p>
                    <a href="service-detail.html?id=${service.id}" class="btn btn-text">${translate('serviceDetail.viewService')} →</a>
                </div>
            </div>
        `;

        container.append(serviceCard);
    });
}

// 初始化评分星星
function initRatingStars() {
    $('.rating-star').on('click', function () {
        const rating = $(this).data('rating');
        setRating(rating);
    });

    $('.rating-star').on('mouseover', function () {
        const rating = $(this).data('rating');
        highlightStars(rating);
    });

    $('.rating-container').on('mouseleave', function () {
        const currentRating = $('.rating-container').data('current-rating') || 0;
        highlightStars(currentRating);
    });
}

// 设置评分
function setRating(rating) {
    $('.rating-container').data('current-rating', rating);
    highlightStars(rating);

    // 实际项目中，这里应该发送评分到后端
    console.log('Rating set to:', rating);

    // 显示感谢消息
    $('#rating-message').text(translate('serviceDetail.thankYouRating')).fadeIn(300);

    setTimeout(() => {
        $('#rating-message').fadeOut(300);
    }, 3000);
}

// 高亮星星
function highlightStars(rating) {
    $('.rating-star').each(function () {
        const starRating = $(this).data('rating');
        if (starRating <= rating) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}

// 显示错误消息
function showErrorMessage(message) {
    const container = $('#service-detail-container');
    container.html(`
        <div class="error-container">
            <img src="images/error.svg" alt="Error" class="error-image">
            <h2>${translate('serviceDetail.error')}</h2>
            <p>${message}</p>
            <a href="services.html" class="btn btn-primary">${translate('serviceDetail.backToServices')}</a>
        </div>
    `);
} 