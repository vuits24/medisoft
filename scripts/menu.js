$(function () {
    //debugger
    $('.menu').click(function () {
        $('.lop_phu').css('display', 'block');
        $('.nav_all').css('transform', 'translateX(0)');
        $('.nav_all').css('opacity', '1');
    })
    $('.lop_phu').click(function () {
        $('.lop_phu').css('display', 'none');
        $('.nav_all').css('transform', 'translateX(1500px)');
        $('.nav_all').css('opacity', '0');
    })
})