
import React from 'react';

// exporting the constructor function (dumb component).

const Article = (props) => {
  return (
    <div>
      <h1>{props.fullArticle.title}</h1>
      <p>{props.fullArticle.content}</p>
    </div>
  );
}

export default Article
