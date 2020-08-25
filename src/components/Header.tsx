import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        textAlign: 'right',
      }}
    >
      <h1 style={{ margin: 0, float: 'left' }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ display: 'inline-block' }}>
            <Link style={{ color: '#fff' }} to="/posts/page/1">
              Posts
            </Link>
          </li>
          <li style={{ display: 'inline-block', marginLeft: 10 }}>
            <Link style={{ color: '#fff' }} to="/about">
              About
            </Link>
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
