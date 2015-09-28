$(document).ready(function() {
    $(".answer").hide();
    $(".toggle").click(function(e) {
        if ($(e.target).html() == "[ + ]") $(e.target).html("[ - ]");
        else $(e.target).html("[ + ]");
        $(e.target).parent().siblings("p").toggle(100);
    });

    $("input[type=submit]").click(function() {
        $("<div></div>").load($("input[type=url]")[0].value, function (response, status, xhr) {
            if (status == "success") $("span", document).html("There are " + $("a", this).length + " links on the" +
                " page.");
            else $("span", document).html("There was an error.");
        });
    });
});