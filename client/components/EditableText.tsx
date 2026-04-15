'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { AuthService } from '../lib/auth';
import { Bold, Italic, Type } from 'lucide-react';
import { getRichTextContent } from '../lib/rich-text-utils';
import { useLanguage } from '../app/components/LanguageProvider';

interface RichTextData {
  content: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
}

interface EditableTextProps {
  content: string | RichTextData;
  onSave: (newContent: string | RichTextData) => Promise<void>;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  placeholder?: string;
  multiline?: boolean;
  enableRichText?: boolean;
}

const EditableText = forwardRef<HTMLElement, EditableTextProps>(({
  content,
  onSave,
  className = '',
  tag = 'p',
  placeholder = 'Click to edit...',
  multiline = false,
  enableRichText = true
}, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [richTextData, setRichTextData] = useState<RichTextData>(() => {
    if (typeof content === 'string') {
      return {
        content: content || '',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal'
      };
    }
    return content || {
      content: '',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal'
    };
  });
  const [isSaving, setIsSaving] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const auth = AuthService.getInstance();

  useEffect(() => {
    const updateCanEdit = () => {
      setCanEdit(auth.canEdit());
    };

    updateCanEdit();

    // Update canEdit status every 2 seconds to catch auth changes
    const interval = setInterval(updateCanEdit, 2000);

    return () => clearInterval(interval);
  }, [auth]);

  useEffect(() => {
    if (typeof content === 'string') {
      setRichTextData({
        content: content || '',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal'
      });
    } else {
      setRichTextData(content || {
        content: '',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal'
      });
    }
  }, [typeof content === 'string' ? content : JSON.stringify(content)]);

  useEffect(() => {
    if (isEditing && richTextData.content) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(richTextData.content.length, richTextData.content.length);
      } else if (!multiline && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(richTextData.content.length, richTextData.content.length);
      }
    }
  }, [isEditing, multiline, richTextData.content?.length]);

  const handleClick = () => {
    if (canEdit && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    const currentContent = typeof content === 'string' ? content : content?.content || '';
    if (richTextData.content !== currentContent || (enableRichText && typeof content !== 'string')) {
      setIsSaving(true);
      try {
        if (enableRichText) {
          await onSave(richTextData);
        } else {
          await onSave(richTextData.content);
        }
      } catch (error) {
        console.error('Failed to save:', error);
        // Revert to original content
        if (typeof content === 'string') {
          setRichTextData({
            content: content || '',
            fontSize: 16,
            fontWeight: 'normal',
            fontStyle: 'normal'
          });
        } else {
          setRichTextData(content || {
            content: '',
            fontSize: 16,
            fontWeight: 'normal',
            fontStyle: 'normal'
          });
        }
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (typeof content === 'string') {
      setRichTextData({
        content: content || '',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal'
      });
    } else {
      setRichTextData(content || {
        content: '',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal'
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    }
  };

  const toggleBold = () => {
    setRichTextData(prev => ({
      ...prev,
      fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold'
    }));
  };

  const toggleItalic = () => {
    setRichTextData(prev => ({
      ...prev,
      fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic'
    }));
  };

  const handleFontSizeChange = (fontSize: number) => {
    setRichTextData(prev => ({
      ...prev,
      fontSize
    }));
  };

  const editableProps = {
    className: `${className} ${canEdit ? 'cursor-pointer hover:bg-blue-500/10 hover:outline hover:outline-1 hover:outline-blue-500 transition-all' : ''} ${isEditing ? 'bg-blue-500/20 outline outline-2 outline-blue-500' : ''}`,
    onClick: handleClick,
    title: canEdit ? 'Click to edit' : undefined,
  };

  const { language, interpolate } = useLanguage();

  // Get display content and styles
  const rawContent = typeof content === 'string' ? content : content?.content || '';
  let displayContent = getRichTextContent(rawContent, language);
  displayContent = interpolate(displayContent);

  const displayStyles = {
    fontSize: typeof content === 'string' ? '16px' : `${content?.fontSize || 16}px`,
    fontWeight: typeof content === 'string' ? 'normal' : (content?.fontWeight || 'normal'),
    fontStyle: typeof content === 'string' ? 'normal' : (content?.fontStyle || 'normal')
  };

  // Check if content contains HTML tags
  const containsHTML = displayContent.includes('<') && displayContent.includes('>');

  if (isEditing) {
    const inputStyles = {
      fontSize: `${richTextData.fontSize}px`,
      fontWeight: richTextData.fontWeight,
      fontStyle: richTextData.fontStyle
    };

    return (
      <div className="relative space-y-2">
        {enableRichText && (
          <div className="flex items-center gap-2 p-2 bg-white/10 border border-white/20 rounded-lg">
            <div className="flex items-center gap-1">
              <Type size={14} className="text-gray-400" />
              <input
                type="number"
                min="10"
                max="72"
                value={richTextData.fontSize}
                onChange={(e) => handleFontSizeChange(parseInt(e.target.value) || 16)}
                className="w-12 bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-xs"
              />
              <span className="text-gray-400 text-xs">px</span>
            </div>
            
            <div className="w-px h-4 bg-white/20" />
            
            <button
              type="button"
              onClick={toggleBold}
              className={`p-1 rounded border border-white/20 transition-all duration-200 ${
                richTextData.fontWeight === 'bold' 
                  ? 'bg-blue-500/30 border-blue-500/50 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-400'
              }`}
            >
              <Bold size={14} />
            </button>
            
            <button
              type="button"
              onClick={toggleItalic}
              className={`p-1 rounded border border-white/20 transition-all duration-200 ${
                richTextData.fontStyle === 'italic' 
                  ? 'bg-blue-500/30 border-blue-500/50 text-blue-400' 
                  : 'hover:bg-white/10 text-gray-400'
              }`}
            >
              <Italic size={14} />
            </button>
          </div>
        )}
        
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={richTextData.content}
            onChange={(e) => setRichTextData(prev => ({ ...prev, content: e.target.value }))}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white text-black p-2 rounded border-2 border-blue-500 focus:outline-none !text-black`}
            style={inputStyles}
            placeholder={placeholder}
            disabled={isSaving}
            rows={Math.max(3, (richTextData.content || '').split('\n').length)}
          />
        ) : (
          <input
            type="text"
            ref={inputRef}
            value={richTextData.content}
            onChange={(e) => setRichTextData(prev => ({ ...prev, content: e.target.value }))}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white text-black p-2 rounded border-2 border-blue-500 focus:outline-none !text-black`}
            style={inputStyles}
            placeholder={placeholder}
            disabled={isSaving}
          />
        )}
        
        {isSaving && (
          <div className="absolute top-2 right-2 text-blue-500 text-sm">
            Saving...
          </div>
        )}
      </div>
    );
  }

  // Cast Tag to any to avoid "Type 'ForwardedRef<HTMLElement>' is not assignable to type 'LegacyRef<any>'"
  const Tag = tag as any;
  
  if (containsHTML) {
    return (
      <div className="relative group">
        <Tag {...editableProps} ref={ref} style={displayStyles} dangerouslySetInnerHTML={{ __html: displayContent }} />
        {canEdit && (
          <span className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
            ✏️
          </span>
        )}
      </div>
    );
  }
  
  return (
    <Tag {...editableProps} ref={ref} style={displayStyles}>
      {displayContent || placeholder}
      {canEdit && (
        <span className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
          ✏️
        </span>
      )}
    </Tag>
  );
});

EditableText.displayName = 'EditableText';

export default EditableText;