import axios from 'axios';

let Client = axios.create({
	// You can put base url in .env file
	baseURL: 'https://api.spacexdata.com/v3',
	responseType: 'json',
	timeout: 20 * 1000, // 20 seconds
});

export { Client };
