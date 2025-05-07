/**
 * Selfhost Hub - 标签页面 JavaScript
 * 处理标签页面的功能
 */

$(document).ready(function () {
    // 获取URL参数中的标签
    const urlTags = getUrlParameter('tags');

    // 如果有具体标签参数，显示该标签的内容，否则显示所有标签
    if (urlTags) {
        // 将标签按逗号分隔成数组
        const tagsArray = urlTags.split(',').map(tag => tag.trim());
        showTagResults(tagsArray);
    } else {
        showAllTags();
    }
});

/**
 * 显示所有标签
 */
function showAllTags() {
    // 更新页面标题
    $('.tags-header h1').text(translate('tags.allTags') || '所有标签');

    // 显示加载中
    $('#tags-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="tags.loading">正在加载标签...</span>
        </div>
    `);

    // 加载标签数据
    $.getJSON('data/tags.json')
        .done(function (tags) {
            renderAllTags(tags);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading tags:', textStatus, errorThrown);
            $('#tags-container').html(`
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p data-i18n="tags.loadError">无法加载标签列表</p>
                </div>
            `);
        });
}

/**
 * 渲染所有标签
 */
function renderAllTags(tags) {
    const container = $('#tags-container');
    container.empty();

    // 如果没有标签
    if (!tags || tags.length === 0) {
        container.html(`
            <div class="no-results">
                <i class="fas fa-tags"></i>
                <h3 data-i18n="tags.noTags">暂无标签</h3>
            </div>
        `);
        return;
    }

    // 按标签名称排序
    tags.sort((a, b) => a.name.localeCompare(b.name));

    // 创建字母索引
    const alphabet = createAlphabetIndex(tags);
    container.append(alphabet);

    // 创建标签列表
    const tagsListContainer = $('<div class="tags-list-container"></div>');
    container.append(tagsListContainer);

    // 按字母分组显示标签
    let currentLetter = '';
    let currentGroup = null;

    tags.forEach(tag => {
        const firstLetter = tag.name.charAt(0).toUpperCase();

        // 如果是新的字母分组，创建新的组
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;

            // 创建字母标题和新分组
            const letterHeader = $(`<h2 class="letter-header" id="letter-${currentLetter}">${currentLetter}</h2>`);
            const letterGroup = $('<div class="tags-group"></div>');

            tagsListContainer.append(letterHeader);
            tagsListContainer.append(letterGroup);

            currentGroup = letterGroup;
        }

        // 创建标签项
        const tagItem = $(`
            <a href="tags.html?tags=${encodeURIComponent(tag.name)}" class="tag-item">
                <span class="tag-name">${tag.name}</span>
                <span class="tag-count">${tag.count || 0}</span>
            </a>
        `);

        currentGroup.append(tagItem);
    });
}

/**
 * 创建字母索引
 */
function createAlphabetIndex(tags) {
    const container = $('<div class="alphabet-index"></div>');

    // 获取所有标签的首字母
    const firstLetters = [...new Set(tags.map(tag => tag.name.charAt(0).toUpperCase()))];
    firstLetters.sort();

    // 创建全部字母的索引（但只有存在的字母可点击）
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const exists = firstLetters.includes(letter);

        const letterLink = $(`
            <a href="#letter-${letter}" class="alphabet-letter${exists ? '' : ' disabled'}">
                ${letter}
            </a>
        `);

        // 如果该字母没有对应的标签，禁用链接
        if (!exists) {
            letterLink.on('click', function (e) {
                e.preventDefault();
            });
        }

        container.append(letterLink);
    }

    return container;
}

/**
 * 显示特定标签的结果
 */
function showTagResults(tagsArray) {
    // 更新页面标题
    if (tagsArray.length === 1) {
        $('.tags-header h1').text(tagsArray[0]);
    } else {
        $('.tags-header h1').text(translate('tags.multipleTagsResults') || '标签筛选结果');
    }

    // 显示加载中
    $('#tags-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="tags.loadingResults">正在加载相关内容...</span>
        </div>
    `);

    // 显示选中的标签
    renderSelectedTags(tagsArray);

    // 加载服务和博客文章
    Promise.all([
        loadTaggedServices(tagsArray),
        loadTaggedBlogPosts(tagsArray)
    ]).then(([services, posts]) => {
        renderTagResults(services, posts);
    }).catch(error => {
        console.error('Error loading tag results:', error);
        $('#tags-container').html(`
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p data-i18n="tags.resultsLoadError">无法加载标签筛选结果</p>
            </div>
        `);
    });
}

/**
 * 渲染选中的标签
 */
