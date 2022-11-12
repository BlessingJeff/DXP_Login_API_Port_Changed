const assert = require("assert"),
  //fs = require("fs"),
  DxpChain = require("../lib");

require("dotenv").config();

describe("Transaction class", () => {
  before(async () => {
    await DxpChain.connect(process.env.DXPCHAIN_NODE);
  });

  describe("#cost()", () => {
    it.only("get cost", async () => {
      let acc = await DxpChain.login(
        process.env.DXPCHAIN_ACCOUNT,
        process.env.DXPCHAIN_PASSWORD
      );
      let tx = acc.newTx();

      let operation = await acc.transferOperation("trade-bot", "TEST", 1);
      tx.add(operation);

      operation = await acc.transferOperation("trade-bot", "TEST", 1);
      tx.add(operation);

      let cost = await tx.cost().catch(console.log);
      console.log(JSON.stringify(cost, null, 2));
    });
  });
});
