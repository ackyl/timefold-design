import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import React from "react";

import { sortByDate } from "../utils";

export default function Home({ articles }) {
  return (
    <>
      <div className="home">
        <img src="/images/timefold-logo.svg" className="logo" alt="" />
        <p className="title">UI Design & Interactive Website</p>
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // This happens in the server

  // Get files from the article dir
  const files = fs.readdirSync(path.join("data/articles"));

  // Get slug and frontmatter from articles
  const articles = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("data/articles", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      articles: articles.sort(sortByDate),
    },
  };
}
