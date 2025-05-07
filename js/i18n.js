/**
 * Selfhost Hub 国际化支持
 * 处理网站的多语言功能
 */

// 当前语言
let currentLang = 'zh';

// 语言数据
let translations = {};

// 初始化国际化功能
function initI18n() {
    // 尝试从URL参数获取语言
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && (langParam === 'zh' || langParam === 'en')) {
        currentLang = langParam;
    } else {
        // 尝试从localStorage获取
        const savedLang = localStorage.getItem('selfhost-hub-lang');
        if (savedLang) {
            currentLang = savedLang;
        } else {
            // 尝试从浏览器语言获取
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('zh')) {
                currentLang = 'zh';
            } else {
                currentLang = 'en';
            }
        }
    }

    // 设置语言选择器的值
    $('#language-select').val(currentLang);

    // 加载语言文件
    loadLanguage(currentLang);

    // 语言切换事件
    $('#language-select').on('change', function () {
        const newLang = $(this).val();
        changeLanguage(newLang);
    });
}

// 加载语言文件
function loadLanguage(lang) {
    $.getJSON(`js/lang/${lang}.js`, function (data) {
        translations = data;
        applyTranslations();
    }).fail(function () {
        console.error(`Failed to load language file: ${lang}.js`);
        // 如果加载失败，尝试加载默认语言（中文）
        if (lang !== 'zh') {
            currentLang = 'zh';
            $('#language-select').val(currentLang);
            loadLanguage('zh');
        }
    });
}

// 应用翻译
function applyTranslations() {
    // 翻译所有带有data-i18n属性的元素
    $('[data-i18n]').each(function () {
        const key = $(this).data('i18n');
        const translation = getTranslation(key);
        if (translation) {
            $(this).html(translation);
        }
    });

    // 翻译所有带有data-i18n-placeholder属性的元素
    $('[data-i18n-placeholder]').each(function () {
        const key = $(this).data('i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            $(this).attr('placeholder', translation);
        }
    });

    // 翻译所有带有data-i18n-title属性的元素
    $('[data-i18n-title]').each(function () {
        const key = $(this).data('i18n-title');
        const translation = getTranslation(key);
        if (translation) {
            $(this).attr('title', translation);
        }
    });

    // 翻译所有带有data-i18n-alt属性的元素
    $('[data-i18n-alt]').each(function () {
        const key = $(this).data('i18n-alt');
        const translation = getTranslation(key);
        if (translation) {
            $(this).attr('alt', translation);
        }
    });

    // 发布语言变更事件
    $(document).trigger('languageChanged', [currentLang]);
}

// 获取翻译文本
function getTranslation(key) {
    // 使用点表示法访问嵌套对象
    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return null;
        }
    }

    return result;
}

// 更改语言
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selfhost-hub-lang', lang);
    loadLanguage(lang);

    // 更新URL（不刷新页面）
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
}

// 获取当前语言
function getCurrentLang() {
    return currentLang;
}

// 获取特定键的翻译
function translate(key) {
    return getTranslation(key) || key;
}

// 在页面加载完成后初始化
$(document).ready(function () {
    initI18n();
}); 