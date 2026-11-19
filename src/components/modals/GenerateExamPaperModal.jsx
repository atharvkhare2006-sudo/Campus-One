import React, { useState } from 'react';
import {
  X,
  FileQuestion,
  Sparkles,
  Download,
  Copy,
  Printer,
  CheckCircle2,
  BookOpen,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GenerateExamPaperModal({ isOpen, onClose }) {
  const { subjects, showToast, authenticatedSessions, currentCollege } = useApp();
  const activeFaculty = authenticatedSessions?.faculty;
  const activeCollege = authenticatedSessions?.college_admin || currentCollege;

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Database Management Systems (DBMS)');
  const [examType, setExamType] = useState('Mid-Term Exam 1 (20 Marks)');
  const [difficulty, setDifficulty] = useState('Bloom Taxonomy Balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      if (selectedSubject.includes('Database') || selectedSubject.includes('DBMS')) {
        setGeneratedPaper({
          title: 'Department of Computer Applications • BCA 3rd Semester',
          college: activeCollege?.name || 'Apex Institute of Technology & Management',
          subject: selectedSubject,
          code: 'BCA-301',
          time: '1 Hour 30 Minutes',
          maxMarks: examType.includes('20') ? 20 : 50,
          faculty: activeFaculty?.name || 'Dr. Ananya Pandey',
          sectionA: [
            { no: 'Q1(a)', text: 'Define 2NF (Second Normal Form) and explain how partial dependency is resolved.', marks: 2, bloom: 'L2 (Understand)' },
            { no: 'Q1(b)', text: 'What are the ACID properties in transaction processing? Explain Atomicity with a banking example.', marks: 2, bloom: 'L1 (Remember)' },
            { no: 'Q1(c)', text: 'Differentiate between WHERE and HAVING clause in SQL with sample syntax.', marks: 2, bloom: 'L2 (Understand)' }
          ],
          sectionB: [
            { no: 'Q2', text: 'Given relation R(A, B, C, D, E) with Functional Dependencies: {A -> BC, CD -> E, B -> D}. Find all candidate keys and determine the highest normal form of R.', marks: 7, bloom: 'L4 (Analyze)' },
            { no: 'Q3', text: 'Construct a complete Entity-Relationship (ER) diagram for a University Examination System including Cardinality ratios and Primary Keys.', marks: 7, bloom: 'L5 (Evaluate / Create)' }
          ],
          answerRubric: 'Rubrics: Correct Candidate key deduction (3 marks), Step-by-step 2NF/3NF test (2 marks), Final normalization justification (2 marks).'
        });
      } else {
        setGeneratedPaper({
          title: 'Department of Computer Applications • BCA 3rd Semester',
          college: activeCollege?.name || 'Apex Institute of Technology & Management',
          subject: selectedSubject,
          code: 'BCA-302',
          time: '1 Hour 30 Minutes',
          maxMarks: examType.includes('20') ? 20 : 50,
          faculty: activeFaculty?.name || 'Dr. Ananya Pandey',
          sectionA: [
            { no: 'Q1(a)', text: 'Explain the difference between call by value and call by reference in C++ with memory diagram.', marks: 2, bloom: 'L2 (Understand)' },
            { no: 'Q1(b)', text: 'What is a Virtual Destructor and why is it needed when using base class pointers?', marks: 2, bloom: 'L2 (Understand)' },
            { no: 'Q1(c)', text: 'Analyze the worst-case and average-case time complexity of QuickSort.', marks: 2, bloom: 'L4 (Analyze)' }
          ],
          sectionB: [
            { no: 'Q2', text: 'Implement a C++ template class for a Doubly Linked List with insertAtEnd() and deleteNode() methods.', marks: 7, bloom: 'L3 (Apply)' },
            { no: 'Q3', text: 'Explain runtime polymorphism using pure virtual functions and abstract classes with a complete working code example.', marks: 7, bloom: 'L5 (Evaluate / Design)' }
          ],
          answerRubric: 'Rubrics: Correct class structure (2 marks), Dynamic memory management (3 marks), Syntax & clean pointers (2 marks).'
        });
      }

      showToast(`Bloom's Taxonomy Exam Paper generated for ${selectedSubject}!`, 'success');
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!generatedPaper) return;
    const text = `${generatedPaper.college}\n${generatedPaper.title}\nSubject: ${generatedPaper.subject} (${generatedPaper.code})\nMax Marks: ${generatedPaper.maxMarks}\n\nSection A:\n${generatedPaper.sectionA.map(q => `${q.no} [${q.marks}M] ${q.text} (${q.bloom})`).join('\n')}\n\nSection B:\n${generatedPaper.sectionB.map(q => `${q.no} [${q.marks}M] ${q.text} (${q.bloom})`).join('\n')}`;
    navigator.clipboard.writeText(text);
    showToast('Question paper copied to clipboard!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <FileQuestion className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Exam Paper & Rubrics Architect</h3>
              <p className="text-xs text-purple-200">Bloom's Taxonomy Compliant Automated Test Paper Generator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Generation Config Controls */}
          <form onSubmit={handleGenerate} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Evaluation Tier</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="Mid-Term Exam 1 (20 Marks)">Mid-Term Exam (20 Marks)</option>
                  <option value="Pre-University Sessional (50 Marks)">Pre-University Sessional (50 Marks)</option>
                  <option value="Lab Practical Viva Quiz (15 Marks)">Lab Practical Viva Quiz (15 Marks)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Taxonomy Weightage</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="Bloom Taxonomy Balanced">Balanced (L1: 30%, L3: 40%, L5: 30%)</option>
                  <option value="High Order Thinking (HOTS)">HOTS Oriented (L4-L6 Heavy)</option>
                  <option value="Remedial / Foundation">Foundation / Basic Recall</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] disabled:opacity-70"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGenerating ? 'Synthesizing Questions...' : '⚡ Generate Bloom Exam Paper'}
              </button>
            </div>
          </form>

          {/* Generated Question Paper Sheet Preview */}
          {generatedPaper && (
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-md space-y-4 font-serif text-slate-900 print:border-none print:shadow-none">
              {/* Paper Header */}
              <div className="text-center border-b-2 border-slate-800 pb-3">
                <h4 className="text-sm font-black uppercase tracking-wider">{generatedPaper.college}</h4>
                <p className="text-xs font-bold">{generatedPaper.title}</p>
                <div className="flex items-center justify-between text-xs mt-2 font-mono font-bold">
                  <span>Subject: {generatedPaper.subject} ({generatedPaper.code})</span>
                  <span>Max Marks: {generatedPaper.maxMarks}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-sans mt-0.5">
                  <span>Time Allowed: {generatedPaper.time}</span>
                  <span>Paper Setter: {generatedPaper.faculty}</span>
                </div>
              </div>

              {/* Section A */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold font-sans uppercase border-b border-slate-200 pb-1 mb-2">
                  <span>Section A: Short Conceptual Questions (Attempt All)</span>
                  <span>[6 Marks]</span>
                </div>
                <div className="space-y-2 text-xs">
                  {generatedPaper.sectionA.map((q, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3">
                      <div>
                        <strong>{q.no}.</strong> {q.text}
                        <span className="ml-1.5 font-sans font-bold text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                          {q.bloom}
                        </span>
                      </div>
                      <span className="font-mono font-bold shrink-0">[{q.marks}M]</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section B */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold font-sans uppercase border-b border-slate-200 pb-1 mb-2">
                  <span>Section B: Analytical Problem Solving & Design</span>
                  <span>[14 Marks]</span>
                </div>
                <div className="space-y-3 text-xs">
                  {generatedPaper.sectionB.map((q, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3">
                      <div>
                        <strong>{q.no}.</strong> {q.text}
                        <span className="ml-1.5 font-sans font-bold text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                          {q.bloom}
                        </span>
                      </div>
                      <span className="font-mono font-bold shrink-0">[{q.marks}M]</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marking Rubric Box */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] font-sans text-amber-900">
                <strong>Examiner Marking Rubric:</strong> {generatedPaper.answerRubric}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 font-medium">
            Aligns with NEP 2020 Continuous Internal Assessment (CIA) rules.
          </div>
          <div className="flex items-center gap-2">
            {generatedPaper && (
              <>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / PDF Export
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
