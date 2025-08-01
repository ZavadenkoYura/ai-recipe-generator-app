import { Heart, ChevronDown } from "lucide-react";
import type { IRecipe } from "../types/IRecipeResponse";

type Props = {
  recipe: IRecipe;
  isOpen: boolean;
  onToggle: () => void;
};

export default function Recipe({ recipe, isOpen, onToggle }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow m-4 p-2 transition hover:shadow-lg overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <img
            src={recipe.url}
            alt={recipe.name}
            className="w-20 h-20 rounded object-cover border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {recipe.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="text-gray-400 hover:text-red-500 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="p-4 pt-0 text-sm text-gray-700 space-y-4">
          <p>
            <span className="font-medium">Full Description:</span>{" "}
            {recipe.description}
          </p>

          <p>
            <span className="font-medium">Ingredients:</span>{" "}
            {recipe.ingredients?.join(", ")}
          </p>

          <p>
            <span className="font-medium">Steps:</span>{" "}
            {recipe.steps?.join(" → ")}
          </p>

          {recipe.nutrients && (
            <div>
              <p className="font-medium mb-2">Nutrients:</p>
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                <li>
                  <strong>Calories:</strong> {recipe.nutrients.calories}
                </li>
                <li>
                  <strong>Protein:</strong> {recipe.nutrients.protein}
                </li>
                <li>
                  <strong>Carbohydrates:</strong>
                  {recipe.nutrients.carbohydrates}
                </li>
                <li>
                  <strong>Fat:</strong> {recipe.nutrients.fat}
                </li>
                <li>
                  <strong>Sodium:</strong> {recipe.nutrients.sodium}
                </li>
                <li>
                  <strong>Cholesterol:</strong> {recipe.nutrients.cholesterol}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
