/**
 * Created by alexander on 31.08.17.
 */
(function () {
    'use strict';

    angular
        .module('Books')
        .controller('CatalogController', catalogController);


    catalogController.$inject = ['catalog', 'CatalogService'];
    function catalogController(catalog, CatalogService) {

        const catCtrl = this;

        // catCtrl.defaultImage = $sce.trustAsResourceUrl('https://storage.aggregion.com/api/files/12ce171be47031a58f6d12ddefca93d52bda709b1b720d50cf48747d6cd44cb6/shared/data');

        catCtrl.defaultImage = CatalogService.getFileUrl(CatalogService.getDefaultImageResourceId());

        catCtrl.getPreview = (book) => {
            const resourceId = book.previewImages[0] ? book.previewImages[0] :
                ( book.cover ? book.cover : CatalogService.getDefaultImageResourceId());

            return CatalogService.getFileUrl(resourceId);

        };

        catCtrl.logBook = (id) => {
            CatalogService.getBookById(id).then((res) => {
            });
        };

        catCtrl.catalog = catalog;
    };
})();

