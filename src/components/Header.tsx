import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background: #fff;
      margin-bottom: 1.45rem;
      box-shadow: 0 2px 8px #f0f1f2;
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        max-width: 960px;
        padding: 1.45rem 1.0875rem;
      `}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          css={css`
            color: rgba(0, 0, 0, 0.85);
            text-decoration: none;
          `}
        >
          {siteTitle}
        </Link>
      </h1>
      <div>
        <ul
          css={css`
            list-style: none;
            margin: 0;

            li {
              display: inline-block;
              margin: 0;

              a {
                color: rgba(0, 0, 0, 0.85);
              }
            }

            li + li {
              margin-left: 10px;
            }
          `}
        >
          <li>
            <Link to="/posts/page/1">Posts</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
