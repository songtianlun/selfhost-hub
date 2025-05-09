// theme.js - 处理深色模式切换

(function () {
    // 主题切换函数
    function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // 切换类名
        if (newTheme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // 保存到本地存储
        localStorage.setItem('theme', newTheme);

        // 更新按钮图标
        updateThemeToggleButton(newTheme);
    }

    // 更新主题按钮的图标
    function updateThemeToggleButton(theme) {
        const toggleButtons = document.querySelectorAll('.theme-toggle');

        toggleButtons.forEach(button => {
            const lightIcon = button.querySelector('.light-icon');
            const darkIcon = button.querySelector('.dark-icon');

            if (theme === 'dark') {
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            } else {
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            }
        });
    }

    // 初始化主题
    function initTheme() {
        const html = document.documentElement;

        // 检查本地存储的主题设置
        let theme = localStorage.getItem('theme');

        // 如果没有设置，检查系统偏好
        if (!theme) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        }

        // 应用主题
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // 初始化按钮状态
        updateThemeToggleButton(theme);

        // 添加事件监听器到所有主题切换按钮
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.addEventListener('click', toggleTheme);
        });

        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newTheme = e.matches ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }

            updateThemeToggleButton(newTheme);
        });
    }

    // 当DOM加载完成后初始化主题
    document.addEventListener('DOMContentLoaded', initTheme);
})(); 