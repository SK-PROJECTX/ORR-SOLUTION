import { type SchemaTypeDefinition } from 'sanity'
import { landingPage } from './landingPage'
import { post } from './post'
import { resourcesPage } from './resourcesPage'
import { engagementPage } from './engagementPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, post, resourcesPage, engagementPage],
}
