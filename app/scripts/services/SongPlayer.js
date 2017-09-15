(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc An empty SongPlayer object that is returned at very end of this service.
        * @type {Object}
        */
         var SongPlayer = {};


         /**
         * @desc Stores the album information it gets from the Fixtures service.
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new Buzz object audio file.
         * @param {Object} song.
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true,
                volume: 80
            });

            currentBuzzObject.bind('timeUpdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });

            //Condition checks for current song length to be greater than or equal to the track's duration. If so, then play the next song in line.
            if(SongPlayer.currentTime >= currentBuzzObject.duration) {
                $('#next').trigger('click');
            }
            });

            currentBuzzObject.bind('ended', function() {
                $rootScope.$apply(function() {
                    SongPlayer.next();
                });
            });


            SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays a new Buzz object audio file.
         * @param {Object} song.
         */
         var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
         };

         /**
         * @function stopSong.
         * @desc Stops the current Buzz object audio file and sets the current playing song to null.
         * @param {Object} song.
         */
         var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
         };
         /**
         * @function getSongIndex
         * @desc returns the index of a given song from the album.
         * @param {Object}  song.
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc The current Song object declared publicly.
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         * @desc The default volume of Current Buzz Object audio file.
         * @type {Number}
         */
         SongPlayer.volume = 80;


         /**
         * @function SongPlayer.play
         * @desc If current song is not the song user clicked on, then set current song to it and play it. Otherwise, if the song is paused, then play it.
         * @param {Object} song.
         */
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
              }
        };

        /**
        * @function SongPlayer.pause
        * @desc Pause the currently playing audio file as Buzz object. Set the status flag to false.
        * @param {Object} song.
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };


        /**
        * @function SongPlayer.previous
        * @desc Gets the index of the song before current song and plays it.
        * @param none.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if(currentSongIndex < 0) {
              stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function SongPlayer.next
        * @desc Gets the index of the song after current song and plays it. If the index is greater than the length of the album then set the index to 0.
        * @param none.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if(currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
              }


        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time.
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc If the current Buzz Object audio file exists, then set the volume.
        * @param {Number} volume.
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
