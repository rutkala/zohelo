import React, { useState } from 'react';
import { Header } from './components/Header';
import { PulseSection } from './components/PulseSection';
import { MetricsSection } from './components/MetricsSection';
import { CompassSection } from './components/CompassSection';
import { ChroniclesSection } from './components/ChroniclesSection';
import { VaultSection } from './components/VaultSection';
import { ProductsSection } from './components/ProductsSection';
import { HeroConsultingSection } from './components/HeroConsultingSection';
import { Footer } from './components/Footer';
import { DataVisualizationModal } from './components/DataVisualizationModal';
import { ArticleModal } from './components/ArticleModal';
import { DatasetPreviewModal } from './components/DatasetPreviewModal';
import { MetricFlowModal } from './components/MetricFlowModal';
import { CommandPalette } from './components/CommandPalette';
import { MetricCardData, VoivodeshipData, ArticleItem, DatasetItem, ProductItem } from './types';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('top');
  
  // Modals state
  const [inspectMetric, setInspectMetric] = useState<MetricCardData | null>(null);
  const [isEacModalOpen, setIsEacModalOpen] = useState(false);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [exploreRegion, setExploreRegion] = useState<VoivodeshipData | undefined>(undefined);
  const [readArticle, setReadArticle] = useState<ArticleItem | null>(null);
  const [previewDataset, setPreviewDataset] = useState<DatasetItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenExploreVisualization = (selectedRegion?: VoivodeshipData) => {
    setExploreRegion(selectedRegion);
    setIsExploreModalOpen(true);
  };

  const handleDownloadDataset = (dataset: DatasetItem) => {
    // Trigger confetti
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#3B8B94', '#3A6FA4', '#10B981']
    });

    // Generate downloadable mock file payload
    const content = JSON.stringify(dataset.sampleData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataset.id}_export.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded ${dataset.title} (${dataset.format})`);
  };

  const handleSelectProduct = (product: ProductItem) => {
    // Scroll to consulting section to book demo or open exploration
    handleNavigate('consulting');
    showToast(`Selected "${product.name}". Consultation request ready below.`);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] text-[#24292E] flex flex-col selection:bg-[#3B8B94]/20 selection:text-[#18484F]">
      
      {/* 1. The Header matching Mockup */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEacModal={() => setIsEacModalOpen(true)}
      />

      {/* Main 8-Section Sequential Flow as mandated by PRD & Mockup */}
      <main className="flex-1">
        
        {/* 2. The Pulse: Live Ticker & Indicators */}
        <PulseSection
          onSelectIndicator={(ind) => {
            showToast(`Inspecting live quote for ${ind.name}`);
          }}
        />

        {/* 3. The Metrics: Declarative MetricFlow KPIs (GDP, Unemployment, Inflation) */}
        <MetricsSection
          onInspectMetric={(metric) => {
            setInspectMetric(metric);
            setIsEacModalOpen(true);
          }}
        />

        {/* 4. The Compass: Polish Regional Map + Public Finance Trends 2024-2025 */}
        <CompassSection
          onOpenExploreVisualization={handleOpenExploreVisualization}
        />

        {/* 5. The Chronicles / The Articles: Data Journalism & Research Papers */}
        <ChroniclesSection
          onOpenArticle={(article) => setReadArticle(article)}
        />

        {/* 6. The Vault / The Datasets: CSV, Parquet, Power BI, PDF Lakehouse Assets */}
        <VaultSection
          onPreviewDataset={(dataset) => setPreviewDataset(dataset)}
          onDownloadDataset={handleDownloadDataset}
        />

        {/* 7. The Products: Commercial Analytics Suites */}
        <ProductsSection
          onSelectProduct={handleSelectProduct}
        />

        {/* 8. The Hero Section / The Gateway: B2B Consulting & Radosław Utkała Profile */}
        <HeroConsultingSection
          onSubmitSuccess={() => {
            showToast('Consultation request transmitted to Radosław Utkała.');
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenEacModal={() => {
          setInspectMetric(null);
          setIsEacModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      
      {/* 1. Regional Analytics Studio Deep Dive */}
      <DataVisualizationModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
        initialVoivodeship={exploreRegion}
      />

      {/* 2. Full Article Reading Modal */}
      <ArticleModal
        article={readArticle}
        onClose={() => setReadArticle(null)}
      />

      {/* 3. Dataset Schema & DuckDB Query Modal */}
      <DatasetPreviewModal
        dataset={previewDataset}
        onClose={() => setPreviewDataset(null)}
        onDownload={handleDownloadDataset}
      />

      {/* 4. MetricFlow YAML & Everything-as-Code (EaC) Modal */}
      <MetricFlowModal
        isOpen={isEacModalOpen}
        metric={inspectMetric}
        onClose={() => {
          setIsEacModalOpen(false);
          setInspectMetric(null);
        }}
      />

      {/* 5. Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRegion={(r) => {
          setExploreRegion(r);
          setIsExploreModalOpen(true);
        }}
        onSelectArticle={(a) => setReadArticle(a)}
        onSelectDataset={(d) => setPreviewDataset(d)}
        onNavigateSection={handleNavigate}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24292E] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-2.5 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#3B8B94] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
