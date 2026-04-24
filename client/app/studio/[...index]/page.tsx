import { Studio } from './Studio'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return [
    { index: ['index'] },
    { index: ['structure'] },
  ]
}

export default function StudioPage() {
  return <Studio />
}
