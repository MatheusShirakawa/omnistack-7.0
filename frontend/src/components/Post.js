import React,{Component} from 'react';
import api from '../services/api';
import io  from 'socket.io-client';


import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import Comment from './Comment';
import './Comment.css';

class Post extends Component{


    state = {
        comments : [],
        description:'',
    }

    async componentDidMount() {
        this.registerToSocket();
        
        const response = await api.get(`/comments/${this.props.post._id}`);
        
        this.setState({comments:response.data});
    }


    registerToSocket = () => {
        const socket = io('http://localhost:3333');
        
        socket.on('comment', newComment =>{
            this.setState({
                comments: newComment.foreign_key == this.props.post._id ? [newComment,...this.state.comments] : [...this.state.comments],
            })
        })

        // socket.on('like', likedPost =>{
        //     this.setState({
        //         feed: this.state.feed.map(post =>
        //             post._id === likedPost._id ? likedPost : post
        //         )
        //     })
        // })

    }

    handleChange = e => {
        this.setState({ [e.target.name]:e.target.value })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    handleNewComment = () =>{
        this.setState({ show:!this.state.show});
    };

    handleSubmitComment = async e => {
        e.preventDefault();

        const data = {
            description:this.state.description,
        }
        const response = await api.post(`/comments/${this.props.post._id}/post`, data);

        this.setState({description:''});
    };
    

    render(){

        const post = this.props.post;

        return (
        <>
            <article>
                <header>
                    <div className="user-info">
                        <span>{post.author}</span>
                        <span className="place">{post.place}</span>
                    </div>
                    <img src={more} alt="Mais"/>
                </header>
                <img src={`http://localhost:3333/files/${post.image}`} alt=""/>
                <footer>
                    <div className="actions">
                        <button type="button" onClick={() => this.handleLike(post._id)}>
                            <img src={like} alt=""/>
                        </button>
                        <button type="button" onClick={() => this.handleNewComment(post._id)}>
                            <img src={comment} alt=""/>
                        </button>
                        <img src={send} alt=""/>
                    </div>
                    <strong>{post.likes} curtidas</strong>
                    <p>
                        {post.description}
                        <span>{post.hashtags}</span>
                    </p>
                </footer>
                <div className="block-comments">
                    <form onSubmit={this.handleSubmitComment} className={this.state.show ? "active" : "" }> 
                        <input 
                            placeholder="Adicione um comentário"
                            type="text" 
                            name="description" 
                            onChange={this.handleChange} 
                            value={this.state.description}
                        />
                        <button type="submit">Enviar</button>
                    </form>    
                    <div className="list-comments">
                        <ul>
                            {this.state.comments && this.state.comments.map((comment, index )=> (
                                <Comment key={index} comment={comment}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </article>

        </>
        )
    }
}


export default Post;