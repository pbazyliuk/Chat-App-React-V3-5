// Libs

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';

class Home extends React.Component {

	componentDidMount() {
		var TxtType = function(el, toRotate, period) {
			this.toRotate = toRotate;
			this.el = el;
			this.loopNum = 0;
			this.period = parseInt(period, 10) || 2000;
			this.txt = '';
			this.tick();
			this.isDeleting = false;
		};

		TxtType.prototype.tick = function() {
			var i = this.loopNum % this.toRotate.length;
			var fullTxt = this.toRotate[i];

			if (this.isDeleting) {
				this.txt = fullTxt.substring(0, this.txt.length - 1);
			} else {
				this.txt = fullTxt.substring(0, this.txt.length + 1);
			}

			this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

			var that = this;
			var delta = 200 - Math.random() * 100;

			if (this.isDeleting) { delta /= 2; }

			if (!this.isDeleting && this.txt === fullTxt) {
				delta = this.period;
				this.isDeleting = true;
			} else if (this.isDeleting && this.txt === '') {
				this.isDeleting = false;
				this.loopNum++;
				delta = 500;
			}

			setTimeout(function() {
				that.tick();
			}, delta);
		};

		function startAnim() {
			var elements = document.getElementsByClassName('typewrite');
			for (var i=0; i<elements.length; i++) {
				var toRotate = elements[i].getAttribute('data-type');
				var period = elements[i].getAttribute('data-period');
				if (toRotate) {
					new TxtType(elements[i], JSON.parse(toRotate), period);
				}
			}

			var css = document.createElement('style');
			css.type = 'text/css';
			css.innerHTML = '.typewrite .wrap { border-right: 2px solid #989ad7 }';
			document.body.appendChild(css);
    	};
    	startAnim();
	};

	render() {
		const messageText = '[ "finding new friends...", "sharing some new ideas...", "just...", "simple speaking with your friends=)" ]';
		return (
			<div className={ styles['home'] } >

				<h1 className={ styles['home__main-header'] } >Simple chat is best for</h1>
				<div className={ `${styles['home__subheader']} typewrite` } data-period='2000' data-type={messageText}>
					<span className='wrap'></span>
				</div>
				<p className={ styles['home__description'] }>Free real-time chat application</p>
				<Link to="/auth/register" className={ styles['home__btn-register'] } >Register</Link>
			</div>
		)
	}
}

export default Home;
