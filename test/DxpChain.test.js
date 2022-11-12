const assert = require("assert"),
  fs = require("fs"),
  DxpChain = require("../lib");

require("dotenv").config();

describe("DxpChain class", function () {
  describe("main test", function () {
    it.only("subscribe", async function () {
      this.timeout(10000);
      await DxpChain.connect(process.env.DXPCHAIN_NODE);

      return new Promise(resolve => {
        DxpChain.subscribe("block", (...args) => {
          console.log(args);
          resolve();
        });
      });
    });
  });

  describe("#connect()", () => {
    it("connect", async () => {
      let { connect, disconnect } = DxpChain;
      assert.equal(
        await connect(process.env.DXPCHAIN_NODE),
        true,
        "Return not 'true'"
      );

      await disconnect();

      try {
        await DxpChain.db.get_objects(["1.3.0"]);
      } catch (error) {
        return true;
      }
      throw Error("Disconnect don't work");
    });

    it.skip("subscribe", async () => {
      DxpChain.subscribe("connected", console.log);
    });
  });

  describe("#login()", () => {
    before(async () => {
      await DxpChain.connect(process.env.DXPCHAIN_NODE);
    });

    after(DxpChain.disconnect);

    it("login", async () => {
      let { login } = DxpChain;
      let acc = await login(
        process.env.DXPCHAIN_ACCOUNT,
        process.env.DXPCHAIN_PASSWORD
      );
      assert.equal(acc.constructor.name, "DxpChain", "Don't return account");
    });

    it("loginFromFile", async () => {
      let { loginFromFile } = DxpChain;
      let buffer = fs.readFileSync(process.env.DXPCHAIN_WALLET_FILE);

      let acc = await loginFromFile(
        buffer,
        process.env.DXPCHAIN_WALLET_PASS,
        process.env.DXPCHAIN_ACCOUNT
      );

      assert.equal(acc.constructor.name, "DxpChain", "Don't return account");
    });
  });

  describe.skip("#subscribe", () => {
    it("connected", async () => {
      await DxpChain.subscribe("connected", console.log);
    });

    it("block", async () => {
      await DxpChain.subscribe("block", console.log);
    });

    it("account", async () => {
      DxpChain.node = process.env.DXPCHAIN_NODE;
      await DxpChain.subscribe("account", console.log, "trade-bot");
    });
  });

  describe.skip("#assetIssue()", () => {
    before(async () => {
      await DxpChain.connect(process.env.DXPCHAIN_NODE);
    });

    after(DxpChain.disconnect);

    it("issue asset", async () => {
      let bot = await DxpChain.login(
        process.env.DXPCHAIN_ACCOUNT,
        process.env.DXPCHAIN_PASSWORD
      );
      let asset = (await bot.balances(process.env.ISSUE_ASSET))[0];
      let balanceBefore = asset.amount / 10 ** asset.asset.precision;

      await bot.assetIssue(
        process.env.DXPCHAIN_ACCOUNT,
        process.env.DXPCHAIN_ISSUE_ASSET,
        10,
        "Hello"
      );

      let balanceAfter =
        (await bot.balances(process.env.DXPCHAIN_ISSUE_ASSET))[0].amount /
        10 ** asset.asset.precision;
      assert.equal(balanceBefore + 10, balanceAfter, "Asset don't issued");
    });

    it("generateKeys", async () => {
      console.log(
        DxpChain.generateKeys(
          process.env.DXPCHAIN_ACCOUNT,
          process.env.DXPCHAIN_PASSWORD
        )
      );
    });
  });
});
