
var loadbn = function () {
    //debugger
    var chon = $('#dskp').val();
    var idkp = $('#dskp').attr('data-id');
    var loai = $('#dskp').attr('data-loai');

    if (loai == 1) {
        $("#tr_tinhtrang").show();
    } else {
        $("#tr_tinhtrang").hide();
    }

    var tt = $('#dstinhtrang')[0].value;

    var txtdate = new Date($('#txtDate').val());
    localStorage.setItem('makp', idkp);
    localStorage.setItem('index_makp', this.selectedIndex);
    dshiendien(idkp, txtdate, loai, tt);
}
var convert = function (dt) {
    var t = new Date(dt);
    var yy = t.getFullYear();
    var dd = t.getDate();
    var mm = t.getMonth() + 1;
    return yy + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
}
var dshiendien = function (idkp, dt, loai, tt) {

    var ddmmyy = convertddmmyyyy(dt);
    //var ngaychon = convert(dt);
    var mabv = localStorage.getItem("idbv");
    $('#hiendientable').html('');

    var sqlhd = ``;
    if (loai == 1) {
        if (tt == 1) {
            sqlhd = eval(data_sql.phongkham_roi);
            //sqlhd = eval(data_sql.hiendien);
        } else {
            sqlhd = eval(data_sql.phongkham_chua);
            //sqlhd = eval(data_sql.hiendien);

        }
    } else {

        sqlhd = eval(data_sql.hiendien);
    }

    //  //console.log(sqlhd);
    getDatabySql(JSON.stringify({ sql: sqlhd }), function (data) {
        //console.log(data);

        if (data.ok) {

            var lshd = data.data;

            localStorage.setItem("madt", lshd[0].madoituong);

            localStorage.removeItem('hiendien');
            //localStorage.setItem('hiendien', JSON.stringify(dsbn));
            if (lshd.length > 0) {
                var html_hd = '';
                for (var i = 0; i < lshd.length; i++) {
                    html_hd += '<div class="bn" data-mabn="' + lshd[i].mabn + '" data-maql="' + lshd[i].maql + '" data-mavv=' + lshd[i].mavaovien + ' data-loaiba=' + lshd[i].loaiba + '>';
                    html_hd += '<div class="img_bn"> <img src= "images/bn_img.png" alt= "Alternate Text" /></div >';
                    html_hd += '<div class="bn_info">';
                    html_hd += '<h4>' + lshd[i].hoten + '-' + lshd[i].namsinh + '</h4>';
                    html_hd += '<p>' + lshd[i].chandoan + '</p>';
                    html_hd += '</div>';
                    html_hd += '<div class="arrow">';
                    html_hd += '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
                    html_hd += '</div ></div > ';
                }
                $('.list_bn').html(html_hd);
            }
            else {
                $('.list_bn').html('<tr> <td colspan="2" style="text-align: center;color:#f00;">Không có bệnh nhân </td> </tr>');
            }

            $('.bn').on('click', function (v) {
                localStorage.setItem('mabn', $(this).attr('data-mabn'));
                localStorage.setItem('mavv', $(this).attr('data-mavv'));
                localStorage.setItem('loaiba', $(this).attr('data-loaiba'));
                let mabn = $(this).attr('data-maql');
                localStorage.removeItem('maql');
                localStorage.setItem('maql', mabn);
                window.location.href = 'benhchinh.html';
            });
        }


    });
}
var getkhoa = function () {

    var listkp = JSON.parse(localStorage.getItem('listkp'));
    var dskp = listkp.length == 0 ? [] : [{ idkp: listkp[0].id, mak: listkp[0].ma, tenkp: listkp[0].ten, loai: listkp[0].loai }];
    for (var i = 1; i < listkp.length; i++) {
        var row = listkp[i];
        if (row.id != listkp[i - 1].id) {
            dskp.push({ idkp: row.idkp, tenkp: row.ten });
        }
    }

    let tenkp = listkp[0].ten;
    let makp = listkp[0].id;
    let loai = listkp[0].loai;
    $('input[name=dskp]').val(tenkp);
    $('input[name=dskp]').attr('data-id', makp);
    $('input[name=dskp]').attr('data-loai', loai);
    loadbn();
}



$(function () {
    getkhoa();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });



    $('.find_hiendien i').click(function () {
        if ($('.filter_hiendien').hasClass('filter_active'))
        {
            $('.filter_hiendien').removeClass('filter_active');
        }
        else {
            $('.filter_hiendien').addClass('filter_active');
            $('.find_hiendien').css('tratransform', 'rotate(180deg)');
        }
    })
})
