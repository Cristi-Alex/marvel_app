/**
 * Created by Cris on 22.06.2017.
 */

//this should have been a directive testing but
//couldn't get it to work :(
describe('Testing TableComponent',function () {
    'use strict';

    var $rootScope, $compile, mockComicService, scope;

    // beforeEach(module("components", function ($provide) {
    //     $provide.value('comicService', mockComicService);
    // }));

    // beforeEach(inject(function (_$rootScope_, _$compile_) {
    //     $rootScope = _$rootScope_;
    //     $compile = _$compile_;
    //
    //     scope=$rootScope.$new();
    //     scope.service = 'comicService';
    //     scope.query = {query: ""};
    // }));

    beforeEach(module('templates'));

    var element,
        scope,
        isolateScope;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('');

        // element will enable you to test your directive's element on the DOM
        element = $compile(element)(scope);

        // Digest needs to be called to set any values on the directive's scope
        scope.$digest();

        // If the directive uses isolate scope, we need to get a reference to it
        // explicitly
        isolateScope = element.isolateScope();
    }));



    it('Contains a table',function () {

        expect(element.html).toContain('Characters: Creators: Events: Stories: Series:');
    });
});