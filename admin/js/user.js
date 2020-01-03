$(function () {
    // 获取用户信息并渲染到页面
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // $('.username').val(backData.data.username)
            // $('.nickname').val(backData.data.nickname)
            // $('.email').val(backData.data.email)
            // $('.password').val(backData.data.password)

            // 渲染页面的表单元素`类名`与服务器返回的对象`属性名一致`
            // 就可以写一个for-in循环遍历返回对象的key,并赋值给相应的表单元素
            for (let key in backData.data) {
                $('.' + key).val(backData.data[key])
            }
            $('.user_pic').attr('src', backData.data.userPic)
        }
    });

    // 将用户选择的文件预览图渲染到页面
    $('#exampleInputFile').on('change', function () {
        // 获取上传的文件,并为其设置一个临时URL
        let userIcon = this.files[0];
        let iconURL = URL.createObjectURL(userIcon);
        // 将预览图渲染到页面
        $('.user_pic').attr('src', iconURL)
    })

    // 修改个人信息
    $('#form').on('submit', function (e) {
        // 取消默认行为
        e.preventDefault();
        // 利用formData对象获取表单信息
        let formData = new FormData(this);

        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    $('#myModal').modal({ keyboard: true });
                    // 模态框关闭后重新加载父页面(即index.html)
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        window.parent.location.reload;
                    })
                }
            }
        });
    });
})