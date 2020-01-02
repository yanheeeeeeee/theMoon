$(function () {
    /* 登录功能思路
          1.给登录按钮注册点击事件
          2.阻止默认跳转事件（表单submit会自动跳转页面）
          3.获取用户名和密码
          4.非空判断
          5.ajax发送请求
          6.处理响应结果   a.成功：跳转管理系统首页    b.失败：提示用户
          显示模态框 $('#myModal').modal({keyboard: false})
           */

    // 登录按钮点击事件
    $('.input_sub').on('click', function (e) {
        console.log(BigNew);

        // 阻止默认事件
        e.preventDefault();
        // 获取用户名和密码
        let username = $('.input_txt').val();
        let password = $('.input_pass').val();

        // 非空判断
        if (username != '' && password != '') {
            // ajax发送post验证请求
            $.ajax({
                url: BigNew.user_login,
                type: 'post',
                dataType: 'json',
                data: {
                    username,
                    password
                },
                // 根据服务器返回的数据来执行相应的代码
                success: function (backData) {
                    // code==400时,报用户名或密码不正确
                    if (backData.code == 400) {
                        $('.modal-body').text('用户名或密码错误,请重新输入!')
                        $('#myModal').modal({ keyboard: true })
                        //清空输入框
                        $('.input_txt').val('');
                        $('.input_pass').val('');
                        return;
                    }
                    if (backData.code == 200) {
                        // code==200时,登录成功
                        $('.modal-body').text('登录成功!')
                        // 弹出模态框
                        $('#myModal').modal({ keyboard: true });
                        // 模态框隐藏后跳转至后台首页
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            // 将服务器返回的token持久化保存到浏览器本地
                            localStorage.setItem('token', backData.token);
                            // 注意: 此处路径应为index.html相对login.html的路径,而非相对于js文件的路径
                            window.location.href = './index.html'
                        })
                    }
                }
            });
        } else {
            // 任一栏为空时报错
            $('.modal-body').text('请输入用户名和密码!')
            $('#myModal').modal({ keyboard: true })
            return;
        }

    })
})