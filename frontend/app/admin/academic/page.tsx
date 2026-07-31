'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/layout/AdminShell';
import {
  CalendarDays, Layers, BookOpen, Users, Building2,
  Plus, ChevronRight, CheckCircle2, Clock, Edit, Trash2
} from 'lucide-react';
import styles from './page.module.css';

type Section = 'overview' | 'years' | 'batches' | 'sections' | 'subjects' | 'departments';

const ACADEMIC_YEARS = [
  { year:'2026–27', status:'Active',   start:'Jul 2026', end:'Apr 2027', batches:12 },
  { year:'2025–26', status:'Archived', start:'Jul 2025', end:'Apr 2026', batches:10 },
  { year:'2024–25', status:'Archived', start:'Jul 2024', end:'Apr 2025', batches:10 },
];

const BATCHES = [
  { code:'CSE-2Y-26', name:'CSE Second Year', dept:'CSE', sem:'Sem 3 & 4', students:120, status:'Active' },
  { code:'ECE-3Y-25', name:'ECE Third Year',  dept:'ECE', sem:'Sem 5 & 6', students:85,  status:'Active' },
  { code:'ME-2Y-26',  name:'ME Second Year',  dept:'ME',  sem:'Sem 3 & 4', students:98,  status:'Active' },
  { code:'EEE-4Y-24', name:'EEE Final Year',  dept:'EEE', sem:'Sem 7 & 8', students:62,  status:'Active' },
  { code:'CSE-1Y-26', name:'CSE First Year',  dept:'CSE', sem:'Sem 1 & 2', students:180, status:'Active' },
];

const SECTIONS = [
  { code:'CSE-3A', batch:'CSE Second Year', name:'Section A', capacity:60, enrolled:58, status:'Active' },
  { code:'CSE-3B', batch:'CSE Second Year', name:'Section B', capacity:60, enrolled:62, status:'Full'   },
  { code:'ECE-5A', batch:'ECE Third Year',  name:'Section A', capacity:45, enrolled:43, status:'Active' },
  { code:'ME-3A',  batch:'ME Second Year',  name:'Section A', capacity:50, enrolled:48, status:'Active' },
  { code:'EEE-7A', batch:'EEE Final Year',  name:'Section A', capacity:35, enrolled:32, status:'Active' },
];

const SUBJECTS = [
  { code:'CS301', name:'Data Structures & Algorithms', dept:'CSE', credits:4, sem:'Sem 3', type:'Core' },
  { code:'CS302', name:'Database Management Systems',  dept:'CSE', credits:3, sem:'Sem 3', type:'Core' },
  { code:'CS501', name:'Machine Learning',             dept:'CSE', credits:4, sem:'Sem 5', type:'Elective' },
  { code:'EC301', name:'Digital Logic Circuits',       dept:'ECE', credits:4, sem:'Sem 3', type:'Core' },
  { code:'ME301', name:'Thermodynamics',               dept:'ME',  credits:4, sem:'Sem 3', type:'Core' },
  { code:'EE701', name:'Power Systems',                dept:'EEE', credits:4, sem:'Sem 7', type:'Core' },
  { code:'CS303', name:'Operating Systems',            dept:'CSE', credits:3, sem:'Sem 5', type:'Core' },
  { code:'CH101', name:'Engineering Chemistry Lab',    dept:'CSE', credits:2, sem:'Sem 1', type:'Lab' },
];

const DEPARTMENTS = [
  { code:'CSE', name:'Computer Science & Engineering', hod:'Dr. Ramesh Kumar', faculty:28, students:480, status:'Active' },
  { code:'ECE', name:'Electronics & Communication',    hod:'Dr. Priya Menon',  faculty:22, students:340, status:'Active' },
  { code:'ME',  name:'Mechanical Engineering',         hod:'Dr. Suresh Patil', faculty:18, students:290, status:'Active' },
  { code:'EEE', name:'Electrical & Electronics',       hod:'Dr. Leela Bhat',   faculty:16, students:220, status:'Active' },
];

