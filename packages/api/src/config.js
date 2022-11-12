const defaultConfig = {
  name: "DxpChain",
  coreToken: "DXP",
  addressPrefix: "DXP",
  expireInSecs: 15,
  expireInSecsProposal: 24 * 60 * 60,
  reviewInSecsDxpcore: 24 * 60 * 60,
  chainId: "23ae9e6b52450ad617b9f604bbb4080a6aa8fac56ccf46ed0413b6cca9eee7c3",
};

let networks = [
    defaultConfig,
    {
      name: "TestNet",
      coreToken: "TEST",
      addressPrefix: "TEST",
      expireInSecs: 15,
      expireInSecsProposal: 24 * 60 * 60,
      reviewInSecsDxpcore: 24 * 60 * 60,
      chainId:
        "23ae9e6b52450ad617b9f604bbb4080a6aa8fac56ccf46ed0413b6cca9eee7c3",
    },
  ],
  current = null;

export const addConfig = config =>
  networks.push({ ...defaultConfig, ...config });

export const setConfig = chainId =>
  (current = networks.find(net => net.chainId === chainId));

export const getConfig = () => current;
