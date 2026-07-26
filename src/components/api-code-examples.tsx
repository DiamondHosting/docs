'use client';

import { Check, ChevronDown, Code2, Copy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Language = 'cURL' | 'Node.js' | 'Python' | 'Go' | 'Java' | 'C#' | 'PHP';
type RequestBodyType = 'json' | 'text';

const commonLanguages: Language[] = ['cURL', 'Node.js', 'Python'];
const allLanguages: Language[] = ['cURL', 'Node.js', 'Python', 'Go', 'Java', 'C#', 'PHP'];
const shikiLanguages: Record<Language, string> = {
  cURL: 'bash',
  'Node.js': 'javascript',
  Python: 'python',
  Go: 'go',
  Java: 'java',
  'C#': 'csharp',
  PHP: 'php',
};

function formatPythonValue(value: unknown, depth = 0): string {
  if (value === null) return 'None';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);

  const indent = '  '.repeat(depth);
  const childIndent = '  '.repeat(depth + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[\n${value.map((item) => `${childIndent}${formatPythonValue(item, depth + 1)}`).join(',\n')}\n${indent}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    return `{\n${entries.map(([key, item]) => `${childIndent}${JSON.stringify(key)}: ${formatPythonValue(item, depth + 1)}`).join(',\n')}\n${indent}}`;
  }

  return 'None';
}

function formatPythonBody(body: string) {
  try {
    return formatPythonValue(JSON.parse(body));
  } catch {
    return body;
  }
}

function indentContinuation(value: string, spaces: number) {
  return value.replaceAll('\n', `\n${' '.repeat(spaces)}`);
}

function buildExample(
  language: Language,
  method: HttpMethod,
  path: string,
  requestBody?: string,
  requestBodyType: RequestBodyType = 'json',
) {
  const suffix = path || '';
  const body = requestBody?.trim();
  const contentType = requestBodyType === 'text' ? 'text/plain' : 'application/json';
  const jsUrl = suffix ? `BASE_URL + '${suffix}'` : 'BASE_URL';
  const goUrl = suffix ? `baseURL+"${suffix}"` : 'baseURL';
  const javaUrl = suffix ? `BASE_URL + "${suffix}"` : 'BASE_URL';
  const csharpUrl = suffix ? `baseUrl + "${suffix}"` : 'baseUrl';
  const phpUrl = suffix ? `$baseUrl . '${suffix}'` : '$baseUrl';

  switch (language) {
    case 'cURL':
      return `curl -X ${method} "\${BASE_URL}${suffix}" \\
  -H "Authorization: Bearer \${API_KEY}" \\
  -H "Accept: application/json"${body ? ` \\
  -H "Content-Type: ${contentType}" \\
  -d '${body.replaceAll("'", "'\\''")}'` : ''}`;
    case 'Node.js':
      return `const response = await fetch(${jsUrl}, {
  method: '${method}',
  headers: {
    Authorization: \`Bearer \${API_KEY}\`,
    Accept: 'application/json',${body ? `\n    'Content-Type': '${contentType}',` : ''}
  },${body ? `\n  body: ${requestBodyType === 'json' ? `JSON.stringify(${indentContinuation(body, 2)})` : JSON.stringify(body)},` : ''}
});

if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
const contentType = response.headers.get('content-type') ?? '';
const data = response.status === 204
  ? null
  : contentType.includes('application/json')
    ? await response.json()
    : await response.text();`;
    case 'Python':
      return `import requests

response = requests.request(
    '${method}',
    ${jsUrl},
    headers={
        'Authorization': f'Bearer {API_KEY}',
        'Accept': 'application/json',${body ? `\n        'Content-Type': '${contentType}',` : ''}
    },${body ? `\n    ${requestBodyType === 'json' ? 'json' : 'data'}=${requestBodyType === 'json' ? indentContinuation(formatPythonBody(body), 4) : JSON.stringify(body)},` : ''}
)
response.raise_for_status()
content_type = response.headers.get('content-type', '')
data = None if response.status_code == 204 else (
    response.json() if 'application/json' in content_type else response.text
)`;
    case 'Go':
      return `req, err := http.NewRequest("${method}", ${goUrl}, nil)
if err != nil { log.Fatal(err) }
req.Header.Set("Authorization", "Bearer "+apiKey)
req.Header.Set("Accept", "application/json")

resp, err := http.DefaultClient.Do(req)
if err != nil { log.Fatal(err) }
defer resp.Body.Close()`;
    case 'Java':
      return `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(${javaUrl}))
    .header("Authorization", "Bearer " + API_KEY)
    .header("Accept", "application/json")
    .method("${method}", HttpRequest.BodyPublishers.noBody())
    .build();

HttpResponse<String> response = HttpClient.newHttpClient()
    .send(request, HttpResponse.BodyHandlers.ofString());`;
    case 'C#':
      return `using var client = new HttpClient();
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", apiKey);
client.DefaultRequestHeaders.Accept.Add(
    new MediaTypeWithQualityHeaderValue("application/json"));

var request = new HttpRequestMessage(HttpMethod.${method === 'DELETE' ? 'Delete' : method[0] + method.slice(1).toLowerCase()}, ${csharpUrl});
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();`;
    case 'PHP':
      return `$ch = curl_init(${phpUrl});
curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => '${method}',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);`;
  }
}

export function ApiCodeExamples({
  method,
  path,
  requestBody,
  requestBodyType = 'json',
  languages = 'common',
  defaultOpen = false,
}: {
  method: HttpMethod;
  path: string;
  requestBody?: string;
  requestBodyType?: RequestBodyType;
  languages?: 'common' | 'all';
  defaultOpen?: boolean;
}) {
  const options = languages === 'all' ? allLanguages : commonLanguages;
  const [language, setLanguage] = useState<Language>(options[0]);
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState('');
  const code = useMemo(
    () => buildExample(language, method, path, requestBody, requestBodyType),
    [language, method, path, requestBody, requestBodyType],
  );

  useEffect(() => {
    let cancelled = false;
    setHighlighted('');

    void import('shiki').then(async ({ codeToHtml }) => {
      const html = await codeToHtml(code, {
        lang: shikiLanguages[language],
        theme: 'github-dark-default',
        transformers: [
          {
            name: 'diamondhost-code-reset',
            pre(node) {
              node.properties.style = 'margin:0;min-height:0;padding:1rem 3.5rem 1rem 1rem;overflow-x:auto;border:0;border-radius:0;background:#080d13;box-shadow:none;';
            },
            code(node) {
              node.properties.style = 'display:block;min-width:max-content;padding:0;border:0;background:transparent;box-shadow:none;';
            },
            line(node) {
              node.properties.style = 'display:inline;padding:0;background:transparent;';
            },
          },
        ],
      });
      if (!cancelled) setHighlighted(html);
    });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
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
    <details className="api-code-examples" open={defaultOpen || undefined}>
      <summary>
        <Code2 aria-hidden="true" />
        程式範例
        <span>{options.join(' / ')}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <div className="api-code-example-body">
        <div className="api-language-tabs" role="tablist" aria-label="程式語言">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={language === option}
              onClick={() => setLanguage(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="api-example-code">
          {highlighted ? (
            <div
              className="api-shiki-output"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          ) : (
            <pre><code>{code}</code></pre>
          )}
          <button type="button" onClick={copy} aria-label={copied ? '已複製程式碼' : '複製程式碼'} title={copied ? '已複製' : '複製程式碼'}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </button>
        </div>
      </div>
    </details>
  );
}
