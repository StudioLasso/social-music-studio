import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as utils from 'utils';
import Timeline from './Timeline';
import Track from './Track';

let colors = [ 
	'#324259',
	'#ff0508',
	'#990000',
	'#ffc100',
	'#8d6a95',
	'#4646ea',
	'#07c7dd',
	'#f4824e',
	'#660066',
	'#27612f'
];

colors = utils.shuffle(colors);

class Tracks extends React.Component {
	render() {
		return (
			<div className="tracks">
                <div className="tracks-container">
                    <div className="tracks-without-drums" ref="tracksOnly">
                        <Timeline pixelsPerSecond={this.props.pixelsPerSecond} />
                        {this.props.tracks.map((t, i) => {
							return <Track  
								tid={t.id}
								author="AUTEUR"
								pixelsPerSecond={this.props.pixelsPerSecond}
								instrument="instrument"
								duration={t.duration}
								start={t.delay}
								trimStart={t.trimStart}
								trimEnd={t.trimEnd}
								key={`t.${i}`}
								color={colors[i]} />;
                        })}
                    </div>
                </div>
            </div>
		);
	}
}


function mapStateToProps(state) {
	return {
		pixelsPerSecond: state.Studio.pixelsPerSecond,
		tracks: state.Tracks
	};
}

export default connect(mapStateToProps)(Tracks);
