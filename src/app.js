import "babel-polyfill";
import angular from "angular";
import "angular-material/angular-material.min.css";
import "./books/css/myStyles.css";
import "@uirouter/angularjs";
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material";
import Books from "./books";
import LongForm from "./long_form";


angular.module('ATestApp', [
    'ui.router',
    'ngMaterial',
    'ngMessages',
    Books.name,
    LongForm.name]);


