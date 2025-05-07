/**
 * Selfhost Hub - 关于我们页面 JavaScript
 * 处理关于我们页面的功能
 */

$(document).ready(function () {
    // 加载关于我们内容
    loadAboutContent();

    // 初始化团队成员轮播
    initTeamCarousel();

    // 初始化联系表单验证
    initContactForm();
});

/**
 * 加载关于我们内容
 */
function loadAboutContent() {
    // 显示加载中
    $('.about-content-container').html(`
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span data-i18n="about.loading">正在加载内容...</span>
        </div>
    `);

    // 根据当前语言确定需要加载的内容
    const currentLang = getCurrentLanguage();
    const contentPath = `data/about_${currentLang}.md`;
    const fallbackPath = `data/about_en.md`; // 英文作为备选

    // 尝试加载当前语言内容
    $.ajax({
        url: contentPath,
        dataType: 'text',
        success: function (markdownContent) {
            renderMarkdownContent(markdownContent);
        },
        error: function () {
            // 如果当前语言内容不存在，尝试加载英文内容
            $.ajax({
                url: fallbackPath,
                dataType: 'text',
                success: function (markdownContent) {
                    renderMarkdownContent(markdownContent);
                },
                error: function () {
                    // 如果英文内容也不存在，显示错误信息
                    $('.about-content-container').html(`
                        <div class="error-message">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p data-i18n="about.contentNotFound">未找到关于我们的内容</p>
                        </div>
                    `);
                }
            });
        }
    });
}

/**
 * 渲染Markdown内容
 */
function renderMarkdownContent(markdownContent) {
    // 使用marked.js转换Markdown内容为HTML
    const html = marked.parse(markdownContent);

    // 清空并填充容器
    $('.about-content-container').empty().html(html);

    // 处理内容中的图片，添加lightbox功能
    initContentImages();

    // 初始化语法高亮（如果有代码块）
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

/**
 * 处理内容中的图片
 */
function initContentImages() {
    $('.about-content-container img').each(function () {
        const img = $(this);

        // 添加点击查看大图功能
        img.on('click', function () {
            const imgSrc = $(this).attr('src');

            // 创建遮罩和大图
            const overlay = $(`
                <div class="image-overlay">
                    <div class="image-overlay-content">
                        <img src="${imgSrc}" alt="Large view">
                        <button class="close-overlay"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `);

            // 添加到body
            $('body').append(overlay);

            // 处理关闭
            overlay.on('click', function (e) {
                if ($(e.target).closest('.image-overlay-content img').length === 0) {
                    overlay.remove();
                }
            });

            $('.close-overlay').on('click', function () {
                overlay.remove();
            });
        });

        // 添加样式
        img.css('cursor', 'pointer');
    });
}

/**
 * 初始化团队成员轮播
 */
function initTeamCarousel() {
    const teamContainer = $('.team-carousel');

    // 如果没有团队轮播容器，直接返回
    if (teamContainer.length === 0) {
        return;
    }

    // 加载团队成员数据
    $.getJSON('data/team.json')
        .done(function (teamMembers) {
            renderTeamMembers(teamMembers);

            // 初始化轮播
            if (typeof Swiper !== 'undefined' && teamMembers.length > 0) {
                new Swiper('.team-carousel .swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    pagination: {
                        el: '.team-carousel .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.team-carousel .swiper-button-next',
                        prevEl: '.team-carousel .swiper-button-prev',
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        }
                    }
                });
            }
        })
        .fail(function () {
            teamContainer.html(`
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p data-i18n="about.teamLoadFailed">无法加载团队成员信息</p>
                </div>
            `);
        });
}

/**
 * 渲染团队成员
 */
