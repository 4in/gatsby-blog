import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from './Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';

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

const PostLayout: React.FC<PageProps<PostLayoutProps>> = ({ data, ...props }) => {
  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <i>Date: {data.mdx.frontmatter.date}</i>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export default PostLayout;
