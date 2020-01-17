import React, { Component } from 'react';
import api from '../services/api';
import io  from 'socket.io-client';

class Comment extends Component{

    state = {
        comment:[],
    }

    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('comments');

        this.setState({comment: response.data});
    }

    registerToSocket(){
        const socket = io('http://localhost:3333');

        socket.on('comment', newComment =>{
            this.setState({comment:[newComment, ... this.state.comments]})
        });
        
    }

    render(){
        return (
            <div>
                {this.state.comment.map(comment =>(
                    <section class="comment-item">
                        <span>{comment.description}</span>
                    </section>
                )) }
                
            </div>
        );
    }

}

export default Comment;
