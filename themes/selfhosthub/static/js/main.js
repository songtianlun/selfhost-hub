// 主题切换
function initThemeToggle() {
    // 初始化主题
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // 监听主题切换按钮点击
    document.addEventListener('click', (e) => {
        const themeToggle = e.target.closest('[data-theme-toggle]');
        if (themeToggle) {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        }
    });
}

// 初始化导航栏移动端菜单
function initMobileMenu() {
    document.addEventListener('click', (e) => {
        const mobileMenuButton = e.target.closest('[data-mobile-menu-button]');
        if (mobileMenuButton) {
            const mobileMenu = document.querySelector('[data-mobile-menu]');
            if (mobileMenu) {
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                } else {
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    });
}

// 当DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
}); 