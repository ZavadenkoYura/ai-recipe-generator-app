import { useEffect, useState } from "react";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import RecipeList from "./components/RecipeList";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import { fetchRecipes } from "./thunks/recipeAPIThunks";
import { LoaderCircle } from "lucide-react";

function Spinner({ ...props }) {
  return (
    <div>
      <LoaderCircle {...props} />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<number>(1);
  const { data: recipies, isLoading } = useAppSelector(
    (state) => state.recipes
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes({ page }));
  }, [page]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner className="animate-spin" size={64} />
      </div>
    );
  }

  if (!recipies?.recipies.length) {
    return <div className="w-full flex justify-center">No records</div>;
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[85%] p-3">
          <div className="w-full">
            <Header />
          </div>
          <div className="w-full">
            <RecipeList recipies={recipies?.recipies} />
          </div>
          <div className="w-full flex justify-center">
            <Pagination recipies={recipies} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
}