export default function AcademicPage() {
  const [section, setSection] = useState<Section>('overview');

  const sections: { id: Section; label: string; Icon: React.ElementType; count: string; color: string }[] = [
    { id:'years',       label:'Academic Years', Icon: CalendarDays, count:'3',  color:'linear-gradient(135deg,#7c3aed,#9333ea)' },
    { id:'batches',     label:'Batches',        Icon: Layers,       count:'12', color:'linear-gradient(135deg,#ec4899,#d6409f)' },
    { id:'departments', label:'Departments',    Icon: Building2,    count:'4',  color:'linear-gradient(135deg,#f59e0b,#f2994a)' },
    { id:'sections',    label:'Sections',       Icon: Users,        count:'48', color:'linear-gradient(135deg,#22c55e,#16a34a)' },
    { id:'subjects',    label:'Subjects',       Icon: BookOpen,     count:'24', color:'linear-gradient(135deg,#06b6d4,#0ea5e9)' },
  ];

  return (
    <AdminShell activePage="Academic Setup" title="Academic Setup" subtitle="Configure academic years, batches, departments, sections and subjects">

      {/* ── Overview Cards ────────────────────────────────────────────── */}
      <div className={styles.overviewGrid}>
        {sections.map(s => (
          <div
            key={s.id}
            className={`${styles.overviewCard} ${section === s.id ? styles.overviewCardActive : ''}`}
            onClick={() => setSection(s.id)}
          >
            <div className={styles.overviewIcon} style={{ background: s.color }}>
              <s.Icon size={20} strokeWidth={1.9} color="#fff" />
            </div>
            <div>
              <p className={styles.overviewLabel}>{s.label}</p>
              <p className={styles.overviewCount}>{s.count}</p>
            </div>
            <ChevronRight size={16} strokeWidth={2} color="#9891a6" style={{ marginLeft:'auto' }} />
          </div>
        ))}
      </div>

      {/* ── Academic Years ────────────────────────────────────────────── */}
      {section === 'years' && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Academic Years</h2>
            <button className={styles.btnPrimary}><Plus size={14} strokeWidth={2} /> Create Academic Year</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Year</th><th>Status</th><th>Start</th><th>End</th><th>Batches</th><th>Actions</th></tr></thead>
              <tbody>
                {ACADEMIC_YEARS.map(y => (
                  <tr key={y.year}>
                    <td><strong style={{ fontFamily:'Space Grotesk,sans-serif', color:'#201b2e' }}>{y.year}</strong></td>
                    <td><span className={`${styles.pill} ${y.status === 'Active' ? styles.pillGreen : styles.pillGray}`}>{y.status}</span></td>
                    <td>{y.start}</td><td>{y.end}</td><td>{y.batches}</td>
                    <td><div className={styles.actions}>
                      <button className={styles.actionBtn}><Edit size={14} strokeWidth={2} /></button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}><Trash2 size={14} strokeWidth={2} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Batches ───────────────────────────────────────────────────── */}
      {section === 'batches' && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Batches</h2>
            <button className={styles.btnPrimary}><Plus size={14} strokeWidth={2} /> Create Batch</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Batch Code</th><th>Name</th><th>Department</th><th>Semester</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {BATCHES.map(b => (
                  <tr key={b.code}>
                    <td><code className={styles.code}>{b.code}</code></td>
                    <td><strong style={{ color:'#201b2e' }}>{b.name}</strong></td>
                    <td>{b.dept}</td><td>{b.sem}</td><td>{b.students}</td>
                    <td><span className={`${styles.pill} ${styles.pillGreen}`}>{b.status}</span></td>
                    <td><div className={styles.actions}>
                      <button className={styles.actionBtn}><Edit size={14} strokeWidth={2} /></button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}><Trash2 size={14} strokeWidth={2} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Sections ──────────────────────────────────────────────────── */}
      {section === 'sections' && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Sections</h2>
            <button className={styles.btnPrimary}><Plus size={14} strokeWidth={2} /> Create Section</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Code</th><th>Batch</th><th>Section</th><th>Capacity</th><th>Enrolled</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {SECTIONS.map(s => (
                  <tr key={s.code}>
                    <td><code className={styles.code}>{s.code}</code></td>
                    <td>{s.batch}</td><td>{s.name}</td>
                    <td>{s.capacity}</td>
                    <td>
                      <div className={styles.progressCell}>
                        <span>{s.enrolled}</span>
                        <div className={styles.miniBar}>
                          <div className={styles.miniBarFill} style={{ width: `${(s.enrolled/s.capacity)*100}%`, background: s.enrolled > s.capacity ? '#ef4444' : '#7c3aed' }} />
                        </div>
                      </div>
                    </td>
                    <td><span className={`${styles.pill} ${s.status === 'Full' ? styles.pillOrange : styles.pillGreen}`}>{s.status}</span></td>
                    <td><div className={styles.actions}>
                      <button className={styles.actionBtn}><Edit size={14} strokeWidth={2} /></button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}><Trash2 size={14} strokeWidth={2} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Subjects ──────────────────────────────────────────────────── */}
      {section === 'subjects' && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Subjects</h2>
            <button className={styles.btnPrimary}><Plus size={14} strokeWidth={2} /> Add Subject</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Code</th><th>Subject Name</th><th>Department</th><th>Credits</th><th>Semester</th><th>Type</th><th>Actions</th></tr></thead>
              <tbody>
                {SUBJECTS.map(s => (
                  <tr key={s.code}>
                    <td><code className={styles.code}>{s.code}</code></td>
                    <td><strong style={{ color:'#201b2e' }}>{s.name}</strong></td>
                    <td>{s.dept}</td><td>{s.credits}</td><td>{s.sem}</td>
                    <td><span className={`${styles.pill} ${s.type === 'Lab' ? styles.pillBlue : s.type === 'Elective' ? styles.pillOrange : styles.pillGreen}`}>{s.type}</span></td>
                    <td><div className={styles.actions}>
                      <button className={styles.actionBtn}><Edit size={14} strokeWidth={2} /></button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}><Trash2 size={14} strokeWidth={2} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Departments ───────────────────────────────────────────────── */}
      {section === 'departments' && (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Departments</h2>
            <button className={styles.btnPrimary}><Plus size={14} strokeWidth={2} /> Add Department</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Code</th><th>Department Name</th><th>HOD</th><th>Faculty</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {DEPARTMENTS.map(d => (
                  <tr key={d.code}>
                    <td><code className={styles.code}>{d.code}</code></td>
                    <td><strong style={{ color:'#201b2e' }}>{d.name}</strong></td>
                    <td>{d.hod}</td><td>{d.faculty}</td><td>{d.students}</td>
                    <td><span className={`${styles.pill} ${styles.pillGreen}`}>{d.status}</span></td>
                    <td><div className={styles.actions}>
                      <button className={styles.actionBtn}><Edit size={14} strokeWidth={2} /></button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}><Trash2 size={14} strokeWidth={2} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Default overview ──────────────────────────────────────────── */}
      {section === 'overview' && (
        <div className={styles.infoBox}>
          <CheckCircle2 size={20} strokeWidth={1.9} color="#7c3aed" />
          <p>Select a category above to manage academic setup. Start by clicking <strong>Academic Years</strong> to configure the current year.</p>
        </div>
      )}
    </AdminShell>
  );
}
