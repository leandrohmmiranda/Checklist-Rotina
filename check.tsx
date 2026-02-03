import React, { useState, useEffect } from 'react';
import { Sun, Moon, Calendar, Trash2, CheckCircle2, Circle, ChevronDown, ChevronUp, RefreshCw, Plus, X, Pencil, Save, ListPlus } from 'lucide-react';

interface Task { id: string; text: string; }
interface Section {
  id: string;
  title: string;
  iconType: 'sun' | 'moon' | 'calendar' | 'default';
  color: string;
  dayCode?: number;
  tasks: Task[];
}

const getIcon = (type: string, className: string) => {
  switch (type) {
    case 'sun': return <Sun className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'calendar': return <Calendar className={className} />;
    default: return <Circle className={className} />;
  }
};

export default function App() {
  const [sections, setSections] = useState<Section[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [today] = useState(new Date().getDay());
  const [newTaskText, setNewTaskText] = useState<Record<string, string>>({});
  const [newSectionTitle, setNewSectionTitle] = useState('');

  useEffect(() => {
    const sChecks = localStorage.getItem('l_checks');
    const sStruct = localStorage.getItem('l_struct');
    if (sChecks) setCheckedItems(JSON.parse(sChecks));
    if (sStruct) setSections(JSON.parse(sStruct));
    else setIsEditMode(true);
  }, []);

  useEffect(() => localStorage.setItem('l_checks', JSON.stringify(checkedItems)), [checkedItems]);
  useEffect(() => localStorage.setItem('l_struct', JSON.stringify(sections)), [sections]);

  const toggleCheck = (id: string) => !isEditMode && setCheckedItems(p => ({ ...p, [id]: !p[id] }));
  
  const addTask = (sId: string) => {
    const txt = newTaskText[sId]?.trim();
    if (!txt) return;
    const nId = `t_${Date.now()}`;
    setSections(p => p.map(s => s.id === sId ? { ...s, tasks: [...s.tasks, { id: nId, text: txt }] } : s));
    setNewTaskText(p => ({ ...p, [sId]: '' }));
  };

  const removeTask = (sId: string, tId: string) => {
    setSections(p => p.map(s => s.id === sId ? { ...s, tasks: s.tasks.filter(t => t.id !== tId) } : s));
    setCheckedItems(p => { const n = { ...p }; delete n[tId]; return n; });
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    const nS: Section = {
      id: `s_${Date.now()}`,
      title: newSectionTitle,
      iconType: 'default',
      color: 'border-slate-400',
      tasks: []
    };
    setSections(p => [...p, nS]);
    setNewSectionTitle('');
  };

  const removeSection = (sId: string) => {
    setSections(p => p.filter(s => s.id !== sId));
  };

  const resetAll = () => setCheckedItems({});

  return (
    <div className={`min-h-screen pb-10 ${isEditMode ? 'bg-slate-100' : 'bg-slate-50'}`}>
      <header className="bg-white shadow-sm sticky top-0 z-20 p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Rotina {isEditMode && " (Edição)"}</h1>
          <button onClick={() => setIsEditMode(!isEditMode)} className="p-2 bg-slate-100 rounded-full">
            {isEditMode ? <Save size={20} /> : <Pencil size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {sections.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border-l-4 shadow-sm ${s.color}`}>
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => setExpandedSections(p => ({...p, [s.id]: !p[s.id]}))}>
                {getIcon(s.iconType, "text-slate-400")}
                <span className="font-bold">{s.title}</span>
              </div>
              {isEditMode ? (
                <button onClick={() => removeSection(s.id)} className="p-2 text-red-500"><Trash2 size={18}/></button>
              ) : (
                <button onClick={() => setExpandedSections(p => ({...p, [s.id]: !p[s.id]}))}>
                  {expandedSections[s.id] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
              )}
            </div>

            {expandedSections[s.id] && (
              <div className="bg-slate-50 border-t">
                {s.tasks.map(t => (
                  <div key={t.id} className="flex items-center p-3 border-b last:border-0 gap-3">
                    <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => toggleCheck(t.id)}>
                      {!isEditMode && (checkedItems[t.id] ? <CheckCircle2 className="text-emerald-500"/> : <Circle className="text-slate-300"/>)}
                      <span className={`${checkedItems[t.id] && !isEditMode ? 'line-through text-slate-400' : ''}`}>{t.text}</span>
                    </div>
                    {isEditMode && (
                      <button onClick={() => removeTask(s.id, t.id)} className="p-2 text-slate-400 hover:text-red-500">
                        <X size={18}/>
                      </button>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <div className="p-3 flex gap-2">
                    <input className="flex-1 p-2 border rounded text-sm" value={newTaskText[s.id] || ''} onChange={e => setNewTaskText(p => ({...p, [s.id]: e.target.value}))} placeholder="Nova tarefa..."/>
                    <button onClick={() => addTask(s.id)} className="p-2 bg-emerald-500 text-white rounded"><Plus size={18}/></button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isEditMode && (
          <div className="p-4 border-2 border-dashed rounded-xl space-y-2">
            <input className="w-full p-2 border rounded" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} placeholder="Título da categoria..."/>
            <button onClick={addSection} className="w-full p-2 bg-slate-800 text-white rounded">Criar Categoria</button>
          </div>
        )}

        {!isEditMode && sections.length > 0 && (
          <button onClick={resetAll} className="w-full p-4 bg-white border rounded-xl text-red-500 font-bold">Resetar Tudo</button>
        )}
      </main>
    </div>
  );
}
