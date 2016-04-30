'use strict'

const apiHost = "http://api.douban.com/v2/"

const api = {
    top250:`${apiHost}movie/top250`,
    searchMovie:`${apiHost}movie/search`,
    movie:`${apiHost}movie/subject`,
    creator:`${apiHost}movie/celebrity`,
    
    searchBook:`${apiHost}book/search`,
    book:`${apiHost}book`,
    
    eventLocations:`${apiHost}loc/list`,
    events:`${apiHost}event/list`,
    event:`${apiHost}event`
}

export default api