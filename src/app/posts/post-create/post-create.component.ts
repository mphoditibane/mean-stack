import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime.type.validator';
@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    public post: Post;
    private mode = 'create';
    private postId: string;
    isLoading = false;
    form: FormGroup;
    imagePreview;
    constructor(public postsService: PostService, public route: ActivatedRoute) {
       
    }

   
    ngOnInit() {
        this.form = new FormGroup({
            title : new FormControl(null, {validators: [Validators.required]}),
            content : new FormControl(null, {validators: [Validators.required]}),
            image : new FormControl(null,{validators: Validators.required, 
                asyncValidators: [mimeType]})
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {id: postData._id, title: postData.title, content: postData.content}
                });
                this.form.setValue({
                    title: this.post.title,
                    content: this.post.content
                });
            } else {
                this.mode = 'create'
                this.postId = null;
            }
        });
    }

    onImgePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({image: file});
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);

    }   
    onSavePost() {
        if(this.form.invalid) {
            return;
        }
       // this.isLoading = true;
        if(this.mode === 'create') {
            this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
        } else {
            this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
        }
        this.form.reset();
    }
}