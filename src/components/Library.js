import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
	constructor(props) {
     	super(props);
     	this.state = { albums: albumData };
   	}

   	render() {
    	return ( 
      		<section className="library fg-row clearfix">
      			
	        		{
	          			this.state.albums.map( (album, index) => 
	            			<div className="album-info fg-col-padded half clearfix">
		            			<Link to={`/album/${album.slug}`} key={index}>	            				
			              				<img src={album.albumCover} alt={album.title} />			              				
			               				<h3>{album.title}</h3>
			               				<p className="album-artist">{album.artist}</p>
			               				<p className="album-songs">{album.songs.length} songs</p>
		            			</Link>
	            			</div>
	          			)
	        		}
        		
      		</section>
     	);
   	}
}

export default Library;