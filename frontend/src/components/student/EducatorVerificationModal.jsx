import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EducatorVerificationModal = ({ onClose }) => {
  const { backendUrl, getToken, setiseducator, fetchuserdata, navigate } = useContext(AppContext);
  const [educatorId, setEducatorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedKey = educatorId.replace(/^["']|["']$/g, '').trim();
    if (!trimmedKey) {
      setErrorMsg("Please enter the Educator ID");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Please login first");
        onClose();
        return;
      }

      console.log("Submitting Educator ID for verification:", trimmedKey);

      const { data } = await axios.post(
        `${backendUrl}/api/educator/update-role`,
        { educatorId: trimmedKey },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success || data.sucess) {
        toast.success(data.message || "Welcome! You are now an educator.");
        setiseducator(true);
        if (fetchuserdata) {
          await fetchuserdata();
        }
        onClose();
        navigate("/educator");
      } else {
        const msg = data.message || "Invalid Educator ID. Verification failed.";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to verify Educator ID";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 sm:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 mb-4 shadow-sm">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5"
              />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Educator Verification
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm max-w-xs">
            Enter the authorized Educator ID to activate your educator account and publish courses.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Educator ID / Secret Passkey
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={educatorId}
                onChange={(e) => {
                  setEducatorId(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Enter Educator ID"
                autoFocus
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs"
                tabIndex={-1}
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            {errorMsg && (
              <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMsg}
              </p>
            )}
            <p className="mt-2 text-[11px] text-slate-400 leading-normal">
              🔒 Common security ID configured in environment settings for instructor authorization.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !educatorId.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify & Become Educator</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EducatorVerificationModal;
