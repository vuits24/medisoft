let toathuoccu = function () {
    
    var mabn = localStorage.getItem('mabn');
    var maql = localStorage.getItem('maql');
    var mabv = localStorage.getItem('idbv');
    var mabs = '101';
    //var mabs = localStorage.getItem('mabs');
    var lsthuoc = eval(data_sql.lichsuthuoc_bs);
    getDatabySql(JSON.stringify({ sql: lsthuoc }), function (data) {
        //debugger
        var html = '<ul class="thuoc_toacu list-group" id="test">';
        if (data.ok) {
            for (var i = 0; i < data.data["length"]; i++) {
                html += '<li class="toacu list-group-item" data-id=' + data.data[i].id_bd + ' >'  + data.data[i].ten + '</li>';
            }
            html += '</ul>';
            $('#list_toacu').html(html);
            $('#caplaiModal').modal('show');
        }
        
        else {
            $('#caplaiModal').modal('show');
        }
        //$.alert({
        //    title: 'Lịch sử cấp toa!',
        //    content: html,
        //});
        //$("#old_thuoc>tr").on("click", function () {
        //    debugger
        //    var id = $(this).attr("data-id");
        //    //$(this).css("background", "#30b20b");

        //    $("#old_thuoc>tr").each(function (i, v) {
        //        $(v).closest('tr').removeClass('active');
        //    });

        //    $(this).addClass("active");

        //    //localStorage.setItem("id_sua", id);
        //});

    })
}





var loadthuoc_new = function () {
    //debugger
    $("div#lichsutoathuoc").html('Không có dữ liệu');
    //var mabn = localStorage.getItem('mabn');
    var mabn = localStorage.getItem('mabn');
    var mabv = localStorage.getItem('idbv');
    var sqlctthuoc = eval(data_sql.chitietthuoc);
    getDatabySql(JSON.stringify({ sql: sqlctthuoc }), function (data) {
        if (data.ok) {
            //debugger
            var ctthuoc = data.data;
            //var ds = ctthuoc.reduce((p, c) => [...p, { chandoan: c.chandoan, ngay: c.ngay, id: c.id, hotenbs: c.hotenbs }], []);
            localStorage.setItem('listthuoc', JSON.stringify(data));
            if (ctthuoc.length > 0) {
                var div = '';
                for (var i = 0; i < ctthuoc.length; i++) {
                    div += '<div class="bn">';
                    div += '<div class="img_bn">';
                    div += '<img src="images/thuoc_img.jpg" alt="Alternate Text" />';
                    div += '</div>';
                    div += '<div class="bn_info toathuoc_info text-left" data-id=';
                    div +=  ctthuoc[i].id ;
                    div+=   '>'
                    div += '<label style="color:red">Ngày:'+ctthuoc[i].ngay+'</label><br />';
                    div += '<label>Bác sỹ: '+ctthuoc[i].hotenbs+'</label><br />';
                    div += '<label>Chẩn đoán:'+ctthuoc[i].chandoan+' </label><br/>';
                    div += '</div>';
                    div += '<div class="arrow">';
                    div += '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
                    div += '</div>';
                    div += '</div>';

                }
                //var div = ctthuoc.reduce((div, ht, i) => div + `<div class="img_bn">
                //                                                    <img src="images/thuoc_img.jpg" alt="Alternate Text" />
                //                                                </div>
                //                                                <div class="bn_info toathuoc_info" data-id="${ht.id}"> 
                //                                                    <label style="color:red">Ngày: ${ht.ngay}</label><br />
                //                                                    <label>Bác sỹ: ${ht.hotenbs}</label><br />
                //                                                    <label>Chẩn đoán:${ht.chandoan} </label><br/>
                //                                                </div>
                //                                                <div class="arrow">
                //                                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                //                                                </div>`, '');


                $("#lichsutoathuoc").html(div);
            }


            else {
                $('.ctthuoc').html('ko co ngay cap thuoc');
            }

            $("div.toathuoc_info").on('click', function (v) {
                //debugger
                $('#thongtin').html('');

                
                //var object = $('.boxthuoc');
                //object.show();
                //$('.thoat').click(function () {
                //    object.hide();
                //});
                var idkham = v.currentTarget.dataset.id;
                var mabn = localStorage.getItem("mabn");
                var sqlct = eval(data_sql.popupchitiet_old);
                getDatabySql(JSON.stringify({ sql: sqlct }), function (data) {
                    if (data.ok) {
                        var html = '<table class="thuoc_lichsu">';
                        var chitiet = data.data;
                        var ds = chitiet.reduce((p, c) => [...p, { ngay: c.ngay, tenthuoc: c.tenthuoc, duongdung: c.duongdung, cachdung: c.cachdung, dang: c.dang, hamluong: c.hamluong }], []);
                        //localStorage.removeItem('listbn');
                        localStorage.setItem('listnk', JSON.stringify(ds));
                        if (chitiet.length > 0) {
                            var hihi = '';
                            for (let i=0; i < chitiet.length; i++) {
                                hihi += '<table class="table">';
                                hihi += '<tr>';
                                hihi += '<td>Tên thuốc</td>';
                                hihi += '<td>' + chitiet[i].tenthuoc + '</td>';
                                hihi += '</tr>';
                                hihi += '<tr>';
                                hihi += '<td>Cách dùng</td>';
                                hihi += '<td>' + chitiet[i].cachdung + '</td>';
                                hihi += '</tr>';
                                hihi += '</table>';
                            }

                            $('.chitiet_tt').html(hihi);
                            $('#cttoathuocModal').modal('show');
                      

                        }
                        else {

                            $('#thongtin').html('<tr> <td colspan="2" style="text-align: center;color:#f00;">Không có bệnh nhân </td> </tr>');
                        }

                    }
                });
            });
        }

    });
};


