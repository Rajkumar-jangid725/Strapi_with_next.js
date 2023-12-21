'use client'
import React, { useState } from "react";


function Comment() {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleComment = () => {
    console.log(comment);
    console.log(name);
    console.log(email);
    console.log(website);
  }

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
        className="mt-3 px-3 py-1 bg-red-400 hover:bg-red-300 text-white font-semibold rounded-lg"
        onClick={handleComment}
      >
        Comment
      </button>
    </div>
  );
}

export default Comment;
