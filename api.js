import addressit from 'addressit';
import moment from 'moment';
import {toWordsOrdinal} from 'number-to-words';

const appletonApiVersion = '2.2';
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

		parseAddress: (formattedAddress) => {
			let parsedAddress = addressit(formattedAddress);
			let street = parseInt(parsedAddress.street, 10);
			if (!isNaN(street)) {
				// need to convert things like '8th' to 'Eigth'
				parsedAddress.street = toWordsOrdinal(street).replace(/-/g, '');
			}
			else {
				// remove street type
				parsedAddress.street = parsedAddress.street.split(' ').filter((text, index, arr) => {
					return (index < arr.length - 1);
				}).join(' ');
			}
			return parsedAddress;
		},

		getProperties: (address) => {
			let {number, street} = address;
			let url = `${appletonApiBaseUrl}/search?h=${number}&s=${street}`;
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

		isRecyclingDay: (property, currentDate) => {
			let recycleDate = moment(property[1].recycleday, 'MM-DD-YYYY');
			let now = moment(currentDate);
			return recycleDate.week() === now.week();
		},

		getNextGarbageDay: (property, currentDate) => {
			let garbageDate = moment(currentDate).day(property[1].garbageday);
			let prefix = 'this week ';
			if (garbageDate < moment(currentDate)) {
				prefix = 'next week ';
			}
			return prefix + garbageDate.format('dddd');
		},

		getPropertyAddress: (property) => {
			return property[7].address;
		}
	};

}