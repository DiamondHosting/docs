'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function ApiCopyButton({ value, label = 'Base URL' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const succeeded = document.execCommand('copy');
      textarea.remove();
      if (!succeeded) return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className="api-copy-button"
      onClick={copy}
      aria-label={copied ? `已複製${label}` : `複製${label}`}
      title={copied ? '已複製' : `複製${label}`}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
    </button>
  );
}
