import React, { PropTypes } from 'react';
import './home.scss';
import objectAssign from 'object-assign';

export default class HomeComponent extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.colorsList = [
      '#FFFF99',
      '#FFCCCC',
      '#FFE5CC',
      '#E5CCFF',
      '#CCFFCC',
      '#CCFFE5',
      '#CCFFFF',
      '#CCE5FF',
      '#CCCCFF',
    ];
    this.state = {
      title: '',
      desc: '',
      currentColor: '#FFFF99',
      teamId: 0,
      currentDragablePost:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTeamClick = this.handleTeamClick.bind(this);
    this.setCurrentPostColor = this.setCurrentPostColor.bind(this);
    this.createTeamPost = this.createTeamPost.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.handleOnDragStart = this.handleOnDragStart.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.currentDragablePost = null;
    this.offsetData = null;
    this.nextIndex = 100;
  }

  componentDidMount() {
    this.props.getModifiedTeamPost(this.props.authState.user.teams[0].id);
    this.props.getTeamPosts(this.props.authState.user.teams[0].id);
  }

  componentDidUpdate() {
  }

  setCurrentPostColor(event,color) {
    this.setState({
      color,
      currentColor: color
    });
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleTeamClick(event) {
    this.setState({teamId: event.target.value});
    this.props.getTeamPosts(event.target.value);
  }

  /*
  * 1. get current dom
  * 2. set zIndex
  * 3. store the positon
  */
  handleOnDragStart(event) {
    this.currentDragablePost = event.target;
    this.nextIndex++;
    this.currentDragablePost.style.zIndex = this.nextIndex;
    const style = window.getComputedStyle(event.target, null);
    this.offsetData = (parseInt(style.getPropertyValue("left")) - parseInt(event.clientX)) + ',' + (parseInt(style.getPropertyValue("top")) - parseInt(event.clientY));
  }

  handleOnDragOver(event){
    event.preventDefault();
    return false;
  }

  /*
  * 1. update positon 
  * 2. update post in database
  */
  handleOnDrop(event){
    const offset = this.offsetData.split(',');
    const updatePost = objectAssign({}, this.props.homeState.posts[this.props.homeState.posts.findIndex(post => post.id === parseInt(this.currentDragablePost.id))]);
    // todo change table column positionx and positiony type from int -> string
    updatePost.positionx = (parseInt(event.clientX) + parseInt(offset[0]));
    updatePost.positiony = (parseInt(event.clientY) + parseInt(offset[1]));
    updatePost.zindex = this.currentDragablePost.style.zIndex;
    this.props.updateTeamPost(updatePost, objectAssign([], this.props.homeState.posts));
    event.preventDefault();
    return false;
  }

  createTeamPost() {
    const postsContainerPosition = document.getElementsByClassName('posts-container')[0].getBoundingClientRect();
    const post = {
      author: this.props.authState.user.username,
      title: this.state.title,
      desc: this.state.desc,
      positionx: parseInt(postsContainerPosition.left),
      positiony: parseInt(postsContainerPosition.top),
      height: 300,
      width: 200,
      zindex: 100,
      color: this.state.currentColor,
      teamId: this.state.teamId === 0 ? this.props.authState.user.teams[0].id : this.state.teamId,
      status: 0
    };
    this.props.createTeamPost(post);
  }

  renderPosts(post) {
    this.nextIndex = (post.zindex > this.nextIndex ? post.zindex : this.nextIndex);
    return(
      <div 
        id={post.id}
        className="movable-post-container" 
        key={post.id} 
        style={{height:post.height, width:post.width, zIndex: post.zindex, left: post.positionx, top:post.positiony,backgroundColor:post.color}}
        draggable="true"
        onDragStart={this.handleOnDragStart}
      >
        <div className="title">{post.title}</div>
        <div className="author">{'author: ' + post.author}</div>
        <div className="desc">{post.desc}</div>
      </div>
    );
  }

  renderPage() {
    return (
      <div className="container-fluid home-container">
        <div className="row">
          <div className="col-3">
            <div className="row">
              <div className="col-12 select-container">
                <select className="form-control" value={this.state.teamId} onChange={(event) => this.handleTeamClick(event)}>
                  {
                    this.props.authState.user.teams.map((team) => {
                      return <option key={team.id} value={team.id}>{team.name}</option>;
                    })
                  }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12 colors-container">
                {
                  this.colorsList.map(color => {
                    return <div className="color-cell" style={{'backgroundColor':color}} key={color} onClick={(event) => this.setCurrentPostColor(event,color)} />;
                  })
                }
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="post-container">
                  <input id="title" className="form-control" style={{backgroundColor:this.state.currentColor}} value={this.state.title} onChange={this.handleChange} placeholder="Title"/>
                  <textarea id="desc" className="form-control" style={{backgroundColor:this.state.currentColor}} value={this.state.desc} onChange={this.handleChange} rows="12" maxLength="200"/>
                  <div className="btn btn-block" style={{backgroundColor:this.state.currentColor}} onClick={this.createTeamPost}>Post</div>
                </div>
              </div>
            </div>

          </div>
          <div 
            className="col-9 posts-container"
            onDragOver={this.handleOnDragOver}
            onDrop={this.handleOnDrop}
            style={{backgroundColor:'#eee'}}
          >
            {
              this.props.homeState.posts.map( post => {
                return this.renderPosts(post);
              })
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.authState.user ? this.renderPage() : 'error '}
      </div>
    );
  }
}

HomeComponent.propTypes = {
  createTeamPost: PropTypes.func.isRequired,
  updateTeamPost: PropTypes.func.isRequired,
  getTeamPosts: PropTypes.func.isRequired,
  getModifiedTeamPost: PropTypes.func.isRequired,
  homeState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};