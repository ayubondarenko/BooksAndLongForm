/**
 * Created by alexander on 05.09.17.
 */
(function () {
'use strict';
angular.module('Books').service('CatalogService', CatalogService);


    CatalogService.$inject = ['$http', '$stateParams', '$state', '$q', '$location', '$window']
    function CatalogService($http, $stateParams, $state, $q, $location, $window) {
        const CatalogService = this;

        CatalogService.goToErrorPage = (err) => {
            // $state.transitionTo('error');
            console.error("Сама ошибка вот такая:");
            const errStatus = "" + err.status + " " + err.statusText;
            console.log(errStatus);
            $state.transitionTo('error', {
                errStatus: errStatus,
                errUrl: err.config.url
            });
        };


        CatalogService.getCatalog = () => {
            const url = "https://ds.aggregion.com/api/public/catalog";
            return $http.get(url).then((res) => {

                return res.data;
            }, CatalogService.goToErrorPage);

        };

        CatalogService.getAllBookDataById = (id) => {
            let book = {};
            const bookPromise = CatalogService.getBookById(id);

            //--------------------------

            const bundlesPromise = bookPromise.then((res) => {

                book = angular.copy(res.data);
                book.bundles = [];

                return CatalogService.getBundlesById(id);
            }, CatalogService.goToErrorPage);


            return bundlesPromise.then((res) => {
                book.bundles = angular.copy(res.data);
                return book;

            }, CatalogService.goToErrorPage);
        };


        CatalogService.getFileUrl = (resourceId) => {
            return 'https://storage.aggregion.com/api/files/' + resourceId + '/shared/data';
        };


        CatalogService.getDefaultImageResourceId = () => {
            return '12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6';
        };

        CatalogService.getBookById = (id) => {
            const url = "https://ds.aggregion.com/api/public/catalog/" + id;
            return $http.get(url);
        };

        CatalogService.getBundlesById = (id) => {
            const url = "https://ds.aggregion.com/api/public/catalog/" + id + "/bundles";
            return $http.get(url);
        };

        CatalogService.getBundleByIdAndBundleId = (id, bundleId) => {
            const url = "https://ds.aggregion.com/api/public/catalog/" + id + "/bundles/" + bundleId;
            return $http.get(url);
        };

        CatalogService.getSignatureByIdAndBundleId = (id, bundleId) => {

            // /public/catalog/{catalogId}/bundles/{bundleId}/signature
            var url = "https://ds.aggregion.com/api/public/catalog/" + id + "/bundles/" + bundleId + "/signature";
            return $http.get(url);
        };


        CatalogService.logErr = (err) => {
            var errStr = "";
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
            var errFullStr = angular.toJson(err);
            return errStr;
        };


        return CatalogService;
    };
})();