/**
 * Selfhost Hub - 标签页面JavaScript
 */

$(document).ready(function () {
    // 加载所有标签
    loadAllTags();

    // 处理URL参数
    const tagsParam = getUrlParameter('tags');
    if (tagsParam) {
        const tags = tagsParam.split(',');
        // 选择这些标签并显示相关服务
        selectTags(tags);
    }

    // 搜索标签
    $('#tag-search').on('input', function () {
        const searchTerm = $(this).val().toLowerCase().trim();
        filterTagCloud(searchTerm);
    });

    // 清除所有选中的标签
    $('#clear-tags').on('click', function () {
        $('.selected-tags').empty();
        updateServicesByTags([]);
        // 移除URL参数
        window.history.replaceState({}, '', 'tags.html');
    });
});

// 加载所有标签
function loadAllTags() {
    // 假设我们需要从服务数据中提取所有标签
    $.getJSON('data/services.json', function (services) {
        // 收集所有标签和它们的计数
        const tagCounts = {};

        services.forEach(service => {
            if (service.tags && service.tags.length > 0) {
                service.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            }
        });

        // 将标签转换为数组并按使用频率排序
        const tags = Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);

        renderTagCloud(tags);
    }).fail(function () {
        console.error('Failed to load service data for tags');
        $('#tag-cloud').html(`<p class="error-message">${translate('tags.errorLoadingTags')}</p>`);
    });
}

// 渲染标签云
function renderTagCloud(tags) {
    const tagCloud = $('#tag-cloud');
    tagCloud.empty();

    if (tags.length === 0) {
        tagCloud.html(`<p class="text-center">${translate('tags.noTagsFound')}</p>`);
        return;
    }

    // 确定标签字体大小范围
    const minCount = Math.min(...tags.map(t => t.count));
    const maxCount = Math.max(...tags.map(t => t.count));
    const minSize = 0.8;   // 最小字体大小系数
    const maxSize = 2.0;   // 最大字体大小系数

    tags.forEach(({ tag, count }) => {
        // 计算字体大小（线性插值）
        let fontSize = minSize;
        if (maxCount > minCount) {
            fontSize = minSize + ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
        }

        const tagElement = $(`
            <span class="cloud-tag" style="font-size: ${fontSize}em;" data-count="${count}">
                ${tag} <small>(${count})</small>
            </span>
        `);

        // 点击标签时添加到选定标签
        tagElement.on('click', function () {
            handleTagClick(tag);
        });

        tagCloud.append(tagElement);
    });
}

