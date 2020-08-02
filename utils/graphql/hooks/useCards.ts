import React from "react";
import { useQuery } from "@apollo/client";
import { cardsCollection } from "../../types/index.types";
import { GET_CARDS } from "../quieries";

const useCards = () => {
  return useQuery<{
    cardsCollection: cardsCollection;
  }>(GET_CARDS);
};

export default useCards;
