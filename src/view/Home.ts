import { BodyNode, DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import InjeolmiContract from "../contracts/InjeolmiContract";
import TteokmillSparrowsMinterContract from "../contracts/TteokmillSparrowsMinterContract";
import Wallet from "../klaytn/Wallet";

export default class Home implements View {

    private TODAY_COUNT = 9999;

    private container: DomNode;
    private interval: any;

    private mintPrice: DomNode;
    private ijmBalance: DomNode;
    private mintCount: DomNode;
    private walletAddress: DomNode;
    private bar: DomNode;

    private commentInput: DomNode<HTMLInputElement>;

    constructor() {
        this.container = el(".home-view",
            el("h1", "떡방앗간 참새 NFT 민팅"),
            el("h2", "참새들의 내 집 마련의 꿈은 이뤄진다...☆"),
            el("h3", "똥영재 曰: 절. 대. 컴. 터. 로. 해."),
            el(".comment-container",
                el("img", { src: `./images/nft${Math.floor(Math.random() * 6)}.png` }),
                this.commentInput = el("input.comment", { placeholder: "원하는 문구를 입력해줘" }),
            ),
            el(".info-container",
                this.mintPrice = el(".mint-price", "민팅 절미:"),
                this.ijmBalance = el(".ijm-balance", "너의 절미:"),
                el("wallet-container", el("span", "너의 주소: "),
                    this.walletAddress = el("span.wallet-address")),
            ),
            el(".text-container", el(".progress-text", "내 집 마련한 참새 수"), this.mintCount = el(".progress-text")),
            el(".progress", this.bar = el(".progress__bar")),
            el("button", "민팅 허기", {
                click: () => {
                    TteokmillSparrowsMinterContract.mint(this.commentInput.domElement.value);
                },
            }),
            el("button.fail", "민팅 못 했어...?", {
                click: () => {
                    window.open("https://klu.bs/pfp/0x29d05593116C443da54DaBFB4e5322DEA2fff8Cd")
                },
            }),
            el(".footer", el(".sns",
                el("a", { href: "https://twitter.com/tteokmill", target: "_blank" }, el("img", { src: "/images/icon/twitter.svg", height: "42px" })),
                el("a", { href: "https://discord.gg/YgdruRMFtJ", target: "_blank" }, el("img", { src: "/images/icon/discord.svg", height: "42px" })),
                el("a", { href: "https://open.kakao.com/o/g1nYzIHd", target: "_blank" }, el("img", { src: "/images/icon/kakaotalk.svg", height: "42px" })),
            ),
                el("ul",
                    el("li", el("a", "떡방앗간.닷컴", { href: "https://tteok.org" })),
                    el("li", el("a", "느프트 설명", { href: "http://whitelist.tteok.org/explanation" }))
                ))
        ).appendTo(BodyNode);

        this.loadPrice();
        Wallet.on("connect", () => this.loadBalance());
        this.progress();
        this.interval = setInterval(() => this.progress(), 1000);
    }

    private async loadPrice() {
        const price = await TteokmillSparrowsMinterContract.mintPrice();
        this.mintPrice.empty().appendText(`민팅 절미: ${CommonUtil.numberWithCommas(utils.formatUnits(price, 8))} IJM`);
    }

    private async loadBalance() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.walletAddress.empty().appendText(CommonUtil.shortenAddress(address));
            const balance = await InjeolmiContract.balanceOf(address);
            this.ijmBalance.empty().appendText(`너의 절미: ${CommonUtil.numberWithCommas(utils.formatUnits(balance, 8))} IJM`);
        }
    }

    private async progress() {
        const remains = (await TteokmillSparrowsMinterContract.limit()).toNumber();
        const d = this.TODAY_COUNT - remains > this.TODAY_COUNT ? this.TODAY_COUNT : this.TODAY_COUNT - remains;
        this.bar.style({ width: `${d / this.TODAY_COUNT * 100}%` });
        this.mintCount.empty().appendText(`${d}/${this.TODAY_COUNT}`);
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = await InjeolmiContract.balanceOf(address);
            this.ijmBalance.empty().appendText(`너의 절미: ${CommonUtil.numberWithCommas(utils.formatUnits(balance, 8))} IJM`);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}