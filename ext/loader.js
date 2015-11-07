
require.config({
    baseUrl: 'lib',
    waitSeconds: 0,
    paths: {
        jquery: 'jquery-2.1.3.min',
        'jquery-ui': 'jquery-ui',
        knockout: 'knockout-3.3.0',
        ext: '../ext'
    },
    // shim for non-AMD modules
    shim: {
        'jquery-ui': ['jquery'],
        amplify: {
            deps: ['jquery'],
            exports: 'amplify'
        }
    }
});
require(['jquery', 'knockout', 'ext/wfa.abp.bindings.menu', 'jquery-ui'],
    function($, ko) {
        ko = ko;
        var vm = function() {
            var self = this;
            self.menulist1 = {
                content: [{
                    text: 'Menu Item 1',
                    method: '',
                    children: [{
                        text: 'Menu Item 1.1',
                        method: '',
                        children: [{
                            text: 'Menu Item 1.1.1',
                            method: ''
                        }, {
                            text: 'Menu Item 1.1.2',
                            method: ''
                        }]
                    }, {
                        text: 'Menu Item 1.2',
                        method: ''
                    }]
                }, {
                    text: 'Menu Item 2',
                    method: ''
                }, {
                    text: 'Menu Item 3 containing a very long text',
                    method: ''
                }, {
                    text: 'Menu Item 4',
                    method: ''
                }]
            };
            self.menulist2 = {
                content: [{
                    text: 'Option 1',
                    method: '',
                    children: [{
                        text: 'Option 1.1',
                        method: '',
                        children: [{
                            text: 'Option 1.1.1',
                            method: ''
                        }, {
                            text: 'Option 1.1.2',
                            method: ''
                        }]
                    }, {
                        text: 'Option 1.2',
                        method: ''
                    }]
                }, {
                    text: 'Option 2',
                    method: ''
                }, {
                    text: 'Option 3',
                    method: ''
                }, {
                    text: 'Option 4 - Long text again',
                    method: ''
                }]
            };
        };
        //myVM = new vm();
        ko.applyBindings(new vm());
    }
);



