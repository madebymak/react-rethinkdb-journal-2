import React, { Component } from 'react';
import css from './list.css';

class List extends React.Component {

  render() {
    const turtleDivs = this.props.turtles.value();

    const sorted = turtleDivs.sort(function(a, b) {
                    return b.score - a.score;
                  });

    const turlesList =
        sorted.map(function(data) {
        return <div className="entry" key={data.id}>
          <p>Happiness Level: {data.happy} <br/>
          "{data.text}"<br/>
          Sentiment Score: {data.score} </p>
        </div>;
      });

    return (
      <div>
        <h2>Top Sentiment Score</h2>
        {turlesList}
      </div>
    );
  }
}

export default List ;
