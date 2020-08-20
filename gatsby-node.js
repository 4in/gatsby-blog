const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const POST_PER_PAGE = 2;
  const { createPage } = actions;
  const {
    data: {
      allMdx: { totalCount },
    },
  } = await graphql(
    `
      query {
        allMdx {
          totalCount
        }
      }
    `
  );
  const postListLayout = path.resolve('src/pages/posts.tsx');
  const postDetailLayout = path.resolve('src/layouts/PostLayout.tsx');
  const TOTAL_PAGE = Math.ceil(totalCount / POST_PER_PAGE);
  for (let page = 1; page <= TOTAL_PAGE; ++page) {
    const skip = (page - 1) * POST_PER_PAGE;
    const limit = POST_PER_PAGE;
    //#region Create Posts List Page
    createPage({
      path: `posts/page/${page}`,
      component: postListLayout,
      context: {
        skip,
        limit,
        page,
        total: TOTAL_PAGE,
      },
    });
    //#endregion
    //#region Create Posts Detail Page
    await graphql(
      `
        query LoadPagesQuery($skip: Int!, $limit: Int!) {
          allMdx(skip: $skip, limit: $limit) {
            edges {
              node {
                frontmatter {
                  slug
                  title
                }
                body
              }
            }
          }
        }
      `,
      { skip, limit }
    ).then(result => {
      if (result.errors) {
        reporter.panic('Failed to create posts', result.errors);
      }
      result.data.allMdx.edges.forEach(edge => {
        createPage({
          path: `posts/${edge.node.frontmatter.slug}`,
          component: postDetailLayout,
          context: {
            slug: edge.node.frontmatter.slug,
          },
        });
      });
    });
    //#endregion
  }
};
