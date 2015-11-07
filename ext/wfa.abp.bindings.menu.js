/**
 * Created by ChhetriK on 06-11-2015.
 */
define(['jquery', 'knockout', 'bootstrap.min'],
    function ($, ko) {
        var parentDiv = $("<div class='btn-group'></div>"); //creating a template for btn-group div as the outer container
        var bootstrapMenu = $("<ul style='margin-top:18px;' class='dropdown-menu'></ul>"); //creating a template for menu
        var anchorItem = $('<a></a>');  //creating a template for anchor that will hold the menu items
        var submenu = $("<ul class='dropdown-menu'></ul>");  //creating a template for submenu
        var listItem = $("<li></li>");  //creating a template for individual line items
        ko.bindingHandlers.bootStrapMenu = {
            update: function (element, valueAccessor, allBindings, viewModel, context) {
                var elem = $(element);  // retrieves the html element with which the handler is attached
                var value = ko.toJS(valueAccessor());  //ko.toJS retrieves the different options value that
                //are specified in data-bind attribute of element and it works irrespective of observables.
                var ddOptions = value.ddOptions;
                if (ddOptions.length > 0) {
                    var direction = value.tipPosition;
                    var parentNode = parentDiv.clone(); //creating clone
                    var menu = bootstrapMenu.clone();
                    if (value.headerText) {
                        menu.append('<li class="disabled"><a>' + value.headerText + '</a></li>');  // creating a li for the caption.
                    }
                    templateForReuse(ddOptions, menu);
                    menu.insertAfter(elem); //adding the menu as a sibling to the element
                    switch (direction) {
                        case 'top-right':
                            menu.addClass('pull-right task-action-tip-right')
                                .find('li.dropdown-submenu .dropdown-menu').css({ 'bottom': 'auto' });
                            menu.find('li.dropdown-submenu ul').css({ 'left': 'auto', 'right': '100%' });
                            break;
                        case 'bottom-left':
                            menu.addClass('task-action-tip-left-bottom')
                                .find('li.dropdown-submenu .dropdown-menu').css({ 'bottom': 'auto' });
                            parentNode.addClass('dropup');
                            break;
                        case 'bottom-right':
                            menu.addClass('task-action-tip-right-bottom pull-right')
                                .find('li.dropdown-submenu .dropdown-menu').css({ 'bottom': 'auto' });
                            menu.find('li.dropdown-submenu ul').css({ 'left': 'auto', 'right': '100%' });
                            parentNode.addClass('dropup');
                            break;
                        default:
                            if ($(elem).offset().top + $(elem).height() + $(menu).height() + 10 > $(document).height()) {
                                parentNode.addClass('dropup');
                                $(elem).next(menu).find('li.dropdown-submenu .dropdown-menu').css({ 'bottom': 'auto' });
                                if ($(document).width() - $(elem).offset().left > $(menu).width()) {
                                    $(elem).next(menu).addClass('task-action-tip-left-bottom');
                                } else {
                                    $(elem).next(menu).addClass('task-action-tip-right-bottom pull-right').find('li.dropdown-submenu ul').
                                        css({ 'left': 'auto', 'right': '100%' }); //pull the submenu to the right if the parent parent is also pulled right
                                }
                            } else {
                                if ($(document).width() - $(elem).offset().left > $(menu).width()) {
                                    $(elem).next(menu).addClass('task-action-tip-left');

                                } else {
                                    $(elem).next(menu).addClass('task-action-tip-right pull-right').find('li.dropdown-submenu ul').
                                        css({ 'left': 'auto', 'right': '100%' });  //pull the submenu to the right if the parent parent is also pulled right
                                }
                            }
                    }
                    $(elem).next(menu).andSelf().wrapAll(parentNode);  //wraping the entire element and menu inside the btn-group div container.
                }
            }
        }
        templateForReuse = function (list, ul) {
            for (key in list) { //fetching each key of the collection.
                var anchor = anchorItem.clone();
                var li = listItem.clone();
                if ($.isPlainObject(list[key])) {  //checking if the corresponding value is an object or simple data type(eg. string,number,etc).
                    for (var item in list[key]) {  //looping the child keys in case the parent key is an object.
                        if (typeof list[key][item] === "function")
                            anchor.on('click', function (e) {
                                list[key].method();  //adding method to the click event of the menu items.
                            });
                        else if ($.isArray(list[key][item])) {  // if the menu is an array.
                            anchor.html(anchor.html() + " >>"); // submenu creation.
                            li.addClass('dropdown-submenu');
                            var submenuUL = submenu.clone();
                            templateForReuse(list[key][item], submenuUL);
                            li.append(submenuUL);  //appending the submenu to the menu list item.
                        } else {
                            if (!$.isPlainObject(list[key][item]) && anchor.html() == "")
                                anchor.html(list[key][item]);
                        }
                    }
                } else {
                    if (!$.isArray(list[key]))
                        anchor.html(list[key]);  //assigning data in case of normal data type value.
                }
                ul.append(li.append(anchor)); //appending the menu items to the menu.
            }
        }
    });