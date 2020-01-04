$(function () {
    // 获取文章分类并渲染到页面下拉框中
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('#selCategory').html(template("category", backData));
        }
    });

    // 获取第一页文章(每页10条)并渲染到页面
    $.ajax({
        url: BigNew.article_query,
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            perpage: 10
        },
        success: function (backData) {
            $('tbody').html(template("article_list", backData))
            $('#pagination').twbsPagination({
                totalPages: backData.data.totalPage,
                visiblePages: backData.data.totalPage < 6 ? backData.data.totalPage : 6,
                onPageClick: function (e, page) {
                    $('#page-content').text('Page ' + page);
                    getArticleList(page)
                }
            });
        }

    });

    // 筛选功能
    $('#btnSearch').on('click', function (e) {
        // 取消默认事件
        e.preventDefault();

        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 1,
                perpage: 10
            },
            success: function (backData) {
                $('tbody').html(template("article_list", backData))

                // 筛选按钮点击事件(ajax相应后执行)
                // 销毁旧插件
                $('#pagination').twbsPagination('destroy');
                // 生成新插件
                $('#pagination').twbsPagination({
                    visiblePages: backData.data.totalPage < 6 ? backData.data.totalPage : 6,
                    totalPages: backData.data.totalPage,
                    startPage: 1,
                    onPageClick: function (e, page) {
                        $('#page-content').text('Page ' + page);
                        getArticleList(page)
                    }
                });

            }
        });
    })

    // 点击页码事件
    function getArticleList(currentPage) {
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
                $('tbody').html(template("article_list", backData))
            }
        });
    }
})