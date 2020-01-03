$(function () {
    // 从服务器获取用户信息
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // 将服务器返回的数据渲染到页面
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_info>span').text('欢迎  ' + backData.data.nickname);
            $('.user_center_link>img').attr('src', backData.data.userPic)
        }
    });

    // 退出登录(删除本地储存的token)
    $('.logout').on('click', function () {
        // 删除本地localStorage里的token
        localStorage.removeItem('token');
        // 跳转至登录页
        window.location.href = './login.html'
    })

    // 一级菜单点击事件
    $('.level01').on('click', function () {
        // 排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');

        // 文章管理由额外的点击效果
        if ($(this).index() == 1) {
            // 如果二级菜单显示,则隐藏;如果隐藏,则显示
            $('.level02').slideToggle(400)
            // 箭头旋转
            $('.slideMenu b').toggleClass('rotate');
            // 取消一级菜单的高亮
            $('.level01').removeClass('active');
            // 主动触发第一个li元素的点击事件*
            $('.level02>li:eq(0)>a')[0].click()
        }
    })

    // 二级菜单点击事件
    $('.level02>li').on('click', function () {
        // 排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
    })

})