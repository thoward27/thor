import type { IGunChainReference } from 'gun/types/chain';

/// Gun Store (https://svelte.dev/repl/53ecf1dc52c245faba204f3ca94d5cde?version=3.16.5)
export function gunStore(ref: IGunChainReference, methods = {}): Record<string, CallableFunction> {
	let store = {};
	const subscribers = [];

	function publish(data, key) {
		// @ts-ignore
		if (ref._.get === key) {
			// for gun.get(key)
			store = data;
		} else if (data) {
			// for gun.get(key).map()
			store[key] = data;
		} else {
			delete store[key];
		}
		for (let i = 0; i < subscribers.length; i += 1) {
			// @ts-ignore
			subscribers[i](store);
		}
	}

	function subscribe(subscriber) {
		// @ts-ignore
		subscribers.push(subscriber);

		// Publish initial value
		subscriber(store);

		// Add listener to gun reference
		ref.on(publish);

		// return cleanup function to be called on component dismount
		return () => {
			// @ts-ignore
			const index = subscribers.indexOf(subscriber);
			if (index !== -1) {
				subscribers.splice(index, 1);
			}
			if (subscribers.length === 0) {
				ref.off();
			}
		};
	}

	function info() {
		console.log(store);
		console.log(subscribers);
	}

	return { ...methods, subscribe, info };
}
