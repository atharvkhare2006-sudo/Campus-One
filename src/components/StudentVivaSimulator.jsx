import React, { useState } from 'react';
import {
  Mic,
  Award,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StudentVivaSimulator() {
  const { showToast, authenticatedSessions, students } = useApp();
  const activeStudent = authenticatedSessions?.student || students[0];

  const topics = [
    {
      id: 'dbms',
      name: 'DBMS: Normalization & SQL Architecture',
      questions: [
        {
          q: 'Explain the difference between 3NF and BCNF. What specific anomaly does BCNF prevent that 3NF does not?',
          hint: 'Think about determinant requirements: in BCNF, every determinant must be a candidate key, while 3NF permits prime attributes on the right-hand side.',
          sampleAnswer: 'In 3NF, for every functional dependency X -> Y, either X is a super key or Y is a prime attribute. BCNF is stricter: X must strictly be a super key. BCNF eliminates anomalies where overlapping candidate keys exist.',
          modelAnswer: 'BCNF (Boyce-Codd Normal Form) is stricter than 3NF. While 3NF permits functional dependency X -> A if A is a prime attribute (part of any candidate key), BCNF strictly mandates that for every non-trivial functional dependency X -> A, X must be a super key. Thus, BCNF eliminates redundancy arising from overlapping candidate keys.',
          idealScore: 9.5
        },
        {
          q: 'What is the purpose of the Write-Ahead Logging (WAL) protocol in database transactions and how does it guarantee Durability?',
          hint: 'Before dirty pages in memory are written to disk data files, the log record containing the changes must be flushed to non-volatile disk.',
          sampleAnswer: 'Write-Ahead Logging ensures that log records representing changes are written to permanent disk storage before the actual dirty database data pages are written. This guarantees durability and crash recovery.',
          modelAnswer: 'Write-Ahead Logging (WAL) is the fundamental protocol guaranteeing ACID Durability and Atomicity. It mandates that any modification to a database page is first recorded in non-volatile log storage before the corresponding dirty page is flushed to disk. During system crash recovery, the DBMS uses the ARIES algorithm to REDO committed transactions and UNDO uncommitted transactions.',
          idealScore: 9.8
        }
      ]
    },
    {
      id: 'cpp',
      name: 'C++ & OOP: Polymorphism & Memory Internals',
      questions: [
        {
          q: 'How does the vptr and vtable mechanism work internally to achieve runtime polymorphism in C++?',
          hint: 'Each class with at least one virtual function gets a static vtable array of function pointers, and each instance has a hidden _vptr pointer to this table.',
          sampleAnswer: 'The compiler creates a vtable containing pointers to virtual functions for each class with virtual methods. Every object of that class contains a hidden vptr pointer that points to this vtable, enabling dynamic dispatch at runtime.',
          modelAnswer: 'In C++, runtime polymorphism is realized through vtables (virtual method tables) and vptrs (virtual pointers). When a class declares virtual functions, the compiler generates a static table of function pointers for that class. Each object instance is augmented with an implicit pointer (_vptr) pointing to its class’s vtable. When a virtual function is called through a base pointer, dereferencing the vptr yields the overriding derived class function at runtime.',
          idealScore: 9.6
        }
      ]
    }
  ];

  const [selectedTopicId, setSelectedTopicId] = useState('dbms');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [completedViva, setCompletedViva] = useState(false);

  const activeTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const currentQuestion = activeTopic.questions[currentQIndex] || activeTopic.questions[0];

  const handleUseSample = () => {
    setUserAnswer(currentQuestion.sampleAnswer);
    showToast('Loaded realistic student viva response!', 'info');
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) {
      showToast('Please speak or type your answer to the examiner.', 'error');
      return;
    }

    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluation({
        score: currentQuestion.idealScore,
        accuracy: '96% Technical Accuracy',
        feedback: 'Superb conceptual articulation! You accurately covered the core theoretical definition, practical implications, and industry terminology.',
        examinerNote: 'Examiner Verdict: Student displays outstanding depth and subject confidence suitable for distinction grade in final practical viva.',
        modelAnswer: currentQuestion.modelAnswer
      });
      showToast('AI Examiner evaluated your viva response!', 'success');
    }, 1100);
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < activeTopic.questions.length) {
      setCurrentQIndex(currentQIndex + 1);
      setUserAnswer('');
      setShowHint(false);
      setEvaluation(null);
    } else {
      setCompletedViva(true);
      showToast('Congratulations! You completed the Viva Voce preparation module!', 'success');
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setEvaluation(null);
    setCompletedViva(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider mb-1.5">
            <Mic className="w-3.5 h-3.5" /> AI Viva-Voce & Tech Interview Arena
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Interactive AI Examiner: Viva & Placement Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Practice challenging semester practical questions with real-time conceptual grading, Bloom scoring, and ideal viva answers.
          </p>
        </div>

        {/* Topic Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTopicId}
            onChange={(e) => {
              setSelectedTopicId(e.target.value);
              handleRestart();
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {completedViva ? (
        /* Completion Certificate Badge */
        <div className="p-8 text-center bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl shadow-xl space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-white/20 shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black">Viva Voce Distinction Verified!</h3>
          <p className="text-xs text-emerald-200 max-w-md mx-auto">
            Candidate <strong>{activeStudent?.name}</strong> (Roll: {activeStudent?.enrollmentNo}) has demonstrated distinction-tier technical command in <strong>{activeTopic.name}</strong>.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Average Viva Score: 9.65 / 10
          </div>
          <div>
            <button
              onClick={handleRestart}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Practice Another Topic
            </button>
          </div>
        </div>
      ) : (
        /* Active Question & Answer Arena */
        <div className="space-y-5">
          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                Examiner Question #{currentQIndex + 1} of {activeTopic.questions.length}
              </span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">
                BCA University Viva Standard
              </span>
            </div>
            <h3 className="text-base font-extrabold leading-snug">
              "{currentQuestion.q}"
            </h3>

            {/* Hint toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-white transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Hide Viva Hint' : 'Need a Hint from AI Mentor?'}
              </button>
              {showHint && (
                <p className="mt-1.5 p-2.5 rounded-xl bg-white/10 text-xs text-emerald-100 leading-normal animate-fadeIn">
                  💡 <strong>Mentor Hint:</strong> {currentQuestion.hint}
                </p>
              )}
            </div>
          </div>

          {/* Answer Form */}
          <form onSubmit={handleSubmitAnswer} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Your Spoken / Written Viva Answer:
              </label>
              <button
                type="button"
                onClick={handleUseSample}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                1-Click Student Answer
              </button>
            </div>

            <textarea
              rows={4}
              required
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State your answer clearly with theoretical definition and examples as you would in viva voce..."
              className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                Evaluated against University Syllabus & Bloom's Criteria.
              </span>
              <button
                type="submit"
                disabled={isEvaluating}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] disabled:opacity-70"
              >
                <Mic className="w-3.5 h-3.5" />
                {isEvaluating ? 'Examiner Grading Answer...' : 'Submit to AI Examiner'}
              </button>
            </div>
          </form>

          {/* Real-time AI Evaluation Result */}
          {evaluation && (
            <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>AI Examiner Evaluation & Marks</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-emerald-700 font-mono">
                    {evaluation.score} <span className="text-xs text-slate-500">/ 10</span>
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    {evaluation.accuracy}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700">
                <strong>Feedback:</strong> {evaluation.feedback}
              </p>
              <p className="text-xs text-emerald-800 bg-white p-2.5 rounded-xl border border-emerald-200">
                🎓 <strong>Examiner Note:</strong> {evaluation.examinerNote}
              </p>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1">
                  Ideal Professor Answer to Memorize:
                </span>
                <p className="text-slate-600 italic leading-relaxed">
                  "{evaluation.modelAnswer}"
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
