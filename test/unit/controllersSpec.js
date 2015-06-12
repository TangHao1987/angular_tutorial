/**
 * Created by tang.hao on 9/6/2015.
 */
describe('PhoneCat controllers', function () {

    beforeEach(module('phonecatApp'));

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
            expect(scope.phones).toBeUndefined();
            $httpBackend.flush();

            expect(scope.phones).toEqual([{name: 'Nexus S'},
                {name: 'Motorola DROID'}])
        }));

        it('should set the default value of orderProp model', function () {
            expect(scope.orderProp).toBe('age');
        });
    });

    describe('PhoneDetailCtrl', function(){
        var scope, $httpBackend, ctrl;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/xyz.json').respond({name:'phone xyz', images:["title image"]});

            $routeParams.phoneId = 'xyz';
            scope = $rootScope.$new();
            ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
        }));

        it('should fetch phone detail', function() {
            expect(scope.phone).toBeUndefined();
            $httpBackend.flush();

            expect(scope.phone).toEqual({name:'phone xyz', images:["title image"]});
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
