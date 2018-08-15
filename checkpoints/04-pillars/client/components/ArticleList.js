import React from 'react';
import Article from './Article';

class ArticleList extends React.Component {

  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  render() {
    return (
      <div>
        <h1>Today's Articles:</h1>
        {this.state.articles.map(article => {
          return <Article key={article.id} fullArticle={article} />;
        })}
      </div>
    );
  }

}

export default ArticleList
