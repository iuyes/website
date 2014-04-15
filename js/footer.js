/**
 * @author YANXUEFENG
 */
$(function () {
	$(".js-footer").on("mouseenter", function (e) {
		$(this).stop(true, true).animate({height: "200px"}, 400);
	}).on("mouseleave", function (e) {
		$(this).stop(true, true).animate({height: "40px"}, 400);
	});
});
