/**
 * Created by Cris on 24.06.2017.
 */
describe('Testing ComicFactory',function () {
    var comicFactory;

    beforeEach(module('comic'));

    beforeEach(function() {

        // Inject the required dependencies into the page.
        inject(function($injector) {
            comicFactory = $injector.get('Comic');
        });
    });

    beforeEach(function () {

    });

    it('Should be defined', function () {
        expect(comicFactory).toBeDefined();
    });

    it('Should create a comic', function (){
        var stub ={title: "Thor"};
        var newComic = new comicFactory(stub);
        expect(newComic.title).toBe("Thor");

        expect(newComic.characters).toBe("None");
    });

    it('Should create a comic with default values when model is empty object', function (){
        var stub ={};
        var newComic = new comicFactory(stub);
        expect(newComic.title).toBe("N/A");

        expect(newComic.characters).toBe("None");
        expect(newComic.creators).toBe("None");
        expect(newComic.events).toBe("None");
        expect(newComic.stories).toBe("None");
        expect(newComic).not.toBeUndefined();
    });

    it('Should be able to deal with arrays as values', function (){
        var stub ={characters: {items: [{name: "Spider-Man"},{name:"Hulk"},{name:"Spider-Man"},{name:"Hawkeye"}]}};
        var newComic = new comicFactory(stub);
        expect(newComic.characters).toContain("Hulk");
        expect(newComic.characters).toContain("Hawkeye");
        expect(newComic.characters).toContain("Spider-Man");

    });

});

