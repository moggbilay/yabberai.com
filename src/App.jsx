import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Menu, X, Globe, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import './App.css';
import yabberLogo from './assets/yabber-logo.svg';
import yabberLogoText from './assets/yabber-logo-text.svg';
import screenshot1 from './assets/screenshot-1.png';
import screenshot2 from './assets/screenshot-2.png';
import screenshot3 from './assets/screenshot-3.png';

// Language content
const content = {
  en: {
    nav: {
      github: 'GitHub',
      linkedin: 'LinkedIn',
      download: 'Download'
    },
    hero: {
      title: 'Private AI That Understands You',
      highlight: 'Peronalized for you',
      subtitle: 'Available for macOS and Windows'
    },
    features: {
      title: 'Powerful AI workspaces for every task',
      cards: [
        {
          title: 'Start conversations',
          description: 'Select a workspace and load documents to begin chatting with your AI assistant'
        },
        {
          title: 'Specialized workspaces',
          description: 'Choose from Coding, Writing, Academic, Math, and Custom workspaces optimized for your needs'
        },
        {
          title: 'Document analysis',
          description: 'Analyze documents with RAG capabilities and get intelligent responses about your content'
        }
      ]
    },
    download: {
      title: 'Download Yabber',
      macos: 'macOS',
      windows: 'Windows',
      macosBtn: 'Download for macOS',
      windowsBtn: 'Download for Windows',
      macosReq: 'Requires macOS 11 or later',
      windowsReq: 'Requires Windows 10 or later'
    },
    ollama: {
      title: 'Ollama Support',
      description: 'Yabber works seamlessly with Ollama models. Download and run popular models like Llama, Mistral, and Gemma locally on your machine.',
      features: [
        'Compatible with all Ollama models',
        'Local model execution',
        'Easy model management',
        'Offline capabilities'
      ]
    },
    footer: {
      copyright: '© 2025 Yabber. All rights reserved.',
      website: 'Visit yabberai.org'
    }
  },
  ar: {
    nav: {
      github: 'GitHub',
      linkedin: ' LinkedIn',
      download: 'تحميل'
    },
    hero: {
      title: 'تحدث وابني مع',
      highlight: 'النماذج المفتوحة',
      subtitle: 'متاح لنظامي macOS و Windows'
    },
    features: {
      title: 'مساحات عمل ذكية قوية لكل مهمة',
      cards: [
        {
          title: 'ابدأ المحادثات',
          description: 'اختر مساحة عمل وحمّل المستندات لبدء المحادثة مع مساعدك الذكي'
        },
        {
          title: 'مساحات عمل متخصصة',
          description: 'اختر من بين البرمجة والكتابة والأكاديمية والرياضيات ومساحات العمل المخصصة المحسّنة لاحتياجاتك'
        },
        {
          title: 'تحليل المستندات',
          description: 'حلل المستندات بقدرات RAG واحصل على ردود ذكية حول محتواك'
        }
      ]
    },
    download: {
      title: 'تحميل جـابر',
      macos: 'ماك أو إس',
      windows: 'ويندوز',
      macosBtn: 'تحميل لنظام macOS',
      windowsBtn: 'تحميل لنظام Windows',
      macosReq: 'يتطلب macOS 11 أو أحدث',
      windowsReq: 'يتطلب Windows 10 أو أحدث'
    },
    ollama: {
      title: 'دعم Ollama',
      description: 'يعمل جـابر بسلاسة مع نماذج أولاما. حمّل وشغّل النماذج الشائعة مثل لاما وميسترال وجيما محلياً على جهازك.',
      features: [
        'متوافق مع جميع نماذج أولاما',
        'تشغيل النماذج محلياً',
        'إدارة سهلة للنماذج',
        'قدرات العمل بدون اتصال'
      ]
    },
    footer: {
      copyright: '© 2025 جـابر. جميع الحقوق محفوظة.',
      website:  'yabberai.org'
    }
  }
};

