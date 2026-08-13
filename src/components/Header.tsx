import React, { useState } from 'react';
import { Search, Database, FileCode2, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenEacModal: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenEacModal,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Research', target: 'chronicles' },
    { label: 'Dashboards', target: 'compass' },
    { label: 'Products', target: 'products' },
    { label: 'The Vault', target: 'vault' },
    { label: 'Consulting', target: 'consulting' },
  ];

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F7F9]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Crisp Newsreader Serif */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('top')}
              className="group flex items-baseline space-x-2 text-left focus:outline-none"
            >
              <span className="font-serif-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#24292E] group-hover:text-[#3B8B94] transition-colors">
                Zohelo
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono-code font-semibold tracking-wider text-[#3B8B94] bg-[#3B8B94]/10 px-2 py-0.5 rounded">
                DATA LAKEHOUSE
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links matching Mockup (Research, Dashboards, Products, About...) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="text-sm font-medium text-slate-700 hover:text-[#3B8B94] transition-colors py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B8B94] transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Search / Command palette button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:border-[#3B8B94]/40 hover:text-[#3B8B94] shadow-xs transition-all cursor-pointer"
              title="Search indicators, regions and reports"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick Search</span>
              <kbd className="font-mono-code text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Jarvis / EaC Blueprint Trigger */}
            <button
              onClick={onOpenEacModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#3B8B94]/10 text-[#2C6E76] hover:bg-[#3B8B94] hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer border border-[#3B8B94]/20"
              title="Inspect Everything-as-Code (EaC) and MetricFlow YAML Architecture"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>EaC / MetricFlow</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-200/60"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-200/60 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#3B8B94] rounded-md"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col space-y-2 pt-1">
            <button
              onClick={() => {
                onOpenEacModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-lg bg-[#3B8B94] text-white text-xs font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Jarvis EaC & MetricFlow Blueprint</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
