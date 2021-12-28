"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const KlitsMinter_json_1 = __importDefault(require("./abi/klits/artifacts/contracts/KlitsMinter.sol/KlitsMinter.json"));
const Contract_1 = __importDefault(require("./Contract"));
const MixContract_1 = __importDefault(require("./MixContract"));
class KlitsMinterContract extends Contract_1.default {
    constructor() {
        super("0x8FFc61c21553D893BBA612F9895547B5B95A9AE1", KlitsMinter_json_1.default.abi);
    }
    async mintPrice() {
        return bignumber_1.BigNumber.from(await this.runMethod("mintPrice"));
    }
    async remains() {
        return bignumber_1.BigNumber.from(await this.runMethod("remains"));
    }
    async mint(count) {
        const remains = (await this.remains()).toNumber();
        if (count > remains) {
            alert(`남은 개수는 ${remains}개입니다.`);
        }
        else {
            const owner = await Wallet_1.default.loadAddress();
            if (owner !== undefined) {
                const price = (await this.mintPrice()).mul(count);
                const balance = await MixContract_1.default.balanceOf(owner);
                if (balance.lt(price)) {
                    if (confirm(`${String(parseInt(ethers_1.utils.formatEther(price), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                        open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    }
                }
                else if ((await MixContract_1.default.allowance(owner, this.address)).lt(price)) {
                    await MixContract_1.default.approve(this.address, price);
                    await new Promise((resolve) => {
                        setTimeout(async () => {
                            await this.runWalletMethod("mint", count);
                            resolve();
                        }, 2000);
                    });
                }
                else {
                    await this.runWalletMethod("mint", count);
                }
            }
        }
    }
}
exports.default = new KlitsMinterContract();
//# sourceMappingURL=KlitsMinterContract.js.map