import { Post } from './post.model';

export class PostService {
   private post: Post[] = [];

   getPost() {
    return this.post;
   }
}