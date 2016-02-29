import React from 'react';
import TopMenu from 'components/TopMenu';
import Tracks from 'components/Tracks';
import * as studioActions from 'actions/Studio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Container extends React.Component {
	componentDidMount() {
		this.props.initZoom();
	}

	render() {
		return (
			<div className="panel-body studio-body">
				<TopMenu />
				<Tracks tracks={this.props.music && this.props.music.tracks}/>
			</div>
		);
	}
}

export default connect(s => {return {};}, dispatch => {
	return bindActionCreators(studioActions, dispatch);
})(Container);