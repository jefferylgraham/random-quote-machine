"use strict";

var x = Math.floor(Math.random() * 256);
var y = Math.floor(Math.random() * 256);
var z = Math.floor(Math.random() * 256);

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      quotes: [],
      color: "rgb(" + x + "," + y + "," + y + ")"
    };
    this.changeQuote = this.changeQuote.bind(this);
  }

  componentDidMount() {
    document.body.style.background = this.state.color;
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            quotes: result.quotes
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  changeQuote() {
    var newRed = Math.floor(Math.random() * 256);
    var newGreen = Math.floor(Math.random() * 256);
    var newBlue = Math.floor(Math.random() * 256);
    this.setState({
      color: "rgb(" + newRed + "," + newGreen + "," + newBlue + ")"
    });
  }

  render() {
    const { error, isLoaded, quotes } = this.state;
    let index = Math.floor(Math.random() * quotes.length);

    document.body.style.background = this.state.color;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid">
          <div className="text-center">
            <h1>Words To Live By...</h1>
          </div>
          <div className="row justify-content-center">
            <div id="quote-box" className="col-5">
              <div>
                <QuoteText
                  color={this.state.color}
                  quoteText={quotes[index].quote}
                />
                <QuoteAuthor
                  color={this.state.color}
                  quoteAuthor={quotes[index].author}
                />
              </div>
              <div>
                <TweetQuote
                  color={this.state.color}
                  tweetText={quotes[index].quote}
                  tweetAuthor={quotes[index].author}
                />
                <NewQuote
                  color={this.state.color}
                  onClick={this.changeQuote}
                  text="New Quote"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class QuoteText extends React.Component {
  render() {
    return (
      <blockquote style={{ color: this.props.color }} id="text">
        {this.props.quoteText}
      </blockquote>
    );
  }
}

class QuoteAuthor extends React.Component {
  render() {
    return (
      <p style={{ color: this.props.color }} id="author">
        <cite>~ {this.props.quoteAuthor}</cite>
      </p>
    );
  }
}

class TweetQuote extends React.Component {
  render() {
    return (
      <a
        style={{ color: this.props.color }}
        id="tweet-quote"
        target="_blank"
        href={
          "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
          this.props.tweetText +
          " ~ " +
          this.props.tweetAuthor
        }
      >
        <i className="fab fa-twitter-square" />
      </a>
    );
  }
}

class NewQuote extends React.Component {
  render() {
    return (
      <button
        style={{ backgroundColor: this.props.color }}
        id="new-quote"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

ReactDOM.render(<QuoteBox />, document.getElementById("root"));
