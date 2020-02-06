import React, { Component } from 'react';

class Comment extends Component{

    render(){
        const comment = this.props.comment;

        return (
            <li>
                <div className="comment-item">
                    <span>{comment.description}</span>
                </div>
            </li>
        );
    }

}

export default Comment;
