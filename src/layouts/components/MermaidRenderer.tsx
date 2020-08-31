import React, { useEffect, useRef } from 'react';

interface MermaidRendererProps {
  content: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> & { assetsLoaded: boolean } = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!MermaidRenderer.assetsLoaded) {
    MermaidRenderer.assetsLoaded = true;
    const assetsScript = document.createElement('script');
    assetsScript.src = 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js';
    assetsScript.async = true;
    assetsScript.addEventListener(
      'load',
      () => {
        // @ts-ignore
        mermaid.init({}, '.mermaid-graph');
      },
      { once: true }
    );
    document.body.appendChild(assetsScript);
  }

  useEffect(() => {
    // @ts-ignore
    window.mermaid && window.mermaid.init({}, containerRef.current);
  }, []);

  return (
    <div className="mermaid-graph" ref={containerRef}>
      {content}
    </div>
  );
};

MermaidRenderer.assetsLoaded = false;

export default MermaidRenderer;
