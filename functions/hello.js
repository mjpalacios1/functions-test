exports.handler = async event => {
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

mailchimp.setConfig({
  apiKey: "3ccb284bebb7cdcc848eb6f2d87a7adb-us1",
  server: "us1",
});

const email = "mjpalacios0205@gmail.com";
const listId = "2387a9c0f9";
const subscriberHash = md5(email.toLowerCase());

async function run() {
  const response = await mailchimp.lists.updateListMemberTags(
    listId,
    subscriberHash,
    {
      tags: [
        [
          {
            name: "test",
            status: "active",
          },          
        ],
      ],
    }
  );

  console.log(
    `The return type for this endpoint is null, so this should be true: ${
      response === null
    }`
  );
}

run();
}
