import { Branded } from "@/types/utility/brand";
import { PostId } from "@/lib/blog/blog.types";

// ---------- Author BRAND ----------
export type AuthorId = Branded<string, 'AuthorId'>;

// ---------- DOMAIN MODEL ----------
export type Author = {
    id: AuthorId,
    name: string;
    avatarUrl?: string;
    bio?: string;
    postIds: PostId[];
};