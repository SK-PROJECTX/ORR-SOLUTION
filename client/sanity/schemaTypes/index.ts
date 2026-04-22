import { type SchemaTypeDefinition } from 'sanity'
import { landingPage } from './landingPage'
import { post } from './post'
import { resourcesPage } from './resourcesPage'
import { engagementPage } from './engagementPage'
import { localizedString, localizedText, localizedBlock } from './localizedFields'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localizedString,
    localizedText,
    localizedBlock,
    landingPage,
    post,
    resourcesPage,
    engagementPage,
  ],
}
