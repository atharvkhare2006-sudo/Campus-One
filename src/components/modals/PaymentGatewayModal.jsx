import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  Building,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  payerType = 'Student', // 'Student' | 'Parent'
  studentName = 'Rohan Vishwakarma',
  rollNo = '0103CA231045',
  amount = 35000,
  course = 'BCA 3rd Semester'
}) {
  const { payStudentFees, showToast } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('student@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState(null);

  if (!isOpen) return null;

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const receipt = payStudentFees({
        rollNo: rollNo,
        amount: amount,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'Debit/Credit Card (Visa)' : 'Net Banking (HDFC/SBI)',
        termTitle: `${course} Term Fees`
      });
      setCompletedReceipt(receipt);
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    showToast(`Downloading Official Fee Receipt ${completedReceipt?.id}...`, 'info');
    setTimeout(() => {
      showToast('Fee Receipt PDF downloaded!', 'success');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <CreditCard className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Secure University Payment Gateway</h3>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  256-bit SSL
                </span>
              </div>
              <p className="text-xs text-indigo-200">Campus One Instant Fee Clearance & Receipt Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedReceipt ? (
          /* Payment Success & Receipt View */
          <div className="p-6 space-y-5 overflow-y-auto text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900">Fee Payment Successful!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Transaction settled & verified. Ledger updated across Student & Parent portals.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Official Receipt No:</span>
                <span className="font-mono font-bold text-slate-900">{completedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Candidate Name:</span>
                <strong className="text-slate-800">{studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roll / Enrollment No:</span>
                <span className="font-mono font-semibold">{rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fee Purpose:</span>
                <span className="font-semibold text-slate-800">{completedReceipt.type}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm">
                <span className="font-bold text-slate-800">Amount Paid:</span>
                <span className="font-black text-emerald-600">₹{amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Stamped Receipt (PDF)
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <form onSubmit={handleProcessPayment} className="p-6 space-y-5 overflow-y-auto">
            {/* Student & Dues Summary */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Paying For:</span>
                <strong className="text-slate-900">{studentName} ({rollNo})</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Course & Semester:</span>
                <span>{course}</span>
              </div>
              <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-1.5">
                <span>Payer Authorization:</span>
                <span className="font-semibold text-indigo-700">{payerType} Verified Account</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">Total Fee Payable:</span>
                <span className="text-2xl font-black text-emerald-600">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Instant Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Debit / Credit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-5 h-5 text-purple-600" />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Payment Method Details */}
            {paymentMethod === 'upi' && (
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                <label className="text-[11px] font-bold text-emerald-900 block">
                  Enter VPA / UPI ID (Google Pay / PhonePe / Paytm):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="flex-1 px-3 py-2 rounded-xl border border-emerald-300 text-xs font-semibold focus:outline-none bg-white text-slate-900"
                  />
                </div>
                <p className="text-[10px] text-emerald-700">
                  ⚡ Collect request will be simulated and approved instantly.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8821"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    defaultValue="12/28"
                    placeholder="MM/YY"
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                  <input
                    type="password"
                    defaultValue="829"
                    placeholder="CVV"
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Select Bank</label>
                <select className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white">
                  <option>State Bank of India (SBI)</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Punjab National Bank</option>
                </select>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] disabled:opacity-70"
              >
                <Lock className="w-3.5 h-3.5" />
                {isProcessing ? 'Verifying with Bank...' : `Pay ₹${amount.toLocaleString('en-IN')} Now`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
