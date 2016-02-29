export const VOLUME_SET = 'VOLUME_SET';
export const ZOOM_INIT = 'ZOOM_INIT';

export function setVolume(volume) {
	return {
		type: VOLUME_SET,
		data: volume
	};
}

export function initZoom() {
	return {
		type: ZOOM_INIT
	};
}