import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const Header = ({ siteTitle }) => (
  <header
    css={css`
      background: #fff;
      margin-bottom: 1.45rem;
      box-shadow: 0px 10px 50px 0px rgba(0, 9, 27, 0.05);
    `}
  >
    <div
      css={css`
        margin: 0 auto;
        max-width: 960px;
        padding: 1.45rem 1.0875rem;
      `}
    >
      <div style={{ float: 'right' }}>
        <ul
          css={css`
            list-style: none;
            margin: 0;
          `}
        >
          <li style={{ display: 'inline-block', margin: 0 }}>
            <Link
              css={css`
                color: rgba(0, 0, 0, 0.85);
              `}
              to="/posts/page/1"
            >
              Posts
            </Link>
          </li>
          <li style={{ display: 'inline-block', margin: '0 0 0 10px' }}>
            <Link
              css={css`
                color: rgba(0, 0, 0, 0.85);
              `}
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
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
