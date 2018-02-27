/**
 * Created by alexander on 31.08.17.
 */
(function () {
    'use strict';

    angular
        .module('Books')
        .controller('BookController', BookController);


    BookController.$inject = ['book', 'CatalogService']
    function BookController(book, CatalogService) {

        const bookCtrl = this;
        bookCtrl.book = book;

        // bookCtrl.defaultImage = $sce.trustAsResourceUrl('https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data');

        bookCtrl.defaultImage = CatalogService.getFileUrl(CatalogService.getDefaultImageResourceId());

        bookCtrl.getFileUrl = CatalogService.getFileUrl;

        bookCtrl.getCover = function () {
            const resourceId = bookCtrl.book.cover ? bookCtrl.book.cover :
                (bookCtrl.book.previewImages[0] ? bookCtrl.book.previewImages[0] : CatalogService.getDefaultImageResourceId());

            return CatalogService.getFileUrl(resourceId);

        };

        bookCtrl.logBook = function (id) {
            CatalogService.getBookById(id);


        };

        bookCtrl.len = function (arr) {
            if (arr && (typeof arr.length === 'number' )) return arr.length;
            return 0;

        };
    };

})();
