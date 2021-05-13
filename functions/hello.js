const axios = require('axios');
var crypto = require('crypto');


exports.handler = async (event, context) => {
  try { 
    const listId = event.queryStringParameters.list;
    const apiRoot = `https://us1.api.mailchimp.com/3.0/lists/${listId}/members/`;
    const email = event.queryStringParameters.email;
    const tag = event.queryStringParameters.tagName;
    const apiKey = event.queryStringParameters.apiKey;
    if(!email || !listId || !tag || !apiKey) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
        },
        body: "Missing data",
      };
    }

    let emailhash = crypto.createHash('md5').update(email).digest("hex");

    return axios({
      method: 'post',
      url: apiRoot + emailhash + "/tags",
      data:{
          tags: 
            [
              {
                name: tag,
                status: "active",
              },          
            ],
      },
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
      },
      auth: {
        'username': '',
        'password': apiKey,
      },

    }).then(res => {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
        },
        statusCode:200,
        body: JSON.stringify(res.data),
      }
    })
        .catch(err => {
          console.log('returning from here', err.response.data.detail);
          return {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
            },
            statusCode: 500,
            body: JSON.stringify(err.response.data),
          };
        });

  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }

};
