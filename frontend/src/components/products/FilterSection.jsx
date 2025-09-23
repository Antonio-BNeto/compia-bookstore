import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true); // Começa aberto por padrão

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}