const admin = require('../firebaseAdmin');

let users = [];
const notification =async (req, res) => {
  const {id,message} = req.body;
  const user = users.find(user => user.id == id);
  await sendMessageToDevice(user?.token,message);
  return res.send("Are sending");
};
const getTokenNotification =async (req, res) => {
  const { id, token } = req.body;
  const some = users.some((item) => item?.id == id);
  if (some) {
    users = users.map((item) => {
      if (item?.id == id) {
        return {
          ...item,
          token: token,
        };
      }
      return item;
    });
  } else {
    users.push({
      id: id,
      token: token,
    });
  }
  return res.send("add success");
};

const router = (app) => {
  app.post("/notification/gettoken", getTokenNotification);
  app.post("/notification", notification);
};

async function sendMessageToDevice(token, message) {
  const messagePayload = {
    token: token,
    notification: {
      title: message?.title,
      body: message?.body
    },
    data: {
      // Optional custom data
    }
  };

  try {
    const response = await admin.messaging().send(messagePayload);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

module.exports = router;
