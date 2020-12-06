var idchidinhdv = '';

let adddichvu = function () {
    
    $('#adddichvuModal').modal('show');
}


var load_chidinh = function () {
    //debugger
    var chidinh = eval(data_sql.current_chidinh);
    var json = JSON.stringify({ sql: chidinh });
    getDatabySql(json, function (data) {

        var html = '';
        if (data.ok) {
            var div = '';

            var rs = data.data;
            for (var i = 0; i < rs.length; i++) {
                div += '<div class="bn">';
                div += '<div class="img_bn">';
                div += '<img src="images/thuoc_img.jpg" alt="Alternate Text" />';
                div += '</div>';
                div += '<div class="bn_info toathuoc_info text-left" data-id=';
                div += rs[i].id_ct;
                div += '>'
                div += '<label style="color:red">Ngày:' + rs[i].ngay + '</label><br />';
                div += '<label>Tên dịch vụ: ' + rs[i].ten + '</label><br />';
                div += '<label>Số lượng:' + rs[i].soluong + ' </label><br/>';
                div += '</div>';
                div += '<div class="arrow" style="padding:15px" onclick="del_dv(this);"><a href="#" data-id="'+rs[i].id_ct+';">';
                div += '<i class="fa fa-trash" aria-hidden="true"></i>';
                div += '</a>';
                div += '</div>';
                div += '</div>';
            }
            $("#lichsudichvu").html(div);
        } else {
            html += "<tr><td width = '5%'><p style='text-align: center;'>Không có dịch vụ</p></td></tr>";
            $(".ds_chidinh").html(html);
        }
    });
};
var del_dv = function (v) {
    
    var id_ct = v.firstChild.dataset.id;
    var mabv = localStorage.getItem("idbv");
    var del_dv = eval(data_sql.del_chidinhdvct);

    var json = JSON.stringify({ sql: del_dv });
    executeQuery(json, function (data) {

        if (data.data > 0) {
            alert("Đã xóa", 'success');
            load_chidinh();
        } else {
            alert("Lỗi xóa", 'error');
        }
    });
}
var loaddoituong = function () {
    var mabv = localStorage.getItem("idbv");
    var dt = eval(data_sql.load_dt);
    var js = JSON.stringify({ sql: dt });
    getDatabySql(js, function (data) {
        if (data.ok) {
            var rs = data.data;
            var html = '';
            for (var i = 0; i < rs.length; i++) {
                html += `<option value='${rs[i].id}'>${rs[i].ten}</option> `;
            }
            $('#sltdoituong').html(html);
        };
    });
}

var load_dv = function (arr) {

    var mabn = localStorage.getItem('mabn');
    var maql = localStorage.getItem('maql');

    //UNION MEDIBV thang nam
    var dichvu = eval(data_sql.select_dichvu_all);
    //var thuoc = eval(data_sql.select_thuoc_noitru_temp);

    var json = JSON.stringify({ sql: dichvu });
    getDatabySql(json, function (data) {

        var html = '';
        if (data.ok) {
            var rs = data.data;
            var ngaylist = $("#left ul");
            var temp = [];
            for (var i = 0; i < rs.length; i++) {
                //html += '<tr><td width="5%"><div class="group-btn"><a href="#" class="delete">';
                //html += '<img class="deleteimg" src="images/icons-png/abc.ico" alt="Smiley face"></a>';
                //html += `</div></td><td><label>${rs[i].ten}</label></td>`;
                //html += `<td>${rs[i].soluong} ${rs[i].dang}</td></tr>`;
                if (temp.indexOf(rs[i].ngaysort) == -1) {
                    html += ` <li><a href="#">${rs[i].ngay}</a></li> `;
                    temp.push(rs[i].ngaysort);
                }

            }
            //$(".ds_thuoc").html(html);
            ngaylist.html(html);

            $("#left ul a").on("click", function (v) {
                var current = v.currentTarget.innerHTML;

                var dv = eval(data_sql.select_dichvu_all);
                dv = ` select * from (` + dv + `) where ngay='${current}' `;

                var json = JSON.stringify({ sql: dv });
                getDatabySql(json, function (data) {
                    var html = '';
                    if (data.ok) {
                        var rs = data.data;
                        var ngaylist = $("#left ul");
                        var temp = [];
                        for (var i = 0; i < rs.length; i++) {
                            html += '<tr>';
                            html += `<td class="td1"><label>${rs[i].ten}</label></td>`;
                            html += `<td class="td2">${rs[i].soluong}</td></tr>`;
                        }
                        $("#lsdichvu").html(html);
                        $("#right").css("height", screen.height - $("#page-o").height() - $(".soap").height() - 20 + 'px');
                        $("#lichsudv #left").css("height", screen.height - $("#page-o").height() - $(".soap").height() - 20 + 'px');

                        $('#left li').each(function (i, v) {
                            let idba_ = $(v)[0].children[0].innerHTML;
                            if (current == idba_) {
                                $(v).closest('li').addClass('active');
                            }
                            else {
                                $(v).closest('li').removeClass('active');
                            }
                        });
                    }
                    else {
                        $("#lsdichvu").html("<tr><td colspan='2'>Không tìm thấy dịch vụ</td></tr>");
                    }
                });

            });
        }
    });
};
var idchidinh = id_gerneral(22);

