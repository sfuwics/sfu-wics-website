


import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import { structureTool, StructureBuilder } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./env";
import { schema } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: 'wics',
  title: 'WiCS CMS',

  projectId,
  dataset,
  schema,

  plugins: [
    structureTool({
      structure: structure
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
