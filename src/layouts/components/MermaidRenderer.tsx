import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/core';

interface MermaidRendererProps {
  content: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> & { assetsLoaded: boolean } = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (typeof window.mermaid === 'undefined' && !MermaidRenderer.assetsLoaded) {
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
    } else {
      // @ts-ignore
      window.mermaid && window.mermaid.init({}, containerRef.current);
    }
  }, []);

  return (
    <div
      className="mermaid-graph"
      css={css`
        text-align: center;

        & > svg {
          max-width: 100%;
        }
      `}
      ref={containerRef}
    >
      {content}
    </div>
  );
};

MermaidRenderer.assetsLoaded = false;

export default MermaidRenderer;
