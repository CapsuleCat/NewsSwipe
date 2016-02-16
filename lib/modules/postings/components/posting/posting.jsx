import React from 'react';

import { TagMapperContainer } from '/lib/modules/tags/containers/tag-mapper.jsx';
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
      <TagMapperContainer tags={posting.tags}>
        <PostingChips />
      </TagMapperContainer>
      <p>{posting.description}</p>
    </div>
  </div>
);

export { Posting };
