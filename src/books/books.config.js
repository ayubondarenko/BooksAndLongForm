/**
 * Created by alexander on 26.02.18.
 */


(function () {
angular.module('Books').config(booksConfig);


    booksConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    function booksConfig($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        noDataCtrl.$inject = ['$scope', '$stateParams', '$state'];
        function noDataCtrl($scope, $stateParams, $state) {
            $scope.errStatus = $state.params.errStatus;
            $scope.errUrl = $state.params.errUrl;
        }

        $stateProvider.state('error', {
            url: "/nodata/",
            params: {
                errStatus: 'No error',
                errUrl: ''
            },
            templateUrl: "/books/views/no-data.html",
            controller: noDataCtrl,
            controllerAs: 'nd'
        });

        getBook.$inject = ['CatalogService', '$transition$', '$stateParams', '$state'];
        function getBook(CatalogService, $transition$, $stateParams, $state) {
            return CatalogService.getAllBookDataById($transition$.params().bookId);
        }

        $stateProvider.state('book', {
            // controller: 'Book
            url: '/book/{bookId}',
            params: {bookId: ''},
            templateUrl: '/books/views/book_page.html',
            controller: 'BookController',
            controllerAs: 'bookCtrl',
            resolve: {book: getBook}
        });

        getCatalog.$inject = ['CatalogService', '$stateParams', '$state'];
        function getCatalog(CatalogService, $stateParams, $state) {
            return CatalogService.getCatalog();
        }

        $stateProvider.state('catalog', {
            url: '/',
            controller: 'CatalogController',
            controllerAs: 'catCtrl',
            templateUrl: '/books/views/catalog_page.html',
            resolve: {catalog: getCatalog}
        });

        otherwiseUrl.$inject = ['$injector', '$location'];
        function otherwiseUrl($injector, $location) {
            const state = $injector.get('$state');
            state.go('error');
            return $location.path();
        }

        $urlRouterProvider.otherwise(otherwiseUrl);
    };
})();