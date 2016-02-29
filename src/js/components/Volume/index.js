/* global $ */

import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as studioActions from 'actions/Studio';
import s from './styles';

class Volume extends React.Component {
	componentDidMount() {
		$(ReactDOM.findDOMNode(this.refs.root)).click(this.onClick.bind(this));
	}

	onClick(e) {
		this.props.setVolume(e.offsetX / $(React.findDOMNode(this.refs.root)).width());
	}
    
	getProgressStyle() {
		return {
			width: `${this.props.level * 100}%`
		};
	}

	render() {
		return (
            <div className={`progress ${s.root}`} ref="root">
                <div className="progress-bar" role="progressbar" aria-valuenow="60"
                    aria-valuemin="0" aria-valuemax="100" style={this.getProgressStyle()}>
                    <span className="sr-only">60% Complete</span>
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		level: state.Studio.volume
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(studioActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Volume);
