import React, { useState } from "react";
import { Sparkles, Send, Loader2, TrendingUp, DollarSign, BarChart3, Zap } from "lucide-react";

const WealthQueryInterface = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const handleQuery = async () => {
    try {
      setLoading(true);
      setResponse(null);
      const res = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("[ERROR] Fetch:", error);
      setResponse({ error: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What are the top 5 portfolios of our wealth members",
    "Give me the breakup of portfolio values per relationship manager.",
    "Tell me the top relationship managers in my firm",
    "List all investments made in the last 7 days.",
  ];

  const renderValue = (val) => {
    if (typeof val === "object") return JSON.stringify(val);
    return val;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col md:flex-row items-start justify-center p-4 gap-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-3xl transition-all duration-500 hover:shadow-3xl border border-white/20 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-3 rounded-2xl shadow-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Wealth Query Assistant
            </h1>
            <p className="text-gray-300 text-sm mt-1">AI-powered financial insights at your fingertips</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 text-sm mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white text-xs transition-all duration-300 hover:scale-105 border border-white/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className={`relative transition-all duration-300 ${focusedInput ? 'scale-[1.02]' : ''}`}>
          <textarea
            className="w-full p-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/20 mb-6 resize-none text-white placeholder-gray-300 transition-all duration-300 hover:bg-white/15"
            placeholder="Ask something like: 'Show top 5 portfolios' or 'Analyze my investment performance'"
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={handleQuery}
            disabled={loading || !query.trim()}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:hover:scale-100 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              )}
              {loading ? "Processing..." : "Submit Query"}
            </div>
          </button>
        </div>

        {response && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-cyan-400 w-5 h-5" />
              <h2 className="text-xl font-semibold text-white">Analysis Results:</h2>
            </div>

            {response.error ? (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">⚠️</span>
                  {response.error}
                </div>
              </div>
            ) : Array.isArray(response) && response.length > 0 ? (
              <div className="overflow-x-auto bg-white/10 p-4 rounded-xl">
                <table className="w-full table-auto text-white text-sm">
                  <thead>
                    <tr>
                      {Object.keys(response[0]).map((key) => (
                        <th key={key} className="px-4 py-2 text-left border-b border-white/20 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {response.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="px-4 py-2 border-b border-white/10">
                            {renderValue(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <pre className="text-gray-200 text-sm overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submission Info Panel */}
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-6 w-full max-w-sm transition-all duration-500 hover:shadow-3xl border border-white/20 relative z-10 mt-8 md:mt-0">
        <h2 className="text-xl font-semibold text-white mb-4">📤 Submission Info</h2>
        <div className="grid gap-4">
          <input type="url" defaultValue="https://github.com/PrinceKeshri966/Natural-Language-Cross-Platform-Data-Query-RAG-Agent" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300" required />
          <input type="url" defaultValue="https://drive.google.com/file/d/1KEWKWWR02hdQbUTTFk6gGXS4fj8Rau0Y/view?usp=sharing" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300" required />
          <input type="url" placeholder="Prototype Link (Optional)" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300" />
          <textarea placeholder="Remarks (Optional)" rows="3" className="p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300"></textarea>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WealthQueryInterface;
