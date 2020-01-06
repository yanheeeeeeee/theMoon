$(function () {
    // 获取文章统计数据并渲染到页面
    $.ajax({
        url: BigNew.data_info,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            $('.spannel_list>div:eq(0) em').text(backData.totalArticle)
            $('.spannel_list>div:eq(1) em').text(backData.dayArticle)
            $('.spannel_list>div:eq(2) em').text(backData.totalComment)
            $('.spannel_list>div:eq(3) em').text(backData.dayComment)
        }
    });

    // 月新增文章数折线图
    // 获取新增文章数据
    $.ajax({
        url: BigNew.data_article,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            // 声明date count数组用于存放坐标轴的坐标值
            let date = [];
            let count = [];
            for (let i = 0; i < backData.date.length; i++) {
                date.push(backData.date[i].date);
                count.push(backData.date[i].count);

                // 生成折线图
                // 获取放置图表的容器
                let totalArticleDom = document.querySelector('#curve_show');
                // 在容器里初始化一个图表
                let totalArticleChart = echarts.init(totalArticleDom)
                // 设置图表参数
                totalArticleOption = {
                    // x轴
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    // 工具盒
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    // y轴
                    yAxis: {
                        type: 'value'
                    },
                    // 提示框组件
                    tooltip: {
                        trigger: 'axis'
                    },
                    // 标题
                    title: {
                        left: 'center',
                        text: '日新增文章数',
                    },
                    // 图例(折线的标注)
                    legend: {
                        left: '8%',
                        data: ['日新增文章数']
                    },
                    // 图形绘制组件
                    series: [{
                        name: '日新增文章数',
                        data: count,
                        type: 'line',
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        },
                        smooth: true
                    }]
                };

                // 将图表参数对象应用于图表对象
                totalArticleChart.setOption(totalArticleOption);
            }
        }
    });

    // 各类型文章数据统计饼图
    // ajax各类型文章数量
    $.ajax({
        url: BigNew.data_category,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            let category = [];
            let category_count = [];

            for (let i = 0; i < backData.date.length; i++) {
                category.push(backData.date[i].name);
                category_count.push({
                    'name': backData.date[i].name,
                    'value': backData.date[i].articles
                })
            }

            // 生成饼状图
            // 获取放置图表的容器
            let categoryDom = document.querySelector('#pie_show');
            // 在容器里初始化一个图表
            let categoryChart = echarts.init(categoryDom)

            categoryOption = {
                title: {
                    text: '各类型文章数量统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    type: 'plain',
                    orient: 'horizontal',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: category,
                },
                series: [
                    {
                        name: '文章分类',
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '60%'],
                        data: category_count,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            // 将图表参数对象应用于图表对象
            categoryChart.setOption(categoryOption);
        }
    });

    // 日访问量数据统计柱状图
    $.ajax({
        url: BigNew.data_visit,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {

        }
    });
})