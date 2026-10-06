import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Download } from 'lucide-react';

export default function ResourceHub() {
  const resources = [
    { title: 'Tax Loss Harvesting Guide', type: 'PDF • 2.4 MB', icon: FileText },
    { title: 'Indian EPF vs PPF Analysis', type: 'Report • 1.1 MB', icon: BookOpen },
    { title: 'Index Fund Comparison 2026', type: 'PDF • 3.0 MB', icon: FileText },
  ];

  // Open a placeholder PDF in a new tab
  const fetchMaterialPDF = () => {
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white mb-4">Financial Material Hub</h2>
        <p className="text-slate-400">Instantly fetch deep-dive materials tailored to your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-sky-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <res.icon size={28} className="text-sky-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-1">{res.title}</h4>
              <p className="text-xs text-slate-500 font-medium mb-6">{res.type}</p>
            </div>
            {/* UPDATED: Functional PDF Fetch Button */}
            <button 
              onClick={fetchMaterialPDF}
              className="w-full py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-400 flex justify-center items-center gap-2 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors"
            >
              <Download size={14} /> Fetch Material
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}