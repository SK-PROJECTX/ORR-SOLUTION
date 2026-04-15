import React, { useEffect, useRef } from 'react';
import { getRichTextContent, getRichTextStyle } from '../lib/rich-text-utils';
import { useLanguage } from '../app/components/LanguageProvider';

interface SafeHTMLRendererProps {
  data: any;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  fallback?: string;
}

export default function SafeHTMLRenderer({ 
  data, 
  className = '', 
  tag: Tag = 'span',
  fallback = ''
}: SafeHTMLRendererProps) {
  const ref = useRef<HTMLElement>(null);
  const { language, interpolate } = useLanguage();
  
  useEffect(() => {
    if (ref.current) {
      let content = getRichTextContent(data, language) || fallback;
      
      // Handle interpolation of keys and params
      content = interpolate(content);
      
      ref.current.innerHTML = content;
      
      const style = getRichTextStyle(data);
      
      // Apply rich text styles
      if (style.fontSize) ref.current.style.fontSize = style.fontSize as string;
      if (style.fontWeight) ref.current.style.fontWeight = style.fontWeight as string;
      if (style.fontStyle) ref.current.style.fontStyle = style.fontStyle as string;
    }
  }, [data, fallback, language, interpolate]);
  
  return React.createElement(Tag, { 
    ref, 
    className,
    suppressHydrationWarning: true 
  });
}