// OS Icons Component
const OSIcon = ({ os, className = "w-6 h-6" }) => {
  if (os === 'macos') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    );
  }
  
  if (os === 'windows') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
      </svg>
    );
  }
  
  return <Monitor className={className} />;
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [selectedOS, setSelectedOS] = useState('mac');

  const t = content[language];
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen bg-white text-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={yabberLogo} alt="Yabber" className="h-16 w-16" />
              <span className="text-2xl font-bold text-gray-900">
                
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
              
              <a 
                href="https://github.com/moggbilay/yabberai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-lg font-medium transition-all duration-200 hover:shadow-md bg-white hover:bg-gray-50 text-gray-700"
              >
                <Github className="w-4 h-4" />
                <span>{t.nav.github}</span>
              </a>
              <a 
                href="https://sa.linkedin.com/in/mogbilay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-500 rounded-lg font-medium transition-all duration-200 hover:shadow-md bg-white hover:bg-blue-50 text-blue-600"
              >
                <Linkedin className="w-4 h-4" />
                <span>{t.nav.linkedin}</span>
              </a>
              <a 
                href="#download"
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {t.nav.download}
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4" />
              </Button>
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-4 py-2 space-y-2">
              <a href="https://github.com/moggbilay/yabberai.com" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Github className="w-4 h-4" />
                <span>{t.nav.github}</span>
              </a>
              <a href="https://sa.linkedin.com/in/mogbilay" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Linkedin className="w-4 h-4" />
                <span>{t.nav.linkedin}</span>
              </a>
              <a href="#download" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>{t.nav.download}</span>
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Large Logo Display */}
            <div className="mb-12">
              <img src={yabberLogoText} alt="Yabber" className="h-92 w-92 mx-auto mb-8" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
              {t.hero.title}<br />
              <span className="text-blue-600">{t.hero.highlight}</span>
            </h1>
            
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a
                href="#download"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                {t.nav.download}
              </a>
              <p className="text-gray-600 mt-4">{t.hero.subtitle}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900">
              {t.features.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.features.cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={[screenshot1, screenshot2, screenshot3][index]} 
                    alt={card.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Section - Ollama Style */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              {t.download.title}
            </h2>
            
            {/* OS Selection Boxes - Ollama Style */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                className={`flex flex-col items-center justify-center w-32 h-24 border-2 rounded-lg transition-all duration-200 ${
                  selectedOS === 'mac' 
                    ? 'border-red-400 bg-red-50 text-red-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
                onClick={() => setSelectedOS('mac')}
              >
                <OSIcon os="macos" className="w-8 h-8 mb-2" />
                <span className="font-medium">{t.download.macos}</span>
              </button>
              
              <button
                className={`flex flex-col items-center justify-center w-32 h-24 border-2 rounded-lg transition-all duration-200 ${
                  selectedOS === 'windows' 
                    ? 'border-blue-400 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
                onClick={() => setSelectedOS('windows')}
              >
                <OSIcon os="windows" className="w-8 h-8 mb-2" />
                <span className="font-medium">{t.download.windows}</span>
              </button>
            </div>
            
            {/* Download Button */}
            <div className="mb-8">
              {selectedOS === 'mac' ? (
                <div>
                  <a
                    href="#"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-block mb-2"
                  >
                    {t.download.macosBtn}
                  </a>
                  <p className="text-gray-600 text-sm">{t.download.macosReq}</p>
                </div>
              ) : (
                <div>
                  <a
                    href="#"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-block mb-2"
                  >
                    {t.download.windowsBtn}
                  </a>
                  <p className="text-gray-600 text-sm">{t.download.windowsReq}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ollama Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t.ollama.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t.ollama.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {t.ollama.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-left">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={yabberLogo} alt="Yabber" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Yabber</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://yabberai.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                {t.footer.website}
              </a>
              <a
                href="https://github.com/moggbilay/yabberai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://sa.linkedin.com/in/mogbilay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
