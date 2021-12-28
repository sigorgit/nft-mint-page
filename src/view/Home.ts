import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";

export default class Home implements View {

    private container: DomNode;
    private interval: any;
    private bar: DomNode;
    private progressText: DomNode;

    private commentInput: DomNode<HTMLInputElement>;

    constructor() {
        this.container = el(".home-view",
            el("h1", "떡방앗간 참새 NFT 민팅"),
            el("h2", "참새들의 내 집 마련의 꿈은 이뤄진다...☆"),
            el(".comment-container",
                el("img", { src: `./images/nft${Math.floor(Math.random() * 6)}.png` }),
                this.commentInput = el("input.comment", { placeholder: "원하는 문구를 입력해줘" }),
            ),
            el(".text-container", el(".progress-text", "내 집 마련한 참새 수"), this.progressText = el(".progress-text", "2,000참새/10,000참새")),
            el(".progress", this.bar = el(".progress__bar")),
            el("button", "민팅 허기", {}),
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
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}