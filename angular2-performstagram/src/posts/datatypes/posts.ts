import Post from './Post';
export default class Posts {
  posts : Array < Post > = [];
  constructor(posts : Array < Post >) {
    this.posts = posts;
  }
}
