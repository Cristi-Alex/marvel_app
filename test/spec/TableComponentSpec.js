/**
 * Created by Cris on 22.06.2017.
 */
describe('Testing TableComponent',function () {
    'use strict';

    var $rootScope, $compile;

    beforeEach(module("components"));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    it('Contains a table',function () {
        var element = $compile('<marvel-table service="comicService" query=""></marvel-table>')($rootScope);

        $rootScope.$digest();

        expect(element.html).toContain('Characters: Creators: Events: Stories: Series:');
    });
});