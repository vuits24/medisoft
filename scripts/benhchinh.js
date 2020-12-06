var get_benhchinh_ = function () {
    var maql = localStorage.getItem('maql');
    var mabv = localStorage.getItem("idbv");

    var sql_nk = eval(data_sql.a_load_nhapkhoa);
    getDatabySqlJSON(sql_nk, function (nk) {
        if (nk.ok) {
            if (nk.data.length > 0) {
                var ds = nk.data[0];
                $('#cdlvk').html(ds.chandoan);//chan doan luc vao khoa
                $('input[name=fcdcckb]').attr('data-id', ds.maicd);
                $('input[name=ficd_cdcckb]').val(ds.ma);
                $('#ngayvaokhoa').html(ds.ngay);//ngay vao khoa
                $('#giuong').html(ds.giuong);//giuong 
                $('#bs_vaokhoa').html(ds.ten_bs);//tenbac sy
                $('#lan').html(ds.lan);
                $('input[name=fbacsy]').attr('data-id', ds.mabs);
                $('#khoa_nhapkhoa').html(ds.ten_kp);
                $('input[name=fkhoa]').attr('data-id', ds.id_kp);
            }
        }
    });

}

//benh kem theo
var getct_lienquan = function () {
    let maql = localStorage.getItem('maql');
    if (maql != '') {
        //        var sqld = `           
        //select a.id,a.maql, maicd,c.cicd10 ma,c.vviet ten, a.ngayud
        //from medibv.cdkemtheo a
        //inner join medibv.icd10 c on a.maicd =c.cicd10 
        //where a.maql ='${maql}' and a.id_loaicd=${malienquan}`;
        var mabv = localStorage.getItem("idbv");
        var sqld = eval(data_sql.a_load_chandoankemtheo);

        getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
            if (d.ok && d.data.length > 0) {
                var ds = d.data;
                var tbds = $('#ds-ten-benh table');
                var tr = '';
                ds.forEach(function (v, i) {
                    tr += `<tr data-id="${v.id}">
 <td>
                                            <div class="group-btn">                          
                                               <a href="#" class="delete" data-toggle="modal" data-target="#xoaModal"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></a>
                                             </div>
                                            </td>
                                   
                                    <td>${v.ten}</td>
                                     <td>${v.ma}</td>                                   
                                   
                                </tr>
                    `;
                });
                tbds.html(tr);
                $('a.delete').on('click', function () {
                    //debugger
                    var check_id = localStorage.getItem('id_benhkemtheo');
                    if (check_id != null) {
                        localStorage.removeItem('id_benhkemtheo');
                    }
                    
                    var kq = $(this).closest('tr').attr('data-id');
                    localStorage.setItem('id_benhkemtheo', kq);
                });
            }
            else {
                var tbds = $('#ds-ten-benh table');
                var tr = '';
                tr += `<tr ><td style="text-align: center;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Chưa có dữ liệu bệnh kèm</td></tr>`;
                tbds.html(tr);
            }
        });
    }
    else {
        $('table.khai-bao-ten-benh').html('');
    }

}
var xoa = function (id) {
    var mabv = localStorage.getItem("idbv");
    var sqlud = eval(data_sql.a_xoa_sqlud);
    executeQuery(JSON.stringify({ sql: sqlud }), function (d) {
        if (d.ok) {
            //load danh sach
            alert('Xóa thành công', 'success');
            getct_lienquan();
        }
    });
}

