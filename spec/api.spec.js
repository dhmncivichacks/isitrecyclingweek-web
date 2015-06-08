import createApi from '../api';

describe('api', () => {

	let fetchSpy;
	let geolocationSpy;
	let api;

	let verifyFetchResponse = (callApi) => {
		it('should reject if bad status', () => {
				fetchSpy.and.returnValue(Promise.resolve({ status: 500, statusText: 'Server error!' }));
				callApi().catch((err) => {
					expect(err.message).toEqual('Server error!');
				});
		});
		it('should parse json response', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve({}));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().then((res) => {
				expect(jsonSpy).toHaveBeenCalled();
			});
		});
	};

	beforeEach(() => {
		fetchSpy = jasmine.createSpy('fetch');
		geolocationSpy = jasmine.createSpyObj('geolocation', ['getCurrentPosition']);
		api = createApi({
			fetch: fetchSpy,
			geolocation: geolocationSpy
		});
	});

	describe('reverseGeocode', () => {
		let callApi = () => {
			return api.reverseGeocode({
				latitude: 'lat',
				longitude: 'lon'
			});
		};
		it('should fetch address from google using provided latitude and longitude', () => {
			fetchSpy.and.returnValue(Promise.resolve());
			callApi();
			expect(fetchSpy).toHaveBeenCalledWith('http://maps.googleapis.com/maps/api/geocode/json?latlng=lat,lon&sensor=false');
		});
		it('should resolve with results', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve({ results: 'test' }));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().then((res) => {
				expect(res).toEqual('test');
			});
		});
		verifyFetchResponse(callApi);
	});

	describe('getCurrentCoordinates', () => {
		it('should call geolocation api', () => {
			api.getCurrentCoordinates();
			expect(geolocationSpy.getCurrentPosition).toHaveBeenCalled();
		});
		it('should reject if no position', () => {
			geolocationSpy.getCurrentPosition.and.callFake(cb => cb({}));
			api.getCurrentCoordinates().catch((err) => {
				expect(err.message).toEqual('No position!');
			});
		});
		it('should resolve with coordinates', () => {
			geolocationSpy.getCurrentPosition.and.callFake(cb => cb({ coords: 'coords' }));
			api.getCurrentCoordinates().then((res) => {
				expect(res).toEqual('coords');
			});
		});
	});

	describe('getProperties', () => {
		let callApi = () => {
			return api.getProperties({ street: 'street', number: 'number' });
		};
		it('should hit appleton api endpoint', () => {
			fetchSpy.and.returnValue(Promise.resolve());
			callApi();
			expect(fetchSpy).toHaveBeenCalledWith('http://2.2.appletonapi.appspot.com/search?h=number&s=street');
		});
		it('should reject if no results', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve([]));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().catch((err) => {
				expect(err.message).toEqual('No Appleton address found!');
			});
		});
		it('should resolve with results', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve([1]));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			callApi().then((res) => {
				expect(res).toEqual([1]);
			});
		});
		verifyFetchResponse(callApi);
	});

	describe('getProperty', () => {
		let callApi = () => {
			return api.getProperty('id');
		};
		it('should hit appleton api endpoint', () => {
			fetchSpy.and.returnValue(Promise.resolve());
			callApi();
			expect(fetchSpy).toHaveBeenCalledWith('http://2.2.appletonapi.appspot.com/property/id');
		});
		verifyFetchResponse(callApi);
	});

	describe('isRecyclingDay', () => {
		let property;
		beforeEach(() => {
			property = ['', {
				recycleday: 'Tuesday, 01-25-2000'
			}];
		});
		it('should return true if recyling week is current week', () => {
			expect(api.isRecyclingDay(property, new Date(2000, 0, 24))).toBe(true);
		});
	});

});