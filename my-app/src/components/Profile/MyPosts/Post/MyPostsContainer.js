import React from 'react';
import {connect} from "react-redux";
import MyPosts from "../MyPosts";
import {
    addPostActionCreator
} from "../../../../redux/profileReducer";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;