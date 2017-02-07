import React from 'react';
import ReactRethinkdb from 'react-rethinkdb';
import reactMixin from 'react-mixin';
import styles from './App.css';
import Create from './create.js';
import List from './list.js';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const r = ReactRethinkdb.r;

// Open a react-rethinkdb session (a WebSocket connection to the server)
ReactRethinkdb.DefaultSession.connect({
	host: 'localhost', // hostname of the websocket server
	port: 3000,        // port number of the websocket server
	path: '/db',       // HTTP path to websocket route
	secure: false,     // set true to use secure TLS websockets
	db: 'test',        // default database, passed to rethinkdb.connect
});

class App extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {};
	}

	componentDidMount() {
		// this.nameInput.focus();
	}

	observe(props, state) { // eslint-disable-line no-unused-vars
		return {
			turtles: new ReactRethinkdb.QueryRequest({
				query: r.table('turtles'), // RethinkDB query
				changes: true,             // subscribe to realtime changefeed
				initial: [],               // return [] while loading
			}),
		};
	}

	handleSubmit(textInput, happinessInput, sentimentScore) {
    const query = r.table('turtles').insert({
      text: textInput,
      happy: happinessInput,
      score: sentimentScore
    });
    ReactRethinkdb.DefaultSession.runQuery(query);
  }

	componentDidUpdate() {
		const query = r.table('turtles').orderBy(r.desc("score"))
		ReactRethinkdb.DefaultSession.runQuery(query);
	}

	render() {

		return (
			<MuiThemeProvider>
    <Grid className="brd main" fluid={true}>
      <Row>
        <Col className="brd header" xs={12}>
           <h1> Happiness Journal </h1>
        </Col>
      </Row>

      <Row>
        <Col className="brd text-input" xs={12}>
          <Create handleSubmit={this.handleSubmit} />
        </Col>

        <Col className="brd list" xs={12}>
          <List turtles={this.data.turtles} />
        </Col>

      </Row>
    </Grid>
  </MuiThemeProvider>
		);
	}
}

// Enable RethinkDB query subscriptions in this component
reactMixin.onClass(App, ReactRethinkdb.DefaultMixin);

export default App;
