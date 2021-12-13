import { gun } from '$lib/initGun';
import { gunStore } from './utils';

const ref = gun.get('modifiers');
export const modifiers = {
	...gunStore(ref)
};
