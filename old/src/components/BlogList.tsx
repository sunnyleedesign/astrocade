"use client";

import { useState } from "react";
import Filters from "./Filters";
import InView from "./InView";
import { BLOG_FILTERS, FEATURED, POSTS, POSTS_PER_PAGE, type Post } from "@/content/posts";

function Tag({ children }: { children: string }) {
  return (
    <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-2 text-[12px] font-semibold leading-none tracking-[-0.025em] text-dark-navy">
      {children}
    </span>
  );
}

function PostImage({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: post.image?.bg ?? "var(--color-navy)" }}>
      {post.image && (
        <img
          src={post.image.src}
          alt=""
          className="absolute max-w-none transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          style={post.image.style}
        />
      )}
      <Tag>{post.category}</Tag>
    </div>
  );
}

export default function BlogList({ mobile = false }: { mobile?: boolean }) {
  const [filter, setFilter] = useState<(typeof BLOG_FILTERS)[number]>("All");
  const [page, setPage] = useState(1);

  const match = (p: Post) => filter === "All" || p.category === filter;
  const showFeatured = match(FEATURED) && page === 1;
  const list = POSTS.filter(match);
  const pages = Math.max(1, Math.ceil(list.length / POSTS_PER_PAGE));
  const visible = list.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div className="flex flex-col">
      <Filters
        options={BLOG_FILTERS}
        value={filter}
        onChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        className={mobile ? "" : "ml-[-6px]"}
      />

      {showFeatured && (
        <InView className={mobile ? "mt-8" : "mt-10"} threshold={0.15}>
          <a
            href={FEATURED.href}
            className={`a-up group flex overflow-hidden rounded-[16px] bg-navy ${mobile ? "flex-col" : "h-[502px]"}`}
          >
            <PostImage post={FEATURED} className={mobile ? "aspect-[4/3] w-full" : "h-full w-[669px] shrink-0"} />
            <div className={`flex flex-1 flex-col justify-between ${mobile ? "gap-10 p-6" : "px-[72px] py-20"}`}>
              <div className="flex flex-col gap-[18px]">
                <p className="text-[12px] font-semibold leading-none tracking-[-0.025em] text-dark-cloud">{FEATURED.date}</p>
                <p className={`font-medium leading-[0.95] tracking-[-0.06em] text-white ${mobile ? "text-[32px]" : "text-[48px]"}`}>{FEATURED.title}</p>
              </div>
              <span className="relative block h-[30px] w-[169.4px]">
                <img src="/img/blog/logo-mark.svg" alt="" className="absolute left-0 top-0 h-[30px] w-[31.2px]" />
                <img src="/img/blog/logo-wordmark.svg" alt="Astrocade" className="absolute left-[41.5px] top-[6.5px] h-[18.5px] w-[127.9px]" />
              </span>
            </div>
          </a>
        </InView>
      )}

      {visible.length === 0 && !showFeatured && (
        <p className="mt-10 rounded-[16px] bg-navy px-10 py-16 text-center text-[17px] text-muted">No {filter.toLowerCase()} posts yet — check back soon.</p>
      )}

      <InView
        key={`${filter}-${page}`}
        className={`grid ${mobile ? "mt-10 grid-cols-1 gap-12 sm:grid-cols-2" : "mt-10 grid-cols-[repeat(3,440px)] gap-x-5 gap-y-20"}`}
        threshold={0.05}
      >
        {visible.map((p, i) => (
          <a key={p.title} href={p.href} className="a-up group flex flex-col gap-8" style={{ ["--d" as string]: `${(i % 3) * 0.1}s` }}>
            <PostImage post={p} className={`rounded-[16px] ${mobile ? "aspect-[4/3] w-full" : "h-[330px] w-[440px]"}`} />
            <div className="flex flex-col gap-[18px] font-semibold">
              <p className="text-[12px] leading-none tracking-[-0.025em] text-dark-cloud">{p.date}</p>
              <p className={`text-white transition-colors group-hover:text-neon ${mobile ? "text-[20px]" : "text-[24px]"}`}>{p.title}</p>
            </div>
          </a>
        ))}
      </InView>

      <nav aria-label="Pagination" className={`flex items-center justify-center gap-2 ${mobile ? "mt-12" : "mt-[42px]"}`}>
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex size-10 items-center justify-center rounded-[4px] transition-opacity disabled:opacity-30"
        >
          <img src="/img/blog/chevron-left.svg" alt="" className="size-6" />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            aria-current={n === page ? "page" : undefined}
            className={`flex size-10 items-center justify-center rounded-[4px] border text-[17px] leading-[1.7] ${
              n === page ? "border-blue text-blue" : "border-transparent text-white hover:border-white/30"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          disabled={page === pages}
          onClick={() => setPage((p) => p + 1)}
          className="flex size-10 items-center justify-center rounded-[4px] transition-opacity disabled:opacity-30"
        >
          <img src="/img/blog/chevron-right.svg" alt="" className="size-6" />
        </button>
      </nav>
    </div>
  );
}
