import React from 'react';

import { PostingChips } from '../posting-chips/posting-chips.jsx';

const Posting = ({ posting }) => (
  <div className="posting">
    <div className="posting__image">
      <img src={posting.image} />
      <span className="posting__title">
        {posting.title}
      </span>
    </div>
    <div className="posting__content">
      <PostingChips tags={posting.tags} />
      <p>{posting.description}</p>
    </div>
  </div>
);

export { Posting };
