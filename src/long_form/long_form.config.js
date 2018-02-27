/**
 * Created by alexander on 26.02.18.
 */
(function () {
  angular.module('LongForm').config(longFormConfig);


    longFormConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    function longFormConfig($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // noDataCtrl.$inject = ['$scope', '$stateParams', '$state'];
        // function noDataCtrl($scope, $stateParams, $state) {
        //     $scope.errStatus = $state.params.errStatus;
        //     $scope.errUrl = $state.params.errUrl;
        // }
        // $stateProvider.state('error', {
        //     url: "/nodata",
        //     params: {
        //         errStatus: 'No error',
        //         errUrl: ''
        //     },
        //     templateUrl: "/books/views/no-data.html",
        //     controller: noDataCtrl,
        //     controllerAs: 'nd'
        // });

        validFormData.$inject = ['LongFormService', '$stateParams', '$state'];
        function validFormData(LongFormService, $stateParams, $state) {
            return LongFormService.getValidFormData();
        }

        $stateProvider.state('longForm', {
            url: '/longForm',
            controller: 'longFormController',
            controllerAs: 'fCtrl',
            templateUrl: '/long_form/views/long_form.html',
            resolve: {data: validFormData}
        });

    };
})();