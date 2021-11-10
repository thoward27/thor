/**Gestures.
 *
 * This module is here to re-export svelte-gestures and to define anything custom.
 */

// Any basic re-exports go here.
export { press, tap, swipe } from 'svelte-gestures';

// Imports here are for our custom events.
import { setPointerControls, DEFAULT_DELAY, press } from 'svelte-gestures';

// Any custom handlers go here.

/**Double Tap.
 * Stolen from the svelte-gestures README here: https://www.npmjs.com/package/svelte-gestures
 */
export function doubletap(
	node: HTMLElement,
	parameters: { timeframe: number } = { timeframe: DEFAULT_DELAY }
): { destroy: () => void } {
	const gestureName = 'doubletap';
	const spread = 20;

	let startTime: number;
	let clientX: number;
	let clientY: number;
	let tapCount = 0;
	let timeout;

	function onUp(activeEvents: PointerEvent[], event: PointerEvent) {
		if (
			Math.abs(event.clientX - clientX) < spread &&
			Math.abs(event.clientY - clientY) < spread &&
			Date.now() - startTime < parameters.timeframe
		) {
			if (!tapCount) {
				tapCount++;
			} else {
				const rect = node.getBoundingClientRect();
				const x = Math.round(event.clientX - rect.left);
				const y = Math.round(event.clientY - rect.top);

				node.dispatchEvent(
					new CustomEvent(gestureName, {
						detail: { x, y }
					})
				);

				clearTimeout(timeout);
				tapCount = 0;
			}
		}
	}

	function onDown(activeEvents: PointerEvent[], event: PointerEvent) {
		if (!tapCount) {
			clientX = event.clientX;
			clientY = event.clientY;
			startTime = Date.now();
		}

		timeout = setTimeout(() => {
			tapCount = 0;
		}, parameters.timeframe);
	}

	return setPointerControls(gestureName, node, null, onDown, onUp);
}
