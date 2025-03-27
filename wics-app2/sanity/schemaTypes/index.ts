import { type SchemaTypeDefinition } from "sanity";
import { blogPost } from "../schemas/blogPost";
import { post } from "../schemas/post";
import { tag } from "../schemas/tag";
import { profile } from "../schemas/profile";
import { personList } from "../schemas/personList";
import { pageBuilder } from "../schemas/pageBuilder";


export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blogPost, post, tag, profile, personList, pageBuilder],
};
