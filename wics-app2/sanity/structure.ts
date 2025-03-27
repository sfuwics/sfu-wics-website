import type {StructureResolver} from 'sanity/structure';
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// THIS CONTROLS THE SANITY STUDIO LAYOUT

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('SFU WiCS Studio')
    .items([
      S.documentTypeListItem('post').title('Posts'),
	    S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('tag').title('Tags'),
      S.documentTypeListItem('pageBuilder').title('Page Builder'),

      orderableDocumentListDeskItem({
        title: 'Profiles',
        type: 'profile',
        S,
        context,
      }),

      S.documentTypeListItem('personList').title('Person List'),
	  ]);