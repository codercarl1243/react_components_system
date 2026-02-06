import type { Author } from "@/lib/blog/authors/authors.types";
import { asAuthorId } from "@/lib/blog/authors/authors.utils";
import { asPostIds } from "@/lib/blog/blog.utils";

export const CODER_CARL_ID = asAuthorId('coderCarl1243');

export const CODER_CARL: Author = {
    id: CODER_CARL_ID,
    avatarUrl: '/images/carl_portrait.webp',
    name: "carl davidson",
    postIds: asPostIds([
        'design__button__01', 
        'design__button__slider__01', 
        'design__button__toggle__01'
    ])
};

export const AUTHORS = [CODER_CARL]