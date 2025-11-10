import { asBrand } from "@/types/utility/brand";
import { AuthorId } from "@/lib/blog/authors/authors.types";

export const asAuthorId = (value: string): AuthorId  => asBrand<string, 'AuthorId'>(value);