;(function($){
    'use strict';

    var defaults = {
        containerMargin: 10,
        parentContainer: $.noop(),
        menuContainer: $.noop(),
        items: [],
        callBack: null
    };

    $.fn.widgetMenuDialogSimple = function(options){
        return new WidgetMenuDialogSimple(this, options);;
    };

    function WidgetMenuDialogSimple(element, options){
        var widgetMenu = this;
        widgetMenu.config = $.extend(true, {}, defaults, options);
        widgetMenu.element = element;

        widgetMenu._create();
    }

    WidgetMenuDialogSimple.prototype =  {

        _create: function(){
            var widgetMenu = this;
            widgetMenu._drawMenu();

            $(window).on("resize.inlinedialog", function() {
                widgetMenu.onResize();
            });
        },
        _drawMenu: function() {
            var widgetMenu = this,
                dialogWidth,
                dialogHeight,
                newLeft,
                newTop,
                parentContainerWidth = widgetMenu.config.parentContainer.width(),
                parentContainerHeight = widgetMenu.config.parentContainer.height(),
                parentScrollWidth = 0,
                maxContainerWidth =  widgetMenu.config.parentContainer.width() - widgetMenu.config.containerMargin - parentScrollWidth,
                minContainerWidth =  widgetMenu.element.outerWidth(),
                elementOffsetLeft = widgetMenu.element.offset().left,
                elementOffsetTop = widgetMenu.element.offset().top,
                parentContainerOffsetTop = widgetMenu.config.parentContainer.offset().top,
                parentContainerOffsetLeft = widgetMenu.config.parentContainer.offset().left;

            widgetMenu.dialogBgDiv = $('<div class="b_inline_dialog_bg" id="inline_dialog_bg_'+widgetMenu.dialogId+'"></div>');

            widgetMenu.dialogRootDiv = $('<div class="b_inline_dialog_container"></div>');
            widgetMenu.dialogRootDivItems = $('<div class="b_inline_dialog_container_items"></div>');

            widgetMenu.dialogBgDiv.appendTo(widgetMenu.config.menuContainer);
            widgetMenu.dialogRootDivItems.appendTo(widgetMenu.dialogRootDiv);
            widgetMenu.dialogRootDiv.appendTo(widgetMenu.config.menuContainer);

            for(var i = 0; i<widgetMenu.config.items.length; i++) {
                var item = widgetMenu.config.items[i],
                    currentElement = $(document.createElement('div')).addClass('b_inline_dialog_item b_item_white noselect').attr('data-item-position', i).html(item.name);

                widgetMenu.dialogRootDivItems.append(currentElement);
            }

            newLeft = elementOffsetLeft;
            newTop = elementOffsetTop;

            // height and top correction
            dialogHeight = widgetMenu.dialogRootDivItems.height();
            widgetMenu.dialogRootDiv.css({'height': dialogHeight});
            if(parentContainerHeight < dialogHeight + widgetMenu.config.containerMargin) {
                newTop = parentContainerOffsetTop + widgetMenu.config.containerMargin / 2;

                widgetMenu.dialogRootDiv.css({'height' : parentContainerHeight - widgetMenu.config.containerMargin});
                widgetMenu.dialogRootDivItems.css({'height' : parentContainerHeight - widgetMenu.config.containerMargin});

            } else if(newTop + dialogHeight + widgetMenu.config.containerMargin / 2 > parentContainerHeight + parentContainerOffsetTop) {
                newTop = parentContainerOffsetTop + parentContainerHeight - dialogHeight - widgetMenu.config.containerMargin / 2;
            } else if(newTop < parentContainerOffsetTop + widgetMenu.config.containerMargin / 2) {
                newTop = parentContainerOffsetTop + widgetMenu.config.containerMargin / 2;
            }

            // width correction
            dialogWidth = widgetMenu.dialogRootDivItems.width();
            widgetMenu.dialogRootDiv.width(dialogWidth);
            if(dialogWidth > maxContainerWidth) {
                widgetMenu.dialogRootDiv.css({'width': maxContainerWidth});
                widgetMenu.dialogRootDivItems.css({'width': maxContainerWidth});
            }

            // min width correction
            if(dialogWidth < minContainerWidth) {
                widgetMenu.dialogRootDiv.css({'width' : minContainerWidth});
                widgetMenu.dialogRootDivItems.css({'width' : minContainerWidth + 1});
            }

            // left correction
            if(dialogWidth > maxContainerWidth) {
                if(parentContainerWidth < maxContainerWidth + widgetMenu.config.containerMargin) {
                    newLeft = parentContainerOffsetLeft + widgetMenu.config.containerMargin / 2;
                } else if(newLeft + maxContainerWidth + widgetMenu.config.containerMargin / 2 > parentContainerOffsetLeft + parentContainerWidth - parentScrollWidth) {
                    newLeft = (parentContainerOffsetLeft + parentContainerWidth - parentScrollWidth) - (maxContainerWidth + widgetMenu.config.containerMargin / 2);
                }
            } else if(newLeft + dialogWidth > parentContainerWidth + parentContainerOffsetLeft - parentScrollWidth - widgetMenu.config.containerMargin / 2) {
                newLeft -= (newLeft + dialogWidth) - (parentContainerWidth + parentContainerOffsetLeft - parentScrollWidth - widgetMenu.config.containerMargin / 2);
            } else if(newLeft < parentContainerOffsetLeft + widgetMenu.config.containerMargin / 2) {
                newLeft = parentContainerOffsetLeft + widgetMenu.config.containerMargin / 2
            }


            widgetMenu.dialogRootDiv.css({'left': newLeft, 'top': newTop});

            widgetMenu.dialogBgDiv.on('click', function() {
                widgetMenu._close();
            });

            widgetMenu.dialogRootDiv.on('click', '.b_inline_dialog_item', function() {
                if(widgetMenu.config.callBack) {
                    widgetMenu.config.callBack(widgetMenu.config.items[$(this).attr('data-item-position')]);
                }
                widgetMenu._close();
            });



        },
        onResize: function(){
            var widgetMenu = this;
            widgetMenu._clearMenu();
            widgetMenu._drawMenu();
        },
        _clearMenu: function(){
            var widgetMenu = this;
            widgetMenu.dialogBgDiv.remove();
            widgetMenu.dialogRootDiv.remove();
        },
        _close: function(){
            var widgetMenu = this;
            widgetMenu._clearMenu();
            $(window).off("resize.inlinedialog");
        }
    };




})(jQuery);