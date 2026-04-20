// SEO Configuration for all pages
// This file maps all pages with their keywords, descriptions, and metadata

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogDescription?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://orr.solutions/';

export const seoConfig: Record<string, PageSEO> = {
  '/': {
    title: 'ORR Solutions | Operational & Resilience Consulting',
    description: 'Transform your business with expert operational and resilience consulting. We help organizations optimize processes and build sustainable growth.',
     keywords: ['ORR Solutions', 
        'business as a living system', 
        'systems thinking for organisations', 
        'business systems advisory', 
        'organisational diagnostics', 
        'operational clarity for complex organisations', 
        'multidisciplinary advisory services', 
        'internal process diagnostics', 
        'operational bottleneck analysis', 
        'scalable operational structures', 
        'digital transformation advisory', 
        'advisory-led digital systems', 
        'intelligent process automation', 
        'document-heavy workflow optimisation', 
        'environmental systems analysis', 
        'ecological and agro-ecosystem diagnostics', 
        'soil systems analysis and interpretation', 
        'biodiversity and ecosystem assessment', 
        'natural systems monitoring and evaluation', 
        'environmental data collection and analysis', 
        'scientific diagnostics for land management', 
        'integration of natural and organisational systems', 
        'systems thinking across ecological and human domains', 
        'programme-aligned advisory services'
    ],
    ogDescription: 'Transform your business with expert operational and resilience consulting.',
  },
  '/howweoperate': {
    title: 'How We Operate | ORR Solutions',
    description: 'Discover our proven methodology and operational approach to delivering exceptional consulting results.',
     keywords: [
        'professional services advisory', 
        'business advisory for self-employed professionals', 
        'advisory services for regulated professions', 
        'AI implementation advisory', 
        'applied AI for regulated environments', 
        'decision-support systems', 
        'data-driven organisational intelligence', 
        'advisory-led web development', 'systems-first web architecture', 
        'digital infrastructure for complex organisations', 
        'applied natural systems advisory'
    ],
    ogDescription: 'Learn our proven methodology and operational approach.',
  },
  '/services': {
    title: 'Consulting Services | ORR Solutions',
    description: 'Explore our comprehensive range of consulting services designed to drive business excellence.',
    keywords: [
        'operational advisory for professional practices', 
        'administrative systems design', 'compliance and operations advisory', 
        'governance-ready business processes', 
        'risk-aware operational design', 
        'regulatory-aligned systems', 
        'business process optimisation',  
        'workflow design and optimization', 
        'client portal design and implementation', 
        'internal dashboards and decision systems', 
        'secure digital workspaces', 
        'administrative automation advisory', 
        'workflow automation for professional services',
    ],
    ogDescription: 'Comprehensive consulting services for business transformation.',
  },
  '/resources-blogs': {
    title: 'Resources & Insights | ORR Solutions Blog',
    description: 'Read our latest articles, insights, and resources on operational excellence and business strategy.',
    keywords: ['blog', 'resources', 'articles', 'insights', 'business tips'],
    ogDescription: 'Latest insights and resources on operational excellence.',
  },
  '/services/living-systems-regeneration': {
    title: 'Living Systems Regeneration | ORR Solutions',
    description: 'Expert consulting services for living systems regeneration and sustainable ecological transformation.',
     keywords: [
            'funded project systems design',
            'regulatory and funding-driven project coordination',
            'sustainability and environmental compliance frameworks',
            'cross-disciplinary programme implementation',
            'policy-aligned operational systems',
            'residency and mobility programme operations',
            'nomad and relocation programme systems',
        ],
    ogDescription: 'Expert consulting for living systems regeneration and sustainability.'
  },
  '/services/operational-systems-infrasture': {
    title: 'Operational Systems Infrastructure | ORR Solutions',
    description: 'Comprehensive operational systems infrastructure consulting for professional practices.',
    keywords: [
      'programme-based client lifecycle management',
      'business advisory for immigration lawyers',
      'immigration and mobility practice operations',
      'compliance workflows for residency programmes',
      'business advisory for medical professionals',
      'healthcare administrative systems',
      'business advisory for architects and engineers'
    ],
    ogDescription: 'Operational systems infrastructure consulting for professional practices.'
  },
  '/services/strategy-advisory-complaint': {
    title: 'Strategy Advisory Complaint | ORR Solutions',
    description: 'Strategic advisory services for compliance and operational excellence.',
    keywords: [
      'project-based professional workflows',
      'business advisory for accountants',
      'compliance-aligned financial practice systems',
      'organisational health diagnostics',
      'systems-based decision making',
      'bridging science, policy, and operations',
      'complexity-aware advisory services',
      'long-term systems resilience'
    ],
    ogDescription: 'Strategic advisory services for compliance and operational excellence.'
  }
};

export function getSEOConfig(pathname: string): PageSEO {
  return (
    seoConfig[pathname] || {
      title: 'ORR Solutions | Operational & Resilience Consulting',
      description: 'Professional consulting services for business transformation and growth.',
      keywords: ['consulting', 'business', 'solutions'],
    }
  );
}

export function getOpenGraphImage(pathname: string): string {
  return `${SITE_URL}/images/og-default.jpg`;
}
