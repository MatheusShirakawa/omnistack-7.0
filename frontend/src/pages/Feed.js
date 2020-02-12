import React, { Component } from 'react';
import api from '../services/api';
import io  from 'socket.io-client';

import './Feed.css';

import Post from '../components/Post';
// import {PostList} from './FeedStyles';

class Feed extends Component{

    state = {
        feed: [],
        show:false,
    };

    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
        
    };


    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        //post , like 

        socket.on('post', newPost => {
            this.setState({ feed:[newPost, ... this.state.feed]});
        })

        socket.on('like', likedPost =>{
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                )
            })
        })
    }

    render(){
        return (
            <section id="post-list">    

                { this.state.feed.map( (post, index) => (
                    <Post key={index} post={post}/>
                ))}

                
                {/* { this.state.feed.map(post => (
                    <article key={post._id}>
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
                        <div>

                            {this.state.show && (
                                <form onSubmit={this.handleSubmitComment}> 
                                    <input 
                                        type="text" 
                                        name="description" 
                                        onChange={this.handleChange} 
                                        value={this.state.description}
                                    />
                                    <button type="submit">Enviar</button>
                                </form>
                            )}                        
                            
                            <div className="list">
                                {this.state.comments && this.state.comments.map(item => (
                                    <div key={item._id}>
                                        {item.description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                )) } */}
                

               
            </section>
        );
    }
}

export default Feed;