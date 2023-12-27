"use client";
import { useState, useEffect } from "react";
import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import Image from "next/image";
import Comment from "./Comment";
import Reply from "./Reply";
import axios from "axios";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { id } = data;
  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const [commentsData, setCommentsData] = useState<any>(null);
  const [clickedButtonId, setClickedButtonId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/comments/api::article.article:${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCommentsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleReplyClick = (id: number) => {
    setClickedButtonId(id);
  };

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
            )}
            <p className="text-md dark:text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
      <span className="py-1 px-1 font-bold">Comments</span>
      <div className="py-1 mb-4">
        <Comment data={id} />
      </div>
      {commentsData && commentsData.length > 0 && (
        <div className="w-full">
          {commentsData.map((item: any) => {
            const replyData = item.children.flat();
            return (
              <div key={item.id} className="py-2 border-b border-gray-300 mb-4">
                <div className="w-3/4 px-4 py-2 border rounded-lg border-gray-300 mb-4 shadow-md">
                  <div>{item.content} </div>
                  <div>
                    <span title={item.author.id} className="hover:underline">
                      {item.author.id.length > 15
                        ? `${item.author.id.slice(0, 15)}...`
                        : item.author.id}
                    </span>
                    <span className="float-right">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <button
                    className="mt-3 px-5 py-1 bg-red-400 hover:bg-red-300 text-white text-[12px] uppercase"
                    onClick={() => handleReplyClick(item.id)}
                  >
                    Post Reply
                  </button>
                </div>
                {clickedButtonId === item.id && (
                  <Reply data={id} commentId={item.id} />
                )}
                {replyData && replyData.length > 0 && (
                  <div className="w-3/4 ml-[25%]">
                    <h4 className="font-semibold mb-2">Replies:</h4>
                    {replyData.map((value: any) => {
                      return (
                        <div className="px-4 py-2 border rounded-lg border-gray-300 mb-4 shadow-md ">
                          <div>{value.content}</div>
                          <div>
                            <span
                              title={value.author.id}
                              className="hover:underline"
                            >
                              {value.author.id.length > 15
                                ? `${value.author.id.slice(0, 15)}...`
                                : value.author.id}
                            </span>
                            <span className="float-right">
                              {formatDate(value.createdAt)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
