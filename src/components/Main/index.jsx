import Search from "../Search";
import NewsCardList from "../NewsCardList";
import Author from "../Author";
import React from "react";

export default function Main({
  news,
  onSearch,
  onSave,
  onDelete,
  isLoading,
  isFailed,
}) {
  return (
    <main>
      <Search onSearch={onSearch} />
      {(news.length || isFailed || isLoading) && (
        <NewsCardList
          isResults={true}
          news={news}
          onSave={onSave}
          onDelete={onDelete}
          isLoading={isLoading}
          isFailed={isFailed}
        />
      )}
      <Author />
    </main>
  );
}
