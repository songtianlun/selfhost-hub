/**
 * Selfhost Hub - 服务页面 JavaScript
 * 处理服务列表页面的功能
 */

$(document).ready(function () {
    // 获取URL参数
    const urlCategory = getUrlParameter('category');
    const urlSearch = getUrlParameter('search');
    const urlSort = getUrlParameter('sort') || 'popular';

    // 设置初始筛选值
    if (urlCategory) {
        $('#category-filter').val(urlCategory);
    }

    if (urlSearch) {
        $('#services-search').val(urlSearch);
    }

    if (urlSort) {
        $('#sort-filter').val(urlSort);
    }

    // 初始化筛选和排序
    initFilterAndSort();

    // 加载热门标签
    loadPopularTags();

    // 显示所有标签按钮
    $('#show-all-tags').on('click', function () {
        $(this).hide();
        loadAllTags();
    });

    // 加载服务数据
    loadServicesData({
        category: urlCategory,
        search: urlSearch,
        sort: urlSort
    });

    // 服务搜索
    $('#services-search-btn').on('click', function () {
        const searchTerm = $('#services-search').val().trim();
        if (searchTerm !== '') {
            loadServicesData({
                category: $('#category-filter').val(),
                search: searchTerm,
                sort: $('#sort-filter').val()
            });
        }
    });

    $('#services-search').on('keypress', function (e) {
        if (e.which === 13) {
            const searchTerm = $(this).val().trim();
            if (searchTerm !== '') {
                loadServicesData({
                    category: $('#category-filter').val(),
                    search: searchTerm,
                    sort: $('#sort-filter').val()
                });
            }
        }
    });
});

/**
 * 初始化筛选和排序功能
 */
function initFilterAndSort() {
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
    $('#category-filter, #sort-filter').on('change', function () {
        loadServicesData({
            category: $('#category-filter').val(),
            search: $('#services-search').val().trim(),
            sort: $('#sort-filter').val()
        });
    });
}

/**
 * 加载热门标签
 */
function loadPopularTags() {
    $.getJSON('data/tags.json', function (tags) {
        // 按count属性排序，取前N个
        tags.sort((a, b) => (b.count || 0) - (a.count || 0));
        const popularTags = tags.slice(0, 10);

        const container = $('#popular-tags');
        container.empty();

        popularTags.forEach(tag => {
            const tagElement = `<a href="tags.html?tags=${encodeURIComponent(tag.name)}" class="tag">${tag.name}</a>`;
            container.append(tagElement);
        });
    });
}

/**
 * 加载所有标签
 */
function loadAllTags() {
    $.getJSON('data/tags.json', function (tags) {
        const container = $('#popular-tags');
        container.empty();

        // 按名称排序
        tags.sort((a, b) => a.name.localeCompare(b.name));

        tags.forEach(tag => {
            const tagElement = `<a href="tags.html?tags=${encodeURIComponent(tag.name)}" class="tag">${tag.name}</a>`;
            container.append(tagElement);
        });
    });
}

/**
 * 加载服务数据
 */
function loadServicesData(options = {}) {
    // 显示加载中
    $('#services-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="services.loading">正在加载服务...</span>
        </div>
    `);

    // 更新URL参数
    updateUrlParams(options);

    // 加载服务数据
    loadServices(function (services) {
        renderServices(services);
    }, options);
}

/**
 * 更新URL参数
 */
function updateUrlParams(options) {
    const url = new URL(window.location);

    // 清除现有参数
    url.searchParams.delete('category');
    url.searchParams.delete('search');
    url.searchParams.delete('sort');

    // 添加新参数
    if (options.category && options.category !== 'all') {
        url.searchParams.set('category', options.category);
    }

    if (options.search) {
        url.searchParams.set('search', options.search);
    }

    if (options.sort && options.sort !== 'popular') {
        url.searchParams.set('sort', options.sort);
    }

    // 更新URL（不刷新页面）
    window.history.replaceState({}, '', url);
}

/**
 * 渲染服务列表
 */
function renderServices(services) {
    const container = $('#services-container');
    container.empty();

    // 检查是否有服务
    if (services.length === 0) {
        container.html(`
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${translate('services.noResults') || '未找到匹配的服务'}</h3>
                <p>${translate('services.tryAgain') || '请尝试使用不同的搜索词或筛选条件'}</p>
            </div>
        `);
        return;
    }

    // 获取服务卡片模板
    const template = document.getElementById('service-card-template');

    // 渲染每个服务卡片
    services.forEach(service => {
        const cardElement = $(template.content.cloneNode(true));

        // 设置图片
        if (service.logo) {
            cardElement.find('.service-image img').attr('src', service.logo).attr('alt', service.name);
        } else {
            cardElement.find('.service-image').html(`
                <div class="service-placeholder-image">
                    <i class="fas fa-server"></i>
                </div>
            `);
        }

        // 设置标题和描述
        cardElement.find('.service-title').text(service.name);
        cardElement.find('.service-description').text(service.description);

        // 设置标签
        const tagsContainer = cardElement.find('.service-tags');
        if (service.tags && service.tags.length > 0) {
            service.tags.slice(0, 3).forEach(tag => {
                tagsContainer.append(`<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`);
            });

            if (service.tags.length > 3) {
                tagsContainer.append(`<span class="more-tags">+${service.tags.length - 3}</span>`);
            }
        }

        // 设置星标和链接
        cardElement.find('.stars-count').text(service.stars || 0);
        cardElement.find('.service-link').attr('href', `service-detail.html?id=${service.id}`);

        // 添加到容器
        container.append(cardElement);
    });

    // 初始化分页
    initPagination(services.length);
} 