const DxpChain = require('dxpdex');
const express = require('express');
const app = express();
const cors = require('cors');
PORT = 11011;
app.use(express.json())
app.use(cors({
  origin: "*"
}));

app.post('/login_check', async function (req, res) {
  var username = req.body.username;
  var password = req.body.wallet_password;
  try {
    const result = await start(username, password);
    if (result !== 'false') {
      var response_data = {
        username: result.name,
        id: result.id,
        result: true
      };
    }
    res.send(response_data);
  } catch (e) {
    res.end(e.message || e.toString());
  }
});

async function start(username, password) {
  if (await DxpChain.connect()) {
    let acc = await DxpChain.login(username, password);
    return acc.account;
  } else
    console.log("Wrong Navigation");
}

app.listen(11011, () => {
  console.log(`Running on port ${PORT}`);
});