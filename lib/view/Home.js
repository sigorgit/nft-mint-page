"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const InjeolmiContract_1 = __importDefault(require("../contracts/InjeolmiContract"));
const TteokmillSparrowsMinterContract_1 = __importDefault(require("../contracts/TteokmillSparrowsMinterContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
class Home {
    constructor() {
        this.TODAY_COUNT = 9999;
        this.container = (0, skynode_1.el)(".home-view", (0, skynode_1.el)("h1", "떡방앗간 참새 NFT 민팅"), (0, skynode_1.el)("h2", "참새들의 내 집 마련의 꿈은 이뤄진다...☆"), (0, skynode_1.el)("h3", "똥영재 曰: 절. 대. 컴. 터. 로. 해."), this.mintPrice = (0, skynode_1.el)(".mint-price", "민팅 절미:"), this.ijmBalance = (0, skynode_1.el)(".ijm-balance", "너의 절미:"), (0, skynode_1.el)(".wallet-address-container", (0, skynode_1.el)("h3", "너의 주소"), this.walletAddress = (0, skynode_1.el)(".wallet-address")), (0, skynode_1.el)(".comment-container", (0, skynode_1.el)("img", { src: `./images/nft${Math.floor(Math.random() * 6)}.png` }), this.commentInput = (0, skynode_1.el)("input.comment", { placeholder: "원하는 문구를 입력해줘" })), (0, skynode_1.el)(".text-container", (0, skynode_1.el)(".progress-text", "내 집 마련한 참새 수"), this.mintCount = (0, skynode_1.el)(".progress-text")), (0, skynode_1.el)(".progress", this.bar = (0, skynode_1.el)(".progress__bar")), (0, skynode_1.el)("button", "민팅 허기", {
            click: () => {
                TteokmillSparrowsMinterContract_1.default.mint(this.commentInput.domElement.value);
            },
        }), (0, skynode_1.el)(".footer", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a", { href: "https://twitter.com/tteokmill", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/twitter.svg", height: "42px" })), (0, skynode_1.el)("a", { href: "https://discord.gg/YgdruRMFtJ", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/discord.svg", height: "42px" })), (0, skynode_1.el)("a", { href: "https://open.kakao.com/o/g1nYzIHd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/icon/kakaotalk.svg", height: "42px" }))), (0, skynode_1.el)("ul", (0, skynode_1.el)("li", (0, skynode_1.el)("a", "떡방앗간.닷컴", { href: "https://tteok.org" })), (0, skynode_1.el)("li", (0, skynode_1.el)("a", "느프트 설명", { href: "http://whitelist.tteok.org/explanation" }))))).appendTo(skynode_1.BodyNode);
        this.loadPrice();
        Wallet_1.default.on("connect", () => this.loadBalance());
        this.progress();
        this.interval = setInterval(() => this.progress(), 1000);
    }
    async loadPrice() {
        const price = await TteokmillSparrowsMinterContract_1.default.mintPrice();
        this.mintPrice.empty().appendText(`민팅 절미: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(price, 8))} IJM`);
    }
    async loadBalance() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.walletAddress.empty().appendText(CommonUtil_1.default.shortenAddress(address));
            const balance = await InjeolmiContract_1.default.balanceOf(address);
            this.ijmBalance.empty().appendText(`너의 절미: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(balance, 8))} IJM`);
        }
    }
    async progress() {
        const remains = (await TteokmillSparrowsMinterContract_1.default.limit()).toNumber();
        const d = this.TODAY_COUNT - remains > this.TODAY_COUNT ? this.TODAY_COUNT : this.TODAY_COUNT - remains;
        this.bar.style({ width: `${d / this.TODAY_COUNT * 100}%` });
        this.mintCount.empty().appendText(`${d}/${this.TODAY_COUNT}`);
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = await InjeolmiContract_1.default.balanceOf(address);
            this.ijmBalance.empty().appendText(`너의 절미: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(balance, 8))} IJM`);
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map