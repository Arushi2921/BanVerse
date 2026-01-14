import React from "react";
import "./ClubDashboard.css";

const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="post-card">
      <img src={post.poster} alt={post.title} />

      <div className="post-content">
        <h4>{post.title}</h4>
        <p>{post.desc}</p>
        <p className="muted">{post.date} • {post.time}</p>

        <div className="post-actions">
          <button className="edit-btn" onClick={() => onEdit(post.id)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(post.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
