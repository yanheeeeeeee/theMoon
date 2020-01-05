$(function () {
    // 业务需求:
    // 1.页面渲染及分页栏功能
    // 2.批准按钮注册事件
    // 3.拒绝按钮注册事件
    // 4.删除按钮注册事件
    //   2,3,4步可以封装为同一函数传入不同参数

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

    // 评论审核通过
    $(document).on('click', '.btn-pass', function () {
        commentManage(BigNew.comment_pass, $(this).attr('data-id'))
    })

    // 评论审核拒绝
    $(document).on('click', '.btn-reject', function () {
        commentManage(BigNew.comment_reject, $(this).attr('data-id'))
    })

    // 评论删除
    $(document).on('click', '.btn-del', function () {
        commentManage(BigNew.comment_delete, $(this).attr('data-id'))
    })

    // 评论管理函数
    function commentManage(url, id) {
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: 'id=' + id,
            success: function (backData) {
                alert(backData.msg);
                window.location.reload();
            }
        });
    }

})