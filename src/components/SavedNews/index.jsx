import React, {useContext} from "react";
import SavedNewsHeader from "../SavedNewsHeader";
import NewsCardList from "../NewsCardList";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function SavedNews({news, onSearch, onSave, onDelete, isLoading, isFailed}) {
  const {savedArticles} = useContext(CurrentUserContext);
  return (
    <main>
      <SavedNewsHeader/>
      <NewsCardList
        news={savedArticles}
        onSave={onSave}
        onDelete={onDelete}
        isLoading={isLoading}
        isFailed={isFailed}
      />
    </main>
  );
}
