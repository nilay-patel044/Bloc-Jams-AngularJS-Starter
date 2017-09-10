(function(){
    function AlbumCtrl() {
        albumData = angular.copy(albumPicasso);
        this.title = albumData.title;
        this.artist = albumData.artist;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);

})();
