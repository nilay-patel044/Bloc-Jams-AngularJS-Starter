(function(){
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.title = albumData.title;
        this.artist = albumData.artist;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);

})();
