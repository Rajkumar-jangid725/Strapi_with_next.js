'use client'
import React, { useState } from "react";
import axios from "axios";

interface CommentReplyProps {
  data: number;
  commentId: number;
}

function Reply({ data, commentId }: CommentReplyProps) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
  const handleReplyComment = () => {
    const requestData = {
      "author": {
        "id": data,
        "name": name,
        "email": email
        
      },
      "content": comment,
      "website": website,
      "threadOf": commentId,
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/comments/api::article.article:${data}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(token);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full">
      <textarea
        className="px-4 py-1 h-40 w-full border border-gray-200"
        placeholder="comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="mt-2 grid grid-cols-3 gap-4">
        <label className="border border-gray-200">
          <input
            placeholder="Name"
            className="px-4 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </label>
        <label className="border border-gray-200">
          <input
            placeholder="Email"
            className="px-4 py-1 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label className="border border-gray-200">
          <input
            placeholder="Website"
            className="px-4 py-1 w-full"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></input>
        </label>
      </div>
      <button
        className="mt-3 px-3 py-1 bg-red-400 hover:bg-red-300 text-white"
        onClick={() => handleReplyComment()}
      >
        Comment
      </button>
    </div>
  );
}

export default Reply;
