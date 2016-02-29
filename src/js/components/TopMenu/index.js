import React from 'react';
import Volume from '../Volume';
import RecPopup from '../RecPopup';
import s from './styles.css';
import Moment from 'moment';

/**
* Return number ...
*/
function formatNumber(/*Number*/num) {
	let number = num >= 100 ? num / 10 : num;
	number = Number(num.toFixed(0));
	return number < 10 ? `0${num}` : number;
}

export default class TopMenu extends React.Component {
	playStyle() {
		return { 
			'display': true ? 'none' : 'block'
		};
	}

	stopStyle() {
		return {
			display: true ? 'block' : 'none'
		};
	}

	render() {
		return (
			<div className={s.topContainer}>
				<div className={s.sideCol}>
					<div className={`btn-group ${s.margR10}`} role="group">
						<button 
							type="button" 
							className="btn btn-default" 
							title="Revenir en arrière" 
							onClick={this.back}>
							<i className="fa fa-backward"></i>
						</button>
						<button 
							type="button" 
							className="btn btn-default" 
							title="Jouer" 
							onClick={this.play} 
							style={this.playStyle()}>
							<i className="fa fa-play"></i>
						</button>
						<button 
							type="button" 
							className="btn btn-default" 
							title="Stop" 
							onClick={this.stop} 
							style={this.stopStyle()}>
							<i className="fa fa-stop"></i>
						</button>
						<button 
							type="button" 
							className="btn btn-default" 
							title="Aller vers l'avant" 
							onClick={this.forward}>
							<i className="fa fa-forward"></i>
						</button>
					</div>
					<div className={`btn-group ${s.margR10}`} role="group">
						<button type="button" className="btn btn-default" title="J'aime">
							<i className="fa fa-heart"></i>`
						</button>
						<button type="button" className="btn btn-default" title="Partager">
							<i className="fa fa-share-alt"></i>
						</button>	
					</div>
					<button 
						type="button"
						className="btn btn-default visible-xs visible-sm" 
						title="plus d'options">...</button>
					<div className={`hidden-xs hidden-sm ${s.volContainer}`}>
						<div className={s.label}><strong>volume</strong></div>
						<Volume listenerChange={null} level={0.5} />
					</div>
				</div>
				<div className={s.cadran}>
					{(() => {
						const d = Moment.duration(this.props.elapsedTime, 'seconds');
						return `${formatNumber(d.minutes())}:${formatNumber(d.seconds())}:${formatNumber(d.milliseconds())}`;
					})()}
				</div>
				<div className={`${s.sideCol} hidden-xs`}>
					<div className={`hidden-sm ${s.bpmContainer}`}>
						<div className={s.label}>
							<strong>BPM</strong>
						</div>
						<div className={s.form}>
							<div className={s.tempo}>
								<input 
									type="number" 
									className="form-control" 
									id="tempo" 
									placeholder="Tempo" 
									value={null} 
									onChange={null} />
							</div>
							<div className={s.tempoType}>
								<select className="form-control" value="4-4">
									<option value="1-4">1/4</option>
									<option value="2-4">2/4</option>
									<option value="3-4">3/4</option>
									<option value="4-4">4/4</option>
								</select>
							</div>
						</div>
					</div>

					<div>
						<div className={`btn-group-vertical ${s.margR10}`} role="group">
							<button type="button" 
									className="btn btn-default" 
									onClick={this.zoom}>
								<i className="fa fa-search-plus"></i>
							</button>
							<button type="button" 
									className="btn btn-default" 
									onClick={this.dezoom}>
								<i className="fa fa-search-minus"></i>
							</button>
						</div>
					</div>

					<div className={`btn-group ${s.margR10}`} role="group">
						<button type="button" 
								className="btn btn-default" 
								onClick={this.addTrack} 
								title="Ajouter une piste">
							<i className="fa fa-plus"></i>
						</button>
						<div className={s.recordActionsStyles}>
							<button type="button" 
									className="btn btn-default" 
									onClick={this.loadRecorder} 
									title="Enregistrer au micro" 
									data-toggle="modal" 
									data-target="#myModal">
								<i className={`fa fa-circle ${s.record}`}></i>
							</button>
							<button type="button" className="btn btn-default" title="Uploader une musique">
								<i className="fa fa-upload"></i>
							</button>
						</div>

						<button type="button" className="btn btn-default" title="Publier">
							<i className={`fa fa-cloud ${s.publish}`}></i>
						</button>
						<button type="button" className="btn btn-default" title="Versions">
							<i className="fa fa-sitemap"></i>
						</button>
					</div>

					<button type="button" 
							className="btn btn-default visible-sm" 
							title="plus d'option d'édition">...</button>
				</div>
				<RecPopup/>
			</div>
		);
	}
}