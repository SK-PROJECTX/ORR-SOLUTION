import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlForImage } from '@/sanity/lib/image'
import SanityImage from './SanityImage'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden border border-white/10">
        <SanityImage asset={value} alt={value.alt || 'Blog image'} className="object-cover" />
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{children}</h3>,
    normal: ({ children }: any) => <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-400 pl-6 py-2 my-8 italic text-2xl text-white/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-4 mb-8 text-xl md:text-2xl text-gray-300 font-light">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-4 mb-8 text-xl md:text-2xl text-gray-300 font-light">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-green-400 hover:underline transition-all">
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
