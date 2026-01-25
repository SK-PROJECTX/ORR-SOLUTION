/**
 * Utility functions for handling RichTextField content from Django backend
 */

import React from 'react';

export interface RichTextContent {
  content: string;
  format: string;
}

export interface StyledRichTextContent {
  content: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
}

/**
 * Extract plain text content from RichTextField data
 * Handles string, RichTextField JSON format, and styled content format
 */
export function getRichTextContent(data: string | RichTextContent | StyledRichTextContent | null | undefined): string {
  if (!data) return '';
  
  // If it's already a string, check if it's a JSON string first
  if (typeof data === 'string') {
    let processedData = data;
    
    // Handle Python dict-like format or any string containing 'content':
    if (processedData.includes("'content':") || processedData.includes('"content":')) {
      // Try multiple regex patterns to extract content
      const patterns = [
        /'content':\s*'([^']*(?:\\'[^']*)*)'/,
        /"content":\s*"([^"]*(?:\\"[^"]*)*)"/,
        /'content':\s*"([^"]*(?:\\"[^"]*)*)"/,
        /"content":\s*'([^']*(?:\\'[^']*)*)'/, 
        /'content':\s*'([^']+)'/,
        /"content":\s*"([^"]+)"/
      ];
      
      for (const pattern of patterns) {
        const match = processedData.match(pattern);
        if (match) {
          processedData = match[1].replace(/\\'/g, "'").replace(/\\"/g, '"');
          break;
        }
      }
      
      // Fallback: try JSON parsing
      if (processedData === data) {
        try {
          const jsonString = processedData
            .replace(/'/g, '"')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false')
            .replace(/None/g, 'null');
          
          const parsed = JSON.parse(jsonString);
          if (parsed && typeof parsed === 'object' && parsed.content) {
            processedData = parsed.content;
          }
        } catch (e) {
          // JSON parsing failed, continue
        }
      }
    }
    
    // Try to parse as JSON if it looks like an object string
    if (processedData.trim().startsWith('{') && processedData.trim().endsWith('}')) {
      try {
        const parsed = JSON.parse(processedData);
        if (parsed && typeof parsed === 'object' && parsed.content) {
          processedData = parsed.content;
        }
      } catch (e) {
        // If parsing fails, treat as regular string
      }
    }
    
    // Decode HTML entities after processing - check for any HTML entities
    if (processedData.includes('&') && (processedData.includes(';'))) {
      processedData = processedData
        // Remove specific styled span tags first - exact patterns
        .replace(/&lt;span style=&quot;font-weight: bold; font-style: italic&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-style: italic; font-weight: bold&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-weight:\s*bold;\s*font-style:\s*italic&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-style:\s*italic;\s*font-weight:\s*bold&quot;&gt;/g, '')
        .replace(/&lt;span[^&]*&gt;/g, '')
        .replace(/&lt;\/span&gt;/g, '')
        // Decode common HTML entities
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–')
        .replace(/&hellip;/g, '…')
        .replace(/&copy;/g, '©')
        .replace(/&reg;/g, '®')
        .replace(/&trade;/g, '™');
    }
    
    return processedData;
  }
  
  // If it's RichTextField format or styled format, extract content
  if (typeof data === 'object' && data !== null) {
    // Handle nested format objects
    if (data.content && typeof data.content === 'object' && data.content.content) {
      return data.content.content;
    }
    if (data.content) {
      return data.content;
    }
  }
  
  return '';
}

/**
 * Extract style information from RichTextField data
 */
export function getRichTextStyle(data: string | RichTextContent | StyledRichTextContent | null | undefined): React.CSSProperties {
  if (!data) return {};
  
  if (typeof data === 'string') {
    let processedData = data;
    
    // Decode HTML entities if present - check for any HTML entities
    if (data.includes('&') && data.includes(';')) {
      processedData = data
        // Remove specific styled span tags first - exact patterns
        .replace(/&lt;span style=&quot;font-weight: bold; font-style: italic&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-style: italic; font-weight: bold&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-weight:\s*bold;\s*font-style:\s*italic&quot;&gt;/g, '')
        .replace(/&lt;span style=&quot;font-style:\s*italic;\s*font-weight:\s*bold&quot;&gt;/g, '')
        .replace(/&lt;span[^&]*&gt;/g, '')
        .replace(/&lt;\/span&gt;/g, '')
        // Decode common HTML entities
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–')
        .replace(/&hellip;/g, '…')
        .replace(/&copy;/g, '©')
        .replace(/&reg;/g, '®')
        .replace(/&trade;/g, '™');
    }
    
    // Handle Python dict-like format
    if (processedData.includes("'content':") || processedData.includes('"content":')) {
      try {
        const jsonString = processedData
          .replace(/'/g, '"')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null');
        
        const parsed = JSON.parse(jsonString);
        if (parsed && typeof parsed === 'object') {
          const style: React.CSSProperties = {};
          if (parsed.fontSize) style.fontSize = `${parsed.fontSize}px`;
          if (parsed.fontWeight) style.fontWeight = parsed.fontWeight;
          if (parsed.fontStyle) style.fontStyle = parsed.fontStyle;
          return style;
        }
      } catch (e) {
        // Fallback regex extraction for style properties
        const fontWeightMatch = processedData.match(/'fontWeight':\s*'([^']+)'/) || processedData.match(/"fontWeight":\s*"([^"]+)"/);
        const fontStyleMatch = processedData.match(/'fontStyle':\s*'([^']+)'/) || processedData.match(/"fontStyle":\s*"([^"]+)"/);
        const fontSizeMatch = processedData.match(/'fontSize':\s*(\d+)/) || processedData.match(/"fontSize":\s*(\d+)/);
        
        const style: React.CSSProperties = {};
        if (fontWeightMatch) style.fontWeight = fontWeightMatch[1];
        if (fontStyleMatch) style.fontStyle = fontStyleMatch[1];
        if (fontSizeMatch) style.fontSize = `${fontSizeMatch[1]}px`;
        return style;
      }
    }
  }
  
  // If it's already an object with style properties
  if (typeof data === 'object') {
    const style: React.CSSProperties = {};
    if ('fontSize' in data && data.fontSize) style.fontSize = `${data.fontSize}px`;
    if ('fontWeight' in data && data.fontWeight) style.fontWeight = data.fontWeight;
    if ('fontStyle' in data && data.fontStyle) style.fontStyle = data.fontStyle;
    return style;
  }
  
  return {};
}

/**
 * Get content with styling applied as JSX
 */
export function getRichTextWithStyle(data: string | RichTextContent | StyledRichTextContent | null | undefined): { content: string; style: React.CSSProperties } {
  return {
    content: getRichTextContent(data),
    style: getRichTextStyle(data)
  };
}

/**
 * Safely render HTML content from rich text fields
 */
export function getRichTextHTML(data: string | RichTextContent | StyledRichTextContent | null | undefined): { __html: string } {
  let content = getRichTextContent(data);
  
  // Decode HTML entities to render proper HTML
  if (content && content.includes('&')) {
    content = content
      // Decode HTML entities to preserve HTML formatting
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&hellip;/g, '…')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
      .replace(/&trade;/g, '™');
  }
  
  // Add line breaks after each list item for better spacing
  if (content && content.includes('</li>')) {
    content = content.replace(/<\/li>/g, '</li><br>');
  }
  
  return { __html: content };
}