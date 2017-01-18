export default class Post {
    caption : String;
    id : String;
    title : String;
    display_src : String;
    likes : Number;
    code : String;
    constructor(caption : String, id : String, title : String, display_src : String, likes : Number, code : String) {
        this.caption = caption;
        this.id = id;
        this.title = title,
        this.display_src = display_src;
        this.likes = likes;
        this.code = code;
    }
}
