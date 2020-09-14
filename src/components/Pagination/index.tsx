import React from 'react';
import classnames from 'classnames';
import style from './index.module.less';

const cx = classnames.bind(style);

interface PaginationProps {
  current: number;
  total: number;
  onChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = props => {
  const links = [];
  for (let i = props.current; i > 0; --i) {
    if (props.current - i < 3) {
      links.unshift({
        type: 'link',
        page: i,
      });
    } else {
      if (i !== 1) {
        links.unshift({
          type: 'more',
          page: i,
        });
      }
      links.unshift({
        type: 'page',
        page: 1,
      });
      break;
    }
  }
  for (let i = props.current + 1; i <= props.total; ++i) {
    if (i - props.current < 3) {
      links.push({
        type: 'link',
        page: i,
      });
    } else {
      if (i !== props.total) {
        links.push({
          type: 'more',
          page: i,
        });
      }
      links.push({
        type: 'page',
        page: props.total,
      });
      break;
    }
  }

  return (
    <div>
      <ul className={style.paginationList}>
        {links.map(link => (
          <li
            key={link.page}
            className={cx(style.paginationItem, { [style.active]: link.page === props.current })}
            onClick={() => link.page !== props.current && props.onChange?.(link.page)}
          >
            {link.type === 'more' ? '···' : link.page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
