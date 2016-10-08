import moment from 'moment';

const civicHackLocatorUrl = 'https://civic-hack-api-locator.azurewebsites.net/api/implementations?addr=';

function status (response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	}
	else {
		console.error(response.statusText);
		return Promise.reject(new Error("We experienced an issue with your address, try again?"));
	}
}

function json (response) {
	return response.json();
}

export default function api (context) {
	return {

		reverseGeocode: (coordinates) => {
			let {latitude, longitude} = coordinates;
			let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false`;
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

		getEndpoint: (address) => {
			return context.fetch(civicHackLocatorUrl + encodeURIComponent(address))
				.then(status)
				.then(json)
				.then(data => {
					if (!data.length) {
						return Promise.reject(new Error(`${address} was not found in our supported areas, try again?`));
					}
					return data[0].implementationApiUrl;
				});
		},

		getRecyclePickup: (address, url) => {
			return context.fetch(`${url}?addr=${encodeURIComponent(address)}`)
				.then(status)
				.then(json)
				.then((pickups) => {
					return pickups.filter((item) => item.collectionType === 'recycling').shift();
				});
		},

		isRecyclingWeek: (pickup, currentDate) => {
			let recycleDate = moment(pickup.collectionDate, 'YYYY-MM-DD');
			return recycleDate.week() === moment(currentDate).week();
		},

		getNextGarbageDate: (pickup, currentDate) => {
			let date = moment(currentDate).day(moment(pickup.collectionDate, 'YYYY-MM-DD').day());
			if (date < moment(currentDate)) {
				date.add(1, 'w');
			}
			return date;
		},

		isDateInCurrentWeek: (date, currentDate) => {
			return (moment(date).week() === moment(currentDate).week());
		}
	};

}
