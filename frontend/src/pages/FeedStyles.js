import styled from 'styled-components';

export const PostList = styled.section`
    width:100%;
    max-width: 580px;
    margin:0 auto;
    padding: 0 30px;

    article{
        background:#fff;
        bordeR:1px solid #ddd;
        margin-top: 30px;

            header{
                padding:20px;
                display:flex;
                align-items: center;
                justify-content: space-between;

                    .user-info{
                        display: flex;
                        flex-direction: column;
                           span{
                            font-size: 13px;
                        }
                }
            }
    }
`;