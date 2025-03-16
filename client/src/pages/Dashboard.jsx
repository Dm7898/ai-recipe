import ManageLayout from "../components/ManageLayout";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useRecipes } from "../hooks/useRecipe";
import { useBlogs } from "../hooks/useBlog";

const Dashboard = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  const { data: blogs } = useBlogs();
  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;
  const categoryCount = recipes.reduce((acc, recipe) => {
    acc[recipe.category] = (acc[recipe.category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { title: "Total Recipes", count: recipes?.length || 0 },
    { title: "Total Blogs", count: blogs?.length || 0 },
    { title: "Contact Submissions", count: 30 },
  ];

  const recipeCategories = [
    { name: "Desserts", value: categoryCount?.dessert || 0 },
    { name: "Lunch", value: categoryCount?.lunch || 0 },
    { name: "Drinks", value: categoryCount?.drinks || 0 },
    { name: "Breakfast", value: categoryCount?.breakfast || 0 },
  ];

  const blogEngagement = [
    { name: "Jan", views: 400, likes: 200 },
    { name: "Feb", views: 300, likes: 150 },
    { name: "Mar", views: 500, likes: 250 },
  ];
  return (
    <ManageLayout>
      <div className="p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg text-center"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-2xl font-bold text-blue-600">{item.count}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart for Recipe Categories */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Recipe Categories</h2>
            <PieChart width={300} height={300}>
              <Pie
                data={recipeCategories}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
              >
                {recipeCategories.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart for Blog Engagement */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Blog Engagement</h2>
            <BarChart width={400} height={250} data={blogEngagement}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" />
              <Bar dataKey="likes" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </ManageLayout>
  );
};

export default Dashboard;
