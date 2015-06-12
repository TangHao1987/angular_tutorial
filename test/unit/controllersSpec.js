/**
 * Created by tang.hao on 9/6/2015.
 */
describe('PhoneCat controllers', function () {

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    beforeEach(module('phonecatApp'));
    beforeEach(module('phonecatServices'));

    describe('PhoneListCtrl', function () {
        var $httpBackend, scope, ctrl;
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

            scope = $rootScope.$new();
            ctrl = $controller('PhoneListCtrl', {$scope: scope});
        }));

        it('should create "phones" model with 2 phones fetched from xhr', inject(function () {
            expect(scope.phones).toEqualData([]);
            $httpBackend.flush();

            expect(scope.phones).toEqualData([{name: 'Nexus S'},
                {name: 'Motorola DROID'}]);
        }));

        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });

    describe('PhoneDetailCtrl', function(){
        var scope, $httpBackend, ctrl,
            xyzPhoneData = function() {
                return {
                    name: 'phone xyz',
                    images: ['image/url1.png', 'image/url2.png']
                }
            };

        beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
        }));

        it('should fetch phone detail', function() {
            expect(scope.phone).toEqualData(undefined);
            $httpBackend.flush();

            expect(scope.phone).toEqualData(xyzPhoneData());
        });
    });

    describe('filter', function(){
        beforeEach(module('phonecatFilters'));
        describe('checkmark', function(){
            it('should convert boolean values to unicode checkmark or cross', inject(function(checkmarkFilter){
                expect(checkmarkFilter(true)).toBe('\u2713');
                expect(checkmarkFilter(false)).toBe('\u2718');
            }));
        });
    });
});
