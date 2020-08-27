'use strict';
const KEY = 'AIzaSyDjcPeQLtZpT60_YQyyYHWlWkXEpkBCKPw';

export const youtubeService = {
    getSearchResult
}

function getSearchResult(search) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${KEY}&q=$%7B${search}`)
        .then(res => res.data.items[0])
}


function getVideos() {
    return gVideos;
}