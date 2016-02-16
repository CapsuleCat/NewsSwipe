import React from 'react';

const PostingChipImage = ({ tag }) => {
  if ( tag.image )
    return <img src={tag.image} alt={tag.name} />;
  else
    return <span></span>;
};

const PostingChips = ({ tags = [] }) => (
  <div className="posting-chips">
    {tags.map((tag, i) => (
      <div className="posting-chips__chip" key={i}>
        <PostingChipImage tag={tag} />
        {tag.name}
      </div>
    ))}
  </div>
);

export { PostingChips };
