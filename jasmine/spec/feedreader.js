/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('have urls', function() {
            allFeeds.forEach(function(element) {
              expect(element.url).toBeDefined();
              expect(element.url).not.toBe('');
            });
        });


        it('have names', function() {
             allFeeds.forEach(function(element) {
               expect(element.name).toBeDefined();
               expect(element.name).not.toBe('');
             });
         });
    });


    describe('The menu', function() {
      var menu,
          body,
          bodyClass;

      beforeEach(function() {
        body = document.body;
        bodyClass = body.className;
      });

        it('starts hidden', function() {
            expect($(body).hasClass('menu-hidden')).toBe(true);
        });

        it('toggles visibility', function() {
            menu = document.querySelector(".menu-icon-link");
            menu.click();
            expect($(body).hasClass('menu-hidden')).toBe(false);
            menu.click();
            expect($(body).hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        var entriesLength;

        beforeEach(function(done) {
              loadFeed(0, function() {
                  done();
              });
        });

        it('should have at least one entry', function(done) {
            entriesLength = $('.feed .entry').length;
            console.log(entriesLength)
            expect(entriesLength).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feed1,
            feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    feed2 = $('.feed').html();
                    loadFeed(0, function() {
                        done();
                    });
                });
            });
        });

        it('causes a content change', function(done) {
            expect(feed1).not.toEqual(feed2);
            done();
        });
    });
}());
