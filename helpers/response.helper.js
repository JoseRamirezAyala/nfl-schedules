/**
 * This helper allows to get a standard response, 
 * it is used with the database helper
 */

 const respond = (response, statusCode, message, data) => {
    
  response.writeHead(statusCode, {
      'Content-Type': 'application/json'
  });

  response.end(JSON.stringify({
      message: message
      , data: data
  }));
};

module.exports = {
  respond: respond
};