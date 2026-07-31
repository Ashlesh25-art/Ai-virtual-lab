'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Zap, LayoutDashboard, BookOpen, FlaskConical, LogIn,
  Terminal, Upload, TrendingUp, Trophy, Clock, RotateCcw,
  ShieldCheck, Settings, LogOut, Bell, Search, MessageCircle,
  ChevronRight, User, Menu, Calendar, Filter, ArrowUp, ArrowDown, Plus,
  Thermometer, Code2, Cpu, Crosshair, Beaker
} from 'lucide-react';
import styles from './page.module.css';

const NAV_FAVORITES = [
  { id: 'Dashboard Home', Icon: LayoutDashboard, route: '/student/dashboard'  },
  { id: 'My Subjects',    Icon: BookOpen,         route: '/student/subjects'   },
  { id: 'Pre-Lab',        Icon: FlaskConical,     route: '/student/pre-lab'    },
  { id: 'Join Lab',       Icon: LogIn,            route: '/student/live-lab'   },
];
const NAV_MAIN = [
  { id: 'Live Coding Lab',              Icon: Terminal,    route: '/student/live-lab'      },
  { id: 'Submission',                   Icon: Upload,      route: '/student/submissions'   },
  { id: 'Performance Analytics',        Icon: TrendingUp,  route: '/student/analytics'     },
  { id: 'Ranking',                      Icon: Trophy,      route: '/student/rankings'      },
  { id: 'Experiment History',           Icon: Clock,       route: '/student/submissions'   },
  { id: 'Catch-Up Mode',                Icon: RotateCcw,   route: '/student/pre-lab'       },
  { id: 'Certificates & Notifications', Icon: ShieldCheck, route: '/student/certificates'  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard Home');

  const go = (id: string, route: string) => {
    if (id === 'Logout') { router.push('/login'); return; }
    setActivePage(id);
    router.push(route);
  };

  const navCls = (id: string, isLogout = false) =>
    [styles.navItem, id === activePage ? styles.navItemActive : '', isLogout ? styles.navItemLogout : '']
      .filter(Boolean).join(' ');

  return (
    <>
      <div className={styles.stage}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={styles.sheen} />

        <div className={styles.appPanel}>

          {/* ══ SIDEBAR ══ */}
          <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`} id="sidebar">
            <div className={styles.sidebarTop}>
              <div className={styles.logo} onClick={() => router.push('/student/dashboard')}>
                <Zap size={18} strokeWidth={2.2} />
              </div>
              <button className={styles.collapseBtn} onClick={() => setCollapsed(p => !p)} title="Collapse sidebar">
                <Menu size={16} strokeWidth={2} />
              </button>
            </div>

            <nav className={styles.navGroup}>
              <span className={styles.navLabel}>Favorites</span>
              <ul>
                {NAV_FAVORITES.map(({ id, Icon, route }) => (
                  <li key={id} className={navCls(id)} title={id} onClick={() => go(id, route)}>
                    <Icon size={17} strokeWidth={1.9} />
                    <span className={styles.label}>{id}</span>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.navGroup}>
              <span className={styles.navLabel}>Main Menu</span>
              <ul>
                {NAV_MAIN.map(({ id, Icon, route }) => (
                  <li key={id} className={navCls(id)} title={id} onClick={() => go(id, route)}>
                    <Icon size={17} strokeWidth={1.9} />
                    <span className={styles.label}>{id}</span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={`${styles.navGroup} ${styles.bottomGroup}`}>
              <ul>
                <li className={navCls('Profile')} title="Profile" onClick={() => go('Profile', '/student/profile')}>
                  <User size={17} strokeWidth={1.9} />
                  <span className={styles.label}>Profile</span>
                </li>
                <li className={navCls('Logout', true)} title="Logout" onClick={() => go('Logout', '/login')}>
                  <LogOut size={17} strokeWidth={1.9} />
                  <span className={styles.label}>Logout</span>
                </li>
              </ul>
            </div>

            <div className={styles.promoBanner}>
              <div className={styles.promoIcon}><MessageCircle size={15} strokeWidth={1.9} /></div>
              <div className={styles.promoText}>
                <p className={styles.promoTitle}>Stuck on a doubt?</p>
                <a className={styles.promoLink} onClick={() => router.push('/student/live-lab')}>Ask AI Tutor</a>
              </div>
            </div>
          </aside>

          {/* ══ MAIN ══ */}
          <main className={styles.content}>
            <div className={styles.contentHeader}>
              <div className={styles.breadcrumb}>
                Student <ChevronRight size={14} style={{ color: '#c4bdd4', margin: '0 4px', verticalAlign: 'middle' }} /> <strong>{activePage}</strong>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.searchBar}>
                  <Search size={14} strokeWidth={2} style={{ color: '#9891a6', flexShrink: 0 }} />
                  <span>Search</span>
                  <kbd className={styles.searchKbd}>⌘ /</kbd>
                </div>
                <button className={styles.iconBtn}>
                  <Bell size={16} strokeWidth={1.9} />
                  <span className={styles.notifDot} />
                </button>
                <div className={styles.profileChip} onClick={() => go('Profile', '/student/profile')}>
                  <div className={`${styles.avatar} ${styles.avatarLg}`} style={{ background: '#8b5cf6' }}>RS</div>
                  <span>Riya S.</span>
                </div>
              </div>
            </div>

            {/* Hero */}
            <div className={styles.heroRow}>
              <div className={styles.heroText}>
                <h1>Your overall performance</h1>
                <p className={styles.heroStat}>92.5%</p>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.btn} onClick={() => go('Pre-Lab', '/student/pre-lab')}>
                  <Calendar size={15} strokeWidth={1.9} /> View Schedule
                </button>
                <button className={styles.btn} onClick={() => go('Performance Analytics', '/student/analytics')}>
                  <Filter size={15} strokeWidth={1.9} /> Analytics
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <button className={`${styles.quickBtn} ${styles.quickBtnPrimary}`} onClick={() => go('Pre-Lab', '/student/pre-lab')}>
                <FlaskConical size={15} strokeWidth={1.9} /> Start Pre-Lab
              </button>
              <button className={`${styles.quickBtn} ${styles.quickBtnGreen}`} onClick={() => go('Join Lab', '/student/live-lab')}>
                <Terminal size={15} strokeWidth={1.9} /> Join Live Lab
              </button>
              <button className={styles.quickBtn} onClick={() => go('Submission', '/student/submissions')}>
                <Upload size={15} strokeWidth={1.9} /> View Submissions
              </button>
              <button className={styles.quickBtn} onClick={() => go('Ranking', '/student/rankings')}>
                <Trophy size={15} strokeWidth={1.9} /> Rankings
              </button>
            </div>

            {/* Stat cards */}
            <div className={styles.statCards}>
              <div className={styles.statCard} onClick={() => go('Performance Analytics', '/student/analytics')} style={{ cursor: 'pointer' }}>
                <p className={styles.statLabel}>Weekly Study Hours</p>
                <div className={styles.statRow}>
                  <span className={styles.statValue}>18.5 <small>hrs</small></span>
                  <span className={`${styles.badge} ${styles.badgeUp}`}><ArrowUp size={11} strokeWidth={2.5} />12%</span>
                </div>
                <p className={styles.statCompare}>compared to last week</p>
                <svg className={styles.sparkline} viewBox="0 0 140 64">
                  <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
                  <polyline points="2,50 24,46 46,52 68,34 90,26 112,14 138,6" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className={styles.statCard} onClick={() => go('Pre-Lab', '/student/pre-lab')} style={{ cursor: 'pointer' }}>
                <p className={styles.statLabel}>Pending Pre-Labs</p>
                <div className={styles.statRow}>
                  <span className={styles.statValue}>3</span>
                  <span className={`${styles.badge} ${styles.badgeDown}`}><ArrowDown size={11} strokeWidth={2.5} />2</span>
                </div>
                <p className={styles.statCompare}>compared to last week</p>
                <svg className={styles.sparkline} viewBox="0 0 140 64">
                  <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#fb923c"/><stop offset="100%" stopColor="#ea580c"/></linearGradient></defs>
                  <polyline points="2,10 24,22 46,16 68,34 90,30 112,48 138,44" fill="none" stroke="url(#g2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className={styles.statCard} onClick={() => go('Ranking', '/student/rankings')} style={{ cursor: 'pointer' }}>
                <p className={styles.statLabel}>Current Rank</p>
                <div className={styles.statRow}>
                  <span className={styles.statValue}>#12</span>
                  <span className={`${styles.badge} ${styles.badgeUp}`}><ArrowUp size={11} strokeWidth={2.5} />3</span>
                </div>
                <p className={styles.statCompare}>compared to last week</p>
                <svg className={styles.sparkline} viewBox="0 0 140 64">
                  <defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#9333ea"/></linearGradient></defs>
                  <polyline points="2,48 24,50 46,38 68,40 90,24 112,20 138,6" fill="none" stroke="url(#g3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Sessions board */}
            <div className={styles.boardSection}>
              <div className={styles.boardHeader}>
                <h2>Upcoming Sessions</h2>
                <a onClick={() => go('Pre-Lab', '/student/pre-lab')}>View all</a>
              </div>
              <div className={styles.boardColumns}>
                <div>
                  <p className={styles.colTitle}>Pending <span className={styles.countPill}>2</span></p>
                  {[
                    { title: 'Thermodynamics: Heat Transfer Experiment', Icon: Thermometer, bg: 'linear-gradient(135deg,#f97316,#ef4444)', avatars: [['RS','#8b5cf6'],['AK','#ec4899'],['MN','#f59e0b']], date: 'Jul 10, 2026' },
                    { title: 'Data Structures: Stack Implementation', Icon: Code2, bg: '#6366f1', avatars: [['PJ','#14b8a6'],['IN','#64748b']], date: 'Jul 12, 2026' },
                  ].map(s => (
                    <div key={s.title} className={styles.sessionCard} onClick={() => go('Pre-Lab', '/student/pre-lab')} style={{ cursor: 'pointer' }}>
                      <div className={styles.cardTop}>
                        <div className={styles.subjectIcon} style={{ background: s.bg }}><s.Icon size={16} strokeWidth={2} style={{ color: '#fff' }} /></div>
                        <div className={styles.avatarStack}>{s.avatars.map(([i, c]) => <div key={i} className={styles.avatar} style={{ background: c }}>{i}</div>)}</div>
                      </div>
                      <p className={styles.cardTitle}>{s.title}</p>
                      <div className={styles.metaRow}><span><span className={styles.metaLabel}>Start:</span><span className={styles.metaValueMuted}>Not Started</span></span></div>
                      <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: '0%', background: 'rgba(255,255,255,.2)' }} /></div>
                      <p className={styles.lastUpdated}>Last updated: <strong>{s.date}</strong></p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className={styles.colTitle}>Ongoing <span className={styles.countPill}>2</span></p>
                  {[
                    { title: 'Organic Chemistry: Titration Lab', Icon: Beaker, bg: 'linear-gradient(135deg,#22c55e,#16a34a)', avatars: [['IN','#64748b']], start: 'Jul 1', end: 'Jul 30', pct: 60, date: 'Jul 18, 2026' },
                    { title: 'Digital Logic: Circuit Design Lab', Icon: Cpu, bg: '#0ea5e9', avatars: [['AK','#ec4899'],['RS','#8b5cf6']], start: 'Jul 5', end: 'Aug 5', pct: 25, date: 'Jul 20, 2026' },
                  ].map(s => (
                    <div key={s.title} className={styles.sessionCard} onClick={() => go('Join Lab', '/student/live-lab')} style={{ cursor: 'pointer' }}>
                      <div className={styles.cardTop}>
                        <div className={styles.subjectIcon} style={{ background: s.bg }}><s.Icon size={16} strokeWidth={2} style={{ color: '#fff' }} /></div>
                        <div className={styles.avatarStack}>{s.avatars.map(([i, c]) => <div key={i} className={styles.avatar} style={{ background: c }}>{i}</div>)}</div>
                      </div>
                      <p className={styles.cardTitle}>{s.title}</p>
                      <div className={styles.metaRow}>
                        <span><span className={styles.metaLabel}>Start:</span><span className={styles.metaValue}>{s.start}</span></span>
                        <span><span className={styles.metaLabel}>Deadline:</span><span className={styles.metaValue}>{s.end}</span></span>
                      </div>
                      <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${s.pct}%` }} /></div>
                      <p className={styles.lastUpdated}>Last updated: <strong>{s.date}</strong></p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className={styles.colTitle}>Completed <span className={styles.countPill}>1</span></p>
                  <div className={styles.sessionCard} onClick={() => go('Submission', '/student/submissions')} style={{ cursor: 'pointer' }}>
                    <div className={styles.cardTop}>
                      <div className={styles.subjectIcon} style={{ background: 'linear-gradient(135deg,#a855f7,#7c3aed)' }}><Crosshair size={16} strokeWidth={2} style={{ color: '#fff' }} /></div>
                      <div className={styles.avatarStack}>{[['IN','#64748b'],['MN','#f59e0b']].map(([i, c]) => <div key={i} className={styles.avatar} style={{ background: c }}>{i}</div>)}</div>
                    </div>
                    <p className={styles.cardTitle}>Mechanics: Projectile Motion Lab</p>
                    <div className={styles.metaRow}><span><span className={styles.metaLabel}>Ended:</span><span className={styles.metaValue}>Jun 11, 2026</span></span></div>
                    <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: '100%' }} /></div>
                    <p className={styles.lastUpdated}>Last updated: <strong>Jun 12, 2026</strong></p>
                  </div>
                  <div className={styles.addLab} onClick={() => go('Join Lab', '/student/live-lab')}>
                    <Plus size={15} strokeWidth={2} /> Join new lab
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
