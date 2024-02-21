class Sounds {
	walking_sound = new Audio('./audio/walking.mp3');
	ouch_sound = new Audio('./audio/hurt.mp3');
	smashing_bottle_sound = new Audio('./audio/glass.mp3');
	collect_sound = new Audio('./audio/coin.mp3');
	hit_sound = new Audio('./audio/chickenDead.mp3');

	setVolume() {
		this.walking_sound.volume = 0.1;
		this.ouch_sound.volume = 0.1;
		this.smashing_bottle_sound.volume = 0.1;
		this.collect_sound.volume = 0.1;
		this.hit_sound.volume = 0.1;
	}

	muteSounds() {
		this.walking_sound.volume = 0.0;
		this.ouch_sound.volume = 0.0;
		this.smashing_bottle_sound.volume = 0.0;
		this.collect_sound.volume = 0.0;
		this.hit_sound.volume = 0.0;
	}

	/**
	 * Funktion um Musik an und ab zu schalten
	 */
	checkSetSounds() {
		soundsOn ? this.setVolume() : this.muteSounds();
	}
}
