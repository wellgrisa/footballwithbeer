var Bootstrap = ReactBootstrap;

var GameBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
        <Bootstrap.Col lg="12">
            <h1 className="text-center">Jogos no momento</h1>
            <GameList data={this.state.data}/>
        </Bootstrap.Col>      
    );
  }
});

var GameList = React.createClass({  
  render: function() {

    var gameNodes = this.props.data.map(function (game) {
      return (
        <Match game={game}/>
      );
    });

    return (
      <div className="gamesList">
        {gameNodes}
      </div>
    );
  }
});

var Match = React.createClass({
  render: function() {
    return (
      <div className="game">
        <h2 className="channel">
          {this.props.game.Time + ' - ' + this.props.game.Channel}
        </h2>
        {this.props.game.Match}
      </div>
    );
  }
});