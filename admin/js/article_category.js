$(function () {
    /*技术难点 
            1.点击新增按钮与编辑按钮都要弹出模态框
            2.新增按钮的业务逻辑与编辑按钮业务逻辑不同
                新增按钮弹出的模态框
                    (1)表单文本清空
                    (2)点击取消，清空表单文本方便下一次添加
                    (3)点击新增：ajax发送请求给服务器
                        url:/admin/category/add
                        参数： name : 分类名称  slug:分类别名
                编辑按钮弹出的模态框
                    (1)表单文本为当前点击编辑的文字类别数据
                    (2)点击取消：清空表单文本方便下一次编辑
                    (3)点击编辑：ajax发送请求给服务器
                        url:/admin/category/edit
                        参数：name : 分类名称  slug:分类别名 id:编辑的文字id
            
            解决方案：结合bootstrap官方文档模态框使用
            1.给新增按钮与编辑按钮a标签设置行内属性：data-toggle="modal" data-target="#myModal"
                作用：点击a标签自动弹出模态框
            2.给模态框注册事件 $('#myModal').on('show.bs.modal', function (e) {})
                作用：弹出模态框之前会执行这个事件处理函数
                e.relatedTarget : 获取弹出模态框的事件触发源（点击哪个a弹出来的）
            3.给模态框的取消按钮和确认按钮注册事件
                取消按钮：隐藏模态框，并且清空表单文本： dom表单.reset()
                确认按钮：
                    如果e.relatedTarget是新增 ->则执行新增按钮逻辑
                    如果e.relatedTarget是编辑 ->则执行编辑按钮逻辑
            */

    // 1.加载页面时获取文章类别并渲染到页面上
    //   请求地址：/admin/category/list
    //   请求方式：get
    //   请求参数：无
    //   返回数据：文章
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('tbody').html(template('category', backData));
        }
    });



    // 新增模态框弹出事件
    $('#myModal').on('show.bs.modal', function (e) {
        console.log(e.relatedTarget); // DOM对象,类似于原生的e.target 事件的触发源
        // 点击新增/删除弹出的模态框不同
        if ($(e.relatedTarget).text().indexOf('新增') != -1) {
            // 打开前清空输入框
            $('#recipient-name').val('');
            $('#message-text').val('');
            $('#exampleModalLabel').text('新增分类');
            $('.btn-send').val('新增');


        } else if ($(e.relatedTarget).text().indexOf('编辑') != -1) {
            $('#exampleModalLabel').text('编辑分类');
            $('#recipient-name').val($(e.relatedTarget).parent().siblings('.name').text());
            $('#message-text').val($(e.relatedTarget).parent().siblings('.slug').text());
            $('.btn-send').val('编辑');
            $('.btn-send').attr('data-id', $(e.relatedTarget).attr('data-id'));
        }
    })


    // 删除条目
    $('table').on('click', '.btn-del', function () {
        // 请求地址：/admin/category/delete
        // 请求方式：post
        // 请求参数：id

        if (confirm('确认删除该分类吗?') == true) {
            $.ajax({
                url: BigNew.category_delete,
                type: 'post',
                dataType: 'json',
                data: 'id=' + $(this).attr('data-id'),
                success: function (backData) {
                    alert(backData.msg);
                    window.location.reload();
                }
            });
        }
    })



    $('.btn-send').on('click', function () {
        if ($('.btn-send').val() == '新增') {
            // ajax请求新增文章类别
            //  请求地址：/admin/category/add
            //  请求方式：post
            //  请求参数： name  slug
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        alert('新增分类成功!');
                        window.location.reload();
                    } else if (backData.code == 400) {
                        alert('该分类已存在!');
                    }
                }
            });


        } else if ($('.btn-send').val() == '编辑') {
            // ajax请求编辑文章类别
            //  请求地址：/admin/category/edit
            //  请求方式：post
            //  请求参数： id  name  slug
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    id: $('.btn-send').attr('data-id'),
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        alert('编辑成功!');
                        window.location.reload();
                    } else if (backData.code == 400) {
                        alert('修改前与修改后内容不能相同!');
                    }
                }
            });
        }
    })
})