function renderSelectedTags(tagsArray) {
    // 创建选中标签展示区域
    const selectedTagsContainer = $('<div class="selected-tags"></div>');
    const tagsList = $('<div class="selected-tags-list"></div>');

    // 添加标签标题
    selectedTagsContainer.append(`<h3 data-i18n="tags.selectedTags">已选标签:</h3>`);

    // 添加每个标签
    tagsArray.forEach(tag => {
        const tagItem = $(`
            <div class="selected-tag">
                <span class="tag-name">${tag}</span>
                <button class="remove-tag" data-tag="${tag}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `);

        tagsList.append(tagItem);
    });

    // 添加清除所有按钮
    const clearAllButton = $(`
        <button class="clear-tags-btn">
            <i class="fas fa-trash-alt"></i>
            <span data-i18n="tags.clearAll">清除所有</span>
        </button>
    `);

    selectedTagsContainer.append(tagsList);
    selectedTagsContainer.append(clearAllButton);

    // 插入到主容器前面
    $('#tags-container').before(selectedTagsContainer);

    // 绑定标签移除事件
    $('.remove-tag').on('click', function () {
        const tagToRemove = $(this).data('tag');
        const newTagsArray = tagsArray.filter(tag => tag !== tagToRemove);

        if (newTagsArray.length === 0) {
            // 如果移除后没有标签了，回到所有标签页面
            window.location.href = 'tags.html';
        } else {
            // 否则更新URL并重新加载
            const newTagsParam = newTagsArray.join(',');
            window.location.href = `tags.html?tags=${encodeURIComponent(newTagsParam)}`;
        }
    });

    // 绑定清除所有事件
    $('.clear-tags-btn').on('click', function () {
        window.location.href = 'tags.html';
    });
}

/**
 * 加载包含特定标签的服务
 */
function loadTaggedServices(tagsArray) {
    return new Promise((resolve, reject) => {
        loadServices(function (services) {
            // 过滤包含所有指定标签的服务
            const filteredServices = services.filter(service =>
                service.tags && tagsArray.every(tag =>
                    service.tags.some(serviceTag =>
                        serviceTag.toLowerCase() === tag.toLowerCase()
                    )
                )
            );

            resolve(filteredServices);
        }, {}, reject);
    });
}

/**
 * 加载包含特定标签的博客文章
 */
function loadTaggedBlogPosts(tagsArray) {
    return new Promise((resolve, reject) => {
        loadBlogList(function (posts) {
            // 过滤包含所有指定标签的文章
            const filteredPosts = posts.filter(post =>
                post.tags && tagsArray.every(tag =>
                    post.tags.some(postTag =>
                        postTag.toLowerCase() === tag.toLowerCase()
                    )
                )
            );

            resolve(filteredPosts);
        }, reject);
    });
}

/**
 * 渲染标签筛选结果
 */
function renderTagResults(services, posts) {
    const container = $('#tags-container');
    container.empty();

    // 如果没有结果
    if (services.length === 0 && posts.length === 0) {
        container.html(`
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3 data-i18n="tags.noResults">未找到匹配的内容</h3>
                <p data-i18n="tags.tryOtherTags">请尝试使用其他标签</p>
            </div>
        `);
        return;
    }

    // 添加服务结果
    if (services.length > 0) {
        const servicesSection = $(`
            <div class="tag-results-section">
                <h2 data-i18n="tags.services">服务 (${services.length})</h2>
                <div class="services-results"></div>
            </div>
        `);

        const servicesContainer = servicesSection.find('.services-results');

        services.forEach(service => {
            const serviceCard = $(`
                <div class="service-card">
                    <div class="service-image">
                        ${service.logo ?
                    `<img src="${service.logo}" alt="${service.name}">` :
                    `<div class="service-placeholder-image"><i class="fas fa-server"></i></div>`
                }
                    </div>
                    <div class="service-content">
                        <h3 class="service-title">${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="service-tags">
                            ${service.tags && service.tags.length > 0 ?
                    service.tags.slice(0, 3).map(tag =>
                        `<a href="tags.html?tags=${encodeURIComponent(tag)}" class="tag">${tag}</a>`
                    ).join('') : ''
                }
                            ${service.tags && service.tags.length > 3 ?
                    `<span class="more-tags">+${service.tags.length - 3}</span>` : ''
                }
                        </div>
                    </div>
                    <a href="service-detail.html?id=${service.id}" class="service-link" aria-label="${service.name}"></a>
                </div>
            `);

            servicesContainer.append(serviceCard);
        });

        container.append(servicesSection);
    }

    // 添加博客文章结果
    if (posts.length > 0) {
        const postsSection = $(`
            <div class="tag-results-section">
                <h2 data-i18n="tags.blogPosts">博客文章 (${posts.length})</h2>
                <div class="posts-results"></div>
            </div>
        `);

        const postsContainer = postsSection.find('.posts-results');

        // 按日期排序（最新的在前）
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        posts.forEach(post => {
            const postCard = $(`
                <div class="post-card">
                    <div class="post-image">
                        ${post.coverImage ?
                    `<img src="${post.coverImage}" alt="${post.title}">` :
                    `<div class="post-placeholder-image"><i class="fas fa-file-alt"></i></div>`
                }
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">${post.title}</h3>
                        <div class="post-meta">
                            <span class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</span>
                            ${post.author ? `<span class="post-author"><i class="far fa-user"></i> ${post.author}</span>` : ''}
                        </div>
                        <p class="post-description">${post.description}</p>
                    </div>
                    <a href="blog-post.html?id=${post.id}" class="post-link" aria-label="${post.title}"></a>
                </div>
            `);

            postsContainer.append(postCard);
        });

        container.append(postsSection);
    }
}

/**
 * 格式化日期
 */
function formatDate(dateString) {
    const date = new Date(dateString);

    // 获取当前语言
    const lang = getCurrentLanguage();

    // 不同语言的日期格式
    if (lang === 'zh') {
        // 中文格式: 2023年1月1日
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    } else {
        // 英文格式: January 1, 2023
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
} 