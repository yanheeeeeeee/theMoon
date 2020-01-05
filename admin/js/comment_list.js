$(function () {
    // 页面加载后获取第一页的评论数据并渲染到页面
    getCommentList(1);

    // 获取并渲染当前页面函数
    function getCommentList(currentPage) {
        $.ajax({
            url: BigNew.comment_list,
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                // 将返回的评论数据渲染到页面
                $('.table>tbody').html(template('comment', backData))
                // 当当前页面为1时,生成并渲染分页栏
                if (currentPage == 1) {
                    $('#pagination-demo').twbsPagination({
                        totalPages: backData.data.totalPage,
                        visiblePages: 8,
                        onPageClick: function (event, page) {
                            $('#page-content').text('Page ' + page);
                            // 点击页码后调用自身重生成评论页面
                            getCommentList(page);
                        }
                    });
                }
            }
        });

    }
})