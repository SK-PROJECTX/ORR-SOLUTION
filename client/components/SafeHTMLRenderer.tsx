import React, { useEffect, useRef } from 'react';
import { getRichTextContent, getRichTextStyle } from '../lib/rich-text-utils';

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
  
  useEffect(() => {
    if (ref.current) {
      const content = getRichTextContent(data) || fallback;
      const style = getRichTextStyle(data);
      
      ref.current.innerHTML = content;
      
      // Apply rich text styles
      if (style.fontSize) ref.current.style.fontSize = style.fontSize as string;
      if (style.fontWeight) ref.current.style.fontWeight = style.fontWeight as string;
      if (style.fontStyle) ref.current.style.fontStyle = style.fontStyle as string;
    }
  }, [data, fallback]);
  
  return React.createElement(Tag, { 
    ref, 
    className,
    suppressHydrationWarning: true 
  });
}