/**
 * Created by alexander on 05.09.17.
 */
(function () {
'use strict';
angular.module('LongForm').service('LongFormService', longFormService);
    longFormService.$inject = ['$http', '$stateParams', '$state', '$q', '$location', '$window'];
    function longFormService($http, $stateParams, $state, $q, $location, $window) {
        // function helloWorldController($scope ) {
        const ValidFormService = this;

        ValidFormService.logErr = (err) => {
            let errStr = "";
            switch (err.status) {
                case 404:
                    errStr = 'Сервер не может найти данные согласно запросу: '
                        + err.config.url;
                    break;
                case 400:
                    errStr = 'сервер обнаружил в запросе клиента синтаксическую ошибку в запросе: '
                        + err.config.url;
                    break;
                case 500:
                    errStr = 'Неопознанная ошибка сервера по запросу: '
                        + err.config.url;
                    break;
                default:
                    errStr = 'Ошибка запроса: ';
            }
            console.error(angular.toJson(err));
            return errStr;
        };

        ValidFormService.getValidFormData = () => {
            const url = "/db";
            return $http.get(url).then((res) => {
                return res.data;

            }, ValidFormService.goToErrorPage);

        };


        return ValidFormService;
    }
})();