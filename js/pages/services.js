/**
 * Selfhost Hub - 服务列表页面JavaScript
 */

$(document).ready(function () {
    // 初始化筛选和排序选项
    initFilterAndSort();

    // 处理URL参数
    const searchQuery = getUrlParameter('search');
    const category = getUrlParameter('category');
    const tags = getUrlParameter('tags') ? getUrlParameter('tags').split(',') : [];

    // 如果有搜索查询，则将其显示在搜索框中
    if (searchQuery) {
        $('#search-input').val(searchQuery);
    }

    // 如果有分类参数，则选择相应的分类
    if (category) {
        $('#category-filter').val(category);
    }

    // 初始化标签筛选器
    if (tags.length > 0) {
        initTagFilter(tags);
    }

    // 加载服务数据
    loadServicesData();

    // 搜索按钮点击事件
    $('#search-button').on('click', function () {
        loadServicesData();
    });

    // 回车键搜索
    $('#search-input').on('keypress', function (e) {
        if (e.which === 13) {
            loadServicesData();
        }
    });

    // 分类筛选变化事件
    $('#category-filter').on('change', function () {
        loadServicesData();
    });

    // 排序选项变化事件
    $('#sort-options').on('change', function () {
        loadServicesData();
    });

    // 清除筛选器按钮
    $('#clear-filters').on('click', function () {
        $('#search-input').val('');
        $('#category-filter').val('all');
        $('#sort-options').val('popular');
        $('.selected-tags').empty();
        loadServicesData();
    });
});

// 初始化筛选和排序选项
function initFilterAndSort() {
    // 加载分类选项
    $.getJSON('data/categories.json', function (data) {
        const categoryFilter = $('#category-filter');
        categoryFilter.empty();

        // 添加"全部"选项
        categoryFilter.append(`<option value="all">${translate('services.filters.allCategories')}</option>`);

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
    sortOptions.append(`<option value="popular">${translate('services.filters.popular')}</option>`);
    sortOptions.append(`<option value="name-asc">${translate('services.filters.nameAsc')}</option>`);
    sortOptions.append(`<option value="name-desc">${translate('services.filters.nameDesc')}</option>`);
    sortOptions.append(`<option value="newest">${translate('services.filters.newest')}</option>`);
}

// 初始化标签筛选器
function initTagFilter(selectedTags) {
    const tagContainer = $('.selected-tags');
    tagContainer.empty();

    selectedTags.forEach(tag => {
        const tagElement = $(`
            <div class="selected-tag">
                <span>${tag}</span>
                <button class="remove-tag" data-tag="${tag}">×</button>
            </div>
        `);

        tagContainer.append(tagElement);
    });

    // 添加删除标签事件
    $('.remove-tag').on('click', function () {
        const tagToRemove = $(this).data('tag');
        $(this).parent().remove();
        loadServicesData();
    });
}

// 加载服务数据
function loadServicesData() {
    // 获取筛选参数
    const searchQuery = $('#search-input').val().trim();
    const category = $('#category-filter').val();
    const sortOption = $('#sort-options').val();
    const selectedTags = [];

    // 获取已选择的标签
    $('.selected-tag').each(function () {
        selectedTags.push($(this).find('span').text());
    });

    // 显示加载状态
    const servicesContainer = $('#services-container');
    servicesContainer.html('<div class="loading-spinner"><div></div><div></div><div></div><div></div></div>');

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

    if (selectedTags.length > 0) {
        params.set('tags', selectedTags.join(','));
    } else {
        params.delete('tags');
    }

    window.history.replaceState({}, '', `${url.pathname}?${params}`);

    // 加载服务
    loadServices(function (services) {
        renderServices(services);
    }, {
        search: searchQuery,
        category: category,
        tags: selectedTags,
        sort: sortOption
    });
}

// 渲染服务列表
function renderServices(services) {
    const servicesContainer = $('#services-container');
    servicesContainer.empty();

    if (services.length === 0) {
        servicesContainer.html(`
            <div class="no-results">
                <img src="images/no-results.svg" alt="No results" class="no-results-image">
                <h3>${translate('services.noResults')}</h3>
                <p>${translate('services.tryDifferent')}</p>
                <button id="clear-filters" class="btn btn-primary">${translate('services.clearFilters')}</button>
            </div>
        `);

        // 重新添加清除筛选器按钮事件
        $('#clear-filters').on('click', function () {
            $('#search-input').val('');
            $('#category-filter').val('all');
            $('#sort-options').val('popular');
            $('.selected-tags').empty();
            loadServicesData();
        });

        return;
    }

    // 添加结果计数
    servicesContainer.append(`
        <div class="results-count">
            ${translate('services.showing')} ${services.length} ${translate('services.results')}
        </div>
    `);

    // 创建服务卡片网格
    const servicesGrid = $('<div class="services-grid"></div>');
    servicesContainer.append(servicesGrid);

    // 填充服务卡片
    services.forEach(service => {
        // 构建标签HTML
        let tagsHtml = '';
        if (service.tags && service.tags.length > 0) {
            tagsHtml = '<div class="tags">' +
                service.tags.slice(0, 3).map(tag =>
                    `<span class="tag">${tag}</span>`
                ).join('') +
                (service.tags.length > 3 ? `<span class="more-tags">+${service.tags.length - 3}</span>` : '') +
                '</div>';
        }

        // 添加星星显示
        let starsHtml = '';
        if (service.stars) {
            starsHtml = `<div class="stars"><i class="fas fa-star"></i> ${service.stars}</div>`;
        }

        const serviceCard = `
            <div class="service-card">
                <div class="service-header">
                    <img src="${service.logo || 'images/service-placeholder.png'}" alt="${service.name}" class="service-logo">
                    ${starsHtml}
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p>${service.description.substring(0, 120)}${service.description.length > 120 ? '...' : ''}</p>
                    ${tagsHtml}
                </div>
                <div class="service-footer">
                    <a href="service-detail.html?id=${service.id}" class="btn btn-secondary">${translate('services.learnMore')}</a>
                    ${service.demo ? `<a href="${service.demo}" target="_blank" class="btn btn-outlined">${translate('services.demo')}</a>` : ''}
                </div>
            </div>
        `;

        servicesGrid.append(serviceCard);
    });

    // 处理"更多标签"点击事件
    $('.more-tags').on('click', function (e) {
        e.stopPropagation();
        const card = $(this).closest('.service-card');
        const serviceId = card.find('a').attr('href').split('=')[1];

        // 您可以在这里实现一个模态框来显示所有标签
        // 或者直接将用户导航到服务详细信息页面
        window.location.href = 'service-detail.html?id=' + serviceId;
    });

    // 处理标签点击事件
    $('.tag').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const tagText = $(this).text().trim();
        const tagExists = false;

        // 检查标签是否已存在
        $('.selected-tag span').each(function () {
            if ($(this).text() === tagText) {
                tagExists = true;
                return false;
            }
        });

        // 如果标签不存在，则添加它
        if (!tagExists) {
            const tagElement = $(`
                <div class="selected-tag">
                    <span>${tagText}</span>
                    <button class="remove-tag" data-tag="${tagText}">×</button>
                </div>
            `);

            $('.selected-tags').append(tagElement);

            // 添加删除标签事件
            tagElement.find('.remove-tag').on('click', function () {
                $(this).parent().remove();
                loadServicesData();
            });

            // 重新加载服务数据
            loadServicesData();
        }
    });
} 