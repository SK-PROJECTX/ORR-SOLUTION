import { Studio } from './Studio'

export { metadata, viewport } from 'next-sanity/studio'

export function generateStaticParams() {
  return [
    { index: [''] },
    { index: ['index'] },
    { index: ['structure'] }
  ]
}

export default function StudioPage() {
  return <Studio />
}
