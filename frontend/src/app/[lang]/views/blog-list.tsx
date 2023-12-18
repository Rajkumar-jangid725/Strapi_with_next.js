import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
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
  };
}

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container mx-auto grid grid-cols-4 gap-4 space-y-6 sm:space-y-12">
        <div className="col-span-3">
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(
              article.attributes.cover.data?.attributes.url
            );

            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            const avatarUrl = getStrapiMedia(
              authorsBio?.avatar.data.attributes.url
            );

            return (
              <>
                <Link
                  href={`/blog/${category?.slug}/${article.attributes.slug}`}
                  key={article.id}
                  className="mx-auto w-full mb-2 group hover:no-underline focus:no-underline overflow-hidden"
                >
                  {imageUrl && (
                    <Image
                      alt="presentation"
                      width="240"
                      height="240"
                      className="object-cover w-full"
                      src={imageUrl}
                    />
                  )}
                  <div className="p-6 space-y-2 relative">
                    {avatarUrl && (
                      <Image
                        alt="avatar"
                        width="80"
                        height="80"
                        src={avatarUrl}
                        className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                      />
                    )}

                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline hover:text-yellow-500">
                      {article.attributes.title}
                    </h3>

                    <div className="flex justify-between items-center">
                      <span className="text-xs dark:text-gray-400 hover:text-yellow-500">
                        {formatDate(article.attributes.publishedAt)}
                      </span>
                      {authorsBio && (
                        <span className="text-xs dark:text-gray-400 hover:text-yellow-500">
                          {authorsBio.name}
                        </span>
                      )}
                    </div>
                    <p className="py-4">{article.attributes.description}</p>
                  </div>
                </Link>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </>
            );
          })}
        </div>
        <div className="col-span-1">
          <div className="px-4 mx-auto overflow-y-auto h-screen">
            {articles.map((article) => {
            const category = article.attributes.category.data?.attributes;
            const firstWord = article.attributes.title.split(' ')[0];

            return (
              <>
                <Link
                  href={`/blog/${category?.slug}/${article.attributes.slug}`}
                  key={article.id}
                  className="px-4 mx-auto w-full mb-2 group hover:no-underline focus:no-underline"
                >
                  <h3 className="text-m py-2 group-hover:underline group-focus:underline hover:text-yellow-500">
                      {firstWord}
                    </h3>
                    <h3 className="text-m py-2 group-hover:underline group-focus:underline hover:text-yellow-500">
                      {firstWord}
                    </h3>
                    <h3 className="text-m py-2 group-hover:underline group-focus:underline hover:text-yellow-500">
                      {firstWord}
                    </h3>
                    <h3 className="text-m py-2 group-hover:underline group-focus:underline hover:text-yellow-500">
                      {firstWord}
                    </h3>
                    <h3 className="text-m py-2 group-hover:underline group-focus:underline hover:text-yellow-500">
                      {firstWord}
                    </h3>
                </Link>
              </>
            );
          })}
          </div>
        </div>
      {children && children}
    </section>
  );
}
