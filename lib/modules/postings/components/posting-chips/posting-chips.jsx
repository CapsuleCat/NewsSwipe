import React from 'react';

// TODO elevate to container and lazily load in
// tag details (including an image for the tag)
const PostingChips = ({ tags = [] }) => (
  <div className="posting-chips">
    {tags.map((tag, i) => (
      <div className="posting-chips__chip" key={i}>
        {tag}
      </div>
    ))}
  </div>
);

export { PostingChips };
