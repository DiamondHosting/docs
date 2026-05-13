'use client';

import { Check, Copy, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function MarkdownCopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? '已複製' : '複製 Markdown'}</span>
    </button>
  );
}

export function ViewOptionsPopover({ githubUrl }: { githubUrl: string }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <Github className="h-4 w-4" />
        <span>在 GitHub 上查看</span>
        <ExternalLink className="h-3 w-3 opacity-50" />
      </a>
    </div>
  );
}
