
module.exports = class Track {
    constructor(songName, uri){
        this.songName = songName;
        this.uri = uri;
    };

    get getSongName() {
        return this.songName;
    };

    get getUri() {
        return this.uri;
    };
}

