export default class Post {
    caption : string;
    id : string;
    title : string;
    display_src : string;
    likes : number;
    code : string;
    constructor(caption : string, id : string, title : string, display_src : string, likes : number, code : string) {
        this.caption = caption;
        this.id = id;
        this.title = title,
        this.display_src = display_src;
        this.likes = likes;
        this.code = code;
    }
}