var add = function () {
    //debugger
    var dv = $('input[name=fdichvu]').val();
    if (dv == '') {
        alert("Chưa nhập dịch vụ", 'warning');
        return;
    }
    var id_dv = $('input[name=fmadv]').val();
    if (id_dv == '') {
        alert("Chưa nhập mã dịch vụ", 'warning');
        return;
    }
    var soluong = $('input[name=fsoluong]').val();
    if (soluong == '') {
        alert("Chưa nhập số lượng", 'warning');
        return;
    }

    //(id, mabn, mavaovien, maql, makp, mabs, ngay, tinhtrang, mabv)
    var id = idchidinhdv == '' ? id_gerneral(22) : idchidinhdv;
    idchidinhdv = id;
    var mabn = localStorage.getItem("mabn");
    var mavaovien = localStorage.getItem("mavv");
    var maql = localStorage.getItem("maql");
    var makp = localStorage.getItem("makp");
    var mabs = localStorage.getItem("mabs");
    var tinhtrang = '0000001000';
    var mabv = localStorage.getItem("idbv");
    var ngay = $("input[name=ngay]")[0].value;
    //var ngay1 = moment(`${ngay}`, 'YYYY-MM-DD').format("DD MMM YYYY");
    var up_dv = eval(data_sql.update_chidinhdv);
    var up_json = JSON.stringify({ sql: up_dv });

    var ins_dv = eval(data_sql.insert_chidinhdv);
    var ins_json = JSON.stringify({ sql: ins_dv });

    //var value = new moment().format('YYYY-MM-DD');
    partition_key('cm_data', 'cm_chidinhdv', mabv, maql);

    executeQuery(up_json, function (data) {

        if (data.data > 0) {
            alert("Đã cập nhật chidinhdv", "success");
            exe_dvct();
        } else {
            executeQuery(ins_json, function (data) {
                if (data.data > 0) {
                    //alert("Đã thêm chidinhdv", "success");
                    exe_dvct();
                } else {
                    alert(data.data, "error");
                }
            });
        }
    });
    
};
var stt = 0;
var exe_dvct = function () {
    //debugger
    //(id_ct, id, id_dv, stt, madoituong, soluong, dongia, tinhtrang, mabv
    var id_ct = getid();
    var id = idchidinhdv;
    var madoituong = $("#sltdoituong")[0].value;
    var soluong = $('input[name=fsoluong]').val();
    var id_dv = $('input[name=fmadv]').val();
    stt++;
    var dongia = $('input[name=fdichvu]').attr('data-id').split('#')[1];
    var tinhtrang = '0000001000';
    var mabv = localStorage.getItem("idbv");
    var ins_dv = eval(data_sql.insert_chidinhdvct);
    var ins_json = JSON.stringify({ sql: ins_dv });

    partition_key('cm_data', 'cm_chidinhdvct', 'id', id);

    executeQuery(ins_json, function (data) {

        if (data.data > 0) {
            alert("Đã thêm dịch vụ", "success");
            $('#adddichvuModal').modal('hide');

            load_chidinh();
            $('input[name=fdichvu]').val('');
            $('input[name=fmadv]').val('');

        } else {
            alert("Lỗi thêm chidinhdvct", "error");
        }
    });
}

var getid = function (mabv) {
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
    return chuoiid1 + c90.substring(0, txtlen - (mabv.length + chuoiid1.length)) + mabv;
}

$(function () {
    var ngay = new Date().getFullYear() + '-' + (new Date().getMonth() < 9 ? '0' : '') + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + 'T' + (new Date().getHours() < 10 ? '0' : '') + (new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' : '') + (new Date().getMinutes());
    $('input[name=ngay]').val(ngay);

    $(".add").on("click", function () {
        add();
    });

    $(".view").on("click", function () {
        view_lichsu();
    });

    load_chidinh();
    loaddoituong();
    load_dv();

    $('input[name=fdichvu]').on('keyup', function () {
        var v = $(this).val();
        
        if (v.length > 0) {
            v = v.toLowerCase();
            //var sqld = `select id, ten from cm_danhmuc.cm_dmdv where lower(ten) like '%${v}%' limit 50`;

            var madt = $("#sltdoituong")[0].value;
            var mabv = localStorage.getItem("idbv");
            //var sqld = ` select a.id||'#'||b.dongia id, a.ten from cm_danhmuc.cm_dmdv a inner join cm_danhmuc.cm_dmdvgia b on a.id=b.id::text and b.mabv='${mabv}' where a.mabv='${mabv}' and b.madoituong=${madt} and lower(ten) like '%${v}%' limit 50 `; // and b.matuongduong is not null
            var sqld = ` select a.id||'#'||b.dongia id, a.ten from cm_danhmuc.cm_dmdv a inner join cm_danhmuc.cm_dmdvgia b on a.id=b.id::text and b.mabv='${mabv}' where  b.madoituong=${madt} and lower(ten) like '%${v}%' limit 50 `;
            viewlist_dichvu('fdichvu', sqld, function () {
                var data_id = $('input[name=fdichvu]').attr('data-id');
                $('input[name=fmadv]').val(data_id.split('#')[0]);
            });
        }

    });
});