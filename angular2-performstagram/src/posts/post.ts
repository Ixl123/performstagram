export default class Post {
    caption : string;
    display_src : string;
    likes : number;
    code : string;
    constructor(caption : string, display_src : string, likes : number, code : string) {
        this.caption = caption;
        this.display_src = display_src;
        this.likes = likes;
        this.code = code;
    }
}
