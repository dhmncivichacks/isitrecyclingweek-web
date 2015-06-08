import createApi from '../api';
let fetchSpy = jasmine.createSpy('fetch').and.returnValue(Promise.resolve());
const api = createApi({
	fetch: fetchSpy
});

describe('api', () => {

	describe('reverseGeocode', () => {
		let callApi = function() {
			return api.reverseGeocode({
				latitude: 'lat',
				longitude: 'lon'
			});
		};
		it('should fetch address from google using provided latitude and longitude', () => {
			callApi();
			expect(fetchSpy).toHaveBeenCalledWith('http://maps.googleapis.com/maps/api/geocode/json?latlng=lat,lon&sensor=false');
		});
		it('should reject if bad status', (done) => {
			fetchSpy.and.returnValue(Promise.resolve({ status: 500, statusText: 'Server error!' }));
			callApi().catch((err) => {
				expect(err.message).toEqual('Server error!');
				done();
			});
		});
		it('should parse json response', (done) => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve({}));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().then((res) => {
				expect(jsonSpy).toHaveBeenCalled();
				done();
			});
		});
		it('should resolve with results', (done) => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve({ results: 'test' }));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().then((res) => {
				expect(res).toEqual('test');
				done();
			});
		});
	});

	describe('getCurrentCoordinates', function() {
	    
	});

});