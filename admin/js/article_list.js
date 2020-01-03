$(function () {
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('#selCategory').html(template("category",backData))
        }
    });
})