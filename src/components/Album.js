import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
	constructor(props) {
     	super(props);

     	const album = albumData.find( album => {
       		return album.slug === this.props.match.params.slug
     	});
 
     	this.state = {
       		album: album,
      		currentSong: album.songs[0],
      		currentTime: 0,
       		duration: album.songs[0].duration,
      		isPlaying: false,
      		currentVolume: 0.5
     	};

     	this.audioElement = document.createElement('audio');
     	this.audioElement.src = album.songs[0].audioSrc;
   	}

   	componentDidMount() {
     	this.eventListeners = {
       		timeupdate: e => {
         		this.setState({ currentTime: this.audioElement.currentTime });
       		},
       		durationchange: e => {
         		this.setState({ duration: this.audioElement.duration });
       		},
       		volumechange: e => {
       			this.setState({ currentVolume: this.audioElement.currentVolume });
       		}
     	};

     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
   	}

   	componentWillUnmount() {
     	this.audioElement.src = null;
     	this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     	this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     	this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   	}

   	setSong(song) {
     	this.audioElement.src = song.audioSrc;
     	this.setState({ currentSong: song });
   	}

   	play() {
     	this.audioElement.play();
     	this.setState({ isPlaying: true });
   	}

   	pause() {
     	this.audioElement.pause();
     	this.setState({ isPlaying: false });
   	}

   	handleSongClick(song) {
     	const isSameSong = this.state.currentSong === song;
     	if (this.state.isPlaying && isSameSong) {
       		this.pause();
     	} else {
     		if (!isSameSong) { this.setSong(song); }
       		this.play();
     	}
   	}

   	handlePrevClick() {
   		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      	const newIndex = Math.max(0, currentIndex - 1);
      	const newSong = this.state.album.songs[newIndex];
      	this.setSong(newSong);
      	this.play(newSong);
    }

    handleNextClick() {
   		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
   		const x = this.state.album.songs.length;
     	const newIndex = Math.min(x, currentIndex + 1);
     	const newSong = this.state.album.songs[newIndex];
     	this.setSong(newSong);
     	this.play(newSong);
    }

    handleTimeChange(e) {
     	const newTime = this.audioElement.duration * e.target.value;
     	this.audioElement.currentTime = newTime;
     	this.setState({ currentTime: newTime });
   	}

   	formatTime(duration) {
   		if(isNaN(duration) === true) {
   			return "-:--"
   		} else {
   			duration = Math.floor(Number.parseInt(duration, 10));
    		let M = Math.floor(duration / 60);
    		let SS = duration % 60;
      		if(SS < 10){
        		return M + ":0" + SS;
      		} else {
        		return M + ":" + SS;
        	}
      	}    	
   	}

   	handleVolume(e) {
    	let newVolume = e.target.value;
    	this.audioElement.volume = newVolume;
    	this.setState({ currentVolume: newVolume })
  	}

   	render() {
     	return (
       		<section className="album clearfix">
       			<section className="fg-row clearfix">
	         		<section id="album-info">
	           			<img id="album-cover-art" className="fg-col half" src={this.state.album.albumCover} />
	           			<div className="album-details fg-col half">
	             			<h2 id="album-title">{this.state.album.title}</h2>
	             			<h3 className="artist">{this.state.album.artist}</h3>
	             			<div id="release-info">{this.state.album.releaseInfo}</div>
	             			<table id="song-list">
				           		<colgroup>
				            		<col id="song-number-column" />
				            		<col id="song-title-column" />
				            		<col id="song-duration-column" />
				           		</colgroup>  
				           		<tbody>           				
				           			{
				          				this.state.album.songs.map( (song, index) =>
				            				<tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
				            					<td className="song-actions">
				               						<button> 
				                   						<span className={this.state.isPlaying ? "ion-pause" : "song-number"}></span>
				               						</button>
				               					</td>
				               					<td className="song-title">{song.title}</td>
				               					<td className="song-duration">{this.formatTime(song.duration)}</td>
				            				</tr>
				          				)
				        			}        				
				           		</tbody>
				         	</table>
	           			</div>
	         		</section>  	         		
	         	</section>

		        <section className="player-bar">
	         		<PlayerBar
	           			isPlaying={this.state.isPlaying}
	           			currentSong={this.state.currentSong}
	           			currentTime={this.audioElement.currentTime}
	           			currentVolume={this.state.currentVolume}
	           			duration={this.audioElement.duration}
	           			formatTime={(x) => this.formatTime(x)}
	           			handleSongClick={() => this.handleSongClick(this.state.currentSong)}
	           			handlePrevClick={() => this.handlePrevClick()}
	           			handleNextClick={() => this.handleNextClick()}
	           			handleTimeChange={(e) => this.handleTimeChange(e)}
	           			handleVolume={(e) => this.handleVolume(e)}
	           		/>
	       		</section>
	       	</section>
     	);
   	}
}

export default Album;