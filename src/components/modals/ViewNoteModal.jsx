import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  Calendar,
  User,
  BookOpen,
  Share2,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ViewNoteModal({ note, isOpen, onClose }) {
  const { showToast } = useApp();
  const [modalTab, setModalTab] = useState('reading'); // 'reading' | 'ai_summary' | 'ai_quiz'
  
  // Interactive Quiz State
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen || !note) return null;

  const handleDownload = () => {
    showToast(`Downloading "${note.title}.pdf" (${note.fileSize})...`, 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Direct link to study note copied!', 'info');
    } else {
      showToast('Sharing link prepared!', 'info');
    }
  };

  // Curated AI Summary generator based on note
  const getAISummary = () => {
    return [
      {
        title: "Key Core Concept",
        text: `This unit covers fundamental principles of ${note.subject}. Critical for understanding data structures, mathematical integrity constraints, and computational optimization in software systems.`
      },
      {
        title: "High-Yield Viva & Exam Topics",
        bullets: [
          "Differences between relational operations and query algebra trees.",
          "Formal normalization stages (1NF to BCNF) to eliminate database anomalies.",
          "Time/Space complexity considerations for production system deployments."
        ]
      },
      {
        title: "5-Minute Memory Flash Points",
        bullets: [
          "Primary Key: Uniquely identifies each record; cannot contain NULL.",
          "Foreign Key: Enforces referential integrity between parent and child tables.",
          "Lossless Join Decomposition: Essential requirement when splitting relations into 3NF/BCNF."
        ]
      }
    ];
  };

  // Curated AI Quiz Questions
  const quizQuestions = [
    {
      id: 1,
      question: "Which normal form deals with removing Partial Dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 1,
      explanation: "2NF requires the relation to be in 1NF and all non-key attributes to be fully functionally dependent on the primary key."
    },
    {
      id: 2,
      question: "In Relational Algebra, which operation corresponds to Cartesian Product followed by a selection condition?",
      options: ["Natural Join", "Theta Join", "Projection", "Union"],
      correct: 1,
      explanation: "A Theta Join (θ-join) combines tuples from two relations based on an arbitrary comparison predicate (θ)."
    },
    {
      id: 3,
      question: "Can a Foreign Key column contain NULL values?",
      options: ["Yes, if not declared NOT NULL", "No, never", "Only in MySQL 5.7", "Only during transaction rollback"],
      correct: 0,
      explanation: "Foreign key constraints allow NULL values unless explicitly declared with NOT NULL constraint."
    },
    {
      id: 4,
      question: "What is the primary advantage of 3NF over BCNF in real-world database design?",
      options: ["Zero redundancy", "Guarantees dependency preservation", "Faster indexing", "Smaller disk size"],
      correct: 1,
      explanation: "3NF is always achievable with lossless join and dependency preservation, whereas BCNF may not always preserve all functional dependencies."
    },
    {
      id: 5,
      question: "Which operation is used to select specific columns/attributes in Relational Algebra?",
      options: ["Sigma (σ)", "Pi (π)", "Rho (ρ)", "Gamma (γ)"],
      correct: 1,
      explanation: "Pi (π) denotes Projection, which outputs only the specified attribute columns."
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    if (Object.keys(userAnswers).length < quizQuestions.length) {
      showToast('Please answer all 5 questions before submitting!', 'error');
      return;
    }
    setQuizSubmitted(true);
    let correctCount = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correctCount++;
    });
    showToast(`Quiz completed! You scored ${correctCount}/5 (${(correctCount/5)*100}%)`, 'success');
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const score = Object.keys(userAnswers).reduce((acc, qId) => {
    const q = quizQuestions.find(item => item.id === parseInt(qId));
    return acc + (q && userAnswers[qId] === q.correct ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-lg">
              {note.unit}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold text-slate-600 bg-slate-200/70 rounded-md">
              Sem {note.semester}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF ({note.fileSize})
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Note Metadata */}
        <div className="p-6 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{note.title}</h2>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500">
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              {note.subject}
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Uploaded by: <span className="font-semibold text-slate-700">{note.uploadedBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {note.date}
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setModalTab('reading')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                modalTab === 'reading'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Lecture Preview
            </button>
            <button
              onClick={() => setModalTab('ai_summary')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                modalTab === 'ai_summary'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI 5-Min Summary
            </button>
            <button
              onClick={() => setModalTab('ai_quiz')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                modalTab === 'ai_quiz'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              AI Practice Quiz (5 MCQs)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {/* TAB 1: READING PREVIEW */}
          {modalTab === 'reading' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Lecture Content & Formula Reference
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                  Verified Faculty Copy
                </span>
              </div>
              <pre className="font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed font-normal">
                {note.contentPreview}
              </pre>
            </div>
          )}

          {/* TAB 2: AI 5-MINUTE SUMMARY */}
          {modalTab === 'ai_summary' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl text-white shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                  <div>
                    <h4 className="text-sm font-bold">AI Study Notes Summarizer</h4>
                    <p className="text-[11px] text-purple-200">Synthesized 5-minute key points for exam quick revision</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-white/20 rounded-lg">
                  Instant Output
                </span>
              </div>

              {getAISummary().map((sec, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">{sec.title}</h5>
                  {sec.text && <p className="text-xs text-slate-700 leading-relaxed">{sec.text}</p>}
                  {sec.bullets && (
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-700">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: AI PRACTICE QUIZ (5 MCQS) */}
          {modalTab === 'ai_quiz' && (
            <div className="space-y-5">
              <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl text-white shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-emerald-300" />
                  <div>
                    <h4 className="text-sm font-bold">AI Automated Practice Test</h4>
                    <p className="text-[11px] text-emerald-200">5 High-Yield MCQs generated from this chapter</p>
                  </div>
                </div>
                {quizSubmitted && (
                  <span className="text-xs font-extrabold px-3 py-1 bg-white text-emerald-800 rounded-xl shadow-sm">
                    Score: {score} / 5
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {quizQuestions.map((q, idx) => {
                  const selected = userAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = isAnswered && selected === q.correct;
                  return (
                    <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <h5 className="text-xs font-bold text-slate-900">
                        Q{idx + 1}. {q.question}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (quizSubmitted) {
                            if (optIdx === q.correct) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-500 text-rose-900';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-indigo-100 border-indigo-500 text-indigo-900 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`p-2.5 text-xs rounded-xl border text-left transition-all ${btnStyle}`}
                            >
                              <span className="font-semibold text-slate-400 mr-2">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed flex items-start gap-2 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold">{isCorrect ? 'Correct! ' : 'Incorrect. '}</span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Answers
                </button>

                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                  >
                    Submit Test & Grade
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700">
                    Test Completed! Review answers above.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Downloaded by {note.downloadCount} students this semester</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
}
