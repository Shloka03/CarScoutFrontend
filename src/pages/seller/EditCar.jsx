import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function EditCar() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  // 🔥 FETCH CAR DATA
  const fetchCar = async () => {
    try {
      const res = await API.get(`/cars/get/${id}`);
      const car = res.data.data;

      Object.keys(car).forEach((key) => {
        setValue(key, car[key]);
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // 🔥 UPDATE CAR
  const onSubmit = async (data) => {
    try {

      await API.put(`/cars/update/${id}`, data);

      toast.success("Car updated successfully 🚗");

      navigate("/seller/mylistings");

    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502877338535-766e1452684a')"
      }}
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-4xl"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Edit Car 🚗
        </h2>

        <table className="w-full border-separate border-spacing-y-3">

          <tbody>

            <tr>
              <td>Brand</td>
              <td><input {...register("brand")} className="border p-2 w-full rounded" /></td>

              <td>Model</td>
              <td><input {...register("model")} className="border p-2 w-full rounded" /></td>
            </tr>

            <tr>
              <td>Year</td>
              <td><input {...register("year")} className="border p-2 w-full rounded" /></td>

              <td>Price</td>
              <td><input {...register("price")} className="border p-2 w-full rounded" /></td>
            </tr>

            <tr>
              <td>Fuel</td>
              <td><input {...register("fuelType")} className="border p-2 w-full rounded" /></td>

              <td>Transmission</td>
              <td><input {...register("transmission")} className="border p-2 w-full rounded" /></td>
            </tr>

            <tr>
              <td>Color</td>
              <td><input {...register("color")} className="border p-2 w-full rounded" /></td>

              <td>Mileage</td>
              <td><input {...register("mileage")} className="border p-2 w-full rounded" /></td>
            </tr>

            <tr>
              <td>Description</td>
              <td colSpan="3">
                <input {...register("description")} className="border p-2 w-full rounded" />
              </td>
            </tr>

          </tbody>

        </table>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Update Car
          </button>
        </div>

      </form>
    </div>
  );
}