function renderTeamMembers(teamMembers) {
    const container = $('.team-carousel');

    // 如果没有成员，隐藏团队部分
    if (!teamMembers || teamMembers.length === 0) {
        $('.team-section').hide();
        return;
    }

    // 创建轮播结构
    const swiperContainer = $(`
        <div class="swiper-container">
            <div class="swiper-wrapper"></div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    `);

    container.empty().append(swiperContainer);

    // 添加团队成员
    teamMembers.forEach(member => {
        const memberSlide = $(`
            <div class="swiper-slide">
                <div class="team-member">
                    <div class="team-member-image">
                        ${member.avatar ?
                `<img src="${member.avatar}" alt="${member.name}">` :
                `<div class="member-placeholder-image"><i class="fas fa-user"></i></div>`
            }
                    </div>
                    <div class="team-member-info">
                        <h4 class="team-member-name">${member.name}</h4>
                        <p class="team-member-title">${member.title || ''}</p>
                        <p class="team-member-bio">${member.bio || ''}</p>
                        ${renderSocialLinks(member.social)}
                    </div>
                </div>
            </div>
        `);

        swiperContainer.find('.swiper-wrapper').append(memberSlide);
    });
}

/**
 * 渲染社交链接
 */
function renderSocialLinks(socialLinks) {
    if (!socialLinks) return '';

    let links = '<div class="team-member-social">';

    if (socialLinks.github) {
        links += `<a href="${socialLinks.github}" target="_blank" class="social-link"><i class="fab fa-github"></i></a>`;
    }

    if (socialLinks.twitter) {
        links += `<a href="${socialLinks.twitter}" target="_blank" class="social-link"><i class="fab fa-twitter"></i></a>`;
    }

    if (socialLinks.linkedin) {
        links += `<a href="${socialLinks.linkedin}" target="_blank" class="social-link"><i class="fab fa-linkedin"></i></a>`;
    }

    if (socialLinks.website) {
        links += `<a href="${socialLinks.website}" target="_blank" class="social-link"><i class="fas fa-globe"></i></a>`;
    }

    links += '</div>';

    return links;
}

/**
 * 初始化联系表单验证
 */
function initContactForm() {
    const contactForm = $('#contact-form');

    // 如果没有联系表单，直接返回
    if (contactForm.length === 0) {
        return;
    }

    // 表单提交处理
    contactForm.on('submit', function (e) {
        e.preventDefault();

        // 获取表单字段
        const name = $('#contact-name').val().trim();
        const email = $('#contact-email').val().trim();
        const subject = $('#contact-subject').val().trim();
        const message = $('#contact-message').val().trim();

        // 重置错误信息
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').remove();

        // 表单验证
        let isValid = true;

        if (!name) {
            $('#contact-name').addClass('is-invalid');
            $('#contact-name').after(`<div class="invalid-feedback" data-i18n="about.nameRequired">请输入您的姓名</div>`);
            isValid = false;
        }

        if (!email) {
            $('#contact-email').addClass('is-invalid');
            $('#contact-email').after(`<div class="invalid-feedback" data-i18n="about.emailRequired">请输入您的邮箱</div>`);
            isValid = false;
        } else if (!isValidEmail(email)) {
            $('#contact-email').addClass('is-invalid');
            $('#contact-email').after(`<div class="invalid-feedback" data-i18n="about.emailInvalid">请输入有效的邮箱地址</div>`);
            isValid = false;
        }

        if (!message) {
            $('#contact-message').addClass('is-invalid');
            $('#contact-message').after(`<div class="invalid-feedback" data-i18n="about.messageRequired">请输入您的留言内容</div>`);
            isValid = false;
        }

        // 如果验证通过，显示成功消息（实际应用中这里会提交到服务器）
        if (isValid) {
            // 隐藏表单
            contactForm.slideUp();

            // 显示成功消息
            $('.contact-form-container').append(`
                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <p data-i18n="about.messageSent">您的留言已发送！我们会尽快回复您。</p>
                </div>
            `);

            // 清空表单（如果需要再次显示）
            contactForm[0].reset();

            // 这里在实际应用中会有AJAX请求发送表单数据到服务器
            console.log('Form submitted:', { name, email, subject, message });
        }
    });
}

/**
 * 邮箱格式验证
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 