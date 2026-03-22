import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function AddCar() {

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      const decoded = jwtDecode(token);

      const payload = {
        ...data,
        sellerId: decoded.id
      };

      await API.post("/cars/add", payload);

      toast.success("Car added successfully 🚗");

    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Error adding car");
    }
  };

  return (

    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')"
  }}
>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-4xl"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Car 🚗
        </h2>

        <table className="w-full border-separate border-spacing-y-3">

          <tbody>

            <tr>
              <td className="font-medium">Brand</td>
              <td>
                <input {...register("brand")} className="w-full border p-2 rounded-lg" />
              </td>

              <td className="font-medium">Model</td>
              <td>
                <input {...register("model")} className="w-full border p-2 rounded-lg" />
              </td>
            </tr>

            <tr>
              <td className="font-medium">Year</td>
              <td>
                <input {...register("year")} className="w-full border p-2 rounded-lg" />
              </td>

              <td className="font-medium">Price</td>
              <td>
                <input {...register("price")} className="w-full border p-2 rounded-lg" />
              </td>
            </tr>

            <tr>
              <td className="font-medium">Distance Driven</td>
              <td>
                <input {...register("distanceDriven")} className="w-full border p-2 rounded-lg" />
              </td>

              <td className="font-medium">Fuel Type</td>
              <td>
                <input {...register("fuelType")} className="w-full border p-2 rounded-lg" />
              </td>
            </tr>

            <tr>
              <td className="font-medium">Transmission</td>
              <td>
                <input {...register("transmission")} className="w-full border p-2 rounded-lg" />
              </td>

              <td className="font-medium">Color</td>
              <td>
                <input {...register("color")} className="w-full border p-2 rounded-lg" />
              </td>
            </tr>

            <tr>
              <td className="font-medium">Description</td>
              <td colSpan="3">
                <input {...register("description")} className="w-full border p-2 rounded-lg" />
              </td>
            </tr>

          </tbody>

        </table>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add Car
          </button>
        </div>

      </form>

    </div>
  );
}