import React, { useEffect, useState, useId } from 'react';
import { Database, Star, BookOpen, Layers, CheckSquare, Server, Activity, FolderOpen, Terminal, ArrowDownUp, Code, Power, HardDrive, AlertTriangle, ShieldCheck, AlertOctagon, Skull, Clock, Layout, User, ChevronRight, Cpu, RotateCcw, Settings, AppWindow } from 'lucide-react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { StarableBlock } from './StarableBlock';
import { ErSymbol } from './ErSymbol';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    background: 'transparent',
    fontFamily: 'inherit'
  }
});

const MermaidDiagram = ({ chart }) => {
  const [svg, setSvg] = useState('');
  const id = useId();
  
  useEffect(() => {
    const renderChart = async () => {
      try {
        const uniqueId = `mermaid-${id.replace(/:/g, '')}`;
        const { svg } = await mermaid.render(uniqueId, chart);
        setSvg(svg);
      } catch (e) {
        console.error('Mermaid render error', e);
        setSvg(`<div class="text-red-500 p-4 border border-red-500 rounded text-sm font-mono">Error rendering diagram</div>`);
      }
    };
    renderChart();
  }, [chart, id]);
  
  return (
    <div 
      className="w-full overflow-x-auto flex justify-center my-8 p-2"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};
export function NotesView({ module, user, starredCards }) {
  if (module.id === 'revision') {
    const notes = starredCards.filter(c => c.type === 'note');
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {notes.length === 0 ? (
          <div className="text-center p-10 text-tertiary">No starred notes yet.</div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="relative group bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden">
               <button 
                  onClick={async () => {
                    await deleteDoc(doc(db, `users/${user.uid}/starredCards`, note.id));
                  }}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full opacity-0 group-hover:opacity-100 text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-all duration-300"
                  title="Unstar Note"
                >
                  <Star size={16} fill="currentColor" />
                </button>
               {/* Render the saved HTML content from the original module */}
               <div dangerouslySetInnerHTML={{ __html: note.html }} />
            </div>
          ))
        )}
      </div>
    );
  }

  if (module.id === 'types_of_databases' || module.id === 'partitioning_sharding' || module.id === 'cap_theorem' || module.id === 'master_slave_db' || module.id === 'oop_blueprint' || module.id === 'cpp_fundamentals' || module.id === 'cpp_architecture' || module.id === 'cpp_inheritance' || module.id === 'solid_principles' || module.id === 'cpp_polymorphism' || module.id === 'cpp_runtime_polymorphism' || module.id === 'cpp_diamond_problem' || module.id === 'cpp_templates' || module.id === 'cpp_vs_java' || module.id === 'java_interfaces_abstract_classes' || module.id === 'cn_fundamentals' || module.id === 'cn_network_types' || module.id === 'cn_characteristics_osi' || module.id === 'cn_topologies' || module.id === 'cn_devices' || module.id === 'cn_layer2' || module.id === 'cn_layer3' || module.id === 'cn_core_protocols' || module.id === 'cn_routing' || module.id === 'cn_layer4' || module.id === 'cn_layer7' || module.id === 'cn_backend_architecture' || module.id === 'cn_security' || module.id === 'cn_performance' || module.id === 'cn_commands' || module.id === 'cn_deep_dive') {
    const colorPalette = [
      { bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-200 dark:border-indigo-900/50', text: 'text-indigo-600 dark:text-indigo-400', icon: 'text-indigo-500' },
      { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-900/50', text: 'text-amber-600 dark:text-amber-400', icon: 'text-amber-500' },
      { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-900/50', text: 'text-emerald-600 dark:text-emerald-400', icon: 'text-emerald-500' },
      { bg: 'bg-rose-50 dark:bg-rose-950/20', border: 'border-rose-200 dark:border-rose-900/50', text: 'text-rose-600 dark:text-rose-400', icon: 'text-rose-500' },
      { bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/20', border: 'border-fuchsia-200 dark:border-fuchsia-900/50', text: 'text-fuchsia-600 dark:text-fuchsia-400', icon: 'text-fuchsia-500' },
      { bg: 'bg-cyan-50 dark:bg-cyan-950/20', border: 'border-cyan-200 dark:border-cyan-900/50', text: 'text-cyan-600 dark:text-cyan-400', icon: 'text-cyan-500' },
      { bg: 'bg-slate-50 dark:bg-slate-900/40', border: 'border-slate-200 dark:border-slate-800', text: 'text-slate-700 dark:text-slate-300', icon: 'text-slate-500' }
    ];

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StarableBlock moduleTitle={module.title} user={user} starredCards={starredCards} blockId={`${module.id}-intro`}>
          <div className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <p className="text-secondary text-lg leading-relaxed">{module.notes.intro}</p>
          </div>
        </StarableBlock>

        {Object.entries(module.notes).map(([key, section], index) => {
          if (key === 'intro') return null;
          const style = colorPalette[(index - 1) % colorPalette.length];
          
          return (
            <StarableBlock key={key} moduleTitle={module.title} user={user} starredCards={starredCards} blockId={`${module.id}-${key}`}>
              <section className={`rounded-2xl p-8 shadow-sm border ${style.bg} ${style.border}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${style.text}`}>
                  <Database className={style.icon} size={24} /> {section.title}
                </h2>
                <ul className="space-y-4">
                  {section.points.map((pt, idx) => {
                    if (pt.startsWith("```mermaid")) {
                      const chartData = pt.replace(/```mermaid\n?/, '').replace(/\n?```$/, '');
                      return <MermaidDiagram key={idx} chart={chartData} />;
                    }
                    if (pt.startsWith("```")) {
                      return (
                        <div key={idx} className="w-full my-4 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
                          <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                            {pt.replace(/```[a-zA-Z]*\n?/g, '').replace(/```$/, '')}
                          </pre>
                        </div>
                      );
                    }
                    if (pt.startsWith("Output:")) {
                      return (
                        <div key={idx} className="w-full my-2 bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Output:</span>
                          <pre className="mt-2 text-sm font-mono text-emerald-800 dark:text-emerald-300">{pt.replace("Output:\n", "").replace(/`/g, "")}</pre>
                        </div>
                      );
                    }
                    if (pt.startsWith("Explanation:")) {
                       return (
                         <div key={idx} className="w-full my-2 bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-100 dark:border-sky-900/50">
                           <span className="font-bold text-sky-700 dark:text-sky-400 block mb-2">Explanation:</span>
                           <p className="text-sky-900 dark:text-sky-300 text-sm whitespace-pre-line">{pt.replace("Explanation:\n", "")}</p>
                         </div>
                       );
                    }
                    if (pt.trim().startsWith("|")) {
                      const rows = pt.trim().split('\n').filter(r => r.trim().startsWith('|'));
                      if (rows.length >= 3) {
                        const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
                        const dataRows = rows.slice(2).map(r => r.split('|').map(d => d.trim()).filter(d => d));
                        
                        return (
                          <div key={idx} className="w-full my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-md">
                            <table className="w-full text-sm text-left divide-y divide-slate-200 dark:divide-slate-700/50">
                              <thead className={`bg-slate-50/80 dark:bg-slate-800/50 ${style.text}`}>
                                <tr className="divide-x divide-slate-200 dark:divide-slate-700/50">
                                  {headers.map((h, i) => (
                                    <th key={i} className="px-4 py-3.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap" dangerouslySetInnerHTML={{ __html: h.replace(/`/g, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-surface">
                                {dataRows.map((row, i) => (
                                  <tr key={i} className="divide-x divide-slate-200 dark:divide-slate-700/50 hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                    {row.map((cell, j) => (
                                      <td key={j} className="px-4 py-3.5 text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: cell.replace(/`/g, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>') }} />
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    }
                    
                    return (
                      <li key={idx} className="text-secondary text-sm md:text-base leading-relaxed flex items-start gap-3">
                        <span className={`font-bold mt-1 ${style.icon}`}>•</span>
                        <span className="flex-1" dangerouslySetInnerHTML={{ __html: pt.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>') }} />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </StarableBlock>
          );
        })}
      </div>
    );
  }

  // Render Module 1: Intro
  if (module.id === 'intro') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${1}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> System Architecture
          </h2>
          <div className="flex flex-col items-center max-w-sm mx-auto space-y-2">
            <div className="flex flex-col items-center justify-center w-full p-4 bg-surface-muted border-2 border-strong rounded-xl">
              <User className="text-secondary mb-2" size={32} />
              <span className="font-semibold text-primary">User</span>
            </div>
            <ChevronRight className="rotate-90 text-tertiary" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-blue-100 dark:bg-blue-900/20 border-2 border-blue-800 rounded-xl">
              <AppWindow className="text-blue-600 dark:text-blue-400 mb-2" size={28} />
              <span className="font-semibold text-blue-600 dark:text-blue-300">Application Programs</span>
            </div>
            <ChevronRight className="rotate-90 text-tertiary" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 rounded-xl shadow-sm">
              <Settings className="text-indigo-600 dark:text-indigo-400 mb-2" size={28} />
              <span className="font-bold text-indigo-600 dark:text-indigo-300 text-lg">Operating System</span>
            </div>
            <ChevronRight className="rotate-90 text-tertiary" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-background border-2 border-strong rounded-xl">
              <Cpu className="text-tertiary mb-2" size={28} />
              <span className="font-semibold text-white">Computer Hardware</span>
            </div>
          </div>
        </section>
    </StarableBlock>

        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${2}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-primary mb-6">Core Definitions</h2>
            <div className="space-y-6">
              {module.notes.definitions.map((item, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4 text-left">
                  <h3 className="font-bold text-primary text-lg">{item.term}</h3>
                  <p className="text-secondary mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
    </StarableBlock>

          <div className="space-y-6">
            <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${3}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
              <h2 className="text-xl font-bold text-primary mb-6 text-left">Key OS Functions</h2>
              <ul className="space-y-3 text-left">
                {module.notes.functions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-1 rounded-full shrink-0">
                      <CheckSquare size={14} />
                    </div>
                    <div>
                      <strong className="text-primary">{item.title}: </strong>
                      <span className="text-secondary">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
    </StarableBlock>

            <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${4}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50 text-left">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">What if there is no OS?</h2>
              <ul className="space-y-2 list-disc list-inside text-amber-200/80">
                {module.notes.whyOs.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
    </StarableBlock>

            {module.notes.ipc && (
              <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${5}`}>
      <section className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8 shadow-sm border border-blue-200 dark:border-blue-900/50 text-left">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                  <Activity className="text-blue-500" /> {module.notes.ipc.title}
                </h2>
                <p className="text-blue-200/80 mb-4">{module.notes.ipc.desc}</p>
                <div className="inline-block bg-blue-100 dark:bg-blue-900/50 border border-blue-800 text-blue-100 px-4 py-2 rounded-lg font-medium">
                  {module.notes.ipc.methods}
                </div>
              </section>
    </StarableBlock>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Module 2: Types of OS
  if (module.id === 'types') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${6}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Cpu className="text-indigo-600 dark:text-indigo-400" /> Primary Goals of an OS
          </h2>
          <ul className="space-y-3">
            {module.notes.osGoals.map((goal, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${7}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Operating System Types</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.osTypes.map((type, idx) => (
              <div key={idx} className="bg-surface-muted/50 border border-strong p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-indigo-600 dark:text-indigo-300 text-lg">{type.name}</h3>
                  {type.examples && <span className="text-xs bg-background text-tertiary px-2 py-0.5 rounded font-mono">{type.examples}</span>}
                </div>
                <p className="text-secondary text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 3: Multi-Tasking vs Threads
  if (module.id === 'threads') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${8}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Core Concepts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.coreConcepts.map((concept, idx) => (
              <div key={idx} className="border-l-4 border-emerald-500 pl-4 bg-surface-muted/30 p-3 rounded-r-xl">
                <h3 className="font-bold text-primary">{concept.term}</h3>
                <p className="text-secondary text-sm mt-1">{concept.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${9}`}>
      <section className="bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden text-left">
          <div className="p-6 border-b border-subtle bg-surface-muted/50">
            <h2 className="text-xl font-bold text-primary">Multi-Tasking vs Multi-Threading</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-muted text-secondary text-sm">
                  <th className="p-4 border-b border-strong font-semibold w-1/4">Feature</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-indigo-600 dark:text-indigo-300">Multi-Tasking</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-emerald-600 dark:text-emerald-300">Multi-Threading</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.multitaskingVsThreading.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 border-b border-subtle font-medium text-primary align-top">{row.feature}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.tasking}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.threading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${10}`}>
      <section className="bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden text-left">
          <div className="p-6 border-b border-subtle bg-surface-muted/50">
            <h2 className="text-xl font-bold text-primary">Context Switching (Thread vs Process)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-muted text-secondary text-sm">
                  <th className="p-4 border-b border-strong font-semibold w-1/4">Feature</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-indigo-600 dark:text-indigo-300">Thread Context Switch</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-emerald-600 dark:text-emerald-300">Process Context Switch</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.contextSwitching.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 border-b border-subtle font-medium text-primary align-top">{row.feature}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.thread}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 4: Components of OS
  if (module.id === 'components') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${11}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Core Components</h2>
          <div className="space-y-4">
            {module.notes.coreComponents.map((comp, idx) => (
              <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold text-primary text-lg">{comp.term}</h3>
                <p className="text-secondary text-sm mt-1">{comp.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${12}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Kernel Functions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.kernelFunctions.map((func, idx) => (
              <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">{func.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{func.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${13}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">I/O Management Techniques</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {module.notes.ioTechniques.map((tech, idx) => (
              <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">{tech.term}</h3>
                <p className="text-secondary text-sm leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${14}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Types of Kernels</h2>
          <div className="space-y-4">
            {module.notes.kernelTypes.map((k, idx) => (
              <div key={idx} className="bg-surface-muted/20 p-5 rounded-xl border border-subtle hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-primary text-lg">{k.type}</h3>
                  {k.examples && <span className="text-xs bg-background text-tertiary px-3 py-1 rounded font-mono">{k.examples}</span>}
                </div>
                <p className="text-secondary text-sm mb-3 leading-relaxed">{k.desc}</p>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 p-2.5 rounded-lg text-emerald-600 dark:text-emerald-300"><strong className="block mb-1 text-emerald-600 dark:text-emerald-400">Pros:</strong> {k.pros}</div>
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-2.5 rounded-lg text-red-600 dark:text-red-300"><strong className="block mb-1 text-red-600 dark:text-red-400">Cons:</strong> {k.cons}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 5: System Calls
  if (module.id === 'syscalls') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Overview and Diagram */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${15}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Overview Text */}
            <div className="flex-1 space-y-4 text-left">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Terminal className="text-indigo-600 dark:text-indigo-400" /> What are System Calls?
              </h2>
              <p className="text-secondary leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50 dark:bg-indigo-950/20 py-2">
                {module.notes.overview.definition}
              </p>
              
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 rounded-xl text-red-200">
                <strong className="text-red-600 dark:text-red-400 block mb-1">Crucial Concept:</strong>
                {module.notes.overview.keyFact}
              </div>

              <div className="space-y-2 mt-4 text-sm text-tertiary">
                <p><strong className="text-secondary">Implementation:</strong> {module.notes.overview.implementation}</p>
                <p><strong className="text-secondary">Wrappers:</strong> {module.notes.overview.wrapperExample}</p>
              </div>
            </div>

            {/* Transition Diagram (User/Kernel) */}
            <div className="w-full lg:w-72 shrink-0 bg-background border border-subtle rounded-xl p-5 shadow-inner">
              <h3 className="text-center font-bold text-tertiary text-sm uppercase tracking-widest mb-4">Architecture Mode</h3>
              
              {/* User Mode Section */}
              <div className="space-y-2 mb-2 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 ml-2 text-left">USER MODE</div>
                <div className="bg-surface-muted border border-strong py-2 text-center rounded-lg text-primary text-sm font-medium">User App</div>
                <div className="bg-surface-muted border border-strong py-2 text-center rounded-lg text-primary text-sm font-medium">Glibc</div>
              </div>

              {/* Software Interrupt Boundary */}
              <div className="py-3 flex items-center gap-2">
                <div className="flex-1 h-px bg-surface-muted"></div>
                <div className="flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold whitespace-nowrap bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-900/50">
                  <ArrowDownUp size={14} className="mb-1" />
                  Software Interrupt
                </div>
                <div className="flex-1 h-px bg-surface-muted"></div>
              </div>

              {/* Kernel Mode Section */}
              <div className="space-y-2 mt-2 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-emerald-500 rounded-full"></div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 ml-2 text-left">KERNEL MODE</div>
                <div className="bg-surface-muted border border-strong py-2 text-center rounded-lg text-primary text-sm font-medium">System Call Interface (SCI)</div>
                <div className="bg-surface-muted border border-strong py-2 text-center rounded-lg text-primary text-sm font-medium">Kernel</div>
                <div className="bg-surface border border-strong py-2 text-center rounded-lg text-tertiary text-sm font-medium">Hardware</div>
              </div>
            </div>

          </div>
        </section>
    </StarableBlock>

        {/* Categories Grid */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${16}`}>
      <section className="bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden p-8 text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-emerald-600 dark:text-emerald-400" /> Types of System Calls
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {module.notes.typesOfSyscalls.map((type, idx) => (
                <div key={idx} className="bg-surface-muted border border-strong p-4 rounded-xl hover:border-emerald-500/50 transition-colors">
                  <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">{type.category}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{type.items}</p>
                </div>
             ))}
          </div>
        </section>
    </StarableBlock>

        {/* Windows vs Unix Table */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${17}`}>
      <section className="bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden text-left">
          <div className="p-6 border-b border-subtle bg-surface-muted/50">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Code className="text-blue-600 dark:text-blue-400" /> Windows vs Unix System Calls
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-muted text-secondary text-sm">
                  <th className="p-4 border-b border-strong font-semibold w-1/4">Category</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-blue-600 dark:text-blue-300">Windows</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-emerald-600 dark:text-emerald-300">Unix</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-muted/80 transition-colors">
                    <td className="p-4 border-b border-subtle font-medium text-primary align-top">{row.category}</td>
                    <td className="p-4 border-b border-subtle align-top">
                      <div className="flex flex-wrap gap-1">
                        {row.win.split(', ').map((cmd, i) => (
                           <span key={i} className="font-mono text-tertiary bg-background/50 px-2 py-0.5 rounded text-xs">{cmd}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 border-b border-subtle align-top">
                      <div className="flex flex-wrap gap-1">
                         {row.unix.split(', ').map((cmd, i) => (
                           <span key={i} className="font-mono text-tertiary bg-background/50 px-2 py-0.5 rounded text-xs">{cmd}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 6: The Boot Process
  if (module.id === 'boot') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Boot Flowchart/Diagram */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${18}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Activity className="text-rose-600 dark:text-rose-400" /> What happens during boot?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-background p-6 rounded-xl border border-subtle">
            <div className="flex flex-col items-center justify-center p-3 bg-surface-muted border border-strong rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-rose-600 dark:text-rose-300 text-sm">Power On</span>
              <span className="text-[10px] text-tertiary mt-1">System initialized</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-surface-muted border border-strong rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-indigo-600 dark:text-indigo-300 text-sm">BIOS / UEFI</span>
              <span className="text-[10px] text-tertiary mt-1">Runs POST</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 rounded-lg w-full md:w-40 text-center shadow-lg">
              <span className="font-bold text-indigo-200 text-sm">MBR / Disk</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1">Reads first sector</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-surface-muted border border-strong rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-emerald-600 dark:text-emerald-300 text-sm">Bootloader</span>
              <span className="text-[10px] text-tertiary mt-1">Loads kernel</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-800 rounded-lg w-full md:w-40 text-center">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Operating System</span>
              <span className="text-[10px] text-emerald-500 mt-1">User space ready</span>
            </div>
          </div>
          <p className="text-tertiary text-sm mt-4 italic">
            The MBR (Master Boot Record) helps the computer find and start the operating system by specifying boot sectors and partition parameters.
          </p>
        </section>
    </StarableBlock>

        {/* Step-by-step Timeline */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${19}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
            <Power className="text-rose-600 dark:text-rose-400" /> Detail: System Startup Steps
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.15rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500/50 before:via-indigo-500/50 before:to-emerald-500/50">
            {module.notes.steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-full bg-surface border-2 border-strong group-hover:border-indigo-400 text-tertiary group-hover:text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 z-10 transition-colors font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="bg-surface-muted/50 border border-strong p-5 rounded-xl flex-1 hover:border-strong transition-colors">
                  <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-tertiary text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* What's inside the MBR? */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${20}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Server className="text-indigo-600 dark:text-indigo-400" /> What's inside the MBR?
          </h2>
          <p className="text-secondary text-sm mb-6">
            Traditionally, the MBR occupies the <strong>first 512 bytes</strong> of the storage disk. Its internal layout is strictly structured:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-muted border-l-4 border-blue-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-600 dark:text-blue-300 text-sm">1. Bootloader Code</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded font-mono">446 bytes</span>
              </div>
              <p className="text-xs text-tertiary">Small program executed by BIOS to locate and run the secondary bootloader/OS kernel.</p>
            </div>
            
            <div className="bg-surface-muted border-l-4 border-indigo-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-300 text-sm">2. Partition Table</span>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded font-mono">64 bytes</span>
              </div>
              <p className="text-xs text-tertiary">Contains info for up to 4 primary partitions (start/end sectors, size, bootable flag).</p>
            </div>

            <div className="bg-surface-muted border-l-4 border-emerald-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-300 text-sm">3. Boot Signature</span>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">2 bytes</span>
              </div>
              <p className="text-xs text-tertiary">Usually set to <code className="text-emerald-600 dark:text-emerald-400">0x55AA</code>. Tells the BIOS/UEFI that the sector is bootable.</p>
            </div>
          </div>

          <div className="bg-background p-4 rounded-xl border border-subtle mb-6">
            <span className="text-xs font-bold text-tertiary uppercase tracking-widest block mb-2">Visual 512-Byte MBR Map</span>
            <div className="flex text-center text-xs font-mono font-bold text-white rounded-lg overflow-hidden border border-strong">
              <div className="bg-blue-600/80 py-3 w-[87%] border-r border-subtle">Bootloader Code (446B)</div>
              <div className="bg-indigo-600/80 py-3 w-[11.5%] border-r border-subtle">Partition Table (64B)</div>
              <div className="bg-emerald-600/80 py-3 w-[1.5%]">Sig (2B)</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-primary mb-2">Example Scenario:</h3>
              <p className="text-tertiary leading-relaxed text-xs">
                Suppose a storage disk contains a <strong>Windows partition</strong> and a <strong>Linux partition</strong>. The MBR partition table stores exactly where these partitions begin on the disk plates and which partition is marked as "active" (bootable) to let the boot code know where to hand off execution.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary mb-2">Modern Systems & GPT:</h3>
              <p className="text-tertiary leading-relaxed text-xs">
                Many modern systems use <strong>GPT (GUID Partition Table)</strong> instead of MBR. GPT is superior because it:
              </p>
              <ul className="list-disc list-inside text-xs text-tertiary mt-2 space-y-1">
                <li>Supports disks larger than 2 Terabytes (TB)</li>
                <li>Allows more than 4 primary partitions (up to 128)</li>
                <li>Includes backup partition tables for reliability</li>
              </ul>
            </div>
          </div>
        </section>
    </StarableBlock>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Hardware & Firmware */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${21}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <HardDrive className="text-indigo-600 dark:text-indigo-400" /> Key Hardware & Firmware
            </h2>
            <div className="space-y-4">
              {module.notes.definitions.map((def, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-bold text-primary text-lg">{def.term}</h3>
                  <p className="text-tertiary mt-1 text-sm">{def.desc}</p>
                </div>
              ))}
            </div>
          </section>
    </StarableBlock>

          {/* OS Bootloaders */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${22}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
             <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Terminal className="text-emerald-600 dark:text-emerald-400" /> OS Bootloaders
            </h2>
            <div className="grid gap-3">
              {module.notes.bootloaders.map((boot, idx) => (
                <div key={idx} className="flex items-center justify-between bg-surface-muted p-4 rounded-xl border border-strong">
                   <span className="font-bold text-secondary">{boot.os}</span>
                   <span className="font-mono text-sm bg-background/50 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full">{boot.name}</span>
                </div>
              ))}
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Exam Prep Key Concept Block */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${23}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-2">Exam Checkpoint</h2>
          <p className="text-secondary text-sm leading-relaxed">
            <strong>MBR (Master Boot Record)</strong> is the first sector of a storage disk containing boot code and partition information used during system startup. Remember its exact 512-byte structure breakdown (446 bytes code + 64 bytes partitions + 2 bytes signature) for MCQ/theory exams!
          </p>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 7: 32-Bit vs. 64-Bit OS
  if (module.id === 'arch') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Core Differences Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${24}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Cpu className="text-indigo-600 dark:text-indigo-400" /> Registers & Data Processing
            </h2>
            <div className="space-y-4">
              {module.notes.registers.map((reg, idx) => (
                <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-primary">{reg.title}</h3>
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">{reg.bytes} / cycle</span>
                  </div>
                  <p className="text-tertiary text-sm leading-relaxed">{reg.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-background p-4 rounded-xl border border-subtle text-xs text-tertiary leading-relaxed">
              <strong className="text-secondary block mb-1">Performance Insight:</strong>
              Because 64-bit registers are twice as large, they process double the data per instruction cycle, yielding huge math & execution speedups.
            </div>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${25}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <HardDrive className="text-emerald-600 dark:text-emerald-400" /> Addressable Memory Limits
              </h2>
              <div className="space-y-4">
                {module.notes.memory.map((mem, idx) => (
                  <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-primary">{mem.term}</h3>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">{mem.value} max</span>
                    </div>
                    <p className="text-tertiary text-sm leading-relaxed">{mem.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 p-4 rounded-xl text-indigo-600 dark:text-indigo-300 text-xs leading-relaxed">
              <strong className="text-indigo-600 dark:text-indigo-400 block mb-1">Why the 4GB limit?</strong>
              A 32-bit OS can only reference 2<sup>32</sup> distinct addresses. 2<sup>32</sup> bytes = exactly 4,294,967,296 bytes (4 GB). Beyond this, the CPU has no way to point to physical memory locations!
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Key Advantages */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${26}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <CheckSquare className="text-rose-600 dark:text-rose-400" /> Key Advantages of 64-Bit Architecture
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {module.notes.advantages.map((adv, idx) => (
              <div key={idx} className="bg-surface-muted/50 border border-strong p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-rose-600 dark:text-rose-300 mb-2">{adv.title}</h3>
                  <p className="text-tertiary text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Quick Interview Prep Card */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${27}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-2">Interview Summary</h2>
          <p className="text-secondary text-sm leading-relaxed">
            If asked the difference: <span className="italic text-white">"A 32-bit OS is limited to 4GB of RAM and processes 4 bytes per cycle, whereas a 64-bit OS can address virtually unlimited RAM and processes 8 bytes per cycle, making it vastly superior for performance and heavy resource usage."</span>
          </p>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 8: Storage Devices Basics
  if (module.id === 'storage') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Memory Hierarchy Pyramid */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${28}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> The Memory Hierarchy
          </h2>
          <p className="text-tertiary text-sm mb-8 leading-relaxed">
            Computer memory is structured like a pyramid: storage at the top is extremely fast, small, and expensive, while storage at the bottom is slow, massive, and cheap.
          </p>

          <div className="flex flex-col items-center max-w-md mx-auto space-y-2 mb-6">
            {/* Registers (Top) */}
            <div className="w-full bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 rounded-lg p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-rose-600 dark:text-rose-300 text-sm block">1. Registers (Inside CPU)</span>
              <span className="text-[10px] text-tertiary">Speed: Sub-nanosecond | Size: Bytes | Cost: Extremely High</span>
            </div>
            
            <ChevronRight className="rotate-90 text-tertiary shrink-0" size={16} />

            {/* Cache */}
            <div className="w-[90%] bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 rounded-lg p-3 text-center shadow-md transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-indigo-600 dark:text-indigo-300 text-sm block">2. Cache (SRAM, Next to CPU)</span>
              <span className="text-[10px] text-tertiary">Speed: Nanoseconds | Size: Megabytes (MB) | Cost: High</span>
            </div>
            
            <ChevronRight className="rotate-90 text-tertiary shrink-0" size={16} />

            {/* RAM */}
            <div className="w-[80%] bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-500 rounded-lg p-3 text-center shadow-md transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-blue-600 dark:text-blue-300 text-sm block">3. Main Memory (RAM / DRAM)</span>
              <span className="text-[10px] text-tertiary">Speed: 10-50ns | Size: Gigabytes (GB) | Cost: Medium</span>
            </div>
            
            <ChevronRight className="rotate-90 text-tertiary shrink-0" size={16} />

            {/* Secondary Storage */}
            <div className="w-[70%] bg-surface-muted border-2 border-strong rounded-lg p-3 text-center transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-primary text-sm block">4. Secondary Storage (SSDs/HDDs)</span>
              <span className="text-[10px] text-tertiary">Speed: Milliseconds | Size: Terabytes (TB) | Cost: Low</span>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Detailed Descriptions Grid */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${29}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle text-left">
          <h2 className="text-xl font-bold text-primary mb-6">Detailed Memory Levels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-lg border-b border-subtle pb-2">Primary Memory</h3>
              {module.notes.hierarchy.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-primary">{item.level}</strong>
                    <span className="text-[10px] bg-background text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded font-mono">{item.size}</span>
                  </div>
                  <p className="text-tertiary text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg border-b border-subtle pb-2">Secondary Memory</h3>
              <div className="bg-surface-muted/40 p-4 rounded-xl border border-strong h-full flex flex-col justify-between">
                <div>
                  <strong className="text-primary block mb-2">Long-term Permanent Storage</strong>
                  <p className="text-tertiary text-xs leading-relaxed mb-4">
                    Unlike primary memory, secondary memory stores data permanently. Modern systems divide these into:
                  </p>
                  <ul className="space-y-2 text-xs text-secondary list-disc list-inside">
                    <li><strong>Electronic Disks:</strong> SSDs, USB Flash Drives</li>
                    <li><strong>Magnetic Disks:</strong> HDDs (Hard Disk Drives)</li>
                    <li><strong>Optical Disks:</strong> CDs, DVDs, Blu-rays</li>
                    <li><strong>Magnetic Tapes:</strong> Enterprise back-ups</li>
                  </ul>
                </div>
                <div className="mt-4 text-[10px] text-tertiary italic">
                  *Secondary memory can be thousands of times slower to access than CPU registers but holds millions of times more storage.
                </div>
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Trade-offs Comparisons */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${30}`}>
      <section className="bg-surface rounded-2xl shadow-sm border border-subtle overflow-hidden text-left">
          <div className="p-6 border-b border-subtle bg-surface-muted/50">
            <h2 className="text-xl font-bold text-primary">Trade-offs Comparisons (Primary vs Secondary)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-muted text-secondary text-sm">
                  <th className="p-4 border-b border-strong font-semibold w-1/4">Factor</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-indigo-600 dark:text-indigo-300">Primary Memory</th>
                  <th className="p-4 border-b border-strong font-semibold w-3/8 text-emerald-600 dark:text-emerald-300">Secondary Storage</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-4 border-b border-subtle font-medium text-primary align-top">{row.factor}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.primary}</td>
                    <td className="p-4 border-b border-subtle text-secondary align-top">{row.secondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </StarableBlock>

        {/* Volatility Highlight Block */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${31}`}>
      <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
            <Activity className="text-amber-500" /> Volatility Check
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs text-secondary">
            <div className="bg-surface/50 p-4 rounded-xl border border-subtle">
              <strong className="text-amber-600 dark:text-amber-300 block mb-1">Volatile (RAM, Cache, Registers)</strong>
              Requires electrical currents to sustain states. Data is wiped instantly when power is cut.
            </div>
            <div className="bg-surface/50 p-4 rounded-xl border border-subtle">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">Non-Volatile (SSD, HDD, Flash Drives)</strong>
              Stores data physically or magnetically. Retains records permanently even when power is turned off.
            </div>
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 9: Intro to Process
  if (module.id === 'process') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Program vs Process */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${32}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
            <Activity className="text-indigo-600 dark:text-indigo-400" /> Program vs. Process
          </h2>
          <p className="text-tertiary text-sm mb-6">
            The easiest way to understand this is the difference between a <strong>recipe (Program)</strong> and <strong>baking the cake (Process)</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface-muted/50 border border-strong p-5 rounded-xl">
              <span className="text-xs bg-background text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Program</span>
              <h3 className="font-bold text-primary text-lg mb-1">Passive & Static</h3>
              <p className="text-tertiary text-xs leading-relaxed">
                Compiled binary code sitting passively on your hard drive (disk). It is just a file waiting to be executed.
              </p>
            </div>
            <div className="bg-surface-muted/50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Process</span>
              <h3 className="font-bold text-indigo-600 dark:text-indigo-300 text-lg mb-1">Active & Dynamic</h3>
              <p className="text-tertiary text-xs leading-relaxed">
                A program currently under execution. It is loaded into the RAM (primary memory) and actively utilizes hardware resources like the CPU.
              </p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Process Creation Steps */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${33}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> How the OS Creates a Process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {module.notes.steps.map((step, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-4 rounded-xl flex flex-col relative">
                <div className="absolute -top-3 -left-2 bg-indigo-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-subtle shadow-sm">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-primary text-sm mb-1 mt-1">{step.title}</h3>
                <p className="text-tertiary text-[11px] leading-relaxed flex-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Architecture of Process */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${34}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Terminal className="text-emerald-600 dark:text-emerald-400" /> Process Memory Layout
            </h2>
            
            {/* Memory Stack Layout Representation */}
            <div className="bg-background border border-subtle rounded-xl p-6 flex flex-col space-y-2 max-w-sm mx-auto shadow-inner relative">
              <div className="text-center text-[10px] text-tertiary font-bold uppercase tracking-widest border-b border-subtle pb-1 mb-2">High Memory Addresses</div>
              
              {/* Stack Block */}
              <div className="bg-surface-muted border-2 border-strong rounded-lg p-3 text-center">
                <span className="font-bold text-primary text-sm block">Stack</span>
                <span className="text-[10px] text-tertiary block">Local variables & function arguments</span>
                <span className="text-[9px] text-indigo-600 dark:text-indigo-400 mt-1 block">â†“ Grows Downward â†“</span>
              </div>
              
              {/* Free Space */}
              <div className="h-8 border border-dashed border-subtle rounded-lg flex items-center justify-center text-[10px] text-tertiary">
                Shared Free Address Space
              </div>

              {/* Heap Block */}
              <div className="bg-surface-muted border-2 border-strong rounded-lg p-3 text-center">
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 mb-1 block">â†‘ Grows Upward â†‘</span>
                <span className="font-bold text-primary text-sm block">Heap</span>
                <span className="text-[10px] text-tertiary block">Dynamic allocations (malloc/new)</span>
              </div>

              {/* Data Block */}
              <div className="bg-surface-muted border border-strong rounded-lg p-2.5 text-center">
                <span className="font-bold text-primary text-sm block">Data</span>
                <span className="text-[10px] text-tertiary block">Global & static data</span>
              </div>

              {/* Text Block */}
              <div className="bg-surface-muted border border-strong rounded-lg p-2.5 text-center">
                <span className="font-bold text-primary text-sm block">Text</span>
                <span className="text-[10px] text-tertiary block">Compiled instructions (read-only)</span>
              </div>
              
              <div className="text-center text-[10px] text-tertiary font-bold uppercase tracking-widest border-t border-subtle pt-1 mt-2">Low Memory Addresses</div>
            </div>
          </section>
    </StarableBlock>

          {/* PCB Section */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${35}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Server className="text-indigo-600 dark:text-indigo-400" /> Process Control Block (PCB)
              </h2>
              <p className="text-tertiary text-xs mb-6">
                All processes are tracked by the OS in a <strong>Process Table</strong> where each entry is a <strong>PCB</strong>. Think of the PCB as the process's official ID profile.
              </p>

              {/* PCB Fields Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {module.notes.pcb.map((item, idx) => (
                  <div key={idx} className="bg-surface-muted border border-subtle p-2.5 rounded-lg">
                    <strong className="text-indigo-600 dark:text-indigo-300 block mb-0.5">{item.attr}</strong>
                    <span className="text-tertiary text-[11px] leading-tight block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Registers in PCB Context Switching */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${36}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-500/50 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-3 flex items-center gap-2">
            <Cpu className="text-indigo-600 dark:text-indigo-400" /> Deep Dive: Registers in the PCB & Context Switching
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">
            Since CPU cores rapidly cycle between multiple active processes (Time Sharing), the OS must store the execution status when swapping processes out:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="bg-surface/60 p-4 rounded-xl border border-subtle">
              <strong className="text-rose-600 dark:text-rose-400 block mb-1">Swapping Out (Pause)</strong>
              When a process's time slice expires, the OS copies all register values from the CPU registers and saves them into the process's PCB before pausing it.
            </div>
            <div className="bg-surface/60 p-4 rounded-xl border border-subtle">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">Swapping In (Resume)</strong>
              When the scheduler selects this process to execute again, the OS reads the register values from its PCB and writes them back to the CPU hardware registers, resuming execution seamlessly.
            </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 10: Process States & Queues
  if (module.id === 'states') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* State Transition Diagram */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${37}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Activity className="text-rose-600 dark:text-rose-400" /> State Transition Diagram
          </h2>
          <p className="text-tertiary text-sm mb-8 leading-relaxed">
            As a process executes, it transitions through different states. Click or hover on the states to learn more about the life cycle.
          </p>

          {/* Graphical State Flowchart (Authentic Transition Diagram) */}
          <div className="bg-background p-6 rounded-xl border border-subtle flex justify-center items-center shadow-inner overflow-x-auto">
            <svg viewBox="0 0 800 320" className="w-full min-w-[700px] text-xs font-semibold">
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                {/* Arrow Marker Definitions */}
                <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                </marker>
                <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
                </marker>
                <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                </marker>
                <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Connections (Lines and Curves) */}
              
              {/* New -> Ready (Admitted) */}
              <path d="M 125 100 L 202 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow-slate)" />
              <text x="165" y="90" textAnchor="middle" fill="#94a3b8" className="font-mono text-[10px]">admitted</text>

              {/* Ready -> Running (Scheduler Dispatch) */}
              <path d="M 312 90 L 480 90" stroke="#6366f1" strokeWidth="2" fill="none" markerEnd="url(#arrow-indigo)" />
              <text x="396" y="80" textAnchor="middle" fill="#a5b4fc" className="font-mono text-[10px]">scheduler dispatch</text>

              {/* Running -> Ready (Interrupt Curve) */}
              <path d="M 480 110 Q 396 150 312 110" stroke="#f43f5e" strokeWidth="2" fill="none" markerEnd="url(#arrow-rose)" />
              <text x="396" y="145" textAnchor="middle" fill="#fda4af" className="font-mono text-[10px]">interrupt</text>

              {/* Running -> Terminated (Exit) */}
              <path d="M 590 100 L 667 100" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow-emerald)" />
              <text x="630" y="90" textAnchor="middle" fill="#6ee7b7" className="font-mono text-[10px]">exit</text>

              {/* Running -> Waiting (I/O or event wait) */}
              <path d="M 525 125 L 460 212" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-amber)" />
              <text x="515" y="175" textAnchor="start" fill="#fcd34d" className="font-mono text-[10px]">I/O or event wait</text>

              {/* Waiting -> Ready (I/O or event completion) */}
              <path d="M 340 215 L 275 127" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow-emerald)" />
              <text x="280" y="175" textAnchor="end" fill="#6ee7b7" className="font-mono text-[10px]">I/O or event completion</text>

              {/* Nodes (States) */}
              
              {/* New Node */}
              <g className="cursor-pointer group">
                <rect x="35" y="75" width="90" height="50" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" className="transition-colors group-hover:fill-slate-800" />
                <text x="80" y="100" textAnchor="middle" alignmentBaseline="central" fill="#f8fafc" className="font-bold">NEW</text>
                <text x="80" y="115" textAnchor="middle" fill="#64748b" className="text-[8px]">Admitted next</text>
              </g>

              {/* Ready Node */}
              <g className="cursor-pointer group">
                <rect x="210" y="75" width="100" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="transition-colors group-hover:fill-indigo-950" />
                <text x="260" y="100" textAnchor="middle" alignmentBaseline="central" fill="#e0e7ff" className="font-bold">READY</text>
                <text x="260" y="115" textAnchor="middle" fill="#818cf8" className="text-[8px]">In RAM / Wait CPU</text>
              </g>

              {/* Running Node */}
              <g className="cursor-pointer group">
                <rect x="490" y="75" width="100" height="50" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" className="transition-colors group-hover:fill-rose-950" />
                <text x="540" y="100" textAnchor="middle" alignmentBaseline="central" fill="#ffe4e6" className="font-bold">RUNNING</text>
                <text x="540" y="115" textAnchor="middle" fill="#fb7185" className="text-[8px]">Executing instructions</text>
              </g>

              {/* Terminated Node */}
              <g className="cursor-pointer group">
                <rect x="675" y="75" width="90" height="50" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" className="transition-colors group-hover:fill-emerald-950" />
                <text x="720" y="100" textAnchor="middle" alignmentBaseline="central" fill="#d1fae5" className="font-bold">TERMINATED</text>
                <text x="720" y="115" textAnchor="middle" fill="#34d399" className="text-[8px]">De-allocated</text>
              </g>

              {/* Waiting Node */}
              <g className="cursor-pointer group">
                <rect x="340" y="215" width="120" height="50" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" className="transition-colors group-hover:fill-amber-950" />
                <text x="400" y="240" textAnchor="middle" alignmentBaseline="central" fill="#fef3c7" className="font-bold">WAITING</text>
                <text x="400" y="255" textAnchor="middle" fill="#fbbf24" className="text-[8px]">Blocked on I/O</text>
              </g>
            </svg>
          </div>
        </section>
    </StarableBlock>

        {/* Process States Descriptions */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${38}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6">The 5 Process States</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {module.notes.statesList.map((state, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-4 rounded-xl">
                <h3 className="font-bold text-primary text-sm mb-2 pb-1 border-b border-strong">{state.name}</h3>
                <p className="text-tertiary text-[11px] leading-relaxed">{state.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Process Queues & Schedulers */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Queues */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${39}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Layers className="text-indigo-600 dark:text-indigo-400" /> Process Queues
              </h2>
              <div className="space-y-4">
                {module.notes.queues.map((q, idx) => (
                  <div key={idx} className="bg-surface-muted/50 border border-strong p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-indigo-600 dark:text-indigo-300 text-sm">{q.name}</h3>
                      <span className="text-[9px] bg-background text-tertiary px-2 py-0.5 rounded font-mono">{q.memory}</span>
                    </div>
                    <p className="text-tertiary text-xs mb-2 leading-relaxed">{q.desc}</p>
                    <div className="text-[10px] text-tertiary">
                      <strong>Scheduler:</strong> {q.scheduler}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </StarableBlock>

          {/* Schedulers & Dispatcher */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${40}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Cpu className="text-emerald-600 dark:text-emerald-400" /> Schedulers & Dispatchers
              </h2>
              <div className="space-y-4">
                {module.notes.schedulerDetails.map((detail, idx) => (
                  <div key={idx} className="bg-surface-muted border border-subtle p-3 rounded-lg">
                    <strong className="text-emerald-600 dark:text-emerald-400 text-xs block mb-1">{detail.term}</strong>
                    <p className="text-tertiary text-[11px] leading-relaxed">{detail.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Quick Review Card */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${41}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-2">Interview Checklist</h2>
          <ul className="list-disc list-inside text-secondary text-sm space-y-1">
            <li><strong>Waiting State Destination:</strong> After I/O completion, a process goes back to the <strong>Ready Queue</strong> (NOT straight to the Running state).</li>
            <li><strong>Multi-programming:</strong> The <strong>Long-Term Scheduler (LTS)</strong> determines how many processes occupy RAM (Degree of Multi-programming).</li>
            <li><strong>STS vs. Dispatcher:</strong> The STS <strong>decides</strong> who gets CPU time; the Dispatcher <strong>executes</strong> the actual context switch.</li>
          </ul>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 11: Swapping & Context-Switching
  if (module.id === 'swap') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Swapping (MTS) */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${42}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
            <FolderOpen className="text-indigo-600 dark:text-indigo-400" /> Swapping & Memory Management
          </h2>
          <p className="text-tertiary text-sm mb-6 leading-relaxed">
            When Main Memory (RAM) becomes full (overcommitted), the OS must free up space by moving processes to disk. This is managed by the <strong>Medium-Term Scheduler (MTS)</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface-muted/50 border border-strong p-5 rounded-xl">
              <span className="text-xs bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Swap-Out</span>
              <h3 className="font-bold text-primary text-base mb-1">RAM âž” Secondary Storage (Disk)</h3>
              <p className="text-tertiary text-xs leading-relaxed">
                Kicks a partially executed, inactive process out of RAM to the hard drive, freeing up memory space for active or higher-priority processes. Directly decreases the degree of multi-programming.
              </p>
            </div>
            <div className="bg-surface-muted/50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Swap-In</span>
              <h3 className="font-bold text-indigo-600 dark:text-indigo-300 text-base mb-1">Secondary Storage (Disk) âž” RAM</h3>
              <p className="text-tertiary text-xs leading-relaxed">
                Brings the swapped-out process back from disk into RAM when space becomes available, allowing it to resume execution exactly where it left off.
              </p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Context Switching & Overhead */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${43}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Cpu className="text-rose-600 dark:text-rose-400" /> Context-Switching (Pure Overhead)
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 bg-surface-muted/30 border border-strong p-5 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-primary text-base mb-2">How Context-Switching Works:</h3>
                <ol className="list-decimal list-inside text-xs text-tertiary space-y-2 leading-relaxed">
                  <li>The CPU stops executing <strong>Process A</strong> due to an interrupt (e.g. time slice expiration).</li>
                  <li>The kernel copies CPU hardware register states and saves them into <strong>Process A's PCB</strong>.</li>
                  <li>The kernel selects <strong>Process B</strong> from the Ready Queue and loads its saved register values from its <strong>PCB</strong> back into CPU registers.</li>
                  <li>Control of the CPU is passed to the dispatcher, and Process B resumes execution.</li>
                </ol>
              </div>
            </div>

            <div className="w-full lg:w-80 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-6 rounded-xl flex flex-col justify-between">
              <div>
                <strong className="text-red-600 dark:text-red-400 text-sm block mb-1">Why is it "Pure Overhead"?</strong>
                <p className="text-red-200/80 text-xs leading-relaxed">
                  While context switching is happening, the CPU is not doing any actual application or user-facing workload. It is purely OS administrative task work.
                </p>
              </div>
              <div className="mt-4 text-[10px] text-red-600 dark:text-red-300 font-mono italic">
                *Switching speed depends on memory speed, number of registers, and hardware configurations.
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Orphan vs Zombie Process Comparison */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${44}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Activity className="text-amber-600 dark:text-amber-400" /> Orphan vs. Zombie Processes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Orphan */}
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-primary text-lg">Orphan Process</h3>
                  <span className="text-[10px] bg-background text-sky-600 dark:text-sky-300 px-2 py-0.5 rounded font-mono font-bold">Parent Dead / Child Alive</span>
                </div>
                <p className="text-tertiary text-xs leading-relaxed mb-4">
                  Occurs when a parent process finishes executing or crashes, leaving its child process actively running.
                </p>
                <div className="bg-background p-3 rounded-lg border border-subtle text-[11px]">
                  <strong className="text-sky-600 dark:text-sky-400 block mb-0.5">OS Remedy: Adoption</strong>
                  Orphan processes are automatically adopted by the <code className="text-sky-600 dark:text-sky-300">init</code> process (PID 1, the root process of the OS).
                </div>
              </div>
            </div>

            {/* Zombie */}
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-primary text-lg">Zombie (Defunct) Process</h3>
                  <span className="text-[10px] bg-background text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold">Child Dead / Parent Alive</span>
                </div>
                <p className="text-tertiary text-xs leading-relaxed mb-4">
                  A child process that has finished execution but still takes up an entry (a "nametag" or PCB record) in the OS Process Table.
                </p>
                <div className="bg-background p-3 rounded-lg border border-subtle text-[11px]">
                  <strong className="text-amber-600 dark:text-amber-400 block mb-0.5">OS Remedy: Reaping</strong>
                  The parent must read the child's exit status using <code className="text-amber-600 dark:text-amber-300">wait()</code>. Once completed, the zombie is deleted. This is known as **reaping the zombie**.
                </div>
              </div>
            </div>

          </div>
        </section>
    </StarableBlock>

        {/* Analogy Section */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${45}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-8 shadow-sm text-left">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" /> Mental Model: The Restaurant Kitchen Analogy
          </h2>
          <div className="space-y-4 text-sm text-secondary leading-relaxed">
            <p className="text-base font-medium">Imagine your computer is a busy restaurant:</p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li><strong>The CPU</strong> is the <strong>Head Chef</strong>.</li>
              <li><strong>The RAM</strong> is the <strong>Kitchen Counter</strong>.</li>
              <li><strong>The Hard Drive</strong> is the <strong>Pantry/Fridge</strong>.</li>
              <li><strong>A Process</strong> is a <strong>Dish/Order</strong> being prepared.</li>
            </ul>
            
            <div className="bg-surface/60 p-4 rounded-xl border border-subtle hover:border-strong transition-colors">
              <strong className="text-rose-600 dark:text-rose-400 block mb-2 text-base">1. Context-Switching (Switching between orders)</strong>
              The Chef is cooking a Burger. A VIP Pizza order comes in. The Chef writes down exactly what step they were on for the Burger on a sticky note (saving state), cooks the Pizza, and then resumes the Burger using the sticky note. That action of swapping notes is Context-Switching.
            </div>

            <div className="bg-surface/60 p-4 rounded-xl border border-subtle hover:border-strong transition-colors">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-2 text-base">2. Swapping (Making room on the counter)</strong>
              The Counter (RAM) is full of ingredients. The manager moves ingredients for a non-urgent Soup to the Fridge (Hard Drive) to clear space (Swap-Out). Later, they bring the Soup ingredients back to the Counter when there is room (Swap-In).
            </div>

            <div className="bg-surface/60 p-4 rounded-xl border border-subtle hover:border-strong transition-colors">
              <strong className="text-sky-600 dark:text-sky-400 block mb-2 text-base">3. Orphan Process (Parent leaves)</strong>
              A Master Chef hires an Assistant to chop onions, but then the Master Chef's shift ends and they go home. The Assistant is left chopping onions with no boss. The Restaurant Manager (OS 'init' process) steps in to adopt the Assistant.
            </div>

            <div className="bg-surface/60 p-4 rounded-xl border border-subtle hover:border-strong transition-colors">
              <strong className="text-amber-600 dark:text-amber-400 block mb-2 text-base">4. Zombie Process (Parent ignores)</strong>
              The Assistant finishes boiling water and says "I'm done!", but the Master Chef is busy and ignores them. The Assistant is dead (finished) but still standing there taking up space waiting to be acknowledged. Once acknowledged, the Zombie is "reaped".
            </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 12: Intro to Process Scheduling
  if (module.id === 'scheduling') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro to Scheduling */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${46}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Activity className="text-indigo-600 dark:text-indigo-400" /> Process Scheduling Fundamentals
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.scheduling.map((item, idx) => (
              <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
                <h3 className="font-bold text-primary text-base mb-2">{item.term}</h3>
                <p className="text-tertiary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-primary mt-10 mb-6 flex items-center gap-2">
            <BookOpen className="text-emerald-600 dark:text-emerald-400" /> Preemptive vs. Non-Preemptive Scheduling
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-2">
            {module.notes.types.map((type, idx) => {
              const isPreemptive = type.type.toLowerCase().includes('preemptive') && !type.type.toLowerCase().includes('non-');
              return (
                <div key={idx} className={`bg-surface-muted/40 border border-strong p-6 rounded-xl flex flex-col justify-between ${isPreemptive ? 'hover:border-emerald-500' : 'hover:border-rose-500'} transition-colors`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {isPreemptive ? <CheckSquare className="text-emerald-600 dark:text-emerald-400" size={20} /> : <Power className="text-rose-600 dark:text-rose-400" size={20} />}
                      <h4 className={`font-bold text-xl ${isPreemptive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{type.type}</h4>
                    </div>
                    <p className="text-secondary text-sm leading-relaxed mb-6">{type.desc}</p>
                  </div>
                  
                  <div className="bg-background p-4 rounded-lg border border-subtle text-sm mt-4">
                    <strong className={`block mb-2 text-xs uppercase tracking-wider font-bold ${isPreemptive ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>Mental Model (Analogy)</strong>
                    {isPreemptive ? (
                      <span className="text-tertiary leading-relaxed">
                        <strong>The "Fairness" Approach:</strong> You are reading a book, but your boss calls with an urgent task. You put a bookmark in the book (Save Context), handle the call, and resume reading later. 
                        <br/><br/><span className="text-emerald-600 dark:text-emerald-400/80 italic font-medium">The OS can forcefully pause the process if its time expires or a higher priority task arrives.</span>
                      </span>
                    ) : (
                      <span className="text-tertiary leading-relaxed">
                        <strong>The "Do Not Disturb" Approach:</strong> You are in a public restroom. Even if someone outside has a massive emergency, they MUST wait until you unlock the door and come out. 
                        <br/><br/><span className="text-rose-600 dark:text-rose-400/80 italic font-medium">The OS CANNOT pause the process. The process keeps the CPU until it voluntarily finishes.</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
    </StarableBlock>

        {/* Goals & Metrics */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${47}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <CheckSquare className="text-rose-600 dark:text-rose-400" /> Goals of CPU Scheduling
              </h2>
              <ul className="space-y-3">
                {module.notes.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 p-1 rounded-full shrink-0">
                      <CheckSquare size={14} />
                    </div>
                    <span className="text-secondary font-medium text-sm">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${48}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <BookOpen className="text-sky-600 dark:text-sky-400" /> Key Scheduling Metrics
            </h2>
            <div className="space-y-3 text-sm">
              {module.notes.metrics.map((metric, idx) => (
                <div key={idx} className="bg-surface-muted/40 p-3 rounded-lg border border-strong">
                  <strong className="text-sky-600 dark:text-sky-300">{metric.term}: </strong>
                  <span className="text-tertiary">{metric.desc}</span>
                </div>
              ))}
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* FCFS & Convoy Effect */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${49}`}>
      <section className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-8 shadow-sm text-left">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.fcfs.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">
            {module.notes.fcfs.desc}
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">The Convoy Effect</h3>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.fcfs.convoyEffect}</p>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 13: CPU Scheduling (SJF, Priority, RR)
  if (module.id === 'sjf_priority_rr') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Shortest Job First (SJF) */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${50}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Activity className="text-indigo-600 dark:text-indigo-400" /> Shortest Job First (SJF)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <h3 className="font-bold text-primary text-lg mb-3">Non-Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.sjf.nonPreemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-surface-muted text-secondary p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-muted/40 border-l-4 border-emerald-500 p-5 rounded-r-xl">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-3">Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.sjf.preemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Priority Scheduling */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${51}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-rose-600 dark:text-rose-400" /> Priority Scheduling
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <h3 className="font-bold text-primary text-lg mb-3">Non-Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.priority.nonPreemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-surface-muted text-secondary p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <h3 className="font-bold text-primary text-lg mb-3">Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.priority.preemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 text-lg mb-2">Solution to Starvation: {module.notes.priority.solution.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.priority.solution.desc}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Round Robin (RR) */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${52}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <RotateCcw className="text-sky-600 dark:text-sky-400" /> Round Robin Scheduling (RR)
          </h2>
          <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl mb-6">
            <ul className="space-y-3">
              {module.notes.rr.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 p-1 rounded-full shrink-0"><CheckSquare size={14} /></div>
                  <span className="text-secondary text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-background p-6 rounded-xl border border-subtle flex flex-col items-center shadow-inner overflow-x-auto text-sm">
             <h3 className="text-tertiary font-bold tracking-widest uppercase mb-4">RR Execution Flow</h3>
             <div className="flex flex-col items-center space-y-3 text-center">
               <div className="bg-surface-muted border-2 border-sky-500 rounded-full px-6 py-2 font-bold text-sky-600 dark:text-sky-300">Ready Queue</div>
               <ArrowDownUp size={20} className="text-tertiary" />
               <div className="bg-surface-muted border border-strong rounded-lg px-4 py-2 text-secondary">Pick a process (FCFS)</div>
               <ArrowDownUp size={20} className="text-tertiary" />
               <div className="bg-indigo-100 dark:bg-indigo-900/40 border-2 border-indigo-500 rounded-lg px-6 py-3 font-bold text-indigo-600 dark:text-indigo-300 transform rotate-45 flex items-center justify-center w-24 h-24">
                 <span className="-rotate-45 font-bold tracking-widest">BT &lt; TQ?</span>
               </div>
               
               <div className="flex gap-16 mt-2 relative w-full justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">Yes</span>
                    <div className="bg-surface-muted border border-strong rounded-lg px-4 py-2 text-secondary">Execute till termination</div>
                    <ArrowDownUp size={20} className="text-tertiary my-2" />
                    <div className="bg-surface-muted border border-strong rounded-lg px-4 py-2 text-secondary">Terminate state</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-rose-600 dark:text-rose-400 font-bold mb-2">No</span>
                    <div className="bg-surface-muted border border-strong rounded-lg px-4 py-2 text-secondary">Execute for TQ</div>
                    <ArrowDownUp size={20} className="text-tertiary my-2" />
                    <div className="bg-surface-muted border border-strong rounded-lg px-4 py-2 text-secondary text-xs">TQ expires &rarr; Back to Ready Queue</div>
                  </div>
               </div>
             </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 14: MLQ & MLFQ
  if (module.id === 'mlq_mlfq') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* MLQ */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${53}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Layers className="text-rose-600 dark:text-rose-400" /> {module.notes.mlq.title}
            </h2>
            <p className="text-rose-600 dark:text-rose-400 text-sm font-medium italic mt-1">{module.notes.mlq.subtitle}</p>
          </div>
          
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.mlq.desc}</p>
          
          <div className="space-y-4 mb-8">
            {module.notes.mlq.queues.map((q, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-primary text-base">{q.name}</h3>
                  <p className="text-tertiary text-xs mt-1 leading-relaxed">{q.desc}</p>
                </div>
                <div className="bg-background px-3 py-1 rounded text-xs font-mono text-rose-600 dark:text-rose-300 shrink-0 border border-subtle">
                  Priority: {q.priority}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-muted/50 p-5 rounded-xl border border-strong mb-6">
             <h3 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">How it works:</h3>
             <ul className="space-y-2">
                {module.notes.mlq.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-surface-muted text-secondary p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-secondary text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-red-600 dark:text-red-400 text-lg mb-2">{module.notes.mlq.problem.title}</h3>
            <p className="text-red-200/80 text-sm leading-relaxed">{module.notes.mlq.problem.desc}</p>
          </div>
        </section>
    </StarableBlock>

        {/* MLFQ */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${54}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Activity className="text-emerald-600 dark:text-emerald-400" /> {module.notes.mlfq.title}
            </h2>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium italic mt-1">{module.notes.mlfq.subtitle}</p>
          </div>

          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.mlfq.desc}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {module.notes.mlfq.features.map((feature, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
                <h3 className="font-bold text-emerald-600 dark:text-emerald-300 text-base mb-2">{feature.title}</h3>
                <p className="text-tertiary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-lg mb-2">Why MLFQ is the Ultimate Winner</h3>
            <p className="text-emerald-200/80 text-sm leading-relaxed">{module.notes.mlfq.summary}</p>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 15: Intro to Concurrency
  if (module.id === 'concurrency') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* What is Concurrency? */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${55}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            <strong className="text-indigo-600 dark:text-indigo-300 block mb-1 text-sm">Example: MS Word</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.intro.example}</p>
          </div>
        </section>
    </StarableBlock>

        {/* TCB */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${56}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Server className="text-emerald-600 dark:text-emerald-400" /> {module.notes.tcb.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.tcb.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-2 text-sm flex items-center gap-2"><CheckSquare size={16}/> Saved in TCB</strong>
              <p className="text-secondary text-sm leading-relaxed">{module.notes.tcb.saved}</p>
            </div>
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <strong className="text-rose-600 dark:text-rose-400 block mb-2 text-sm flex items-center gap-2"><Power size={16}/> NOT Saved in TCB</strong>
              <p className="text-secondary text-sm leading-relaxed">{module.notes.tcb.notSaved}</p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* The Trick Question */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${57}`}>
      <section className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <Activity className="text-rose-600 dark:text-rose-400" /> {module.notes.trickQuestion.title}
          </h2>
          <div className="bg-surface/80 p-5 rounded-xl border border-subtle mb-6 text-center">
            <p className="text-primary text-lg font-medium italic mb-4">"{module.notes.trickQuestion.question}"</p>
            <span className="bg-rose-100 dark:bg-rose-900 text-white font-bold tracking-widest uppercase px-6 py-2 rounded-lg text-xl">{module.notes.trickQuestion.answer}</span>
          </div>
          <p className="text-secondary text-sm leading-relaxed">{module.notes.trickQuestion.explanation}</p>
        </section>
    </StarableBlock>

        {/* Benefits */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${58}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <CheckSquare className="text-sky-600 dark:text-sky-400" /> Benefits of Multi-Threading (Even on a single CPU)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
                <strong className="text-sky-600 dark:text-sky-300 block mb-2 text-sm">{idx + 1}. {benefit.title}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 16: Critical Section Problem
  if (module.id === 'critical_section') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Critical Section */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${59}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Database className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <div key={idx} className="bg-surface-muted/40 p-4 rounded-xl border-l-2 border-indigo-500">
                <strong className="text-indigo-600 dark:text-indigo-300 block mb-1 text-sm">{point.label}</strong>
                <span className="text-tertiary text-sm block mt-1">{point.text}</span>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Race Condition */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${60}`}>
      <section className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-600 dark:text-rose-400" /> {module.notes.raceCondition.title}
          </h2>
          <p className="text-rose-200/90 text-sm leading-relaxed mb-4">{module.notes.raceCondition.desc}</p>
          <div className="bg-surface/80 p-5 rounded-xl border border-rose-200 dark:border-rose-900 text-sm text-secondary italic">
            "{module.notes.raceCondition.example}"
          </div>
        </section>
    </StarableBlock>

        {/* Solutions */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${61}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600 dark:text-emerald-400" /> {module.notes.solutions.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.solutions.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.solutions.methods.map((method, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <strong className="text-emerald-600 dark:text-emerald-300 block mb-1 text-base">{method.name}</strong>
                  {method.analogy && (
                    <span className="text-emerald-500/80 font-mono text-xs italic block mb-3 border-b border-strong pb-2">Analogy: {method.analogy}</span>
                  )}
                  <p className="text-secondary text-xs leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Disadvantages */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${62}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-amber-600 dark:text-amber-400" /> {module.notes.disadvantages.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.disadvantages.desc}</p>
          <div className="space-y-3">
            {module.notes.disadvantages.list.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-surface-muted/40 p-4 rounded-xl border border-strong">
                <div className="mt-1"><Skull size={18} className="text-amber-500/70" /></div>
                <div>
                  <strong className="text-amber-600 dark:text-amber-300 block mb-1 text-sm">{item.name}</strong>
                  <p className="text-tertiary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Global Var & Peterson Failures */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${63}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-rose-600 dark:text-rose-400" /> {module.notes.globalVarFail.title}
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.globalVarFail.desc}</p>
              <div className="space-y-2 mb-6">
                {module.notes.globalVarFail.steps.map((step, idx) => (
                  <div key={idx} className="bg-surface-muted/50 p-3 rounded-lg border border-strong text-sm">
                    <span className="text-rose-600 dark:text-rose-300 font-mono text-xs block mb-1">{step.time}</span>
                    <span className="text-secondary">{step.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-200 text-sm font-medium italic">
              {module.notes.globalVarFail.takeaway}
            </div>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${64}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-amber-600 dark:text-amber-400" /> {module.notes.petersonFail.title}
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.petersonFail.desc}</p>
              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 mb-4">
                <strong className="text-amber-600 dark:text-amber-400 block mb-1 text-sm">Why it fails:</strong>
                <p className="text-secondary text-sm leading-relaxed">{module.notes.petersonFail.whyItFails}</p>
              </div>
              <div className="bg-surface-muted/50 p-4 rounded-xl border border-strong text-sm text-tertiary italic mb-6">
                "{module.notes.petersonFail.example}"
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 text-amber-200 text-sm font-medium italic">
              {module.notes.petersonFail.takeaway}
            </div>
          </section>
    </StarableBlock>
        </div>

      </div>
    );
  }

  // Render Module 17: Semaphores
  if (module.id === 'semaphores') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Busy Waiting */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${65}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-600 dark:text-rose-400" /> {module.notes.busyWaiting.title}
          </h2>
          <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-4">
            <p className="text-rose-200/90 text-sm leading-relaxed">{module.notes.busyWaiting.issue}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-emerald-200/90 text-sm leading-relaxed">{module.notes.busyWaiting.solution}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Condition Variables */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${66}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-indigo-600 dark:text-indigo-400" /> {module.notes.conditionVars.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.conditionVars.desc}</p>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 text-indigo-200/90 text-sm italic">
            <strong className="text-indigo-600 dark:text-indigo-300 block mb-2 text-sm not-italic">Analogy:</strong>
            {module.notes.conditionVars.analogy}
          </div>
        </section>
    </StarableBlock>

        {/* Semaphores */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${67}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <Layers className="text-amber-600 dark:text-amber-400" /> {module.notes.semaphoreTypes.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.semaphoreTypes.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm flex items-center gap-2"><Power size={16}/> Binary Semaphore (0 or 1)</strong>
              <p className="text-tertiary text-xs leading-relaxed">{module.notes.semaphoreTypes.binary}</p>
            </div>
            <div className="bg-surface-muted/40 border border-strong p-5 rounded-xl">
              <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm flex items-center gap-2"><Server size={16}/> Counting Semaphore (Any #)</strong>
              <p className="text-tertiary text-xs leading-relaxed">{module.notes.semaphoreTypes.counting}</p>
            </div>
          </div>

          <h3 className="font-bold text-primary mb-4 text-base">{module.notes.howItWorks.title}</h3>
          <div className="space-y-3">
            {module.notes.howItWorks.points.map((point, idx) => (
              <div key={idx} className="bg-surface-muted/50 p-4 rounded-xl flex gap-4 items-start border border-strong hover:border-amber-500/50 transition-colors">
                <div className="bg-background px-3 py-1 rounded text-xs font-mono text-amber-600 dark:text-amber-400 shrink-0 border border-subtle mt-0.5">
                  {point.action}
                </div>
                <p className="text-secondary text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Hardware Locks */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${68}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-600 dark:text-emerald-400" /> {module.notes.atomicProtection.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.atomicProtection.desc}</p>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-emerald-200/90 text-sm leading-relaxed">{module.notes.atomicProtection.hardware}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Nested Locks */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${69}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <Layers className="text-sky-600 dark:text-sky-400" /> {module.notes.nestedLocks.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.nestedLocks.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 p-4 rounded-xl">
              <strong className="text-sky-600 dark:text-sky-300 block mb-1 text-sm">The Library</strong>
              <p className="text-sky-200/80 text-xs leading-relaxed">{module.notes.nestedLocks.analogy.library}</p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 p-4 rounded-xl">
              <strong className="text-sky-600 dark:text-sky-300 block mb-1 text-sm">The Stapler</strong>
              <p className="text-sky-200/80 text-xs leading-relaxed">{module.notes.nestedLocks.analogy.stapler}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-primary mb-3 text-sm">{module.notes.nestedLocks.codeTitle}</h3>
            <pre className="bg-background p-4 rounded-xl border border-subtle text-xs text-sky-600 dark:text-sky-300 font-mono overflow-x-auto">
              {module.notes.nestedLocks.code}
            </pre>
          </div>

          <div className="bg-surface-muted/40 p-5 rounded-xl border border-strong">
            <strong className="text-primary block mb-3 text-sm">The Golden Rule to Remember:</strong>
            <ul className="space-y-2">
              {module.notes.nestedLocks.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-tertiary items-start">
                  <span className="text-sky-600 dark:text-sky-400 font-bold mt-0.5">â€¢</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 20: Classic Problems
  if (module.id === 'classic_problems') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Dining Philosophers */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${70}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <User className="text-amber-600 dark:text-amber-400" /> {module.notes.diningPhilosophers.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.diningPhilosophers.desc}</p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {Object.entries(module.notes.diningPhilosophers.translation).map(([key, val], idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong p-4 rounded-xl">
                <strong className="text-amber-600 dark:text-amber-300 block mb-1 text-sm capitalize">{key}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{val}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-6">
            <h3 className="font-bold text-rose-600 dark:text-rose-400 mb-2">{module.notes.diningPhilosophers.deadlock.title}</h3>
            <p className="text-rose-200/90 text-sm mb-3">{module.notes.diningPhilosophers.deadlock.desc}</p>
            <ol className="list-decimal list-inside text-rose-600 dark:text-rose-300/80 text-sm space-y-1">
              {module.notes.diningPhilosophers.deadlock.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2"><CheckSquare size={18}/> {module.notes.diningPhilosophers.enhancements.title}</h3>
          <div className="space-y-3">
            {module.notes.diningPhilosophers.enhancements.points.map((point, idx) => (
              <div key={idx} className="bg-surface-muted/50 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/30">
                <strong className="text-emerald-600 dark:text-emerald-300 block mb-1 text-sm">{point.name}</strong>
                <p className="text-tertiary text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Producer/Consumer */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${71}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-sky-600 dark:text-sky-400" /> {module.notes.producerConsumer.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.producerConsumer.desc}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {module.notes.producerConsumer.setup.map((item, idx) => (
              <div key={idx} className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 p-4 rounded-xl">
                <strong className="text-sky-600 dark:text-sky-300 block mb-1 text-sm">{item.name}</strong>
                <p className="text-sky-200/80 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-primary mb-3 text-sm">The 3 Semaphores Used:</h3>
          <div className="space-y-2 mb-6">
            {module.notes.producerConsumer.semaphores.map((sem, idx) => (
              <div key={idx} className="bg-surface-muted/40 p-3 rounded-lg border border-strong text-sm flex gap-3">
                <span className="text-sky-600 dark:text-sky-400 font-mono font-bold w-32 shrink-0">{sem.name}</span>
                <span className="text-secondary">{sem.desc}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 text-sm">Producer Code</h3>
              <pre className="bg-background p-4 rounded-xl border border-subtle text-xs text-emerald-600 dark:text-emerald-300 font-mono overflow-x-auto">
                {module.notes.producerConsumer.producerCode}
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-rose-600 dark:text-rose-400 mb-2 text-sm">Consumer Code</h3>
              <pre className="bg-background p-4 rounded-xl border border-subtle text-xs text-rose-600 dark:text-rose-300 font-mono overflow-x-auto">
                {module.notes.producerConsumer.consumerCode}
              </pre>
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/30 p-5 rounded-xl border border-sky-200 dark:border-sky-900/50 text-sky-200 text-sm italic">
            <strong className="text-sky-600 dark:text-sky-400 block mb-1 not-italic">Key Takeaway:</strong>
            {module.notes.producerConsumer.takeaway}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 21: Deadlock Part 1
  if (module.id === 'deadlock_part_1') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Definition */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${72}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-600 dark:text-rose-400" /> {module.notes.definition.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.definition.desc}</p>
          <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-200 text-sm italic">
            <strong className="text-rose-600 dark:text-rose-300 block mb-1 not-italic">Example:</strong>
            {module.notes.definition.example}
          </div>
        </section>
    </StarableBlock>

        {/* 4 Conditions */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${73}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-amber-600 dark:text-amber-400" /> {module.notes.conditions.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.conditions.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.conditions.list.map((cond, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-amber-200 dark:border-amber-900/30 p-5 rounded-xl hover:border-amber-500/50 transition-colors">
                <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm">{idx + 1}. {cond.name}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{cond.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* How OS Handles */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${74}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <Settings className="text-sky-600 dark:text-sky-400" /> {module.notes.handling.title}
          </h2>
          <div className="space-y-3">
            {module.notes.handling.methods.map((method, idx) => (
              <div key={idx} className="bg-sky-50 dark:bg-sky-950/10 p-4 rounded-xl border border-sky-200 dark:border-sky-900/30 flex flex-col md:flex-row gap-3 md:items-center">
                <div className="bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded text-xs font-mono text-sky-600 dark:text-sky-400 shrink-0 border border-sky-200 dark:border-sky-900/50">
                  Method {idx + 1}
                </div>
                <div>
                  <strong className="text-sky-600 dark:text-sky-300 block text-sm">{method.name}</strong>
                  <p className="text-tertiary text-sm leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Prevention */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${75}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-600 dark:text-emerald-400" /> {module.notes.prevention.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.prevention.desc}</p>
          <div className="space-y-4">
            {module.notes.prevention.methods.map((method, idx) => (
              <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/10 border-l-4 border-emerald-500 p-5 rounded-r-xl">
                <strong className="text-emerald-600 dark:text-emerald-300 block mb-2 text-sm">{method.name}</strong>
                <p className="text-secondary text-sm leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 22: Deadlock Part 2
  if (module.id === 'deadlock_part_2') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Avoidance */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${76}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-600 dark:text-emerald-400" /> {module.notes.avoidance.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.avoidance.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.avoidance.states.map((state, idx) => (
              <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 p-5 rounded-xl">
                <strong className={`block mb-2 text-sm ${idx === 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-400'}`}>{state.name}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{state.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 text-emerald-200 text-sm font-medium">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">The Golden Rule:</span> {module.notes.avoidance.goldenRule}
          </div>
        </section>
    </StarableBlock>

        {/* Banker's Algorithm */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${77}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <Settings className="text-sky-600 dark:text-sky-400" /> {module.notes.banker.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.banker.desc}</p>
          <div className="bg-sky-50 dark:bg-sky-950/10 p-5 rounded-xl border border-sky-200 dark:border-sky-900/30">
            <ol className="list-decimal list-inside space-y-3 text-secondary text-sm">
              {module.notes.banker.steps.map((step, idx) => (
                <li key={idx} className="pl-2">
                  <span className={idx === 2 ? "text-sky-600 dark:text-sky-300 italic" : ""}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
    </StarableBlock>

        {/* Detection */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${78}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <Activity className="text-amber-600 dark:text-amber-400" /> {module.notes.detection.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.detection.desc}</p>
          <div className="space-y-4">
            <div className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
              <p className="text-secondary text-sm leading-relaxed"><span className="text-amber-600 dark:text-amber-300 font-bold">Single Instance:</span> {module.notes.detection.single.split(':')[1]}</p>
            </div>
            <div className="bg-surface-muted/40 p-4 rounded-xl border border-strong">
              <p className="text-secondary text-sm leading-relaxed"><span className="text-amber-600 dark:text-amber-300 font-bold">Multiple Instance:</span> {module.notes.detection.multiple.split(':')[1]}</p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Recovery */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${79}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-rose-600 dark:text-rose-400" /> {module.notes.recovery.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.recovery.desc}</p>
          
          <div className="space-y-6">
            {module.notes.recovery.methods.map((method, idx) => (
              <div key={idx} className="bg-rose-50 dark:bg-rose-950/20 p-5 rounded-xl border border-rose-200 dark:border-rose-900/50">
                <strong className="text-rose-600 dark:text-rose-300 block mb-3 text-sm">{method.name}</strong>
                {method.sub ? (
                  <div className="space-y-3">
                    {method.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="bg-background/50 p-3 rounded-lg border border-subtle">
                        <span className="text-rose-600 dark:text-rose-400 text-xs font-bold block mb-1">{subItem.type}</span>
                        <p className="text-tertiary text-xs leading-relaxed">{subItem.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary text-sm leading-relaxed bg-background/50 p-4 rounded-lg border border-subtle">{method.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 24: Memory Management
  if (module.id === 'memory_management') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">

        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${80}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <Database className="text-sky-600 dark:text-sky-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.intro.desc}</p>
          <div className="bg-sky-50 dark:bg-sky-950/30 border-l-4 border-sky-500 p-4 rounded-r-xl">
            <p className="text-sky-200 text-sm"><span className="font-bold text-sky-600 dark:text-sky-300">The Goal:</span> {module.notes.intro.goal}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Logical vs Physical Address */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${81}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-amber-600 dark:text-amber-400" /> {module.notes.addresses.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.addresses.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Logical */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-5">
              <h3 className="text-amber-600 dark:text-amber-300 font-bold mb-3">{module.notes.addresses.logical.title}</h3>
              <ul className="space-y-2">
                {module.notes.addresses.logical.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-secondary items-start">
                    <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0 mt-0.5">â–¸</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Physical */}
            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 rounded-xl p-5">
              <h3 className="text-sky-600 dark:text-sky-300 font-bold mb-3">{module.notes.addresses.physical.title}</h3>
              <ul className="space-y-2">
                {module.notes.addresses.physical.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-secondary items-start">
                    <span className="text-sky-600 dark:text-sky-400 font-bold shrink-0 mt-0.5">â–¸</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MMU Box */}
          <div className="bg-surface-muted/60 border border-strong rounded-xl p-6">
            <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2"><Cpu size={18}/> {module.notes.addresses.mmu.title}</h3>
            <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.addresses.mmu.desc}</p>
            <div className="bg-background border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 mb-4">
              <p className="text-emerald-600 dark:text-emerald-400 font-mono text-center font-bold text-sm">{module.notes.addresses.mmu.formula}</p>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-4 overflow-x-auto">
              <div className="bg-surface-muted border border-strong rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-tertiary text-xs mb-1">CPU</div><div className="text-white font-mono font-bold">346</div></div>
              <span className="text-tertiary font-bold text-lg shrink-0">+</span>
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-800 rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-amber-600 dark:text-amber-400 text-xs mb-1">Relocation Reg</div><div className="text-white font-mono font-bold">14000</div></div>
              <span className="text-tertiary font-bold text-lg shrink-0">=</span>
              <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-800 rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-sky-600 dark:text-sky-400 text-xs mb-1">Physical Addr</div><div className="text-white font-mono font-bold">14346</div></div>
              <span className="text-tertiary font-bold text-lg shrink-0">â†’</span>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-800 rounded-lg px-4 py-2 text-xs text-center shrink-0"><div className="text-emerald-600 dark:text-emerald-400 font-bold">RAM</div></div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Memory Protection */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${82}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-rose-600 dark:text-rose-400" /> {module.notes.protection.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.protection.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.protection.registers.map((reg, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-rose-200 dark:border-rose-900/30 p-4 rounded-xl">
                <strong className="text-rose-600 dark:text-rose-300 block mb-2 text-sm">{reg.name}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{reg.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-4">
            <p className="text-rose-200/90 text-sm leading-relaxed">
              <strong className="text-rose-600 dark:text-rose-300 block mb-1">How it works (every single memory access):</strong>
              {module.notes.protection.howItWorks}
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-4 rounded-xl text-amber-200/90 text-sm">
            <span className="text-amber-600 dark:text-amber-400 font-bold">User Mode Rule:</span> {module.notes.protection.userModeRule}
          </div>
        </section>
    </StarableBlock>

        {/* Allocation Methods */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${83}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.allocationMethods.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 p-5 rounded-xl">
              <strong className="text-indigo-600 dark:text-indigo-300 block mb-2 text-sm">Contiguous Allocation</strong>
              <p className="text-tertiary text-xs leading-relaxed">{module.notes.allocationMethods.contiguous}</p>
            </div>
            <div className="bg-violet-950/20 border border-violet-900/40 p-5 rounded-xl">
              <strong className="text-violet-300 block mb-2 text-sm">Non-Contiguous Allocation</strong>
              <p className="text-tertiary text-xs leading-relaxed">{module.notes.allocationMethods.nonContiguous}</p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Fixed Partitioning */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${84}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <FolderOpen className="text-amber-600 dark:text-amber-400" /> {module.notes.fixedPartition.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.fixedPartition.desc}</p>
          
          {/* Visual Diagram */}
          <div className="mb-6 bg-background border border-subtle rounded-xl p-4">
            <p className="text-tertiary text-xs text-center mb-3">Fixed Partitioning â€” Memory Layout</p>
            <div className="space-y-1 max-w-xs mx-auto">
              <div className="bg-surface-muted rounded px-3 py-2 text-xs text-center text-secondary">OS (Fixed)</div>
              {['P1 (3MB) â†’ 5MB Partition', 'P2 (3MB) â†’ 5MB Partition', 'P3 (3MB) â†’ 5MB Partition', 'Free Space'].map((item, i) => (
                <div key={i} className={`rounded px-3 py-2 text-xs text-center border ${
                  i < 3 ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50 text-amber-200' : 'bg-surface-muted/40 border-dashed border-strong text-tertiary'
                }`}>{item}</div>
              ))}
            </div>
            <p className="text-rose-600 dark:text-rose-400 text-xs text-center mt-2 italic">2MB wasted inside EACH occupied partition (Internal Fragmentation)</p>
          </div>

          <h3 className="font-bold text-rose-600 dark:text-rose-400 mb-3 text-sm">Limitations:</h3>
          <div className="space-y-3">
            {module.notes.fixedPartition.limitations.map((lim, idx) => (
              <div key={idx} className="bg-rose-50 dark:bg-rose-950/15 border-l-4 border-rose-700 p-4 rounded-r-xl">
                <strong className="text-rose-600 dark:text-rose-300 block mb-1 text-sm">{lim.name}</strong>
                <p className="text-secondary text-sm leading-relaxed">{lim.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Dynamic Partitioning */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${85}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-600 dark:text-emerald-400" /> {module.notes.dynamicPartition.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.dynamicPartition.desc}</p>

          {/* Visual Diagram */}
          <div className="mb-6 bg-background border border-subtle rounded-xl p-4">
            <p className="text-tertiary text-xs text-center mb-3">Dynamic Partitioning â€” Process Size = Partition Size</p>
            <div className="space-y-1 max-w-xs mx-auto">
              <div className="bg-surface-muted rounded px-3 py-2 text-xs text-center text-secondary">OS</div>
              {['P1 Partition (5MB exact)', 'P2 Partition (2MB exact)', 'P3 Partition (3MB exact)', 'P4 Partition (4MB exact)'].map((item, i) => (
                <div key={i} className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded px-3 py-2 text-xs text-center text-emerald-200">{item}</div>
              ))}
            </div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs text-center mt-2 italic">Zero internal fragmentation â€” every byte is used!</p>
          </div>

          <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-3 text-sm">Advantages over Fixed Partitioning:</h3>
          <div className="space-y-2 mb-6">
            {module.notes.dynamicPartition.advantages.map((adv, idx) => (
              <div key={idx} className="flex gap-2 items-start text-sm text-secondary bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/20 rounded-lg p-3">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">âœ“</span><span>{adv}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl mb-4">
            <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm">Limitation: External Fragmentation (Still!)</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.dynamicPartition.limitation}</p>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/30 p-5 rounded-xl">
            <strong className="text-sky-600 dark:text-sky-300 block mb-2 text-sm">Solution: Compaction</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.dynamicPartition.compaction}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Quick Reference Card */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${86}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <CheckSquare className="text-tertiary" /> Quick Comparison: Fixed vs Dynamic
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-strong">
                  <th className="text-left py-2 pr-4 text-tertiary font-semibold">Property</th>
                  <th className="text-center py-2 px-4 text-amber-600 dark:text-amber-400 font-semibold">Fixed</th>
                  <th className="text-center py-2 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">Dynamic</th>
                </tr>
              </thead>
              <tbody className="text-secondary">
                {[
                  ['Internal Fragmentation', 'âŒ Yes (big problem)', 'âœ… No'],
                  ['External Fragmentation', 'âŒ Yes', 'âŒ Yes (still!)'],
                  ['Partition Size', 'Fixed at boot time', 'Determined at runtime'],
                  ['Process Size Limit', 'â‰¤ Largest partition', 'No fixed limit'],
                  ['Multiprogramming Degree', 'Limited by # of partitions', 'Better'],
                  ['Implementation Complexity', 'Simple', 'More complex'],
                ].map(([prop, fixed, dynamic], i) => (
                  <tr key={i} className="border-b border-subtle hover:bg-surface-muted/30 transition-colors">
                    <td className="py-3 pr-4 font-medium text-secondary">{prop}</td>
                    <td className="py-3 px-4 text-center text-xs">{fixed}</td>
                    <td className="py-3 px-4 text-center text-xs">{dynamic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  // Render Module 12: Free Space Management
  if (module.id === 'freespace') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Defragmentation / Compaction */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${87}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <Settings className="text-indigo-600 dark:text-indigo-400" /> {module.notes.defragmentation.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.defragmentation.desc}</p>
          <ul className="space-y-3">
            {module.notes.defragmentation.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Representation */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${88}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Database className="text-emerald-600 dark:text-emerald-400" /> {module.notes.representation.title}
          </h2>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-secondary text-sm leading-relaxed">{module.notes.representation.desc}</p>
          </div>
        </section>
    </StarableBlock>

        {/* Satisfying Request */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${89}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <Layers className="text-amber-600 dark:text-amber-400" /> {module.notes.satisfyingRequest.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.satisfyingRequest.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.satisfyingRequest.algorithms.map((algo, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-amber-200 dark:border-amber-900/30 p-5 rounded-xl">
                <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm">{algo.name}</strong>
                <p className="text-tertiary text-xs leading-relaxed">{algo.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 13: Paging
  if (module.id === 'paging') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${90}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-600 dark:text-rose-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Concept */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${91}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.concept.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.concept.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 p-5 rounded-xl">
              <strong className="text-indigo-600 dark:text-indigo-300 block mb-2 text-sm">Frames vs Pages</strong>
              <ul className="space-y-2 text-tertiary text-xs">
                {module.notes.concept.framesPages.map((item, idx) => (
                  <li key={idx}>â€¢ {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-violet-950/20 border border-violet-900/40 p-5 rounded-xl">
              <strong className="text-violet-300 block mb-2 text-sm">Page Table</strong>
              <ul className="space-y-2 text-tertiary text-xs">
                {module.notes.concept.pageTable.map((item, idx) => (
                  <li key={idx}>â€¢ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-muted/40 border border-strong/50 p-4 rounded-xl">
              <strong className="text-sky-600 dark:text-sky-300 block mb-1 text-sm">Addressing:</strong>
              <p className="text-tertiary text-sm">{module.notes.concept.addressing}</p>
            </div>
            <div className="bg-surface-muted/40 border border-strong/50 p-4 rounded-xl">
              <strong className="text-sky-600 dark:text-sky-300 block mb-1 text-sm">PTBR:</strong>
              <p className="text-tertiary text-sm">{module.notes.concept.ptbr}</p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* TLB */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${92}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-600 dark:text-emerald-400" /> {module.notes.tlb.title}
          </h2>
          
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl mb-6">
            <strong className="text-amber-600 dark:text-amber-300 block mb-2 text-sm">The Problem</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.tlb.problem}</p>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
            <strong className="text-emerald-600 dark:text-emerald-300 block mb-2 text-sm">The Solution (TLB)</strong>
            <p className="text-secondary text-sm leading-relaxed mb-3">{module.notes.tlb.solution}</p>
            <strong className="text-emerald-600 dark:text-emerald-300 block mb-1 text-sm">How It Works:</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.tlb.howItWorks}</p>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/30 p-5 rounded-xl">
            <strong className="text-sky-600 dark:text-sky-300 block mb-2 text-sm">ASID (Address Space Identifier)</strong>
            <p className="text-tertiary text-sm leading-relaxed">{module.notes.tlb.asid}</p>
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 14: Segmentation
  if (module.id === 'segmentation') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${93}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <User className="text-amber-600 dark:text-amber-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Paging vs Segmentation */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${94}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-indigo-600 dark:text-indigo-400" /> {module.notes.pagingVsSegmentation.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.pagingVsSegmentation.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Logical Address & Hardware */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${95}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-600 dark:text-emerald-400" /> Logical Address & Hardware
          </h2>
          
          <div className="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
            <strong className="text-emerald-600 dark:text-emerald-300 block mb-2 text-sm">{module.notes.addressing.title}</strong>
            <p className="text-secondary text-sm leading-relaxed">{module.notes.addressing.desc}</p>
          </div>
          
          <div className="bg-surface-muted/40 border border-strong/50 p-5 rounded-xl">
            <strong className="text-sky-600 dark:text-sky-300 block mb-3 text-sm">{module.notes.hardware.title}</strong>
            <p className="text-tertiary text-sm mb-3">{module.notes.hardware.desc}</p>
            <ul className="space-y-2 text-tertiary text-xs pl-4 border-l border-strong">
              {module.notes.hardware.points.map((point, idx) => (
                <li key={idx}>â€¢ {point}</li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

        {/* Pros & Cons */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${96}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-rose-600 dark:text-rose-400" /> {module.notes.prosCons.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-5 rounded-xl">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-3 text-sm flex items-center gap-2"><CheckSquare size={16}/> Advantages</strong>
              <ul className="space-y-2 text-secondary text-sm">
                {module.notes.prosCons.advantages.map((adv, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-emerald-500">âœ“</span> <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-5 rounded-xl">
              <strong className="text-rose-600 dark:text-rose-400 block mb-3 text-sm flex items-center gap-2"><AlertTriangle size={16}/> Disadvantages</strong>
              <ul className="space-y-2 text-secondary text-sm">
                {module.notes.prosCons.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-rose-500">âœ—</span> <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/30 p-5 rounded-xl">
            <strong className="text-indigo-600 dark:text-indigo-300 block mb-2 text-sm">{module.notes.modern.title}</strong>
            <p className="text-tertiary text-sm leading-relaxed">{module.notes.modern.desc}</p>
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 15: Virtual Memory
  if (module.id === 'virtualmemory') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${97}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-sky-600 dark:text-sky-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <strong className="text-sky-600 dark:text-sky-300 block mb-3 text-sm">Benefits:</strong>
          <ul className="space-y-3">
            {module.notes.intro.benefits.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Demand Paging */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${98}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <Activity className="text-indigo-600 dark:text-indigo-400" /> {module.notes.demandPaging.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.demandPaging.desc}</p>
          <div className="bg-indigo-50 dark:bg-indigo-950/20 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            <ul className="space-y-3">
              {module.notes.demandPaging.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-secondary text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

        {/* Valid-Invalid Bit Scheme */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${99}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600 dark:text-emerald-400" /> {module.notes.validInvalid.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.validInvalid.desc}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-xl flex flex-col gap-2">
              <strong className="text-emerald-600 dark:text-emerald-400 text-lg">{module.notes.validInvalid.bits[0].bit}</strong>
              <span className="text-tertiary text-sm">{module.notes.validInvalid.bits[0].meaning}</span>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-4 rounded-xl flex flex-col gap-2">
              <strong className="text-rose-600 dark:text-rose-400 text-lg">{module.notes.validInvalid.bits[1].bit}</strong>
              <span className="text-tertiary text-sm">{module.notes.validInvalid.bits[1].meaning}</span>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Page Faults & Pure Demand Paging */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${100}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-600 dark:text-rose-400" /> {module.notes.pageFault.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.pageFault.desc}</p>
          
          <div className="bg-surface-muted/40 border border-strong/50 p-5 rounded-xl mb-6">
            <strong className="text-rose-600 dark:text-rose-300 block mb-4 text-sm flex items-center gap-2"><Settings size={16}/> Steps in Handling a Page Fault:</strong>
            <ol className="space-y-4 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {module.notes.pageFault.steps.map((step, idx) => (
                <li key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full border border-strong bg-surface-muted text-secondary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs font-bold z-10">
                    {idx + 1}
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-surface-muted/80 p-3 rounded border border-strong/50 text-secondary text-xs shadow">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <strong className="text-amber-600 dark:text-amber-300 block mb-3 text-sm">{module.notes.pureDemandPaging.title}</strong>
            <ul className="space-y-2 text-tertiary text-xs">
              {module.notes.pureDemandPaging.points.map((point, idx) => (
                <li key={idx}>â€¢ {point}</li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

        {/* Pros & Cons */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${101}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-violet-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-violet-400" /> {module.notes.prosCons.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-5 rounded-xl">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-3 text-sm flex items-center gap-2"><CheckSquare size={16}/> Advantages</strong>
              <ul className="space-y-2 text-secondary text-sm">
                {module.notes.prosCons.advantages.map((adv, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-emerald-500">âœ“</span> <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-5 rounded-xl">
              <strong className="text-rose-600 dark:text-rose-400 block mb-3 text-sm flex items-center gap-2"><Skull size={16}/> Disadvantages</strong>
              <ul className="space-y-2 text-secondary text-sm">
                {module.notes.prosCons.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-rose-500">âœ—</span> <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 16: Page Replacement Algorithms
  if (module.id === 'pagereplacement') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${102}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-emerald-600 dark:text-emerald-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-secondary text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Algorithms */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${103}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.algorithms.title}
          </h2>
          
          <div className="space-y-6">
            {module.notes.algorithms.types.map((algo, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-3">{algo.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">{algo.desc}</p>
                
                {algo.points && (
                  <ul className="space-y-2 mb-4">
                    {algo.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-tertiary text-sm">
                        <span className="text-indigo-500 mt-1"><ChevronRight size={14}/></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {algo.belady && (
                  <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-4 rounded-r-xl mt-4">
                    <p className="text-rose-200 text-sm leading-relaxed">{algo.belady}</p>
                  </div>
                )}
                
                {algo.implementations && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {algo.implementations.map((impl, iIdx) => (
                      <div key={iIdx} className="bg-surface/50 border border-strong p-4 rounded-lg">
                        <strong className="text-emerald-600 dark:text-emerald-300 block mb-2 text-sm">{impl.method}</strong>
                        <p className="text-tertiary text-xs leading-relaxed">{impl.details}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {algo.subTypes && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {algo.subTypes.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-surface/50 border border-strong p-4 rounded-lg">
                        <strong className="text-sky-600 dark:text-sky-300 block mb-2 text-sm">{sub.subName}</strong>
                        <p className="text-tertiary text-xs leading-relaxed">{sub.subDesc}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {algo.note && (
                  <div className="mt-4 text-tertiary text-xs italic">
                    Note: {algo.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  // Render Module 17: Thrashing
  if (module.id === 'thrashing') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${104}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-600 dark:text-rose-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="bg-rose-50 dark:bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl">
            <ul className="space-y-3">
              {module.notes.intro.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 text-rose-600 dark:text-rose-400 shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <strong className="text-rose-200 text-sm">{point}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

        {/* Graph */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${105}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <Activity className="text-sky-600 dark:text-sky-400" /> {module.notes.graph.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-8">{module.notes.graph.desc}</p>
          
          {/* Custom CSS representation of the graph */}
          <div className="relative w-full max-w-lg mx-auto h-64 border-l-2 border-b-2 border-strong mb-10 mt-10">
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-tertiary font-bold uppercase tracking-wider whitespace-nowrap">
              CPU Utilization
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-tertiary font-bold uppercase tracking-wider whitespace-nowrap">
              Degree of Multiprogramming
            </div>
            
            {/* The curve */}
            <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible drop-shadow-lg">
              <path d="M 0 200 Q 150 50, 250 50 T 350 200" fill="none" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
            </svg>
            
            {/* Thrashing indicator */}
            <div className="absolute top-16 right-4 flex items-center gap-2 animate-pulse">
              <div className="w-1 h-8 bg-amber-500"></div>
              <div className="flex items-center text-amber-500 text-sm font-bold">
                <span className="bg-amber-500/20 px-2 py-1 rounded">Thrashing</span>
                <ChevronRight size={20} className="-ml-1" />
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Techniques */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${106}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600 dark:text-emerald-400" /> {module.notes.techniques.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {module.notes.techniques.methods.map((method, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-6 rounded-xl flex flex-col h-full hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                    {idx === 0 ? <AppWindow size={20} /> : <Activity size={20} />}
                  </div>
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-300">{method.name}</h3>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-4">{method.desc}</p>
                <div className="mt-auto bg-surface/50 p-4 rounded-lg border-l-2 border-emerald-500/50">
                  <p className="text-tertiary text-xs leading-relaxed">{method.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>
      </div>
    );
  }

  if (module.id === 'dbms_arch') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Three Schema Architecture */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${107}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> {module.notes.threeSchema.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.threeSchema.intro}</p>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-4 rounded-r-xl mb-6">
            <strong className="text-indigo-200">Objective:</strong> <span className="text-secondary text-sm">{module.notes.threeSchema.objective}</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {module.notes.threeSchema.levels.map((level, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-5 rounded-xl hover:border-indigo-500/30 transition-colors flex flex-col h-full">
                <h3 className="text-md font-bold text-indigo-600 dark:text-indigo-300 mb-2">{level.name}</h3>
                <p className="text-tertiary text-xs mb-3 flex-grow">{level.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {level.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-secondary">
                      <ChevronRight size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Simple Architecture Diagram */}
          <div className="mt-8 flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <div className="px-4 py-2 bg-surface-muted border border-strong rounded shadow text-xs font-semibold text-primary">External Schema</div>
              <div className="px-4 py-2 bg-surface-muted border border-strong rounded shadow text-xs font-semibold text-primary">External Schema</div>
            </div>
            <ArrowDownUp size={16} className="text-tertiary my-1" />
            <div className="px-6 py-2 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-500 rounded shadow text-sm font-bold text-indigo-200">Conceptual Level</div>
            <ArrowDownUp size={16} className="text-tertiary my-1" />
            <div className="px-8 py-2 bg-surface-muted border border-strong rounded shadow text-sm font-bold text-primary">Internal Level</div>
            <ArrowDownUp size={16} className="text-tertiary my-1" />
            <Database size={28} className="text-tertiary mt-1" />
          </div>
        </section>
    </StarableBlock>

        {/* Instances & Schemas / Data Models */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${108}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
              <Code className="text-amber-600 dark:text-amber-400" /> {module.notes.instancesSchemas.title}
            </h2>
            <ul className="space-y-4">
              {module.notes.instancesSchemas.points.map((pt, idx) => (
                <li key={idx} className="bg-surface-muted/40 p-3 rounded-lg border border-strong/50">
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-sm block mb-1">{pt.term}</span>
                  <span className="text-secondary text-xs">{pt.desc}</span>
                </li>
              ))}
            </ul>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${109}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col">
            <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
              <FolderOpen className="text-emerald-600 dark:text-emerald-400" /> {module.notes.dataModels.title}
            </h2>
            <ul className="space-y-3 flex-grow">
              {module.notes.dataModels.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 text-emerald-600 dark:text-emerald-400 shrink-0"><CheckSquare size={16} /></div>
                  <span className="text-secondary text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-strong/50 pt-6">
              <h2 className="text-lg font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
                 <AppWindow size={18} /> {module.notes.appAccess.title}
              </h2>
              <p className="text-secondary text-sm leading-relaxed">{module.notes.appAccess.desc}</p>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* DB Languages & DBA */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${110}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle flex flex-col">
            <h2 className="text-xl font-bold text-pink-400 mb-6 flex items-center gap-2">
              <Terminal className="text-pink-400" /> {module.notes.databaseLanguages.title}
            </h2>
            <div className="space-y-4 flex-grow">
              <div className="bg-surface-muted/60 p-5 rounded-xl border-l-4 border-pink-500">
                <h3 className="font-bold text-pink-300 text-sm mb-2">{module.notes.databaseLanguages.ddl.name}</h3>
                <p className="text-tertiary text-sm leading-relaxed">{module.notes.databaseLanguages.ddl.desc}</p>
              </div>
              <div className="bg-surface-muted/60 p-5 rounded-xl border-l-4 border-purple-500 mt-4">
                <h3 className="font-bold text-purple-300 text-sm mb-2">{module.notes.databaseLanguages.dml.name}</h3>
                <p className="text-tertiary text-sm leading-relaxed mb-3">{module.notes.databaseLanguages.dml.desc}</p>
                <div className="text-xs font-mono text-purple-200 bg-purple-900/30 p-3 rounded-lg border border-purple-800/50">
                  {module.notes.databaseLanguages.dml.query}
                </div>
              </div>
            </div>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${111}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
              <User className="text-rose-600 dark:text-rose-400" /> {module.notes.dba.title}
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.dba.desc}</p>
            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-5 rounded-xl">
              <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Settings size={14} /> Key Functions
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {module.notes.dba.functions.map((fn, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-secondary">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Architectures */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${112}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Server className="text-cyan-400" /> {module.notes.architectures.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {module.notes.architectures.types.map((type, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-6 rounded-xl flex flex-col hover:bg-surface-muted/60 transition-colors">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">{type.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">{type.desc}</p>
                
                {type.advantages && (
                  <div className="mt-auto bg-cyan-950/30 p-4 rounded-lg border border-cyan-900/50">
                    <h4 className="text-xs font-bold text-cyan-400 mb-3 uppercase tracking-wider">Advantages</h4>
                    <ul className="space-y-2">
                      {type.advantages.map((adv, i) => (
                        <li key={i} className="text-xs text-cyan-200 flex items-start gap-2">
                          <CheckSquare size={14} className="shrink-0 mt-0.5 text-cyan-500" /> 
                          <span className="leading-relaxed">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'er_model') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro to ER Model */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${113}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-4 rounded-r-xl mb-6">
            <strong className="text-indigo-200">Data Model:</strong> <span className="text-secondary text-sm leading-relaxed">{module.notes.intro.dataModel}</span>
          </div>
          <ul className="space-y-3 pl-4 list-disc list-inside md:list-outside text-sm text-secondary marker:text-indigo-500">
            {module.notes.intro.erModel.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">{pt}</li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Entities */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${114}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-emerald-600 dark:text-emerald-400" /> {module.notes.entities.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.entities.entityDef}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.entities.entityTypes.map((type, idx) => (
              <div key={idx} className={`p-5 rounded-xl border ${idx === 0 ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' : 'bg-surface-muted/40 border-strong/50'}`}>
                <h3 className={`text-md font-bold mb-2 ${idx === 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-secondary'}`}>{type.name}</h3>
                <p className="text-tertiary text-xs leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-muted/50 p-5 rounded-lg flex items-start gap-4">
            <div className="mt-1 text-emerald-500"><FolderOpen size={18} /></div>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-300 text-sm block mb-1">Entity Set</strong>
              <p className="text-tertiary text-xs leading-relaxed">{module.notes.entities.entitySet}</p>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Attributes */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${115}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-sky-600 dark:text-sky-400" /> {module.notes.attributes.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.attributes.attributeDef}</p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {module.notes.attributes.types.map((type, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-5 rounded-xl hover:border-sky-500/30 transition-colors">
                <h3 className="text-sm font-bold text-sky-600 dark:text-sky-300 mb-2">{type.name}</h3>
                <p className="text-tertiary text-xs leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Relationships */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${116}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <Activity className="text-amber-600 dark:text-amber-400" /> {module.notes.relationships.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.relationships.relationshipDef}</p>
          <ul className="list-disc list-inside md:list-outside pl-0 md:pl-4 space-y-2 mb-6 text-sm text-secondary marker:text-amber-500">
            {module.notes.relationships.relationshipTypes.map((pt, idx) => (
              <li key={idx} className="leading-relaxed">{pt}</li>
            ))}
            <li className="leading-relaxed"><strong className="text-amber-200">Degree:</strong> {module.notes.relationships.degree}</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-6 mt-6 border-t border-strong/50 pt-6">
            {/* Cardinality */}
            <div>
              <h3 className="text-lg font-bold text-orange-300 mb-3">{module.notes.relationships.cardinality.title}</h3>
              <p className="text-tertiary text-xs mb-4 leading-relaxed">{module.notes.relationships.cardinality.desc}</p>
              <div className="space-y-3">
                {module.notes.relationships.cardinality.types.map((type, idx) => (
                  <div key={idx} className="bg-orange-950/20 p-4 rounded-xl border border-orange-900/30">
                    <strong className="text-orange-300 text-sm block mb-1">{type.name}</strong>
                    <span className="text-secondary text-xs leading-relaxed">{type.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participation */}
            <div>
              <h3 className="text-lg font-bold text-yellow-600 dark:text-yellow-300 mb-3">{module.notes.relationships.participation.title}</h3>
              <p className="text-tertiary text-xs mb-4 leading-relaxed">{module.notes.relationships.participation.desc}</p>
              <div className="space-y-3">
                {module.notes.relationships.participation.types.map((type, idx) => (
                  <div key={idx} className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                    <strong className="text-yellow-600 dark:text-yellow-300 text-sm block mb-1">{type.name}</strong>
                    <span className="text-secondary text-xs leading-relaxed">{type.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Notations */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${117}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-6 flex items-center gap-2">
            <Layers className="text-rose-600 dark:text-rose-400" /> {module.notes.notations.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {module.notes.notations.symbols.map((sym, idx) => (
              <div key={idx} className="bg-surface-muted/60 border border-strong p-6 rounded-xl flex flex-col items-center justify-center text-center h-full hover:bg-surface-muted hover:border-rose-500/30 transition-colors">
                <div className="mb-4">
                  <ErSymbol type={sym.symbol} />
                </div>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-300 mb-1">{sym.meaning}</span>
                <span className="text-[10px] text-tertiary uppercase tracking-wider leading-snug">{sym.symbol}</span>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* The Classic Trap */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${118}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-fuchsia-400" /> {module.notes.trap.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6 bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-900/30">
            {module.notes.trap.desc}
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Identity */}
            <div className="bg-surface-muted/40 border border-strong/50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-fuchsia-300 mb-3">{module.notes.trap.identity.title}</h3>
              <p className="text-tertiary text-xs leading-relaxed mb-4">{module.notes.trap.identity.desc}</p>
              <div className="space-y-4">
                <div className="bg-surface/50 p-4 rounded-lg border-l-2 border-emerald-500">
                  <strong className="text-emerald-600 dark:text-emerald-400 text-sm block mb-1">Strong Entity</strong>
                  <span className="text-secondary text-xs leading-relaxed">{module.notes.trap.identity.strong}</span>
                </div>
                <div className="bg-surface/50 p-4 rounded-lg border-l-2 border-rose-500">
                  <strong className="text-rose-600 dark:text-rose-400 text-sm block mb-1">Weak Entity</strong>
                  <span className="text-secondary text-xs leading-relaxed">{module.notes.trap.identity.weak}</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-surface-muted/40 border border-strong/50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-fuchsia-300 mb-3">{module.notes.trap.rules.title}</h3>
              <p className="text-tertiary text-xs leading-relaxed mb-4">{module.notes.trap.rules.desc}</p>
              <div className="space-y-4">
                <div className="bg-surface/50 p-4 rounded-lg border-l-2 border-yellow-500">
                  <strong className="text-yellow-600 dark:text-yellow-400 text-sm block mb-1">Total Participation</strong>
                  <span className="text-secondary text-xs leading-relaxed">{module.notes.trap.rules.total}</span>
                </div>
                <div className="bg-surface/50 p-4 rounded-lg border-l-2 border-sky-500">
                  <strong className="text-sky-600 dark:text-sky-400 text-sm block mb-1">Partial Participation</strong>
                  <span className="text-secondary text-xs leading-relaxed">{module.notes.trap.rules.partial}</span>
                </div>
              </div>
            </div>
          </div>

          {/* The Overlap */}
          <div className="bg-background p-6 rounded-xl border border-subtle">
            <h3 className="text-lg font-bold text-white mb-3">{module.notes.trap.overlap.title}</h3>
            <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.trap.overlap.desc}</p>
            <p className="text-secondary text-sm leading-relaxed mb-6 whitespace-pre-line bg-surface p-4 rounded-lg">
              {module.notes.trap.overlap.difference}
            </p>
            <div className="bg-fuchsia-900/20 p-5 rounded-lg border border-fuchsia-500/30">
              <strong className="text-fuchsia-300 text-sm block mb-3 uppercase tracking-wider">The Golden Summary</strong>
              <ul className="space-y-3 list-disc list-outside pl-4 text-sm text-fuchsia-100 marker:text-fuchsia-500">
                {module.notes.trap.overlap.summary.map((pt, idx) => (
                  <li key={idx} className="leading-relaxed">{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'extended_er') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro to Extended ER */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${119}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            {module.notes.intro.desc}
          </p>
        </section>
    </StarableBlock>

        {/* Blank Spaces Problem */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${120}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-600 dark:text-rose-400" /> {module.notes.blankSpaces.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-muted/40 p-5 rounded-xl border border-strong/50 flex flex-col">
              <strong className="text-rose-600 dark:text-rose-300 text-sm mb-2 block">The Setup</strong>
              <span className="text-tertiary text-xs leading-relaxed">{module.notes.blankSpaces.problem}</span>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/20 p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 flex flex-col">
              <strong className="text-rose-600 dark:text-rose-400 text-sm mb-2 block flex items-center gap-2"><Skull size={14}/> The Disaster</strong>
              <span className="text-rose-200/80 text-xs leading-relaxed">{module.notes.blankSpaces.disaster}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 flex flex-col">
              <strong className="text-emerald-600 dark:text-emerald-400 text-sm mb-2 block flex items-center gap-2"><CheckSquare size={14}/> The Fix</strong>
              <span className="text-emerald-200/80 text-xs leading-relaxed">{module.notes.blankSpaces.fix}</span>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Specialisation & Generalisation */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Specialisation */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${121}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-4 flex items-center gap-2">
              <ArrowDownUp className="text-sky-600 dark:text-sky-400" /> {module.notes.specialisation.title}
            </h2>
            <div className="space-y-4 text-sm text-secondary">
              <div className="bg-surface-muted/50 p-4 rounded-xl border-l-2 border-sky-500">
                <strong className="text-sky-600 dark:text-sky-300 block mb-1">The Setup</strong>
                <span className="text-tertiary text-xs leading-relaxed">{module.notes.specialisation.setup}</span>
              </div>
              <div className="bg-surface-muted/50 p-4 rounded-xl border-l-2 border-sky-500">
                <strong className="text-sky-600 dark:text-sky-300 block mb-1">The Split</strong>
                <span className="text-tertiary text-xs leading-relaxed">{module.notes.specialisation.split}</span>
              </div>
              <p className="leading-relaxed"><strong className="text-sky-200">The "Is-A" Relationship:</strong> {module.notes.specialisation.isA}</p>
              <div className="mt-4 bg-sky-50 dark:bg-sky-950/30 p-4 rounded-lg border border-sky-200 dark:border-sky-900/50">
                <strong className="text-sky-600 dark:text-sky-400 text-xs uppercase tracking-wider block mb-1">Why use it?</strong>
                <span className="text-sky-200/80 text-xs leading-relaxed">{module.notes.specialisation.reason}</span>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="mt-8 flex justify-center border-t border-strong/50 pt-6">
              <svg viewBox="0 0 200 160" className="w-full max-w-[240px] drop-shadow-md">
                {/* Person Rectangle */}
                <rect x="60" y="10" width="80" height="30" className="fill-slate-800 stroke-sky-400 stroke-2" />
                <text x="100" y="30" textAnchor="middle" className="fill-sky-200 text-xs font-bold font-sans">PERSON</text>
                
                {/* Line down to triangle */}
                <line x1="100" y1="40" x2="100" y2="60" className="stroke-sky-400 stroke-2" />
                
                {/* Is-A Triangle */}
                <polygon points="100,60 120,90 80,90" className="fill-slate-800 stroke-sky-400 stroke-2" />
                <text x="100" y="82" textAnchor="middle" className="fill-sky-200 text-[10px] font-bold font-sans">Is-A</text>
                
                {/* Lines splitting out */}
                <line x1="100" y1="90" x2="100" y2="100" className="stroke-sky-400 stroke-2" />
                <line x1="40" y1="100" x2="160" y2="100" className="stroke-sky-400 stroke-2" />
                <line x1="40" y1="100" x2="40" y2="120" className="stroke-sky-400 stroke-2" />
                <line x1="160" y1="100" x2="160" y2="120" className="stroke-sky-400 stroke-2" />
                
                {/* Subclass Rectangles */}
                <rect x="0" y="120" width="80" height="30" className="fill-slate-800 stroke-sky-400 stroke-2" />
                <text x="40" y="140" textAnchor="middle" className="fill-sky-200 text-[10px] font-bold font-sans">STUDENT</text>
                
                <rect x="120" y="120" width="80" height="30" className="fill-slate-800 stroke-sky-400 stroke-2" />
                <text x="160" y="140" textAnchor="middle" className="fill-sky-200 text-[10px] font-bold font-sans">PROFESSOR</text>
                
                {/* Arrows pointing down representing Top-Down */}
                <path d="M 40 115 L 35 110 L 45 110 Z" className="fill-sky-400" />
                <path d="M 160 115 L 155 110 L 165 110 Z" className="fill-sky-400" />
              </svg>
            </div>
          </section>
    </StarableBlock>

          {/* Generalisation */}
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${122}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <ArrowDownUp className="text-emerald-600 dark:text-emerald-400 rotate-180" /> {module.notes.generalisation.title}
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-4">{module.notes.generalisation.desc}</p>
            <div className="space-y-4 text-sm text-secondary">
              <div className="bg-surface-muted/50 p-4 rounded-xl border-l-2 border-emerald-500">
                <strong className="text-emerald-600 dark:text-emerald-300 block mb-1">The Setup</strong>
                <span className="text-tertiary text-xs leading-relaxed">{module.notes.generalisation.setup}</span>
              </div>
              <div className="bg-surface-muted/50 p-4 rounded-xl border-l-2 border-emerald-500">
                <strong className="text-emerald-600 dark:text-emerald-300 block mb-1">The Grouping</strong>
                <span className="text-tertiary text-xs leading-relaxed">{module.notes.generalisation.grouping}</span>
              </div>
              <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                <strong className="text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider block mb-1">Why use it?</strong>
                <span className="text-emerald-200/80 text-xs leading-relaxed">{module.notes.generalisation.reason}</span>
              </div>
            </div>

            {/* Visual Diagram */}
            <div className="mt-8 flex justify-center border-t border-strong/50 pt-6">
              <svg viewBox="0 0 200 160" className="w-full max-w-[240px] drop-shadow-md">
                {/* Vehicle Rectangle (Top) */}
                <rect x="60" y="10" width="80" height="30" className="fill-slate-800 stroke-emerald-400 stroke-2" />
                <text x="100" y="30" textAnchor="middle" className="fill-emerald-200 text-xs font-bold font-sans">VEHICLE</text>
                
                {/* Line up to triangle */}
                <line x1="100" y1="40" x2="100" y2="60" className="stroke-emerald-400 stroke-2" />
                
                {/* Is-A Triangle */}
                <polygon points="100,60 120,90 80,90" className="fill-slate-800 stroke-emerald-400 stroke-2" />
                <text x="100" y="82" textAnchor="middle" className="fill-emerald-200 text-[10px] font-bold font-sans">Is-A</text>
                
                {/* Lines merging in from bottom */}
                <line x1="100" y1="90" x2="100" y2="100" className="stroke-emerald-400 stroke-2" />
                <line x1="40" y1="100" x2="160" y2="100" className="stroke-emerald-400 stroke-2" />
                <line x1="40" y1="100" x2="40" y2="120" className="stroke-emerald-400 stroke-2" />
                <line x1="160" y1="100" x2="160" y2="120" className="stroke-emerald-400 stroke-2" />
                
                {/* Subclass Rectangles (Bottom) */}
                <rect x="0" y="120" width="80" height="30" className="fill-slate-800 stroke-emerald-400 stroke-2" />
                <text x="40" y="140" textAnchor="middle" className="fill-emerald-200 text-[10px] font-bold font-sans">CAR</text>
                
                <rect x="120" y="120" width="80" height="30" className="fill-slate-800 stroke-emerald-400 stroke-2" />
                <text x="160" y="140" textAnchor="middle" className="fill-emerald-200 text-[10px] font-bold font-sans">BUS</text>
                
                {/* Arrows pointing UP representing Bottom-Up */}
                <path d="M 100 45 L 95 50 L 105 50 Z" className="fill-emerald-400" />
                <path d="M 40 105 L 35 110 L 45 110 Z" className="fill-emerald-400" />
                <path d="M 160 105 L 155 110 L 165 110 Z" className="fill-emerald-400" />
              </svg>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Inheritance */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${123}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <Terminal className="text-amber-600 dark:text-amber-400" /> {module.notes.inheritance.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.inheritance.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface-muted/60 border border-strong/50 p-5 rounded-xl">
              <strong className="text-amber-600 dark:text-amber-300 text-sm mb-2 block">Attribute Inheritance</strong>
              <span className="text-tertiary text-xs leading-relaxed">{module.notes.inheritance.attribute}</span>
            </div>
            <div className="bg-surface-muted/60 border border-strong/50 p-5 rounded-xl">
              <strong className="text-amber-600 dark:text-amber-300 text-sm mb-2 block">Participation Inheritance</strong>
              <span className="text-tertiary text-xs leading-relaxed">{module.notes.inheritance.participation}</span>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Aggregation */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${124}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-fuchsia-400" /> {module.notes.aggregation.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.aggregation.desc}</p>
          
          <div className="flex flex-col gap-4">
            <div className="bg-rose-50 dark:bg-rose-950/20 p-5 rounded-xl border border-rose-200 dark:border-rose-900/30 border-l-4 border-l-rose-500">
              <strong className="text-rose-600 dark:text-rose-400 text-sm mb-2 block flex items-center gap-2"><AlertTriangle size={14} /> The Problem</strong>
              <span className="text-secondary text-sm leading-relaxed">{module.notes.aggregation.problem}</span>
            </div>
            
            <div className="bg-fuchsia-950/20 p-5 rounded-xl border border-fuchsia-900/30 border-l-4 border-l-fuchsia-500">
              <strong className="text-fuchsia-400 text-sm mb-2 block flex items-center gap-2"><CheckSquare size={14} /> The Solution</strong>
              <span className="text-secondary text-sm leading-relaxed">{module.notes.aggregation.solution}</span>
            </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'relational_model') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${125}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6 bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            {module.notes.intro.desc}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.intro.definitions.map((def, idx) => (
              <div key={idx} className="bg-surface-muted/40 border border-strong/50 p-5 rounded-xl hover:border-indigo-500/30 transition-colors">
                <strong className="text-indigo-600 dark:text-indigo-300 text-sm block mb-1">{def.term}</strong>
                <span className="text-tertiary text-xs leading-relaxed">{def.meaning}</span>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Properties */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${126}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-600 dark:text-emerald-400" /> {module.notes.properties.title}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-secondary">
            {module.notes.properties.list.map((prop, idx) => (
              <li key={idx} className="bg-emerald-50 dark:bg-emerald-950/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/30 flex items-start gap-3">
                <div className="mt-1 min-w-[16px] text-emerald-500"><CheckSquare size={16}/></div>
                <span className="leading-relaxed text-xs">{prop}</span>
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Keys */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${127}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
            <Settings className="text-amber-600 dark:text-amber-400" /> {module.notes.keys.title}
          </h2>
          <div className="space-y-4">
            {module.notes.keys.list.map((keyObj, idx) => (
              <div key={idx} className="bg-surface-muted/60 p-5 rounded-xl border border-strong/50 flex flex-col md:flex-row md:items-start gap-3 md:gap-6 hover:bg-surface-muted hover:border-amber-500/30 transition-all">
                <div className="md:w-1/4">
                  <strong className="text-amber-600 dark:text-amber-300 text-sm">{keyObj.name}</strong>
                </div>
                <div className="md:w-3/4">
                  <span className="text-tertiary text-sm leading-relaxed">{keyObj.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Integrity Constraints */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${128}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-rose-600 dark:text-rose-400" /> {module.notes.integrity.title}
          </h2>
          <p className="text-secondary text-sm leading-relaxed mb-6">{module.notes.integrity.desc}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {module.notes.integrity.types.map((type, idx) => (
              <div key={idx} className={`bg-rose-50 dark:bg-rose-950/20 p-6 rounded-xl border border-rose-200 dark:border-rose-900/50 ${type.list ? 'md:col-span-2' : ''}`}>
                <strong className="text-rose-600 dark:text-rose-300 text-sm block mb-3 uppercase tracking-wider">{type.name}</strong>
                <span className="text-rose-800 dark:text-rose-200 text-xs leading-relaxed block">{type.desc}</span>
                {type.list && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {type.list.map((item, i) => (
                      <div key={i} className="bg-rose-100/50 dark:bg-rose-900/30 p-3.5 rounded-lg border border-rose-200/50 dark:border-rose-800/50 hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
                        <strong className="text-rose-700 dark:text-rose-300 text-xs block mb-1.5">{item.name}</strong>
                        <span className="text-rose-900 dark:text-rose-200/80 text-xs leading-relaxed">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'er_to_relational') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${129}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-indigo-600 dark:text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <div className="space-y-3">
            {module.notes.intro.points.map((pt, idx) => (
              <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Notations / Rules */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${130}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <Layers className="text-emerald-600 dark:text-emerald-400" /> {module.notes.notations.title}
          </h2>
          <div className="space-y-6">
            {module.notes.notations.rules.map((rule, idx) => (
              <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                <strong className="text-emerald-700 dark:text-emerald-300 text-base block mb-4 border-b border-emerald-200 dark:border-emerald-800/50 pb-2">{rule.entity}</strong>
                <div className="space-y-4">
                  {rule.steps.map((step, sIdx) => (
                    <div key={sIdx} className="text-sm text-emerald-900 dark:text-emerald-100/90 leading-relaxed pl-3 whitespace-pre-line border-l-2 border-emerald-300 dark:border-emerald-700/50">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'normalisation') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">

        {/* Intro + Why Normalise */}
        <div className="grid md:grid-cols-2 gap-6">
          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${131}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
            <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
              <BookOpen className="text-indigo-500" /> {module.notes.intro.title}
            </h2>
            <div className="space-y-3">
              {module.notes.intro.points.map((pt, idx) => (
                <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                  <span className="text-indigo-500 font-bold mt-0.5">â€¢</span>
                  {pt}
                </p>
              ))}
            </div>
          </section>
    </StarableBlock>

          <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${132}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" /> Why Normalise?
            </h2>
            <p className="text-amber-800 dark:text-amber-200 text-sm mb-4 leading-relaxed"><strong>Goal:</strong> {module.notes.whyNormalise.reason}</p>
            <div className="bg-amber-100 dark:bg-amber-900/50 rounded-xl p-4 border border-amber-300 dark:border-amber-800">
              <p className="text-amber-900 dark:text-amber-100 text-sm font-semibold">{module.notes.whyNormalise.redundancyEffect}</p>
            </div>
          </section>
    </StarableBlock>
        </div>

        {/* Anomalies */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${133}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-2">
            <AlertOctagon className="text-rose-500" /> {module.notes.anomalies.title}
          </h2>
          <p className="text-secondary text-sm mb-6">{module.notes.anomalies.intro}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {module.notes.anomalies.types.map((anom, idx) => (
              <div key={idx} className="bg-rose-50 dark:bg-rose-950/20 p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:border-rose-400 dark:hover:border-rose-700 transition-colors">
                <strong className="text-rose-700 dark:text-rose-300 text-sm block mb-2">{anom.name}</strong>
                <p className="text-rose-900 dark:text-rose-200/80 text-xs leading-relaxed">{anom.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {module.notes.anomalies.consequences.map((con, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-surface-muted/50 p-3 rounded-lg border border-subtle">
                <Skull size={16} className="text-rose-400 mt-0.5 shrink-0" />
                <p className="text-secondary text-sm leading-relaxed">{con}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Functional Dependency */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${134}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-violet-500" /> {module.notes.functionalDependency.title}
          </h2>
          <div className="space-y-3 mb-6">
            <p className="text-secondary text-sm leading-relaxed"><strong className="text-primary">Definition:</strong> {module.notes.functionalDependency.definition}</p>
            <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900/50 rounded-xl p-4">
              <p className="text-violet-900 dark:text-violet-200 text-sm font-mono">{module.notes.functionalDependency.notation}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.functionalDependency.types.map((fdType, idx) => (
              <div key={idx} className="bg-violet-50 dark:bg-violet-950/20 p-5 rounded-xl border border-violet-200 dark:border-violet-900/50">
                <strong className="text-violet-700 dark:text-violet-300 text-sm block mb-2">{fdType.name}</strong>
                <p className="text-violet-900 dark:text-violet-200/80 text-xs leading-relaxed">{fdType.desc}</p>
                {fdType.rule && <p className="text-violet-600 dark:text-violet-400 text-xs mt-2 font-mono bg-violet-100 dark:bg-violet-900/40 p-2 rounded-lg">{fdType.rule}</p>}
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Armstrong's Axioms */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${135}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" /> {module.notes.armstrongs.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {module.notes.armstrongs.rules.map((rule, idx) => (
              <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-emerald-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">{idx + 1}</span>
                  <strong className="text-emerald-700 dark:text-emerald-300 text-sm">{rule.name}</strong>
                </div>
                <ul className="space-y-2">
                  {rule.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-emerald-900 dark:text-emerald-200/80 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">â†’</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Normal Forms */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${136}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Layers className="text-indigo-500" /> {module.notes.normalForms.title}
          </h2>
          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute left-[28px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 via-violet-400 to-emerald-400 opacity-40"></div>
            <div className="space-y-5">
              {module.notes.normalForms.forms.map((form, idx) => {
                const colorMap = {
                  blue: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-900/50', title: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500', bullet: 'text-blue-500' },
                  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/20', border: 'border-indigo-200 dark:border-indigo-900/50', title: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500', bullet: 'text-indigo-500' },
                  violet: { bg: 'bg-violet-50 dark:bg-violet-950/20', border: 'border-violet-200 dark:border-violet-900/50', title: 'text-violet-700 dark:text-violet-300', dot: 'bg-violet-500', bullet: 'text-violet-500' },
                  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-900/50', title: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500', bullet: 'text-emerald-500' }
                };
                const c = colorMap[form.color] || colorMap.indigo;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${c.dot} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}>
                      {idx + 1}
                    </div>
                    <div className={`flex-1 ${c.bg} p-5 rounded-xl border ${c.border} hover:shadow-md transition-shadow`}>
                      <strong className={`${c.title} text-base block mb-3`}>{form.name}</strong>
                      <ul className="space-y-2">
                        {form.rules.map((rule, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-xs text-secondary leading-relaxed">
                            <span className={`${c.bullet} font-bold mt-0.5 shrink-0`}>âœ“</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Advantages */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${137}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle mt-6">
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-teal-500" /> {module.notes.advantages.title}
          </h2>
          <div className="space-y-3">
            {module.notes.advantages.points.map((pt, idx) => (
              <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-teal-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'transaction') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${138}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-500" /> {module.notes.intro.title}
          </h2>
          <div className="space-y-3">
            {module.notes.intro.points.map((pt, idx) => (
              <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-indigo-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* ACID Properties */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${139}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-2">
            <ShieldCheck className="text-amber-500" /> {module.notes.acid.title}
          </h2>
          <p className="text-amber-800 dark:text-amber-200/80 text-sm mb-6">{module.notes.acid.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.acid.properties.map((prop, idx) => (
              <div key={idx} className="bg-amber-100/50 dark:bg-amber-900/30 p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 border-l-4 border-l-amber-500">
                <strong className="text-amber-700 dark:text-amber-300 text-sm block mb-2">{prop.name}</strong>
                <p className="text-amber-900 dark:text-amber-100/80 text-xs leading-relaxed whitespace-pre-line">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Transaction States */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${140}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <Activity className="text-emerald-500" /> {module.notes.states.title}
          </h2>
          
          <div className="w-full flex justify-center py-6 overflow-x-auto mb-8 bg-surface-muted/50 rounded-xl border border-subtle">
            <svg width="600" height="320" viewBox="0 0 600 320" className="text-sm font-medium min-w-[600px]">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="currentColor" className="text-tertiary" />
                </marker>
              </defs>
              
              {/* Edges */}
              <g className="stroke-tertiary stroke-2 fill-none" markerEnd="url(#arrow)">
                <path d="M 155 175 L 205 105" />
                <text x="140" y="145" className="stroke-none fill-amber-600 dark:fill-amber-400 text-xs font-bold">R/W operations</text>

                <path d="M 330 80 L 400 80" />
                <text x="365" y="70" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 text-xs font-bold">Permanent store</text>

                <path d="M 130 220 L 195 260" />
                <text x="145" y="255" className="stroke-none fill-amber-600 dark:fill-amber-400 text-xs font-bold">Failure</text>

                <path d="M 250 110 L 250 240" />
                <text x="258" y="180" className="stroke-none fill-amber-600 dark:fill-amber-400 text-xs font-bold">Failure</text>

                <path d="M 310 270 L 400 270" />
                <text x="355" y="260" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 text-xs font-bold">Roll back</text>
                
                <path d="M 500 100 L 530 155" />
                <path d="M 500 250 L 530 195" />
              </g>

              {/* Nodes */}
              <g className="fill-surface stroke-strong stroke-2 text-primary">
                <ellipse cx="100" cy="200" rx="60" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="100" y="205" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Active state</text>

                <ellipse cx="250" cy="80" rx="80" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="250" y="85" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Partially committed</text>

                <ellipse cx="460" cy="80" rx="70" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="460" y="85" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Committed state</text>

                <ellipse cx="250" cy="270" rx="60" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="250" y="275" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Failed state</text>

                <ellipse cx="460" cy="270" rx="60" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="460" y="275" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Aborted state</text>

                <ellipse cx="530" cy="175" rx="65" ry="25" className="stroke-amber-500 fill-amber-50 dark:fill-amber-950/30 stroke-2" />
                <text x="530" y="180" textAnchor="middle" className="stroke-none fill-amber-600 dark:fill-amber-400 font-bold">Terminated state</text>
              </g>
            </svg>
          </div>
          <div className="space-y-4">
            {module.notes.states.list.map((state, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1.5 rounded-lg text-sm shrink-0 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap text-center min-w-[140px]">
                  {state.name}
                </div>
                <p className="text-secondary text-sm leading-relaxed mt-1">
                  {state.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'transaction_implementation') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${141}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-500" /> Intro
          </h2>
          <p className="text-secondary text-sm leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50 dark:bg-indigo-950/20 py-3">
            {module.notes.intro}
          </p>
        </section>
    </StarableBlock>

        {/* Shadow-copy scheme */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${142}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
            <Layers className="text-amber-500" /> {module.notes.shadowCopy.title}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-5 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-primary mb-3">Basics</h3>
              <ul className="space-y-2">
                {module.notes.shadowCopy.basics.map((pt, idx) => (
                  <li key={idx} className="text-secondary text-sm flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">â€¢</span> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-5 border border-emerald-200 dark:border-emerald-900/50">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                  <CheckSquare size={16} /> Commit Steps
                </h3>
                <ul className="space-y-2">
                  {module.notes.shadowCopy.commitSteps.map((pt, idx) => (
                    <li key={idx} className="text-emerald-900 dark:text-emerald-100/80 text-xs flex items-start gap-2">
                      <span className="font-bold">{idx + 1}.</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/50">
                  <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm">Atomicity</h3>
                  <ul className="space-y-1">
                    {module.notes.shadowCopy.atomicity.map((pt, idx) => (
                      <li key={idx} className="text-blue-900 dark:text-blue-100/80 text-xs flex items-start gap-2">
                        <span className="text-blue-500">â€¢</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-900/50">
                  <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 text-sm">Durability</h3>
                  <ul className="space-y-1">
                    {module.notes.shadowCopy.durability.map((pt, idx) => (
                      <li key={idx} className="text-purple-900 dark:text-purple-100/80 text-xs flex items-start gap-2">
                        <span className="text-purple-500">â€¢</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-xl p-5 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-primary mb-2 text-sm">Implementation Detail</h3>
              <p className="text-secondary text-xs leading-relaxed">{module.notes.shadowCopy.implementationDetail}</p>
              
              <div className="mt-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 p-3 rounded-lg text-xs font-medium border border-red-200 dark:border-red-900/50 flex items-center gap-2">
                <AlertTriangle size={14} /> Drawback: {module.notes.shadowCopy.drawback}
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Log-based recovery methods */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${143}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-6 flex items-center gap-2">
            <Database className="text-rose-500" /> {module.notes.logBased.title}
          </h2>
          
          <div className="space-y-4 mb-8">
            {module.notes.logBased.basics.map((pt, idx) => (
              <div key={idx} className="bg-surface-muted/50 p-3 rounded-lg text-secondary text-sm border-l-2 border-rose-400">
                {pt}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-900/50">
              <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4">{module.notes.logBased.deferred.title}</h3>
              <ul className="space-y-3">
                {module.notes.logBased.deferred.points.map((pt, idx) => (
                  <li key={idx} className="text-indigo-900 dark:text-indigo-100/80 text-sm flex items-start gap-2 leading-relaxed">
                    <span className="text-indigo-500 mt-1">â€¢</span> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-6 border border-teal-200 dark:border-teal-900/50">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-4">{module.notes.logBased.immediate.title}</h3>
              <ul className="space-y-3 mb-4">
                {module.notes.logBased.immediate.points.map((pt, idx) => (
                  <li key={idx} className="text-teal-900 dark:text-teal-100/80 text-sm flex items-start gap-2 leading-relaxed">
                    <span className="text-teal-500 mt-1">â€¢</span> {pt}
                  </li>
                ))}
              </ul>
              
              <div className="bg-surface-muted/50 rounded-lg p-3 border border-teal-200/50 dark:border-teal-800/50">
                <strong className="text-teal-800 dark:text-teal-200 text-xs block mb-2">Failure Handling:</strong>
                <ul className="space-y-1">
                  {module.notes.logBased.immediate.failureHandling.map((pt, idx) => (
                    <li key={idx} className="text-teal-900 dark:text-teal-100/70 text-xs flex items-start gap-2">
                      <span className="font-bold">{idx + 1}.</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'indexing') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${144}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-500" /> {module.notes.intro.title}
          </h2>
          <div className="space-y-3">
            {module.notes.intro.points.map((pt, idx) => (
              <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-indigo-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Structure */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${145}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
            <Layers className="text-amber-500" /> {module.notes.structure.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.structure.parts.map((part, idx) => (
              <div key={idx} className="bg-amber-100/50 dark:bg-amber-900/30 p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 border-l-4 border-l-amber-500">
                <strong className="text-amber-700 dark:text-amber-300 text-sm block mb-2">{part.name}</strong>
                <p className="text-amber-900 dark:text-amber-100/80 text-xs leading-relaxed whitespace-pre-line">{part.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Methods */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${146}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <FolderOpen className="text-emerald-500" /> {module.notes.methods.title}
          </h2>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900/50">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 text-lg">{module.notes.methods.primary.title}</h3>
              <ul className="space-y-2 mb-6">
                {module.notes.methods.primary.basics.map((pt, idx) => (
                  <li key={idx} className="text-emerald-900 dark:text-emerald-100/80 text-sm flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-500 mt-1">â€¢</span> {pt}
                  </li>
                ))}
              </ul>
              
              <div className="bg-surface-muted/50 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50 mb-6">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-3">{module.notes.methods.primary.denseSparse.title}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-surface p-4 rounded-lg border border-subtle">
                    <strong className="text-sm text-primary block mb-2">Dense Index</strong>
                    <ul className="space-y-1">
                      {module.notes.methods.primary.denseSparse.dense.map((pt, idx) => (
                        <li key={idx} className="text-xs text-secondary leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-500">â€¢</span> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface p-4 rounded-lg border border-subtle">
                    <strong className="text-sm text-primary block mb-2">Sparse Index</strong>
                    <ul className="space-y-1">
                      {module.notes.methods.primary.denseSparse.sparse.map((pt, idx) => (
                        <li key={idx} className="text-xs text-secondary leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-500">â€¢</span> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-surface-muted/50 p-4 rounded-lg border border-subtle">
                  <strong className="text-sm text-primary block mb-2">Based on Key Attribute</strong>
                  <ul className="space-y-1">
                    {module.notes.methods.primary.basedOnKey.map((pt, idx) => (
                      <li key={idx} className="text-xs text-secondary leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-500">â€¢</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface-muted/50 p-4 rounded-lg border border-subtle">
                  <strong className="text-sm text-primary block mb-2">Based on Non-Key Attribute</strong>
                  <ul className="space-y-1">
                    {module.notes.methods.primary.basedOnNonKey.map((pt, idx) => (
                      <li key={idx} className="text-xs text-secondary leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-500">â€¢</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface-muted/50 p-4 rounded-lg border border-subtle">
                  <strong className="text-sm text-primary block mb-2">Multi-level Index</strong>
                  <ul className="space-y-1">
                    {module.notes.methods.primary.multiLevel.map((pt, idx) => (
                      <li key={idx} className="text-xs text-secondary leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-500">â€¢</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-6 border border-teal-200 dark:border-teal-900/50">
              <h3 className="font-bold text-teal-700 dark:text-teal-300 mb-4 text-lg">{module.notes.methods.secondary.title}</h3>
              <ul className="space-y-2">
                {module.notes.methods.secondary.points.map((pt, idx) => (
                  <li key={idx} className="text-teal-900 dark:text-teal-100/80 text-sm flex items-start gap-2 leading-relaxed">
                    <span className="text-teal-500 mt-1">â€¢</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
    </StarableBlock>

        {/* Pros and Cons */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${147}`}>
      <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
              <CheckSquare size={18} /> Advantages
            </h3>
            <ul className="space-y-2">
              {module.notes.prosCons.advantages.map((pt, idx) => (
                <li key={idx} className="text-emerald-900 dark:text-emerald-100/80 text-sm flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">â€¢</span> {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/50">
            <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} /> Limitations
            </h3>
            <ul className="space-y-2">
              {module.notes.prosCons.limitations.map((pt, idx) => (
                <li key={idx} className="text-rose-900 dark:text-rose-100/80 text-sm flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">â€¢</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'nosql') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${148}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
            <BookOpen className="text-indigo-500" /> {module.notes.intro.title}
          </h2>
          <div className="space-y-3">
            {module.notes.intro.points.map((pt, idx) => (
              <p key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-indigo-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* ACID vs BASE */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${149}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-amber-500" /> {module.notes.acidVsBase.title}
          </h2>
          <p className="text-amber-900 dark:text-amber-100/80 text-sm leading-relaxed mb-6 font-medium bg-amber-100/50 dark:bg-amber-900/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50">
            {module.notes.acidVsBase.intro}
          </p>
          
          <div className="space-y-5">
            {module.notes.acidVsBase.sections.map((section, idx) => (
              <div key={idx} className="bg-surface p-5 rounded-xl border border-amber-200 dark:border-amber-900/50">
                <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2">{section.subtitle}</h3>
                <p className="text-secondary text-sm leading-relaxed whitespace-pre-line">{section.desc}</p>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* History */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${150}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4 flex items-center gap-2">
            <Clock className="text-teal-500" /> {module.notes.history.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.history.points.map((pt, idx) => (
              <li key={idx} className="text-secondary text-sm leading-relaxed flex items-start gap-3">
                <span className="text-teal-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </li>
            ))}
          </ul>
        </section>
    </StarableBlock>

        {/* Types of NoSQL */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${151}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6 flex items-center gap-2">
            <Database className="text-purple-500" /> {module.notes.types.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.types.models.map((model, idx) => (
              <div key={idx} className="bg-purple-50 dark:bg-purple-950/20 p-5 rounded-xl border border-purple-200 dark:border-purple-900/50">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-3 text-lg border-b border-purple-200 dark:border-purple-800/50 pb-2">{model.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">{model.desc}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <strong className="text-purple-800 dark:text-purple-200 min-w-[70px]">Use cases:</strong>
                    <span className="text-purple-900 dark:text-purple-100/70">{model.useCases}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <strong className="text-purple-800 dark:text-purple-200 min-w-[70px]">Examples:</strong>
                    <span className="text-purple-900 dark:text-purple-100/70">{model.examples}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Pros, Cons and When to use */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${152}`}>
      <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/50">
            <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
              <CheckSquare size={18} /> Advantages
            </h3>
            <ul className="space-y-2">
              {module.notes.prosCons.advantages.map((pt, idx) => (
                <li key={idx} className="text-emerald-900 dark:text-emerald-100/80 text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 mt-0.5">â€¢</span> {pt}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/50">
            <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} /> Disadvantages
            </h3>
            <ul className="space-y-2">
              {module.notes.prosCons.disadvantages.map((pt, idx) => (
                <li key={idx} className="text-rose-900 dark:text-rose-100/80 text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-rose-500 mt-0.5">â€¢</span> {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
              <FolderOpen size={18} /> When to use
            </h3>
            <ul className="space-y-2">
              {module.notes.prosCons.whenToUse.map((pt, idx) => (
                <li key={idx} className="text-blue-900 dark:text-blue-100/80 text-xs flex items-start gap-2 leading-relaxed">
                  <span className="text-blue-500 mt-0.5">â€¢</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        </section>
    </StarableBlock>

        {/* SQL vs NoSQL Table */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${153}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle overflow-x-auto">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
            <Layout className="text-slate-500" /> {module.notes.sqlVsNosql.title}
          </h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                {module.notes.sqlVsNosql.headers.map((h, i) => (
                  <th key={i} className="p-4 border-b border-subtle text-primary font-bold text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {module.notes.sqlVsNosql.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className={`p-4 border-b border-subtle text-sm ${cellIdx === 0 ? 'font-semibold text-primary' : 'text-secondary'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
    </StarableBlock>

      </div>
    );
  }

  if (module.id === 'modern_data_ecosystems') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${154}`}>
      <section className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle">
          <p className="text-secondary text-sm leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-50 dark:bg-indigo-950/20 py-3 font-medium">
            {module.notes.intro}
          </p>
        </section>
    </StarableBlock>

        {/* MongoDB */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${155}`}>
      <section className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-8 shadow-sm border border-emerald-200 dark:border-emerald-900/50">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <Database className="text-emerald-500" /> {module.notes.mongodb.title}
          </h2>
          <div className="space-y-3 bg-surface p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
            {module.notes.mongodb.points.map((pt, idx) => (
              <p key={idx} className="text-emerald-900 dark:text-emerald-100/80 text-sm leading-relaxed flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Hadoop */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${156}`}>
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-200 dark:border-amber-900/50">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
            <Server className="text-amber-500" /> {module.notes.hadoop.title}
          </h2>
          <div className="space-y-3 bg-surface p-5 rounded-xl border border-amber-200 dark:border-amber-900/50">
            {module.notes.hadoop.points.map((pt, idx) => (
              <p key={idx} className="text-amber-900 dark:text-amber-100/80 text-sm leading-relaxed flex items-start gap-3">
                <span className="text-amber-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Working Together */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${157}`}>
      <section className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8 shadow-sm border border-blue-200 dark:border-blue-900/50">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
            <ArrowDownUp className="text-blue-500" /> {module.notes.workingTogether.title}
          </h2>
          <div className="space-y-3 bg-surface p-5 rounded-xl border border-blue-200 dark:border-blue-900/50">
            {module.notes.workingTogether.points.map((pt, idx) => (
              <p key={idx} className="text-blue-900 dark:text-blue-100/80 text-sm leading-relaxed flex items-start gap-3">
                <span className="text-blue-500 font-bold mt-0.5">{idx + 1}.</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

        {/* Supabase */}
        <StarableBlock moduleTitle={module?.title} user={user} starredCards={starredCards} blockId={`${module?.id}-sec-${158}`}>
      <section className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-8 shadow-sm border border-purple-200 dark:border-purple-900/50">
          <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
            <Code className="text-purple-500" /> {module.notes.supabase.title}
          </h2>
          <p className="text-purple-900 dark:text-purple-100/80 text-sm leading-relaxed mb-6 font-medium bg-purple-100/50 dark:bg-purple-900/30 p-4 rounded-xl border border-purple-200 dark:border-purple-800/50">
            {module.notes.supabase.intro}
          </p>
          <div className="space-y-3 bg-surface p-5 rounded-xl border border-purple-200 dark:border-purple-900/50">
            {module.notes.supabase.points.map((pt, idx) => (
              <p key={idx} className="text-purple-900 dark:text-purple-100/80 text-sm leading-relaxed flex items-start gap-3">
                <span className="text-purple-500 font-bold mt-0.5">â€¢</span>
                {pt}
              </p>
            ))}
          </div>
        </section>
    </StarableBlock>

      </div>
    );
  }

  return <div>Module content not found.</div>;
}


