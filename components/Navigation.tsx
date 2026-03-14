import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/check-in', label: '签到', icon: '📝' },
    { path: '/history', label: '轨迹', icon: '📊' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid var(--border)',
      padding: '12px 0 env(safe-area-inset-bottom)',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                padding: '8px 12px',
                borderRadius: '8px'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{
                fontSize: '12px',
                fontWeight: isActive ? '600' : '500'
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}