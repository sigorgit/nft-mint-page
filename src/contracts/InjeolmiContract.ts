import KIP7Artifact from "./abi/artifacts/contracts/klaytn-contracts/token/KIP7/KIP7.sol/KIP7.json";
import KIP7Contract from "./standard/KIP7Contract";

class InjeolmiContract extends KIP7Contract {

    constructor() {
        super("0x9CFc059F64D664F92f3d0329844B8ccca4E5215B", KIP7Artifact.abi);
    }
}

export default new InjeolmiContract();
