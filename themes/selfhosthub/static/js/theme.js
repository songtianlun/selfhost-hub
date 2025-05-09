/* Theme toggle functionality */

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const htmlEl = document.documentElement;

    // 检查存储的主题或系统偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    }

    // 桌面端主题切换按钮点击处理程序
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            htmlEl.classList.toggle('dark');
            localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // 移动端主题切换按钮点击处理程序
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function () {
            htmlEl.classList.toggle('dark');
            localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
        });
    }
});
