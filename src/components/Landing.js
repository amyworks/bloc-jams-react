import React from 'react';

const Landing = () => (
 	<section className="landing">
    	<header className="page-header fg-row clearfix">
	    	<h2 className="hero-title">Turn the music up! <img src="/style/img/turn-the-volume-up.gif" /></h2>
		</header>
    
    	<section className="selling-points fg-row clearfix">
      		<div className="point fg-col third">
        		<h3 className="point-title">Choose your music</h3>
        		<p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      		</div>
      		
      		<div className="point fg-col third">
        		<h3 className="point-title">Take it anywhere</h3>
        		<p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      		</div>
      		
      		<div className="point fg-col third">
        		<h3 className="point-title">Unlimited and ad-free</h3>
        		<p className="point-description">Stream all you like. No arbitrary limits. No distractions.</p>
      		</div>
    	</section>

    	<section className="fg-row">    		
	    	<img src="/style/img/cassette-player-retro.jpg" />
    	</section>
  	</section>
);

export default Landing;