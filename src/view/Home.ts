import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";

export default class Home implements View {

    private container: DomNode;
    private interval: any;

    private commentInput: DomNode<HTMLInputElement>;

    constructor() {
        this.container = el(".home-view",
            el("h1", "떡방앗간 참새 NFT 민팅"),
            el("h2", "참새들의 내집 마련의 꿈은 이뤄진다...☆"),
            el(".comment-container",
                el("img", { src: "./images/sparrow.png" }),
                this.commentInput = el("input.comment", { placeholder: "원하는 문구를 입력해줘" }),
            ),
            el("button", "민팅", {}),
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