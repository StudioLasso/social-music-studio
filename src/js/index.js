/* global __DEVTOOLS__ */

import React from 'react';
import TrackMenu from 'components/TrackMenu';
import AddTrackMenu from 'components/AddTrackMenu';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import DevTools from 'components/Devtools';
import Container from 'components/Container';

const store = configureStore();

export default class Studio extends React.Component {
	render() {
		return (
			<Provider store={store} key="provider">
				<section id="studio" className="studio">
					<div className="container">
						<h1>Studio</h1> 
						<div className='row'>
							<div className="col-xs-12">
								<div className="panel panel-default">
									<div className="panel-heading">
										<h3 className="panel-title">Compose ta musique!</h3>
									</div>
									<Container />
								</div>
							</div>
						</div>
					</div>
					<TrackMenu />
					<AddTrackMenu />
					{__DEVTOOLS__ ? <DevTools /> : undefined}
				</section>
			</Provider>
		);
	}
}