import { useState } from "react";
import type { IRecipe } from "../types/IRecipeResponse";
import Recipe from "./Recipe";

type Props = {
  recipies: IRecipe[];
};

export default function RecipeList({ recipies }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className="w-full p-3">
      {recipies.map((recipe, i) => (
        <Recipe
          key={recipe._id}
          recipe={recipe}
          isOpen={openId === i}
          onToggle={() => setOpenId(openId === i ? null : i)}
        />
      ))}
    </div>
  );
}
