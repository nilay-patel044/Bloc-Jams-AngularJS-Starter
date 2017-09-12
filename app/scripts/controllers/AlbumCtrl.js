(function(){
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        //this.title = albumData.title;
        //this.artist = albumData.artist;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);

})();
