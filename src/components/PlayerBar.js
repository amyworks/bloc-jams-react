import React, { Component } from 'react';
 
class PlayerBar extends Component {
	render() {
    	return (
    		<section className="fg-row clearfix">
    			<section id="buttons">          			
           			<button id="previous" onClick={this.props.handlePrevClick}>
             			<span className="fas fa-fast-backward"></span>
           			</button>
           			<button id="play-pause" onClick={this.props.handleSongClick} >
             			<span className={this.props.isPlaying ? "fas fa-pause" : "fas fa-play-circle"}></span>
           			</button>
           			<button id="next" onClick={this.props.handleNextClick}>
             			<span className="fas fa-fast-forward"></span>
           			</button>
         		</section>

         		<section id="time-control">                                                                   
           			<div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
           				<input 
             				type="range" 
             				className="seek-bar time" 
             				value={(this.props.currentTime / this.props.duration) || 0} 
             				max="1" 
             				min="0" 
             				step="0.01"
             				onChange={this.props.handleTimeChange} 
           				/>
           			<div className="total-time">{this.props.formatTime(this.props.duration)}</div>
         		</section>

         		<section id="volume-control">
           			<span className="fas fa-volume-down"></span>
	           			<input
	           				id="player-volume" 
	           				type="range" 
	           				className="seek-bar" 
	           				value={this.props.currentVolume} 
	           				min="0" 
	           				max="1" 
	           				step="0.1" 
	           				onChange={this.props.handleVolume} />
	           		<span className="fas fa-volume-up"></span>
         		</section>
       		</section>
    	);
	}
}
 
export default PlayerBar;