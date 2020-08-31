import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from './Layout';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MermaidRenderer from './components/MermaidRenderer';

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
        date(formatString: "YYYY-MM-DD HH:mm:ss")
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
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <i>Date: {data.mdx.frontmatter.date}</i>
      <MDXProvider components={{ pre: CodeBlock }}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export default PostLayout;
