import React from 'react';
import { graphql, Link, PageProps, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

interface PostsProps {
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          slug: string;
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
  total: number;
}

export const query = graphql`
  query($skip: Int = 0, $limit: Int = 0) {
    allMdx(skip: $skip, limit: $limit) {
      edges {
        node {
          frontmatter {
            title
            slug
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
    <div>
      <Link to="/">Home</Link>
      <h3>Posts Page</h3>
      {data.allMdx.edges.map(post => (
        <div key={post.node.excerpt}>
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
        {pageContext.page < pageContext.total && (
          <li>
            <Link to={`/posts/page/${pageContext.page + 1}`}>Next</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PostsPage;
