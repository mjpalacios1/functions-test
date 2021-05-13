const axios = require('axios');
var crypto = require('crypto');

const apiRoot = 'https://us1.api.mailchimp.com/3.0/lists/2387a9c0f9/members/';


exports.handler = async (event, context) => {
  try {
    const email ="mjplacios1@espe.edu.ec";
    if(!email) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
        },
        body: 'email query paramter required'
      };
    }

    let emailhash = crypto.createHash('md5').update(email).digest("hex");

    return axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE,OPTION",
      },
      method: 'put',
      url: apiRoot + emailhash,
      data:{
        email_address:email,
        status:'subscribed',
        merge_fields:{
          tags: [
            [
              {
                name: "test",
                status: "active",
              },          
            ],
          ],
       }
      },
      auth: {
        'username': 'mjpalacios1',
        'password': '3ccb284bebb7cdcc848eb6f2d87a7adb-us1'
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
