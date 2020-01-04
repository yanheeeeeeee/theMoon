$(function () {
    // 初始化富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    // 获取从list页面传过来的id
    let id = window.location.href.split('=')[1];
    console.log(id);

    // 获取文章分类并渲染到页面下拉框中
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // 渲染到下拉框中
            $('.category').html(template("category", backData))
        }
    });

    // 根据id获取该文章详细内容并渲染到编辑页面
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: 'id=' + id,
        success: function (backData) {
            $('#inputTitle').val(backData.data.title);
            $('.article_cover').attr('src', backData.data.cover);
            // select选择器设定value值时
            $('.category').val(backData.data.categoryId);
            $('#testico').val(backData.data.date);
            editor.txt.html(`<p>${backData.data.content}</p>`)
        }
    });

    // 上传图片预览
    // 设置文件上传事件(onchange事件)
    $('#inputCover').on('change', function () {
        // 获取上传的图片
        let imgFile = this.files[0];
        // 给图片文件设置一个虚拟url
        let imgURL = URL.createObjectURL(imgFile);
        // 将这个url设置给预览图
        $('.article_cover').attr('src', imgURL);
    })

    // 修改事件
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();

        // 调用修改函数
        articleEdit('已发布')
    })

    // 存为草稿事件
    $('.btn-draft').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();

        // 调用修改函数
        articleEdit('')
    })


    // 封装修改函数
    function articleEdit(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0])
        console.log(fd);
        // 给fd补充参数
        fd.append('id', id);
        fd.append('date', $('#testico').val());
        fd.append('content', editor.txt.html());
        fd.append('state', state);
        // 发送请求
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('文章已修改!');
                    // 修改完成后跳转至列表页
                    window.location.href = './article_list.html';
                }
            }
        });

    }
})