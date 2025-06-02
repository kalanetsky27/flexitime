setLocaleData($("head"));
setLocaleData($(".container"));

$("#field_locale").text(currLocale.toUpperCase());

$("#locale_spinner").on("click", function() {
    var $this = $(this);
    $this.widgetMenuDialogSimple({
        menuContainer: $("body"),
        parentContainer: $("#inlineMenuContainer"),
        items: $.l_sets.locale_items,
        callBack: function(item) {
            var queryOld = window.location.href;
            queryOld = queryOld.replace(CABINET_URL, "");
            queryOld = queryOld.replace(/\/+$/g,"");
            if(queryOld.indexOf(currLocale+"/") === 0) {
                queryOld = queryOld.substr(3);
            } else if(queryOld.indexOf(currLocale) === 0) {
                queryOld = queryOld.substr(2);
            }

            currLocale = item.id;
            window.location.href = CABINET_URL+getCurrLocalePath()+queryOld;
        }
    });
});
