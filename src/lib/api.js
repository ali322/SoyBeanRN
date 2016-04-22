'use strict';

const apiHost = "http://api.douban.com/v2/"

const api = {
    top250:`${apiHost}movie/top250`,
    searchMovies:`${apiHost}movie/search`,
    movie:`${apiHost}movie/subject`,
    creator:`${apiHost}movie/celebrity`,
    searchBook:`${apiHost}book/search`
}

export default api