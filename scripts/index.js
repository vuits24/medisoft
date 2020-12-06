"use strict";

//var urlbase = "http://postgresql.dippana.com/cyber/";
//var urlbase = "http://medisoft.vn/mn phuc obilehenkham/cyber/";
//var urlbase = "http://localhost:56802/cyber/";
var urlbase = "http://medisoft.vn/mobileapi66/cyber/";
//var baseuri = "http://medisoft.vn/gate/";
//var urlocracle = "http://medisoft.vn/awsbv/medi/";
//var urlocracle = "http://localhost:5000/medi/ExecuteQuery";
//var urlbase = "http://medisoft.vn/mobileapi/cyber/";
//var urlbase = "http://116.193.74.226:8989/cyber/";
var data = "meta";
var converttxt_dmyToymd = function (d) {
    var t = d.split('/');
    var kq = '';
    for (var i = t.length - 1; i >= 0; i--) {
        kq += t[i] + '-';
    }
    kq = kq.substring(0, kq.length - 1);
    return kq;
}


var convertddmmyyyy = function () {
    var t = new Date(); viewlist
    var yy = t.getFullYear();
    var dd = t.getDate();
    var mm = t.getMonth() + 1;
    return (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + yy;
}
//var convertddmmyyyy = function (dt) {
//    var t = new Date(dt);
//    var yy = t.getFullYear();
//    var dd = t.getDate();
//    var mm = t.getMonth() + 1;
//    return (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + yy;
//}
var convertyyyymmddd = function (dt) {
    var t = new Date(dt);
    var yy = t.getFullYear();
    var dd = t.getDate();
    var mm = t.getMonth() + 1;
    return yy + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
}
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
var loadding = function (t = false) {
    if (t) {
        if ($('#loadding-befor-send').length == 0) {
            $('body').append(`
<div id="loadding-befor-send" style="position: absolute;z-index:999;top: 0;left: 0;width: 100vw;height: 100vh;background: #212529a3;transition: .4s;" ><div > <img style="    position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" class="loadimg" src="../images/loadding.gif"></div></div>
            `)
        } else {
            $('#loadding-befor-send').css({ 'display': 'block' });
        }

    }
    else {
        $('#loadding-befor-send').css({ 'display': 'none' });
    }
}
var getDatabySql = function (datajson, fsuccess) {

    $.ajax({
        type: "POST",
        url: urlbase + "getDatabySql",
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: datajson,
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}
var getDatabySqlJSON = function (datajson, fsuccess) {
    $.ajax({
        type: "POST",
        url: urlbase + "getDatabySql",
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ sql: datajson }),
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}
var executeQuery = function (datajson, fsuccess) {
    $.ajax({
        type: "POST",
        url: urlbase + "executeQuery",
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: datajson,
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}
var executeQueryOcracle = function (datajson, fsuccess) {
    $.ajax({
        type: "POST",
        url: urlocracle + 'ExecuteQuery',
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: datajson,
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ ocracle',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}

var getDatabySqlOcracle = function (datajson, fsuccess) {

    $.ajax({
        type: "POST",
        url: urlocracle + "GetDatabySql",
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: datajson,
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}

var orcl_convert_yymm_mmyy = function (str) {
    var yymm = str.substring(0, 4);
    return yymm.substring(2) + yymm.substring(0, 2);
}

var executeQueryHen = function (hens) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: baseuri + "api/lichhen",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(hens),
        success: function (result) {
            debugger
            if (result[0].val) {

                $.alert({
                    title: 'Thông báo!',
                    content: 'Đặt lịch thành công!',
                });
            }
        },
        error: function (result) {
            $.alert(result);
        }
    });
}


var executeQueryJSON = function (datajson, fsuccess) {
    $.ajax({
        type: "POST",
        url: urlbase + "executeQuery",
        traditional: true,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ sql: datajson }),
        beforeSend: function () {
            loadding(true);
        },
        success: fsuccess,
        error: function (xhr) { // if error occured
            navigator.notification.alert(
                'Không kết nối được máy chủ',  // message
                function () {

                },         // callback
                'Thông báo',            // title
                'Đóng'                  // buttonName
            );
        },
        complete: function () {
            loadding(false);
        }
    });
}

var partition_ngay = function (schema, table, key, value) {

    var sql = eval(data_sql.ptt_ngay);
    getDatabySql(JSON.stringify({ sql: sql }), function (rs) {
        if (rs.ok) {
            //alert("PARTITION NGAY DONE");
        }
        else {
            //alert("partition ngay error");
        }
    });
}

var partition_key = function (schema, table, key, value) {
    var mabv = localStorage.getItem("idbv");
    var sql = eval(data_sql.ptt_key);
    getDatabySql(JSON.stringify({ sql: sql }), function (rs) {
        if (rs.ok) {
            //alert("PARTITION KEY DONE");
        }
        else {
            //alert("partition key error");
        }
    });
}

var partition_mabn = function (schema, table, value, mabn) {
    var mabv = localStorage.getItem("idbv");
    var sql = eval(data_sql.ptt_mabn);
    getDatabySql(JSON.stringify({ sql: sql }), function (rs) {
        if (rs.ok) {
            // alert("PARTITION MABN DONE");
        }
        else {
            //alert("partition mabn error");
        }
    });
}

var partition_mabv = function (schema, table, value) {
    var sql = eval(data_sql.ptt_mabv);
    var mabv = value;
    getDatabySql(JSON.stringify({ sql: sql }), function (rs) {
        if (rs.ok) {
            alert("PARTITION MABV DONE");
        }
        else {
            alert("partition mabv error");
        }
    });
}

var checklogin = function (data) {
    if (data.ok) {

        var dt = data.data;

        if (dt.length >= 1) {
            localStorage.clear();
            //localStorage.setItem("login", JSON.stringify(dt));
            localStorage.setItem("login", JSON.stringify(dt));
            //localStorage.setItem('idbv', String(dt[0].mabv));
            localStorage.setItem('userid', String(dt[0].id));
            localStorage.setItem('maphai', String(dt[0].maphai));
            localStorage.setItem('hoten', String(dt[0].hoten));

        }

        if (dt[0].loai_user == 'BS') {
            localStorage.setItem("mabs", String(dt[0].mabs));

            var mabs = dt[0].mabs;
            var mabv = dt[0].mabv;
            localStorage.setItem('idbv', mabv);
            var load_kp = eval(data_sql.load_khoaphong_old);

            var json = JSON.stringify({ sql: load_kp });
            try {
                getDatabySql(json, function (rs) {
                    if (rs.ok) {

                        localStorage.setItem('listkp', JSON.stringify(rs.data));

                        location.href = 'hiendien.html';
                    } else {
                        alert("Tài khoản chưa được khai báo khoa phòng!");
                    }

                });

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
            localStorage.setItem('mabn', String(dt[0].mabn));
            localStorage.setItem('mabv', String(dt[0].mabv));
            location.href = "datlich.html";
        }
    }
    else {
        alert("Vui lòng kiểm tra user/pass");
    }
}
var statusLogin = function () {
    var ttlogin = localStorage.getItem('login');
    if (ttlogin != null) {
        if (ttlogin[0].loai_user == 'bs') {
            location.href = "hiendien.html";
        } else {
            location.href = "benhnhandangnhap.html";
        }

    } else {
        location.href = "index.html";
    }
}
var getdataJson = function (key) {
    return JSON.parse(localStorage.getItem(key));
}

var gethiendienct = function (maql) {
    var getdt = getdataJson('hiendien');
    return getdt.filter(t => t.maql == maql)[0];
}
var xulytxt = function (txt) {
    var chuoi = [
        { ten: "chấm than", id: '!' },
        { ten: "ba chấm", id: ' ...' },
        { ten: "hai chấm", id: ':' },
        { ten: "phẩy phẩy", id: ", " },
        { ten: "chấm phẩy", id: "; " },
        { ten: "nháy đơn", id: "'" },
        { ten: "nháy kép", id: "\"" },
        { ten: "gạch xược", id: "\\" },
        { ten: "gạch chéo", id: "/" },
        { ten: "chấm chấm", id: ". " },
        { ten: "chấm hỏi", id: "?" },
        { ten: "xóa xóa", id: "xoa" },
        { ten: "xuống dòng", id: ". \n" },
        { ten: "xuống hàng", id: ".\n" }];
    var chuoithuong = txt.toLowerCase();
    var ktxt = txt;
    for (var i = 0; i < chuoi.length; i++) {
        var chck = chuoithuong.lastIndexOf(chuoi[i].ten);
        if (chck > 1) {
            while (chuoithuong[chck] == ' ') {
                chck--;
            }
            if (chuoi[i].id != "xoa") {
                ktxt = txt.substring(0, chck) + chuoi[i].id;
            }
            else {
                ktxt = "";
            }
            break;
        }

    }
    return ktxt;
}
var xulytxtinput = function (txt) {
    var chuoi = [
        { ten: "chấm than", id: '!' },
        { ten: "ba chấm", id: ' ...' },
        { ten: "hai chấm", id: ':' },
        { ten: "phẩy phẩy", id: "," },
        { ten: "chấm phẩy", id: ";" },
        { ten: "nháy đơn", id: "'" },
        { ten: "nháy kép", id: "\"" },
        { ten: "gạch xược", id: "\\" },
        { ten: "gạch chéo", id: "/" },
        { ten: "chấm chấm", id: "." },
        { ten: "chấm hỏi", id: "?" },
        { ten: "xóa xóa", id: "xoa" }];
    var ktxt = txt;
    for (var i = 0; i < chuoi.length; i++) {
        var chck = txt.lastIndexOf(chuoi[i].ten);
        if (chck > 1) {
            while (txt[chck] == ' ') {
                chck--;
            }
            if (chuoi[i].id != "xoa") {
                ktxt = txt.substring(0, chck) + chuoi[i].id;
            }
            else {
                ktxt = "";
            }
            break;
        }

    }
    return ktxt;
}

var converttxtToDate = function (txt) {
    var kt = txt.toLowerCase();
    var chuoingay = "";
    var rg = kt.split(' ');
    // console.log(kt);
    if (rg.length >= 6) {
        if (rg[5].length != 4)
            return "";
    }
    else {
        return "";
    }
    for (var i = 0; i < rg.length; i = i + 2) {
        var tt = rg[i + 1];
        if (Number(tt) != NaN && tt.length <= 4) {

            chuoingay += (tt.length == 1 ? '0' : '') + tt + "/";
        }
        else {
            return "";
            break;
        }

    }
    //console.log(kt);
    chuoingay = chuoingay.substring(0, chuoingay.length - 1);
    return chuoingay;
}
var viewlist = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    $('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');
    //$('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        $('#viewlist ul').append(`<li> <a data-id='${t.id}'> ${t.ten}</a> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}
var viewlist_kp = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    $('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        $('#viewlist ul').append(`<li> <a data-id='${t.id}' data-loai='${t.loai}'> ${t.ten}</a> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var al = $(this).attr('data-loai');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.attr('data-loai', al);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}

var viewlist_thuoc = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    //$('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul class="list-group"> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        $('#viewlist ul').append(`<li class="list-group-item list-group-item-primary"> <a data-ten='${t.ten}' data-id='${t.id}'> ${t.ten} </a> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}

var viewlist_dichvu = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    //$('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul class="list-group"> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        $('#viewlist ul').append(`<li class="list-group-item list-group-item-primary"> <a data-id='${t.id}'> ${t.ten}</a> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}
var viewlist_mau = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    $('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        $('#viewlist ul').append(`<li> <a data-id='${t.id}'> ${t.ten} - ${t.duongdung} - ${t.dang} </a> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}

var viewlist_new = function (inputtxt, sqld, fnback) {
    if ($('#viewlist').length == 0) {
        $('body').append(`
             <div id="viewlist" style="display:none;">            
                    </div>
            `);
        $('body').click(function () {
            $('#viewlist').css('display', 'none');
        });

    }

    $('#viewlist').css('top', ($('input[name=' + inputtxt + ']').offset().top + 35) + 'px');

    $('#viewlist').html('<ul> </ul>');
    //console.log(sqld);
    getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
        if (d.ok) {
            //console.log(d);
            if (d.data.length > 0) {
                var kq = d.data;
                if (kq.length > 1) {
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    kq.forEach(function (t, i) {
                        //$('#viewlist ul').append(`<li class="new">
                        //<div style="width:100%">${t.ten}</div>
                        //<div>
                        //    <div style="width:50%; float:left">${t.dang}</div>
                        //    <div style="width:50%; float:right">${t.hamluong}</div>
                        //</div>
                        //</li>`);

                        $('#viewlist ul').append(`<li class="new"><table border='1' style='border-collapse:collapse; width:100%'><tr><td colspan="2"><a data-id='${t.id}'> ${t.ten} </a></td></tr><tr><td style="width:50%; text-align:center">${t.dang}</td><td style="width:50%; text-align:center">${t.hamluong}</td></tr></table> </li>`);
                    });
                    $('#viewlist ul a').on('click', function () {
                        var av = $(this).attr('data-id');
                        var ac = $(this).html();
                        var xuchon = $('input[name=' + inputtxt + ']');
                        xuchon.attr('data-id', av);
                        xuchon.val(ac);
                        $('#viewlist ul').html('');
                        if (typeof fnback === "function") {
                            fnback();
                        }
                        //console.log(av + ' -' + ac);
                    });
                }
                else {
                    var kq = d.data[0];
                    var xuchon = $('input[name=' + inputtxt + ']');
                    xuchon.attr('data-id', kq.id);
                    xuchon.val(kq.ten);
                    $('#viewlist').html('<ul> </ul>');
                    $('#viewlist').css('display', 'block');
                    if (typeof fnback === "function") {
                        fnback();
                    }
                }
            }

        }
    });

}
var getid_cm_emr = function (mabv) {
    var dat1 = new Date();
    var txtlen = 24;
    if (typeof txtlength == 'number') {
        txtlen = txtlength;
    }
    var mabv = localStorage.getItem('idbv');
    var dat1 = new Date();
    var chuoiid1 = String(dat1.getFullYear()).substring(2) + (dat1.getMonth() <= 9 ? "0" : "") + (dat1.getMonth() + 1).toString() +
        dat1.getDate().toString() + (dat1.getHours() < 10 ? "0" : "") + dat1.getHours().toString()
        + (dat1.getMinutes() < 10 ? "0" : "") + dat1.getMinutes().toString() + (dat1.getSeconds() < 10 ? "0" : "") + dat1.getSeconds().toString()
        + (dat1.getMilliseconds() < 10 ? "0" : "") + dat1.getMilliseconds().toString()
        ;
    var c90 = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    return mabv + c90.substring(0, txtlen - (mabv.length + chuoiid1.length)) + chuoiid1;
}

var id_gerneral = function (length) {
    var dat1 = new Date();
    var txtlen = length;
    var rs = '';
    if (typeof txtlength == 'number') {
        txtlen = txtlength;
    }
    //var mabv = localStorage.getItem('idbv');
    var dat1 = new Date();
    var yymmddhhmiss = String(dat1.getFullYear()).substring(2) + (dat1.getMonth() <= 9 ? "0" : "") + (dat1.getMonth() + 1).toString() + (dat1.getDate() <= 9 ? "0" : "") +
        dat1.getDate().toString() + (dat1.getHours() < 10 ? "0" : "") + dat1.getHours().toString()
        + (dat1.getMinutes() < 10 ? "0" : "") + dat1.getMinutes().toString() + (dat1.getSeconds() < 10 ? "0" : "") + dat1.getSeconds().toString();
    var milisecond = (dat1.getMilliseconds() < 10 ? "0" : "") + dat1.getMilliseconds().toString();
    if ((yymmddhhmiss + milisecond).length < length) {
        var c20 = '00000000000000000000';
        rs = c20.substring(0, length - (yymmddhhmiss + milisecond).length);

    }
    var rs = yymmddhhmiss + rs + milisecond;
    return rs;
}

var getid_by_date = function (mabv, txtlength) {
    var dat1 = new Date();
    var txtlen = 24;
    if (typeof txtlength == 'number') {
        txtlen = txtlength;
    }
    var mabv = localStorage.getItem('idbv');
    var dat1 = new Date();
    var chuoiid1 = String(dat1.getFullYear()).substring(2) + (dat1.getMonth() <= 9 ? "0" : "") + (dat1.getMonth() + 1).toString() +
        dat1.getDate().toString() + (dat1.getHours() < 10 ? "0" : "") + dat1.getHours().toString()
        + (dat1.getMinutes() < 10 ? "0" : "") + dat1.getMinutes().toString() + (dat1.getSeconds() < 10 ? "0" : "") + dat1.getSeconds().toString()
        + (dat1.getMilliseconds() < 10 ? "0" : "") + dat1.getMilliseconds().toString()
        ;
    var c90 = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    return mabv + c90.substring(0, txtlen - (mabv.length + chuoiid1.length)) + chuoiid1;
}
var get_ten_khoa = function () {
    var makp = localStorage.getItem('makp');
    var mabv = localStorage.getItem('idbv');

    let sql = eval("`select * from cm_Danhmuc.btdkp_bv where mabv ='${mabv}' and id_kp='${makp}'`");
    var json = JSON.stringify({ sql: sql });
    getDatabySql(json, function (data) {
        if (data.ok) {
            $('.tieude').html(data.data[0].ten + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'Bác sỹ&nbsp;:&nbsp;' + localStorage.getItem('hoten'));
        }
        else {
            $('.tieude').html('CYBERMEDISOFT');
        }
    })
}
$(document).ready(function () {
    $('#pagehiendien .head .navbar table').css("width", screen.width - 4);
    $('#btnthoat').click(function () {
        navigator.notification.confirm(
            'Có muốn thoát chương trình không?', // message
            function (buttonIndex) {

                if (buttonIndex == 1) {
                    localStorage.clear();
                    navigator.app.exitApp();
                }
            },            // callback to invoke with index of button pressed

            'Thống báo',           // title
            ['Có', 'Không']     // buttonLabels
        );

    });
    $('input').on('keyup', function () {
        var t = $(this).val();
        if (t.split(' ').length >= 2) {
            $(this).val(xulytxtinput(t));
        }

    });
    $('textarea').on('keyup', function () {
        var t = $(this).val();
        if (t.split(' ').length >= 2) {
            $(this).val(xulytxt(t));
        }
});
    });



