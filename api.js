import moment from 'moment';

const appletonApiVersion = '3-0';
const appletonApiBaseUrl = `http://${appletonApiVersion}.appletonapi.appspot.com`;

function status (response) {
	if (response.status >= 200 && response.status < 300) {  
		return Promise.resolve(response);
	}
	else {
		return Promise.reject(new Error(response.statusText));
	}
}

function json (response) {
	return response.json();
}

export default function api (context) {
	return {

		reverseGeocode: (coordinates) => {
			let {latitude, longitude} = coordinates;
			let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false`;
			return context.fetch(url)
				.then(status)
				.then(json)
				.then(data => data.results);
		},

		getCurrentCoordinates: () => {
			return new Promise((resolve, reject) => {
				context.geolocation.getCurrentPosition(position => {
					if (!position || !position.coords) {
						return reject(new Error('No position!'));
					}
					resolve(position.coords);
				});
			});
		},

		getProperties: (address) => {
			let url = `${appletonApiBaseUrl}/search?q=${encodeURIComponent(address)}`;
			return context.fetch(url)
				.then(status)
				.then(json)
				.then(data => {
					if (!data.length) {
						return Promise.reject(new Error('No Appleton address found!'));
					}
					return Promise.resolve(data);
				});
		},

		getProperty: (id) => {
			let url = `${appletonApiBaseUrl}/property/${id}`;
			return context.fetch(url)
				.then(status)
				.then(json);
		},

		isRecyclingWeek: (property, currentDate) => {
			let recycleDate = moment(property[1].recycleday, 'MM-DD-YYYY');
			return recycleDate.week() === moment(currentDate).week();
		},

		getNextGarbageDate: (property, currentDate) => {
			let date = moment(currentDate).day(property[1].garbageday);
			if (date < moment(currentDate)) {
				date.add(1, 'w');
			}
			return date;
		},

		isDateInCurrentWeek: (date, currentDate) => {
			return (moment(date).week() === moment(currentDate).week());
		},

		getPropertyAddress: (property) => {
			return property[7].address;
		}
	};

}