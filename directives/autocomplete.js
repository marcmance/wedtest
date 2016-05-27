angular.module('marj', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    console.log("yoooo");
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
        }
    });
