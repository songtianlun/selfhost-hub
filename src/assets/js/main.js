document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const serviceCards = document.querySelectorAll('.service-card');
    const tagButtons = document.querySelectorAll('.tag-filters .tag');
    let activeTags = new Set();

    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterServices();
    });

    // 标签过滤功能
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.dataset.group;
            const tag = button.dataset.tag;
            const tagKey = `${group}:${tag}`;

            if (activeTags.has(tagKey)) {
                activeTags.delete(tagKey);
                button.classList.remove('active');
            } else {
                activeTags.add(tagKey);
                button.classList.add('active');
            }

            filterServices();
        });
    });

    // 过滤服务
    function filterServices() {
        const searchTerm = searchInput.value.toLowerCase();
        
        serviceCards.forEach(card => {
            const name = card.dataset.name;
            const tags = card.dataset.tags.split(',');
            const matchesSearch = name.includes(searchTerm);
            
            // 检查是否匹配所有选中的标签
            const matchesTags = Array.from(activeTags).every(tagKey => {
                const [group, tag] = tagKey.split(':');
                return tags.includes(tag);
            });

            if (matchesSearch && (activeTags.size === 0 || matchesTags)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 