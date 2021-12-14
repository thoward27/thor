import { mode } from '$app/env';
import Gun from 'gun/gun';
import 'gun/sea.js';

let settings = {
	radis: false,
	peers: ['https://aqueous-dusk-02807.herokuapp.com/gun']
};

if (mode == 'development' || window.Cypress) {
	console.log('Gun running in development mode.');
	settings = { ...settings, peers: [] };
}

export const gun = Gun(settings);
