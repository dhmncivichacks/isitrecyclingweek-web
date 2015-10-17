/*eslint-env jasmine */
import createApi from '../src/api';

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
			callApi().then(() => {
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

	describe('getEndpoint', () => {
		it('should call civic hack locator api', () => {
			fetchSpy.and.returnValue(Promise.resolve());
			api.getEndpoint('address');
			expect(fetchSpy).toHaveBeenCalledWith('http://civic-hack-api-locator.azurewebsites.net/api/implementations?addr=address');
		});
		it('should resolve with results', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve([{ implementationApiUrl: 'url' }]));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			api.getEndpoint('address').then((res) => {
				expect(res).toEqual('url');
			});
		});
	});

	describe('getRecyclePickup', () => {
		it('should call provided api', () => {
			fetchSpy.and.returnValue(Promise.resolve());
			api.getRecyclePickup('address', 'url');
			expect(fetchSpy).toHaveBeenCalledWith('url?addr=address');
		});
		it('should resolve with first recycle pickup', () => {
			let jsonSpy = jasmine.createSpy('json').and.returnValue(Promise.resolve([{ collectionType: 'trash' }, { collectionType: 'recycling', id: 1 }, { collectionType: 'recycling', id: 2 }]));
			fetchSpy.and.returnValue(Promise.resolve({ status: 200, json: jsonSpy }));
			api.getRecyclePickup('address', 'url').then((res) => {
				expect(res).toEqual({ collectionType: 'recycling', id: 1 });
			});
		});
	});

	describe('isRecyclingDay', () => {
		let pickup;
		beforeEach(() => {
			pickup = {
				collectionType: 'recycling',
				collectionDate: '2000-01-25'
			};
		});
		it('should return true if recyling week is current week', () => {
			expect(api.isRecyclingWeek(pickup, new Date(2000, 0, 24))).toBe(true);
			expect(api.isRecyclingWeek(pickup, new Date(2000, 0, 25))).toBe(true);
			expect(api.isRecyclingWeek(pickup, new Date(2000, 0, 26))).toBe(true);
		});
		it('should return false if not recycling week', () => {
			expect(api.isRecyclingWeek(pickup, new Date(2000, 0, 22))).toBe(false);
			expect(api.isRecyclingWeek(pickup, new Date(2000, 0, 30))).toBe(false);
		});
	});

	describe('getNextGarbageDate', () => {
		let pickup;
		beforeEach(() => {
			pickup = {
				collectionType: 'recycling',
				collectionDate: '2000-01-25'
			};
		});
		it('should return current week day if garbage day has not passed', () => {
			expect(api.getNextGarbageDate(pickup, new Date(2000, 0, 24)).date()).toBe(25);
		});
		it('should return next week day if garbage day has passed', () => {
			expect(api.getNextGarbageDate(pickup, new Date(2000, 0, 26)).date()).toBe(1);
		});
	});

	describe('isDateInCurrentWeek', () => {
		it('should return true if date is in current week', () => {
			expect(api.isDateInCurrentWeek(new Date(2000, 0, 25), new Date(2000, 0, 24))).toBe(true);
		});
		it('should return false if date is not in current week', () => {
			expect(api.isDateInCurrentWeek(new Date(2000, 0, 30), new Date(2000, 0, 24))).toBe(false);
		});
	});

});
