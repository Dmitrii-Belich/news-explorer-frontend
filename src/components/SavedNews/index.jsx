import React, {useContext} from "react";
import SavedNewsHeader from "../SavedNewsHeader";
import NewsCardList from "../NewsCardList";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function SavedNews() {
  const {savedArticles} = useContext(CurrentUserContext);
  return (
    <main>
      <SavedNewsHeader/>
      <NewsCardList
        news={savedArticles}
      />
    </main>
  );
}
