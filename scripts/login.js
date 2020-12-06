$(function () {

    localStorage.clear();
    $('#btnlogin').click(function () {

        var username = $('#login input[name=ften]').val();
        var pwd = ($('#login input[name=fmatkhau]').val());
        //var pwd = str.replace('/[^0-9]/','pwd1');
        
        if (username != '' && pwd != '') {
            var sqllogin = eval(data_sql.login);

            //var json = JSON.stringify({ sql: sqllogin, connect: 'meta' });
            var json = JSON.stringify({ sql: sqllogin });
            try {
                getDatabySql(json, checklogin);
                //getDatabySql(json, function (data) {
                //    //debugger;
                //});
            }
            catch (err) {
                navigator.notification.alert(
                    err,  // message
                    function () {

                    },         // callback
                    'Thông báo',            // title
                    'Đóng'               // buttonName
                );
            }

        }
        else {
            navigator.notification.alert(
                'Vui lòng kiểm tra lại tên đăng nhập và mật khẩu',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'OK'                  // buttonName
            );

        }
    });
});
