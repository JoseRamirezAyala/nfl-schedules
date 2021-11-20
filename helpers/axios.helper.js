const axios = require('axios').default;

const get = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

module.exports = {
    get: get
}