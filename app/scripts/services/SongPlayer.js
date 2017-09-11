(function() {
    function SongPlayer() {
        /**
        * @desc An empty SongPlayer object that is returned at very end of this service.
        * @type {Object}
        */
         var SongPlayer = {};

         /**
         * @desc The current Song object.
         * @type {Object}
         */
         var currentSong = null;

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new Buzz object audio file.
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays a new Buzz object audio file.
         * @param none.
         */
         var playSong = function () {
            currentBuzzObject.play();
            song.playing = true;
         };

         /**
         * @function SongPlayer.play
         * @desc If current song is not the song user clicked on, then set current song to it and play it. Otherwise, if the song is paused, then play it.
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong();

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
              }
        };

        /**
        * @function SongPlayer.pause
        * @desc Pause the currently playing audio file as Buzz object. Set the status flag to false.
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
