import { MetadataRoute } from 'next';

export const revalidate = false;

// Define your site URL - update this to your production domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://orr.solutions/';

// Page configuration with keywords and priority
const pages: Array<{
  path: string;
  keywords: string[];
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}> = [
  // Landing pages
  {
    path: '/',
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
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    path: '/howweoperate',
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
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  {
    path: '/services',
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
    priority: 0.9,
    changeFrequency: 'weekly',
  },

  {
    path: '/resources-blogs',
    keywords: ['resources', 'blog', 'articles', 'insights'],
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/legal-policy',
    keywords: ['legal', 'policy', 'terms'],
    priority: 0.8,
    changeFrequency: 'yearly',
  },
  {
    path: '/contact',
    keywords: ['contact', 'get in touch', 'support'],
    priority: 0.8,
    changeFrequency: 'monthly',
  },

  //  services sub-pages 
    {
        path: '/services/living-systems-regeneration',
        keywords: [
            'funded project systems design',
            'regulatory and funding-driven project coordination',
            'sustainability and environmental compliance frameworks',
            'cross-disciplinary programme implementation',
            'policy-aligned operational systems',
            'residency and mobility programme operations',
            'nomad and relocation programme systems',
        ],
        priority: 0,
        changeFrequency: 'weekly'
    },

     {
        path: '/services/operational-systems-infrastructure',
        keywords: [
            'programme-based client lifecycle management',
            'business advisory for immigration lawyers',
            'immigration and mobility practice operations',
            'compliance workflows for residency programmes',
            'business advisory for medical professionals',
            'healthcare administrative systems',
            'business advisory for architects and engineers'
        ],
        priority: 0,
        changeFrequency: 'weekly'
    },

     {
        path: '/services/strategy-advisory-compliant',
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
        priority: 0,
        changeFrequency: 'weekly'
    },

];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: page.lastModified || new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
