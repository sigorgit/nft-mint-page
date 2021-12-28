"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const TteokmillSparrowsMinter_json_1 = __importDefault(require("./abi/artifacts/contracts/TteokmillSparrowsMinter.sol/TteokmillSparrowsMinter.json"));
const Contract_1 = __importDefault(require("./Contract"));
const InjeolmiContract_1 = __importDefault(require("./InjeolmiContract"));
const TteokmillSparrowsWhitelistContract_1 = __importDefault(require("./TteokmillSparrowsWhitelistContract"));
class TteokmillSparrowsMinterContract extends Contract_1.default {
    constructor() {
        super("0x5fbED47210B9ACfB726736a62650C9F2356463a4", TteokmillSparrowsMinter_json_1.default.abi);
    }
    async mintPrice() {
        return bignumber_1.BigNumber.from(await this.runMethod("mintPrice"));
    }
    async mintCounts(address) {
        return bignumber_1.BigNumber.from(await this.runMethod("mintCounts", address));
    }
    async limit() {
        return bignumber_1.BigNumber.from(await this.runMethod("limit"));
    }
    async mint(ment) {
        const limit = (await this.limit()).toNumber();
        if (limit === 0) {
            alert("민팅 끝남");
        }
        else if (ment.trim() === "") {
            alert("멘트 입력해야함");
        }
        else {
            const owner = await Wallet_1.default.loadAddress();
            if (owner !== undefined) {
                if (await TteokmillSparrowsWhitelistContract_1.default.whitelist(owner) !== true) {
                    alert("화이트리스트에 너의 주소가 없당");
                }
                else if ((await this.mintCounts(owner)).eq(10)) {
                    alert("10개 민팅했잖아 욕심쟁이!!");
                }
                else {
                    const price = await this.mintPrice();
                    const balance = await InjeolmiContract_1.default.balanceOf(owner);
                    if (balance.lt(price)) {
                        if (confirm(`${String(parseInt(ethers_1.utils.formatEther(price), 10))} 인절미가 필요합니다. 인절미를 구매하시겠습니까?`)) {
                            open("https://tteok.org");
                        }
                    }
                    else if ((await InjeolmiContract_1.default.allowance(owner, this.address)).lt(price)) {
                        await InjeolmiContract_1.default.approve(this.address, price);
                        await new Promise((resolve) => {
                            setTimeout(async () => {
                                await this.runWalletMethod("mint", ment);
                                resolve();
                            }, 2000);
                        });
                    }
                    else {
                        await this.runWalletMethod("mint", ment);
                    }
                }
            }
        }
    }
}
exports.default = new TteokmillSparrowsMinterContract();
//# sourceMappingURL=TteokmillSparrowsMinterContract.js.map