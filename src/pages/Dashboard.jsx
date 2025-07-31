import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axios";

export const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/cards/create", data);
      console.log("Data posted successfully:", response.data);
      reset(); // clear the form after successful submit
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="p-20 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">Create a new card below.</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="url"
            {...register("imageUrl", {
              required: "Image URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Enter a valid URL",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Card"}
        </button>
      </form>
    </div>
  );
};
