import { useState, type ChangeEvent, type FormEvent } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "../hooks/storeHooks";
import { generateRecipe } from "../thunks/recipeAPIThunks";
import { useAppModal } from "../hooks/useModal";
import { toast } from "react-toastify";

type Props = {};

export default function Modal({}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const modal = useAppModal();

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;

    modal!.setOpen(false);

    const formData = new FormData();
    formData.append("dish-image", file);
    const response = await dispatch(generateRecipe({ formData }));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Successfully generated the recipe", {
        position: "top-right",
      });
    } else {
      toast.error("Failed to generate the recipe", {
        position: "top-right",
      });
    }
  }

  return (
    <>
      {modal!.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <button
              onClick={() => modal!.setOpen(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Upload Image
              </h2>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-56 rounded-lg border border-gray-300 object-cover shadow"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:hover:bg-blue-700"
              />

              {file && (
                <input
                  type="submit"
                  value="Upload"
                  className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
