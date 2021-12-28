import { BigNumber } from "@ethersproject/bignumber";
import { utils } from "ethers";
import Wallet from "../klaytn/Wallet";
import TteokmillSparrowsMinterArtifact from "./abi/artifacts/contracts/TteokmillSparrowsMinter.sol/TteokmillSparrowsMinter.json";
import Contract from "./Contract";
import InjeolmiContract from "./InjeolmiContract";
import TteokmillSparrowsWhitelistContract from "./TteokmillSparrowsWhitelistContract";

class TteokmillSparrowsMinterContract extends Contract {

    constructor() {
        super("0x5fbED47210B9ACfB726736a62650C9F2356463a4", TteokmillSparrowsMinterArtifact.abi);
    }

    public async mintPrice(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("mintPrice"));
    }

    public async limit(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("limit"));
    }

    public async mint(ment: string): Promise<void> {
        const limit = (await this.limit()).toNumber();
        if (limit === 0) {
            alert("민팅 끝남");
        } else if (ment.trim() === "") {
            alert("멘트 입력해야함");
        } else {
            const owner = await Wallet.loadAddress();
            if (owner !== undefined) {
                if (await TteokmillSparrowsWhitelistContract.whitelist(owner) !== true) {
                    alert("화이트리스트에 너의 주소가 없당");
                } else {
                    const price = await this.mintPrice();
                    const balance = await InjeolmiContract.balanceOf(owner);
                    if (balance.lt(price)) {
                        if (confirm(`${String(parseInt(utils.formatEther(price), 10))} 인절미가 필요합니다. 인절미를 구매하시겠습니까?`)) {
                            open("https://tteok.org");
                        }
                    } else if ((await InjeolmiContract.allowance(owner, this.address)).lt(price)) {
                        await InjeolmiContract.approve(this.address, price);
                        await new Promise<void>((resolve) => {
                            setTimeout(async () => {
                                await this.runWalletMethod("mint", ment);
                                resolve();
                            }, 2000);
                        });
                    } else {
                        await this.runWalletMethod("mint", ment);
                    }
                }
            }
        }
    }
}

export default new TteokmillSparrowsMinterContract();
