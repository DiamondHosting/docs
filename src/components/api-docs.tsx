import Link from 'next/link';
import { isValidElement, type ReactElement, type ReactNode } from 'react';
import { ApiCopyButton } from '@/components/api-copy-button';
import { ApiCodeExamples } from '@/components/api-code-examples';
import {
  Archive,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  FileCode2,
  Gamepad2,
  Globe2,
  Network,
  Server,
  ShieldCheck,
  TerminalSquare,
  Users,
} from 'lucide-react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const methodStyles: Record<HttpMethod, string> = {
  GET: 'api-method-get',
  POST: 'api-method-post',
  PUT: 'api-method-put',
  PATCH: 'api-method-patch',
  DELETE: 'api-method-delete',
};

function getText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getText).join('');
  if (isValidElement(node)) {
    return getText((node as ReactElement<{ children?: ReactNode }>).props.children);
  }
  return '';
}

export function ApiEndpoint({
  method,
  path,
  title,
  description,
  children,
  requestBodyType = 'json',
}: {
  method: HttpMethod;
  path: string;
  title: string;
  description?: string;
  children?: ReactNode;
  requestBodyType?: 'json' | 'text';
}) {
  return (
    <section className="api-endpoint" data-method={method.toLowerCase()}>
      <div className="api-endpoint-summary">
        <div className="api-endpoint-route">
          <span className={`api-method ${methodStyles[method]}`}>{method}</span>
          <code>{path}</code>
        </div>
        <div className="api-endpoint-content">
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      {children ? (
        <div className="api-endpoint-example">
          <span>REQUEST BODY</span>
          {children}
        </div>
      ) : null}
      <ApiCodeExamples
        method={method}
        path={path}
        requestBody={children ? getText(children).trim() : undefined}
        requestBodyType={requestBodyType}
      />
    </section>
  );
}

export function DeveloperPortalHeader() {
  return (
    <header className="developer-portal-header">
      <div className="developer-portal-brand">
        <span className="developer-portal-mark"><Code2 aria-hidden="true" /></span>
        <span>
          <small>DIAMONDHOST</small>
          <strong>Developers</strong>
        </span>
      </div>
      <div className="developer-portal-meta">
        <span className="developer-api-status">
          <CheckCircle2 aria-hidden="true" />
          API v1
        </span>
        <a href="https://panel.diamondhost.tw" target="_blank" rel="noreferrer">
          控制台
          <ExternalLink aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

const sections = [
  { href: '/docs/client-api/account', icon: ShieldCheck, title: '帳戶管理', description: '個人資料、2FA、WebAuthn、API 與 SSH 金鑰' },
  { href: '/docs/client-api/servers', icon: Server, title: '伺服器管理', description: '伺服器資訊、資源監控、電源與控制台操作' },
  { href: '/docs/client-api/files', icon: FileCode2, title: '檔案管理', description: '瀏覽、讀寫、上下載、壓縮與權限管理' },
  { href: '/docs/client-api/databases', icon: Database, title: '資料庫管理', description: '建立資料庫、更新密碼與刪除資源' },
  { href: '/docs/client-api/backups', icon: Archive, title: '備份管理', description: '建立、下載、鎖定、還原與刪除備份' },
  { href: '/docs/client-api/schedules', icon: CalendarClock, title: '排程任務', description: '建立排程、管理任務與立即執行' },
  { href: '/docs/client-api/network', icon: Network, title: '網路管理', description: '分配連接埠、主連接埠與備註設定' },
  { href: '/docs/client-api/users', icon: Users, title: '副使用者管理', description: '邀請成員、調整權限與移除使用者' },
  { href: '/docs/client-api/extensions', icon: Globe2, title: '流量與子網域', description: '流量統計、子網域與 DNS 綁定管理' },
  { href: '/docs/client-api/minecraft', icon: Gamepad2, title: 'Minecraft API', description: '模組包、版本切換、日誌與玩家管理' },
];

export function ApiOverview() {
  return (
    <div className="api-overview-grid">
      {sections.map(({ href, icon: Icon, title, description }) => (
        <Link href={href} className="api-overview-card" key={href}>
          <span className="api-overview-icon"><Icon aria-hidden="true" /></span>
          <span className="api-overview-copy">
            <strong>{title}</strong>
            <span>{description}</span>
          </span>
          <ChevronRight className="api-overview-arrow" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export function ApiBasePath({ children }: { children: ReactNode }) {
  const value = getText(children);

  return (
    <div className="api-base-path">
      <span className="api-base-label">
        <TerminalSquare aria-hidden="true" />
        <span>BASE URL</span>
      </span>
      <code>{children}</code>
      <ApiCopyButton value={value} />
    </div>
  );
}

export { ApiCodeExamples };
