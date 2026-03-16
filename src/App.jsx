import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubActivity from './components/GithubActivity';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ColorCustomizer from './components/ColorCustomizer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Theme toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scrollValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!isAppLoaded && <Loader onLoaded={() => setIsAppLoaded(true)} />}

      <div className={`app-container ${isAppLoaded ? 'app-enter' : ''}`} style={{ opacity: isAppLoaded ? 1 : 0, transition: 'opacity 0.8s ease-in' }}>
        <CustomCursor />
        <div className="scroll-progress" style={{ width: scrollProgress }}></div>
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <ColorCustomizer />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GithubActivity />
          <Resume />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