var addthuoc = function () {
    $('#addthuocModal').modal('show');
}


var change_cachdung = function () {
    //debugger
    var txt = '';
    var slngay = $("input[name=txtslngay]")[0].value;
    if (slngay != null && slngay != '') {
        txt += "Ngày " + slngay + " lần.";
    }

    var sllan = $("input[name=txtsllan]")[0].value;
    var dang = $('#sll_dang').html();
    if (sllan != null && sllan != '') {
        txt += " Lần " + sllan + " " + dang + ".";
    }

    var cachngay = $("input[name=txtcachngay]")[0].value;
    if (cachngay != null && cachngay != '') {
        txt += " Dùng trong " + cachngay + " ngày.";
    }

    $("#cachdung").val(txt);
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

var idchidinhbd = '';
var idchidinhbdct = '';
var iddutruct = '';
var stt = 0;

var add = function () {
    debugger
    var id = idchidinhbd == '' ? getid() : idchidinhbd;
    idchidinhbd = id;
    var mabn = localStorage.getItem("mabn");
    var mavaovien = localStorage.getItem("mavv");
    var maql = localStorage.getItem("maql");
    var makp = localStorage.getItem("makp");
    var mabs = localStorage.getItem("mabs");
    var tinhtrang = "0000001000";
    var ngay = $("input[name=ngay]")[0].value;
    var daduyet = 0;
    var idduyet = id;
    var mabv = localStorage.getItem("idbv");
    var loaiba = localStorage.getItem("loaiba");
    if (loaiba == null)
        loaiba = 1;

    var up_thuoc = eval(data_sql.update_chidinhbd);
    var up_json = JSON.stringify({ sql: up_thuoc });

    var ins_thuoc = eval(data_sql.insert_chidinhbd);
    var ins_json = JSON.stringify({ sql: ins_thuoc });

    // kiem tra thong tin nhap
    var thuoc = $("input[name=ngay]")[0].value;
    if (thuoc == '' || thuoc == null) {
        alert("Chưa chọn ngày", "warning");
        return;
    }
    var thuoc = $("input[name=fthuoc]")[0].value;
    if (thuoc == '' || thuoc == null) {
        alert("Chưa nhập thuốc", "warning");
        return;
    }
    var thuoc = $("input[name=txtslngay]")[0].value;
    if (thuoc == '' || thuoc == null) {
        alert("Chưa nhập số lần / ngày", "warning");
        return;
    }
    var thuoc = $("input[name=txtsllan]")[0].value;
    if (thuoc == '' || thuoc == null) {
        alert("Chưa nhập số lượng / lần", "warning");
        return;
    }
    var thuoc = $("input[name=txttongsl]")[0].value;
    if (thuoc == '' || thuoc == null) {
        alert("Chưa nhập tổng số lượng thuốc", "warning");
        return;
    }
    //partition_ngay('cm_data', 'cm_chidinhbd', 'ngay', ngay);
    partition_ngay('cm_data', 'cm_chidinhbd', mabv, ngay);
    exe_chidinhbd(up_json, ins_json);
    //var loaiba = localStorage.getItem("loaiba");
    //if (loaiba == 1) {
    //    exe_dutrull();
    //}
}



var exe_chidinhbd = function (up_json, ins_json) {

    executeQuery(up_json, function (data) {
        if (data.data > 0) {

            // Chidinhbdct
            alert("Đã cập nhật chidinhbd!", "success");
            var loaiba = localStorage.getItem("loaiba");
            //if (loaiba == 1) {
            //    exe_dutrull();
            //}
            exe_chidinhbdct();

        } else {

            executeQuery(ins_json, function (data) {
                if (data.ok) {
                    var loaiba = localStorage.getItem("loaiba");
                    //if (loaiba == 1) {
                    //    exe_dutrull();
                    //}
                    // Chidinhbdct
                    exe_chidinhbdct();
                    //alert("Đã thêm!", "success");
                } else {
                    alert("Lỗi insert chidinhbd!", "error");
                }
            });
        }
    });
}

var exe_chidinhbdct = function () {

    //(id_ct, id, id_bd, stt, madoituong, soluong, dongia, slngay, sllan, cachngay, songay, duongdung, thoigian, cachdung, tinhtrang, kho, nguon, idduyet, mabv
    var id_ct = idchidinhbdct == '' ? getid() : idchidinhbdct;
    var id_bd = $("input[name=fthuoc]")[0].dataset.id.split('-')[0];
    var id = idchidinhbd;
    iddutruct = id_ct;
    var idduyet = id;
    stt = stt + 1;
    var madoituong = $("input[name=doituong]:checked")[0].value;
    var soluong = $("input[name=txttongsl]")[0].value;
    var dongia = 123; //temp
    var slngay = $("input[name=txtslngay]")[0].value;
    var sllan = $("input[name=txtsllan]")[0].value;
    var cachngay = $("input[name=txtcachngay]")[0].value == '' ? 0 : $("input[name=txtcachngay]")[0].value;
    var songay = soluong / slngay / sllan;
    var duongdung = $("input[name=fduongdung]")[0].value;
    var thoigian = ' '; //temp
    var tenthuoc = $("input[name=fthuoc]")[0].value;
    var mabn = localStorage.getItem('mabn');
    var cachdung = $("textarea[name=fcachdung]")[0].value == null ? '' : $("textarea[name=fcachdung]")[0].value;
    var tinhtrang = '0000001000';
    var kho = 0; //temp
    var nguon = 0; //temp
    var mabv = localStorage.getItem("idbv");
    var maql = localStorage.getItem("maql");

    var up_thuoc = eval(data_sql.update_chidinhbdct);
    var up_json = JSON.stringify({ sql: up_thuoc });

    var ins_thuoc = eval(data_sql.insert_chidinhbdct);
    var ins_json = JSON.stringify({ sql: ins_thuoc });
    var ngay = $('input[name=ngay]').val();
    partition_key('cm_data', 'cm_chidinhbdct', mabv, id);

    executeQuery(up_json, function (data) {

        if (data.data > 0) {
            alert("Đã cập nhật ct!", "success");
            var loaiba = localStorage.getItem("loaiba");
            if (loaiba == 1) {
                exe_dutruct();
            }
            //exe_duyet();
            idchidinhbdct = '';
            current_pharmacine();
            reset();
        } else {
            executeQuery(ins_json, function (data) {
                if (data.data > 0) {
                    alert("Chỉ định thành công", "success");
                    var loaiba = localStorage.getItem("loaiba");
                    //if (loaiba == 1) {
                    //    exe_dutruct();
                    //}
                    //exe_duyet();
                    idchidinhbdct = '';
                    current_pharmacine();
                    reset();
                    $('#addthuocModal').modal('hide');
                    location.reload();
                } else {
                    alert("Lỗi ct!");
                    stt = stt - 1;
                }
            });
        }
    });
}


var exe_dutruct = function () {
    //(id, id_dutrull, stt, madoituong, mabd, slthuc, cachdung, solan, lan)
    var id = iddutruct;
    var id_dutrull = idchidinhbd;
    var madoituong = $("input[name=doituong]:checked")[0].value;
    var mabd = $("input[name=fthuoc]")[0].dataset.id.split('-')[0];
    var slyeucau = $("input[name=txttongsl]")[0].value;
    var cachdung = $("textarea[name=fcachdung]")[0].value == null ? '' : $("textarea[name=fcachdung]")[0].value;
    var solan = $("input[name=txtslngay]")[0].value;
    var lan = $("input[name=txtsllan]")[0].value;

    var ins_dutruct = eval(data_sql_new.insert_dutruct);
    var json_ins = JSON.stringify({ sql: ins_dutruct });
    executeQuery(json_ins, function (data) {

        if (data.data > 0) {
            alert("Đã thêm dutruct", "success");
        } else {
            alert("Lỗi thêm dutruct", "error");
        }
        iddutruct = '';
    });

}

var reset = function () {
    $('input[name=fduongdung]').val('');
    $('input[name=dang]').val('');
    $('input[name=fthuoc]').val('');
}


var current_pharmacine = function () {
    var mabn = localStorage.getItem('mabn');
    var mabv = localStorage.getItem('idbv');
    var id = idchidinhbd;
    ////debugger
    //UNION MEDIBV thang nam
    var thuoc = eval(data_sql.show_toathuoc);

    var json = JSON.stringify({ sql: thuoc });
    getDatabySql(json, function (data) {
        var html = '';
        if (data.ok) {
            var rs = data.data;
            for (var i = 0; i < rs.length; i++) {
                html += `<tr><td width="5%"><div class="group-btn" onclick='edit_thuoc(this);'><a href="#" class="delete" data-id='${rs[i].id_ct}'>`;
                html += '<img class="deleteimg" src="images/icons-png/abc.ico" alt="Smiley face"></a>';
                html += `</div></td><td><label>${rs[i].ten}</label></td>`;
                html += `<td>${rs[i].soluong} ${rs[i].dang}</td></tr>`;
            }
            $(".ds_thuoc").html(html);
        } else {
            html += "<tr><td width = '5%'><p style='text-align: center;'>Không có thuốc</p></td></tr>";
            $(".ds_thuoc").html(html);
        }

    });
}



$(function () {
    var ngay = new Date().getFullYear() + '-' + (new Date().getMonth() < 9 ? '0' : '') + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + 'T' + (new Date().getHours() < 10 ? '0' : '') + (new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' : '') + (new Date().getMinutes());
    $('input[name=ngay]').val(ngay);

    $('input[name=fthuoc]').on('keyup', function () {
        var v = $(this).val();

        if (v.length > 0) {
            v = v.toLowerCase();

            //var sqld = `select a.id||'-'||duongdung||'-'||dang id,dang, hamluong, a.ten from cm_danhmuc.cm_dmbd a inner join cm_meta.cm_dmnhomdv1 b on b.id = a.id_nhomdv1 where b.loai_dv1 = 1 and lower(a.ten) like '%${v}%' limit 50`;
            var mabv = localStorage.getItem("idbv");
            ////debugger
            var sqld = `select a.id||'-'||duongdung||'-'||dang id,dang,duongdung, hamluong, a.ten from cm_danhmuc.cm_dmbd a inner join cm_meta.cm_dmnhomdv1 b on b.id = a.id_nhomdv1 where a.mabv='${mabv}' and lower(a.ten) like '%${v}%' and atc<>'=HC' and atc<>'VTYT' and left(atc,3)<>'05C' and atc<>'' limit 50`;

            viewlist_thuoc('fthuoc', sqld, function () {

                var data_id = $('input[name=fthuoc]').attr('data-id');
                var dd = data_id.split('-')[1];
                var dang = data_id.split('-')[2];
                $('input[name=fduongdung]').val(dd);
                $('#sll_dang').html(dang);
                $('#dang').html(dang);
            });
        }

    });
    loadthuoc_new();

    $("button#add").on("click", function () {
        //alert('ok');
        add();
    });

    $("#tongsl").on("keyup", function () {
        change_cachdung();
    });
    $("#slngay").on("keyup", function () {
        change_cachdung();
    });
    $("#sllan").on("keyup", function () {
        change_cachdung();
    });
    $("#cachngay").on("keyup", function () {
        change_cachdung();
    });
})