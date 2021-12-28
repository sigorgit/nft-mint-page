import { BigNumber } from "@ethersproject/bignumber";
import Contract from "./Contract";
declare class TteokmillSparrowsMinterContract extends Contract {
    constructor();
    mintPrice(): Promise<BigNumber>;
    limit(): Promise<BigNumber>;
    mint(ment: string): Promise<void>;
}
declare const _default: TteokmillSparrowsMinterContract;
export default _default;
//# sourceMappingURL=TteokmillSparrowsMinterContract.d.ts.map