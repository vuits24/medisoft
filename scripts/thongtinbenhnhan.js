$(function () {
    var mabn = localStorage.getItem('mabn');
    var sql = eval("`select * from cm_Data.btdbn where mabn = '${mabn}'`");
    getDatabySql(JSON.stringify({ sql: sql }), function (data) {
        if (data.ok) {
            $('.tenbn').html(data.data[0].hoten);
            $('.mabn').html('Mã BN: ' + mabn);
            $('.mabhyt').html('Mã BHYT: ' + data.data[0].mabhyt);
        }
    })
})