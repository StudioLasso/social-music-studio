/* global $ */

/**
 * Tracks reducer
 */

import {
	VOLUME_SET,
	ZOOM_INIT
} from '../actions/Studio';

const INITIAL_LENGTH = 60; /*timespan in seconds*/
const initialState = {
	volume: 1,
	pixelsPerSecond: 0
};

export default function main(state = initialState, {type, data} = {}) {
	switch (type) {
	case VOLUME_SET:
		return {
			...state,
			volume: data
		};
	case ZOOM_INIT:
		return {
			...state,
			pixelsPerSecond: $('.studio-body').width() / INITIAL_LENGTH
		};
	default:
		return state;
	}
}