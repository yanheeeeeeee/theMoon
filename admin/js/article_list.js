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
    $.ajax({
        url: BigNew.article_query,
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            perpage: 10
        },
        success: function (backData) {
            // 渲染到tbody中
            $('tbody').html(template("article_list", backData))
            // 调用pagination插件的初始化代码,显示分页栏
            $('#pagination').twbsPagination({
                // 总页数: ajax返回的data.totalPage
                totalPages: backData.data.totalPage,
                // 显示的页数: 此处为6
                visiblePages: 6,
                // 页码点击事件 参数e 事件源; page 点击的页码
                onPageClick: function (e, page) {
                    $('#page-content').text('Page ' + page);
                    // 调用页码点击函数
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
                // 渲染到tbody中
                $('tbody').html(template("article_list", backData))
                // 调用pagination插件的初始化代码,显示分页栏
                $('#pagination').twbsPagination({
                    // 总页数: ajax返回的data.totalPage
                    totalPages: backData.data.totalPage,
                    // 显示的页数: 此处为6
                    visiblePages: 6,
                    // 页码点击事件 参数e 事件源; page 点击的页码
                    onPageClick: function (e, page) {
                        $('#page-content').text('Page ' + page);
                        // 调用页码点击函数
                        getArticleList(page)
                    }
                });
            }
        });
    })

    // 点击页码函数
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
                // 将ajax返回的数据渲染到tbody中
                $('tbody').html(template("article_list", backData))
            }
        });
    }
})