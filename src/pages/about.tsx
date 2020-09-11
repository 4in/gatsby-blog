import React from 'react';
import Layout from '@/layouts/Layout';
import SEO from '@/components/SEO';

const About: React.FC = () => {
  return (
    <>
      <SEO title="About" />
      <Layout>
        <div>About Page</div>
      </Layout>
    </>
  );
};

export default About;
