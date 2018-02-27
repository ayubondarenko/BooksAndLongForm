/**
 * Created by alexander on 31.08.17.
 */

(function () {
'use strict';

angular
    .module('LongForm')
    .controller('longFormController', longFormController);

    longFormController.$inject = ['data', 'LongFormService'];
    function longFormController(data) {
        const fCtrl = this;
        fCtrl.data = data;
        fCtrl.minDate = new Date("2016-01-01");
        fCtrl.maxDate = new Date();
        fCtrl.activeTab = 0;

        fCtrl.resData = {};

        fCtrl.updateForm = (form) => {
            if (!form.$valid) {

                let el;
                angular.forEach(form.$error, (err) => {
                    el = err[0].$$element[0];
                    return;
                });
                if (typeof el.attributes.indexOfTab.value)
                    fCtrl.activeTab = +el.attributes.indexOfTab.value;
                el.focus()

            } else {

                fCtrl.resData = angular.copy(fCtrl.data);
                // console.log(fCtrl.resData);
                fCtrl.activeTab = 2;
            }
        }
    }
})();

