$(function () {
    // 获取文章分类并渲染到页面下拉框中
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // 渲染到下拉框中
            $('#selCategory').html(template("category", backData));
        }
    });

    // 获取第一页文章(每页10条)并渲染到页面
    getArticleList(1, true)

    // 筛选功能
    $('#btnSearch').on('click', function (e) {
        // 取消默认事件
        e.preventDefault();
        // 申明一个iscall变量决定是否调用getArticleList()
        let iscall = true;
        // 获取当前筛选条件下的第一页数据并渲染到页面
        getArticleList(1, iscall)
    })



    // lordArticleList()与getArticleList()形成了双重递归
    // 需要给递归设置结束条件
    // 方案一: 给递归添加结束条件,当前页面与点击页不相等时才调用lordArticleList()
    // 方案二: 给getArticleList()额外添加一个布尔类型参数，只有点击筛选或第一次进入页面才会重新加载分页插件

    // 重加载分页插件
    function lordArticleList(totalPage, startPage) {
        // 销毁旧插件
        $('#pagination').twbsPagination('destroy');
        // 调用pagination插件的初始化代码,显示分页栏
        $('#pagination').twbsPagination({
            // 总页数: ajax返回的data.totalPage
            totalPages: totalPage,
            // 显示的页数: 此处为6
            visiblePages: 6,
            startPage: startPage,
            // 页码点击事件 参数e 事件源; page 点击的页码
            onPageClick: function (e, page) {
                $('#page-content').text('Page ' + page);
                // 调用页码点击函数
                getArticleList(page);
            }
        });
    }

    // 点击页码函数
    function getArticleList(currentPage, iscall) {
        // ajax请求该页码数据
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                // 将ajax返回的数据渲染到tbody中
                $('tbody').html(template("article_list", backData));
                if (iscall) {
                    // 调用重加载分页栏插件函数
                    lordArticleList(backData.data.totalPage, currentPage)
                }
            }
        });
    }

    // 删除文章事件
    $('.table').on('click', '.delete', function () {
        // 向用户确认是否删除
        if (confirm('确认删除该篇文章吗?')) {
            let id = $(this).attr('data-id')
            $.ajax({
                url: BigNew.article_delete,
                type: 'post',
                dataType: 'json',
                data: 'id=' + id,
                success: function (backData) {
                    // 显示返回消息
                    alert(backData);
                    if (backData.code == 204) {
                        // 重新加载tbody里的内容(主动触发筛选事件)
                        $('#btnSearch').click();
                    }
                }
            });
        }
    })
})