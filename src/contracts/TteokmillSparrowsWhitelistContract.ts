import TteokmillSparrowsWhitelistArtifact from "./abi/artifacts/contracts/TteokmillSparrowsWhitelist.sol/TteokmillSparrowsWhitelist.json";
import Contract from "./Contract";

class TteokmillSparrowsWhitelistContract extends Contract {

    constructor() {
        super("0xE981EE65705610D49327B375142110f2Dcada814", TteokmillSparrowsWhitelistArtifact.abi);
    }

    public async whitelist(address: string): Promise<boolean> {
        return await this.runMethod("whitelist", address);
    }
}

export default new TteokmillSparrowsWhitelistContract();
