// app.js - 主要应用功能

document.addEventListener('DOMContentLoaded', function () {
    // 导航栏移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');

            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });
    }

    // 语言切换功能
    const languageToggle = document.getElementById('language-toggle');
    const mobileLangToggle = document.getElementById('mobile-language-toggle');

    function switchLanguage() {
        const currentPath = window.location.pathname;
        const currentLang = document.documentElement.lang;

        let newPath = '';
        if (currentLang === 'zh') {
            // 从中文切换到英文
            if (currentPath === '/' || currentPath === '/index.html') {
                newPath = '/en/';
            } else {
                newPath = '/en' + currentPath;
            }
        } else {
            // 从英文切换到中文
            newPath = currentPath.replace(/^\/en/, '') || '/';
        }

        window.location.href = newPath;
    }

    if (languageToggle) {
        languageToggle.addEventListener('click', function (e) {
            e.preventDefault();
            switchLanguage();
        });
    }

    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function (e) {
            e.preventDefault();
            switchLanguage();
        });
    }

    // 在URL中记录选中的筛选器
    function updateURLParams(paramName, value) {
        const url = new URL(window.location.href);

        if (value) {
            url.searchParams.set(paramName, value);
        } else {
            url.searchParams.delete(paramName);
        }

        window.history.replaceState({}, '', url);
    }

    // 从URL中读取筛选器参数
    function getURLParam(paramName) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(paramName);
    }

    // 筛选服务功能
    const servicesGrid = document.getElementById('services-grid');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const tagButtons = document.querySelectorAll('.tag-filter-btn');
    const filterStatus = document.querySelector('.filter-status');
    const selectedCategory = document.getElementById('selected-category');
    const selectedTag = document.getElementById('selected-tag');
    const clearFilters = document.getElementById('clear-filters');
    const resultsCount = document.getElementById('results-count');

    let activeCategory = '';
    let activeTag = '';
    let totalCount = 0;

    if (servicesGrid) {
        totalCount = document.querySelectorAll('.service-card').length;

        // 初始化结果计数
        updateResultsCount();

        // 分类筛选点击事件
        categoryButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-category');

                // Toggle active state
                if (activeCategory === category) {
                    activeCategory = '';
                    categoryButtons.forEach(btn => {
                        if (btn.classList.contains('all-category')) {
                            btn.classList.add('active');
                            btn.classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                            btn.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                        }
                    });
                    this.classList.remove('active');
                    this.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    this.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                } else {
                    // Remove active class from all category buttons
                    categoryButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                        btn.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                    });

                    // Add active class to clicked button
                    this.classList.add('active');
                    this.classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                    this.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    activeCategory = category;
                }

                updateURLParams('category', activeCategory);
                filterServices();
                updateFilterStatus();
            });
        });

        // 标签筛选点击事件
        tagButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tag = this.getAttribute('data-tag');

                // Toggle active state
                if (activeTag === tag) {
                    activeTag = '';
                    tagButtons.forEach(btn => {
                        if (btn.classList.contains('all-tag')) {
                            btn.classList.add('active');
                            btn.classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                            btn.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                        }
                    });
                    this.classList.remove('active');
                    this.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    this.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                } else {
                    // Remove active class from all tag buttons
                    tagButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                        btn.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                    });

                    // Add active class to clicked button
                    this.classList.add('active');
                    this.classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                    this.classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    activeTag = tag;
                }

                updateURLParams('tag', activeTag);
                filterServices();
                updateFilterStatus();
            });
        });

        // 搜索框输入事件
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                updateURLParams('q', this.value);
                filterServices();
                updateFilterStatus();
            });
        }

        // 清除筛选按钮事件
        if (clearFilters) {
            clearFilters.addEventListener('click', function () {
                activeCategory = '';
                activeTag = '';
                if (searchInput) searchInput.value = '';

                // Reset active states for categories
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    btn.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                });
                document.querySelector('.all-category').classList.add('active');
                document.querySelector('.all-category').classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                document.querySelector('.all-category').classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');

                // Reset active states for tags
                tagButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');
                    btn.classList.add('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                });
                document.querySelector('.all-tag').classList.add('active');
                document.querySelector('.all-tag').classList.remove('bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-300');
                document.querySelector('.all-tag').classList.add('bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-300');

                // Clear URL parameters
                updateURLParams('category', '');
                updateURLParams('tag', '');
                updateURLParams('q', '');

                filterServices();
                updateFilterStatus();
            });
        }

        // 更新筛选状态显示
        function updateFilterStatus() {
            if (!filterStatus) return;

            const isFiltering = activeCategory !== '' || activeTag !== '' || (searchInput && searchInput.value !== '');

            if (isFiltering) {
                filterStatus.classList.remove('hidden');

                if (selectedCategory && activeCategory !== '') {
                    selectedCategory.textContent = `分类: ${activeCategory}`;
                    selectedCategory.classList.remove('hidden');
                } else if (selectedCategory) {
                    selectedCategory.classList.add('hidden');
                }

                if (selectedTag && activeTag !== '') {
                    selectedTag.textContent = `标签: ${activeTag}`;
                    selectedTag.classList.remove('hidden');
                } else if (selectedTag) {
                    selectedTag.classList.add('hidden');
                }
            } else if (filterStatus) {
                filterStatus.classList.add('hidden');
            }

            updateResultsCount();
        }

        // 更新结果计数
        function updateResultsCount() {
            if (!resultsCount) return;

            const visibleCount = [...document.querySelectorAll('.service-card')].filter(card =>
                !card.classList.contains('hidden')
            ).length;

            const lang = document.documentElement.lang;
            if (lang === 'zh') {
                resultsCount.textContent = `显示 ${visibleCount} 个服务，共 ${totalCount} 个服务`;
            } else {
                resultsCount.textContent = `Showing ${visibleCount} of ${totalCount} services`;
            }
        }

        // 筛选服务卡片
        function filterServices() {
            if (!servicesGrid || !noResults) return;

            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const serviceCards = document.querySelectorAll('.service-card');
            let hasVisibleCards = false;

            serviceCards.forEach(card => {
                const cardCategories = (card.getAttribute('data-categories') || '').split(',');
                const cardTags = (card.getAttribute('data-tags') || '').split(',');
                const cardTitle = card.getAttribute('data-title') || '';

                const matchesCategory = activeCategory === '' || cardCategories.includes(activeCategory);
                const matchesTag = activeTag === '' || cardTags.includes(activeTag);
                const matchesSearch = searchTerm === '' || cardTitle.includes(searchTerm);

                if (matchesCategory && matchesTag && matchesSearch) {
                    card.classList.remove('hidden');
                    hasVisibleCards = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (hasVisibleCards) {
                servicesGrid.classList.remove('hidden');
                noResults.classList.add('hidden');
            } else {
                servicesGrid.classList.add('hidden');
                noResults.classList.remove('hidden');
            }
        }

        // 初始化筛选器状态
        function initFilters() {
            const categoryParam = getURLParam('category');
            const tagParam = getURLParam('tag');
            const searchParam = getURLParam('q');

            if (categoryParam) {
                const categoryBtn = document.querySelector(`.category-filter-btn[data-category="${categoryParam}"]`);
                if (categoryBtn) {
                    categoryBtn.click();
                }
            }

            if (tagParam) {
                const tagBtn = document.querySelector(`.tag-filter-btn[data-tag="${tagParam}"]`);
                if (tagBtn) {
                    tagBtn.click();
                }
            }

            if (searchParam && searchInput) {
                searchInput.value = searchParam;
                const event = new Event('input');
                searchInput.dispatchEvent(event);
            }
        }

        // 初始化筛选器
        initFilters();
    }
}); 