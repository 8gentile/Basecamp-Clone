import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import TeamNav from '../teams/team_nav';
import NewComment from '../comments/new_comment';

class PostShow extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.teamId, this.props.postId)
      .then(this.props.fetchUsers(this.props.userId));
  }

  handleClick(commentId){
    return (e) => {
      e.preventDefault();
      this.props.destroyComment(commentId);
    };
  }

  render(){
    const { post } = this.props;
    const { team } = this.props;
    const { users } = this.props;
    if (!post) return null;
    if (!team) return null;
    if (!users.length) return null;

    const  modules = {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        ['clean']
      ],
    }

    const editButton = () => {
      if (post.user_id === this.props.userId) {
        return <Link to={`/teams/${team.id}/posts/${post.id}/edit`}>Edit</Link>;
      } else {
        return null;
      }
    }
    //export this
    const comments = post.comments.map( comment => {
      const removeComment = () => {
        if (comment.user_id === this.props.userId) {
          return(
            <span className="remove-comment">
              <i className="fa fa-trash-o" aria-hidden="true" 
                onClick={this.handleClick(comment.id)}></i>
            </span>
          );
        } else {
          return null;
        }
      }
      return(
        <li className="comment-item" key={comment.id}>
            <img src={users[0][comment.user_id].avatar_url} className="avatar-medium"/>
            <section>
              <span><strong>{users[0][comment.user_id].fname} {users[0][comment.user_id].lname}</strong>, {users[0][comment.user_id].email}</span>
              <div dangerouslySetInnerHTML={{__html: comment.body}}></div>
            </section>
            {removeComment()}
        </li>
      );
    });
    return(
      <section className="post-show-panel">
        <TeamNav
          team={this.props.team}
        />
        <section className="post-show">
          <img src={post.author.avatar_url} className="avatar-big"/>
          <span>Posted by {post.author.fname} {post.author.lname}</span>
          { editButton() }
          <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.body}}></div>

          </div>
        </section>
        <section className="comments">
          <ul>{ comments }</ul>
          <NewComment
            processForm={this.props.createPostComment}
            userId={this.props.userId}
            parentId={this.props.postId}
            users={this.props.users} />
        </section>
      </section>
    );
  }
}

export default withRouter(PostShow);



          // <Link to={`/teams/${this.props.teamId}/posts/new`}><span>Post a message</span></Link>

          
          // <ul>{ postItems }</ul>
          
    // const postItems = posts.map( post => {
    //   return (
    //     <li className="post-item" key={post.id}>
    //       <Link to=`/posts/${post.id}`>
    //         <img src={post.author.avatar_url} className="avatar-medium"/>
    //         <div>
    //           <section>
    //             <p>{post.title}</p>
    //             <i className="fa fa-comments" aria-hidden="true">{post.comments.length}</i>
    //           </section>
    //           <span>by {post.author.fname} {post.author.lname}</span>
    //         </div>
    //       </Link>
    //     </li>
    //   );
    // });