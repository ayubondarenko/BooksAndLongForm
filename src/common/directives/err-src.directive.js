/**
 * Created by alexander on 05.09.17.
 */

'use strict';

export default angular.module('ErrSrcDirectiveModule', [])
    .directive('errSrc', errSrcDirective);

function errSrcDirective() {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src && attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
};