// 根据搜索词筛选标签云
function filterTagCloud(searchTerm) {
    if (!searchTerm) {
        $('.cloud-tag').show();
        return;
    }

    $('.cloud-tag').each(function () {
        const tagText = $(this).text().toLowerCase();
        if (tagText.includes(searchTerm)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// 处理标签点击
function handleTagClick(tag) {
    // 检查标签是否已经被选中
    let selectedTags = [];
    let tagExists = false;

    $('.selected-tag span').each(function () {
        const existingTag = $(this).text();
        selectedTags.push(existingTag);

        if (existingTag === tag) {
            tagExists = true;
        }
    });

    // 如果标签不存在，则添加它
    if (!tagExists) {
        const tagElement = $(`
            <div class="selected-tag">
                <span>${tag}</span>
                <button class="remove-tag" data-tag="${tag}">×</button>
            </div>
        `);

        $('.selected-tags').append(tagElement);

        // 添加删除标签事件
        tagElement.find('.remove-tag').on('click', function () {
            $(this).parent().remove();

            // 更新已选标签列表
            selectedTags = [];
            $('.selected-tag span').each(function () {
                selectedTags.push($(this).text());
            });

            // 更新服务显示
            updateServicesByTags(selectedTags);

            // 更新URL参数
            updateUrlParams(selectedTags);
        });

        // 更新选定的标签列表
        selectedTags.push(tag);
    }

    // 更新服务显示
    updateServicesByTags(selectedTags);

    // 更新URL参数
    updateUrlParams(selectedTags);
}

// 选择多个标签（用于URL参数处理）
function selectTags(tags) {
    $('.selected-tags').empty();

    tags.forEach(tag => {
        const tagElement = $(`
            <div class="selected-tag">
                <span>${tag}</span>
                <button class="remove-tag" data-tag="${tag}">×</button>
            </div>
        `);

        $('.selected-tags').append(tagElement);

        // 添加删除标签事件
        tagElement.find('.remove-tag').on('click', function () {
            $(this).parent().remove();

            // 更新已选标签列表
            const selectedTags = [];
            $('.selected-tag span').each(function () {
                selectedTags.push($(this).text());
            });

            // 更新服务显示
            updateServicesByTags(selectedTags);

            // 更新URL参数
            updateUrlParams(selectedTags);
        });
    });

    // 更新服务显示
    updateServicesByTags(tags);
}

// 根据选定的标签更新服务列表
function updateServicesByTags(selectedTags) {
    // 如果没有选定的标签，则显示一条消息
    if (selectedTags.length === 0) {
        $('#tag-services').html(`
            <div class="no-tags-selected">
                <p>${translate('tags.selectTags')}</p>
            </div>
        `);
        return;
    }

    // 显示加载状态
    $('#tag-services').html('<div class="loading-spinner"><div></div><div></div><div></div><div></div></div>');

    // 根据选择的标签加载服务
    loadServices(function (services) {
        renderTagFilteredServices(services);
    }, {
        tags: selectedTags
    });
}

// 渲染按标签筛选的服务
function renderTagFilteredServices(services) {
    const container = $('#tag-services');
    container.empty();

    if (services.length === 0) {
        container.html(`
            <div class="no-results">
                <img src="images/no-results.svg" alt="No results" class="no-results-image">
                <h3>${translate('tags.noServicesFound')}</h3>
                <p>${translate('tags.tryDifferentTags')}</p>
                <button id="clear-tags" class="btn btn-primary">${translate('tags.clearTags')}</button>
            </div>
        `);

        // 重新添加清除标签按钮事件
        $('#clear-tags').on('click', function () {
            $('.selected-tags').empty();
            updateServicesByTags([]);
            // 移除URL参数
            window.history.replaceState({}, '', 'tags.html');
        });

        return;
    }

    // 添加结果计数
    container.append(`
        <div class="results-count">
            ${translate('tags.showing')} ${services.length} ${translate('tags.matchingServices')}
        </div>
    `);

    // 创建服务卡片网格
    const servicesGrid = $('<div class="services-grid"></div>');
    container.append(servicesGrid);

    // 填充服务卡片
    services.forEach(service => {
        // 构建标签HTML，突出显示选定的标签
        let tagsHtml = '';
        if (service.tags && service.tags.length > 0) {
            // 获取当前选定的标签
            const selectedTags = [];
            $('.selected-tag span').each(function () {
                selectedTags.push($(this).text());
            });

            tagsHtml = '<div class="tags">' +
                service.tags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return `<span class="tag${isSelected ? ' highlighted' : ''}">${tag}</span>`;
                }).join('') +
                '</div>';
        }

        const serviceCard = `
            <div class="service-card">
                <div class="service-header">
                    <img src="${service.logo || 'images/service-placeholder.png'}" alt="${service.name}" class="service-logo">
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p>${service.description.substring(0, 120)}${service.description.length > 120 ? '...' : ''}</p>
                    ${tagsHtml}
                </div>
                <div class="service-footer">
                    <a href="service-detail.html?id=${service.id}" class="btn btn-secondary">${translate('tags.learnMore')}</a>
                </div>
            </div>
        `;

        servicesGrid.append(serviceCard);
    });
}

// 更新URL参数
function updateUrlParams(selectedTags) {
    if (selectedTags.length > 0) {
        const tagsParam = selectedTags.join(',');
        window.history.replaceState({}, '', `tags.html?tags=${encodeURIComponent(tagsParam)}`);
    } else {
        window.history.replaceState({}, '', 'tags.html');
    }
} 