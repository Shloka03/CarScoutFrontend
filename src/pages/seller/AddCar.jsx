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

// 🔥 STEP 1: ADD CAR
const carRes = await API.post("/cars/add", payload);

// 🔥 STEP 2: CREATE LISTING (THIS IS NEW)
await API.post("/listings/add", {
  carId: carRes.data.data._id
});

toast.success("Car added & listed successfully 🚗");

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

        {/*<table className="w-full border-separate border-spacing-x-6 border-spacing-y-4">

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
              <td className="font-medium">Mileage</td>
              <td>
                <input {...register("mileage")} className="w-full border p-2 rounded-lg" />
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

        </table>*/}
        <div className="grid md:grid-cols-2 gap-6">

  {/* BRAND */}
  <div>
    <label className="block font-medium mb-1">Brand</label>
    <input {...register("brand")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* MODEL */}
  <div>
    <label className="block font-medium mb-1">Model</label>
    <input {...register("model")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* YEAR */}
  <div>
    <label className="block font-medium mb-1">Year</label>
    <input {...register("year")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* PRICE */}
  <div>
    <label className="block font-medium mb-1">Price</label>
    <input {...register("price")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* MILEAGE */}
  <div>
    <label className="block font-medium mb-1">Mileage</label>
    <input {...register("mileage")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* FUEL */}
  <div>
    <label className="block font-medium mb-1">Fuel Type</label>
    <input {...register("fuelType")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* TRANSMISSION */}
  <div>
    <label className="block font-medium mb-1">Transmission</label>
    <input {...register("transmission")} className="w-full border p-3 rounded-lg" />
  </div>

  {/* COLOR */}
  <div>
    <label className="block font-medium mb-1">Color</label>
    <input {...register("color")} className="w-full border p-3 rounded-lg" />
  </div>

</div>

{/* DESCRIPTION FULL WIDTH */}
<div className="mt-6">
  <label className="block font-medium mb-1">Description</label>
  <textarea
    {...register("description")}
    className="w-full border p-3 rounded-lg"
    rows="3"
  />
</div>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add Car
          </button>
        </div>

      </form>

    </div>
  );
}