/**
 * Created by alexander on 26.02.18.
 */
import angular from "angular";
import ErrSrcDirectiveModule from "../common/directives/err-src.directive";

export default angular.module('Books', [ErrSrcDirectiveModule.name]);
require("./catalog.service");
require("./book.controller");
require("./catalog.controller");
require("./books.config");

