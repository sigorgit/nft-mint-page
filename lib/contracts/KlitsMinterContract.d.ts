import { BigNumber } from "@ethersproject/bignumber";
import Contract from "./Contract";
declare class KlitsMinterContract extends Contract {
    constructor();
    mintPrice(): Promise<BigNumber>;
    remains(): Promise<BigNumber>;
    mint(count: number): Promise<void>;
}
declare const _default: KlitsMinterContract;
export default _default;
//# sourceMappingURL=KlitsMinterContract.d.ts.map