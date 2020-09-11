import React from 'react';
import { graphql, Link, PageProps, withPrefix } from 'gatsby';
import Layout from '../layouts/Layout';
import { Helmet } from 'react-helmet';
import SEO from '../components/SEO';
import moment from 'moment';

interface PostsProps {
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          slug: string;
          date: string;
        };
        excerpt: string;
        timeToRead: number;
      };
    }[];
  };
}

interface PostsPageContext {
  skip: number;
  limit: number;
  page: number;
  totalPage: number;
}

export const query = graphql`
  query($skip: Int = 0, $limit: Int = 0) {
    allMdx(skip: $skip, limit: $limit, sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            title
            slug
            date
          }
          timeToRead
          excerpt
        }
      }
    }
  }
`;

const PostsPage: React.FC<PageProps<PostsProps, PostsPageContext>> = ({ data, pageContext }) => {
  if (!pageContext.page) {
    return (
      <Helmet>
        <meta httpEquiv="refresh" content={`0;url=${withPrefix('/posts/page/1')}`} />
      </Helmet>
    );
  }
  return (
    <Layout>
      <SEO title={`Posts Page ${pageContext.page}`} />
      <h3>
        Posts Page {pageContext.page}/{pageContext.totalPage}
      </h3>
      {data.allMdx.edges.map(post => (
        <div key={post.node.excerpt}>
          <p style={{ float: 'right' }}>
            {moment(post.node.frontmatter.date).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')}
          </p>
          <h3>{post.node.frontmatter.title}</h3>
          <Link style={{ float: 'right' }} to={`/posts/${post.node.frontmatter.slug}`}>
            Read: {post.node.timeToRead} min
          </Link>
          <p>{post.node.excerpt}</p>
          <hr />
        </div>
      ))}
      <ul>
        {pageContext.page > 1 && (
          <li>
            <Link to={`/posts/page/${pageContext.page - 1}`}>Prev</Link>
          </li>
        )}
        {pageContext.page < pageContext.totalPage && (
          <li>
            <Link to={`/posts/page/${pageContext.page + 1}`}>Next</Link>
          </li>
        )}
      </ul>
    </Layout>
  );
};

export default PostsPage;
