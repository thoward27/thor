/* eslint-disable @typescript-eslint/ban-ts-comment */
import GUN from 'gun';
import { username } from './stores';

// security encryption authorization
import 'gun/sea.js';

// Database
export const db = GUN({ radisk: false });

// User.
export const user = db.user().recall({ sessionStorage: true });
user.get('alias').on((v) => username.set(v));
// @ts-ignore
db.on('auth', async () => {
	const alias = await user.get('alias');
	// @ts-ignore
	username.set(alias);
});
