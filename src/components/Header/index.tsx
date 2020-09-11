import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import style from './index.module.less';

const Header = ({ siteTitle }) => (
  <header className={style.headerWrapper}>
    <div className={style.headerContainer}>
      <h1 style={{ margin: 0 }}>
        <Link className={style.headerLogo} to="/">
          {siteTitle}
        </Link>
      </h1>
      <div>
        <ul className={style.headerList}>
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
