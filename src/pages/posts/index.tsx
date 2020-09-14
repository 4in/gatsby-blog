import React from 'react';
import { graphql, Link, PageProps, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '@/layouts/Layout';
import SEO from '@/components/SEO';
import Pagination from '@/components/Pagination';
import style from './index.module.less';

interface PostsProps {
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          slug: string;
        };
        excerpt: string;
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
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;

const PostsPage: React.FC<PageProps<PostsProps, PostsPageContext>> = ({ data, pageContext, navigate }) => {
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
      {data.allMdx.edges.map(post => (
        <div className={style.postContainer} key={post.node.excerpt}>
          <h3 className={style.postTitle}>{post.node.frontmatter.title}</h3>
          <p className={style.postDesc}>{post.node.excerpt}</p>
          <Link className={style.postReadLink} to={`/posts/${post.node.frontmatter.slug}`}>
            阅读全文
          </Link>
        </div>
      ))}
      <div className={style.paginationWrapper}>
        <Pagination
          current={pageContext.page}
          total={pageContext.totalPage}
          onChange={page => navigate(`/posts/page/${page}`)}
        />
      </div>
    </Layout>
  );
};

export default PostsPage;
