import { mode } from '$app/env';
import GUN from 'gun';
import 'gun/sea.js';

let settings = {
	radis: false,
	peers: ['https://aqueous-dusk-02807.herokuapp.com/gun']
};

if (mode == 'development') {
	settings = { ...settings, peers: [] };
}

export const gun = GUN(settings);
