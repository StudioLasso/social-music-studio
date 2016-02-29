/**
 * Tracks reducer
 */

import {
	TRACK_ADD
} from '../actions/Tracks';

const initialState = [
];

export default function main(state = initialState, {type, data} = {}) {
	switch (type) {
	case TRACK_ADD:
		return [
			...state,
			data
		];
	default:
		return state;
	}
}