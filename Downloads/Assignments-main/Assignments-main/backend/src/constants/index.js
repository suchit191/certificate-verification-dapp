const { ERROR_MESSAGES } = require("./error-messages");
const API_HOST = 'chainlink-api-v3.site';
const API_SUB_URL = 'service/token';
const SAMPLE_API_KEY = '0d0c9c4db6953fee1a7a7d9d5a0f28a7';
const API_HEADERS = {
  "x-secret-header": "secret",
};
const API_URL = `http://${API_HOST}/api/${API_SUB_URL}/${SAMPLE_API_KEY}`;

module.exports = {
    ERROR_MESSAGES,
    SAMPLE_API_KEY,
    API_SUB_URL,
    API_HOST,
    API_HEADERS,
    API_URL,
};