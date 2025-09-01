import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from "@/hooks/useLanguage.tsx"

// Força novo cache com versão atual
console.log('🚀 Carregando versão: 2025-01-30-02 - Build mais recente!');

// Limpar cache específico do Lovable se existir
if (typeof window !== 'undefined') {
  const lovableCacheKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('lovable') || key.includes('preview'))) {
      lovableCacheKeys.push(key);
    }
  }
  lovableCacheKeys.forEach(key => {
    console.log('🧹 Limpando cache:', key);
    localStorage.removeItem(key);
  });
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
