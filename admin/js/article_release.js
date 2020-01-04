$(function () {
    // 给日期插件设置默认值为当前日期
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isinitVal: true
    });

    // 初始化富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    // 加载该页面时将父页面侧边栏level02文章发表项设为高亮
    // 需要用live server来运行页面,否则会报错
    $('.level02>li:eq(1)', window.parent.document).addClass('active').siblings().removeClass('active')

    // 业务逻辑
    // 1.加载分类
    // 2.生成上传文件预览图
    // 3.发表/存为草稿事件

    // 1.加载分类
    // 获取所有分类
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // 将分类渲染至页面
            $('.category').html(template('category', backData))
        }
    });

    // 2.生成上传文件预览图
    $('#inputCover').on('change', function () {
        let imgFile = this.files[0];
        let imgURL = URL.createObjectURL(imgFile);
        $('.article_cover').attr('src', imgURL);
    })

    // 3.发表/存为草稿事件
    // 发表事件
    $('.btn-release').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        articleRelease('已发布')
    })
    // 存为草稿事件
    $('.btn-draft').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        articleRelease('')
    })

    // 封装发布文章函数
    function articleRelease(state) {
        // 验证文章标题,封面,内容是否为空
        if ($.trim($('#inputTitle').val()) === '') {
            alert('请输入标题!');
            return;
        } else if ($.trim(editor.txt.text()) == '') {
            alert('请输入文章内容!');
            return;
        } else if ($('#inputCover')[0].files[0] == null) {
            alert('请选择文章封面!');
            return;
        }
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 给fd添加缺
        fd.append('content', editor.txt.html());
        fd.append('state', state);
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('文章发表成功!')
                    // 发布完成后跳转至列表页
                    window.location.href = './article_list.html'
                }
            }
        });
    }

})