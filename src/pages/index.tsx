import React from 'react';
import { Link, PageProps } from 'gatsby';
import Layout from '../layouts/Layout';
import Image from '../components/Image';
import SEO from '../components/SEO';

interface IndexProps {}

const IndexPage: React.FC<PageProps<IndexProps>> = ({}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Link to="/posts/page/1">Posts</Link>
      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>
    </Layout>
  );
};

export default IndexPage;
