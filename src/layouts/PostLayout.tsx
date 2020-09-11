import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from './Layout';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MermaidRenderer from './components/MermaidRenderer';
import SEO from '../components/SEO';
import moment from 'moment';

interface PostLayoutProps {
  mdx: {
    body: string;
    frontmatter: {
      title: string;
      date: string;
    };
  };
}

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`;

const CodeBlock = props => {
  const { mdxType, className, children } = props.children.props;
  if (mdxType === 'code' && className === 'language-mermaid') {
    return <MermaidRenderer content={children} />;
  }
  return <pre>{props.children}</pre>;
};

const PostLayout: React.FC<PageProps<PostLayoutProps>> = ({ data, ...props }) => {
  return (
    <>
      <SEO title={data.mdx.frontmatter.title} />
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <span style={{ display: 'block', fontStyle: 'italic', marginBottom: 30 }}>
          Date: {moment(data.mdx.frontmatter.date).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')}
        </span>
        <MDXProvider components={{ pre: CodeBlock }}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Layout>
    </>
  );
};

export default PostLayout;
