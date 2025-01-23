import { type SchemaTypeDefinition } from "sanity";
import { post } from "../schemas/post";
import { tag } from "../schemas/tag";
import { profile } from "../schemas/profile";
import { personList } from "../schemas/personList";


export const schema: { types: SchemaTypeDefinition[] } = {
    types: [post, tag, profile, personList],
};
