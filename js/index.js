$(function () {
    // 获取焦点图
    $.ajax({
        url: BigNew.index_hotpic,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('.focus_list').html(template('index_hotpic', backData));
            $('.focus_list>li:eq(0)').addClass('first')
        }
    });

    // 获取分类列表
    $.ajax({
        url: BigNew.index_category,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('.left_menu').html(template('category_left_menu', backData));
            $('.level_two').html(template('category_leveltwo', backData));
        }
    });

    // 获取最新资讯
    $.ajax({
        url: BigNew.index_latest,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('.common_news').html(template('newArticle', backData));
        }
    });
})