import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MdDelete, MdEdit } from "react-icons/md";
import { BASE_URL } from "../api/api";
import { useBlogs, useDeleteBlog } from "../hooks/useBlog";
import ManageLayout from "../components/ManageLayout";

const ManageBlogs = () => {
  const navigate = useNavigate();
  const { data: recipes, isLoading, error } = useBlogs();
  const deleteBlog = useDeleteBlog();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .replace(",", "/");
  return (
    <ManageLayout>
      <section className="px-2 sm:px-4">
        <h2 className="text-2xl font-semibold my-2">Blogs</h2>
        <Link className="btn-primary inline-block mb-4" to="/upload-blog">
          Add Blog
        </Link>
        {recipes.length > 0 && (
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px] bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#eefff6] text-[#26272b] text-sm md:text-base">
                  <th className="px-3 py-2 text-left">Blog Image</th>
                  <th className="px-3 py-2 text-left">Title</th>
                  <th className="px-3 py-2 text-left">Created At</th>
                  <th className="px-3 py-2 text-left">Updated At</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr
                    key={recipe._id}
                    className="border-b border-gray-200 text-sm md:text-base"
                  >
                    {/* Recipe Image */}
                    <td className="px-4 py-2">
                      <img
                        src={`${BASE_URL}${recipe.image}`}
                        alt={recipe.title}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md border"
                      />
                    </td>
                    {/* Recipe Title */}
                    <td className="px-4 py-2">{recipe.title}</td>

                    {/* Created At */}
                    <td className="px-4 py-2">
                      {formatDate(recipe.createdAt)}
                    </td>
                    {/* Updated At */}
                    <td className="px-4 py-2">
                      {formatDate(recipe.updatedAt)}
                    </td>
                    {/* Actions */}
                    <td className="align-middle">
                      <div className="px-4 py-2 flex items-center justify-center gap-4">
                        {/* Edit Button */}
                        <button
                          onClick={() => navigate(`/edit-blog/${recipe._id}`)}
                          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                        >
                          <MdEdit size={20} />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            toast(
                              <>
                                Are you sure you want to delete{" "}
                                <span className="text-green-600">
                                  {recipe.title}
                                </span>
                                ?
                              </>,
                              {
                                action: {
                                  label: "Delete",
                                  onClick: () => deleteBlog.mutate(recipe._id),
                                },
                              }
                            );
                          }}
                          disabled={deleteBlog.isLoading}
                          className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        >
                          {deleteBlog.isLoading ? (
                            "deleting..."
                          ) : (
                            <MdDelete size={20} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </ManageLayout>
  );
};

export default ManageBlogs;