var get_icd10 = function () {
    //$('input[name=ftenbenh]').on('keyup', function () {
    //    var v = $(this).val();

    //    if (v.length > 0) {
    //        v = v.toLowerCase();
    //        var sqld = `select id, ma, ma||' - '||ten ten from cm_danhmuc.icd10 where lower(ten) like '%${v}%' limit 50`;
    //        viewlist('ftenbenh', sqld, function () {
    //            var data_id = $('input[name=ftenbenh]').attr('data-id');
    //            $('input[name=fmaicd]').val(data_id);
    //        });
    //    }

    //});
    $('input[name=fmaicd]').on('change', function () {
        var v = $(this).val();
        if (v.length > 0) {
            v = v.toLowerCase();
            var sqld = `select id, ma, ten from cm_data.icd10 where lower(ma) like '%${v}%' limit 50`;
            getDatabySql(JSON.stringify({ sql: sqld }), function (d) {
                if (d.ok) {
                    //console.log(d);
                    if (d.data.length > 0) {

                        var kq = d.data;
                        if (kq.length > 0) {
                            var xuchon = $('input[name=ftenbenh]');
                            xuchon.attr('data-ma', kq[0].ma);
                            xuchon.attr('data-id', kq[0].id);
                            xuchon.val(kq[0].ten);
                            $('input[name=fmaicd]').val(kq[0].ma);
                        }


                    }

                }
                else {

                }
            });
        }

    });
}
var stt = 0;
var capnhatbenhkemtheo = function (maicd, chuandoan, ngay) {
    chuandoan = chuandoan.replace(chuandoan.split(" - ")[0] + " - ", "");
    var maql = localStorage.getItem('maql');
    //var ctbn = gethiendienct(maql);
    var mabn = localStorage.getItem('mabn');
    //var idbn = ctbn.idbn;
    var makp = localStorage.getItem("makp");
    var mavaovien = localStorage.getItem("mavv");
    //var mavien = localStorage.getItem('idbv');
    var mavien = localStorage.getItem('idbv');
    var chuoiid = getid_by_date(mavien);

    var rs = chuoiid.slice(30, chuoiid.length);
    var mabv = mavien;
    var userid = localStorage.getItem("userid");
    stt++;
    var loai = 1; //temp
    var sqlud = eval(data_sql.a_insert_benhkemtheo);

    partition_key('cm_data', 'cdkemtheo', 'maql', maql);
    executeQuery(JSON.stringify({ sql: sqlud }), function (d) {
        if (d.ok) {
            getct_lienquan();
        }
        else {
            alert('Mời nhập dữ liệu', 'error');
        }
    });
}

//benh kemm theo


$(function () {
    get_benhchinh_();
    getct_lienquan();
    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    //benh kem theo


    var maql = localStorage.getItem('maql');

    getct_lienquan();
    $('.add').on('click', function () {
        //debugger
        if ($('input[name = ftenbenh]').val() != '') {
            var tenbenh = $('input[name=ftenbenh]');
            var ndtenbenh = tenbenh.val();
            var icdbenh = tenbenh.attr('data-id');
            var fngay = $('input[name=fngay]').val();
            var ngaykhamddmmyy = converttxt_dmyToymd(fngay);
            capnhatbenhkemtheo(icdbenh, ndtenbenh, ngaykhamddmmyy);
            $('input[name=ftenbenh]').val('');
            $('input[name=ftenbenh]').attr('data-id', '');
            $('input[name=fmaicd]').val('');
            $('input[name=fngay]').val(convertddmmyyyy(new Date()));
        }
        else {
            $('input[name=ftenbenh]').alert('mời nhập dữ liệu', 'warn');
            $('input[name=ftenbenh]').css('border-color', 'red');
        }
    });


    $('input[name=fngay').on('keyup', function () {
        var v = converttxtToDate($(this).val());
        if (v != '') {
            $(this).val(v);
        }
    });
    $('input[name=fngay]').val(convertddmmyyyy(new Date()));
    get_icd10();


    var h = $(window).height();
    $(".ds-ten-benh").css("height", h / 2.5);

    $('button.delete2').on('click', function () {
      
        var kq = localStorage.getItem('id_benhkemtheo');
        xoa(kq);
        localStorage.removeItem('id_benhkemtheo');
        $('#xoaModal').modal('hide');
    })
       
})