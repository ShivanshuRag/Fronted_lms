import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="relative w-88 h-108 bg-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-100 hover:shadow-white hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-75 transition-opacity"></div>
      <div className="overflow-hidden relative z-10">
        <img
          className="h-48 w-full rounded-3xl p-4 transition-transform duration-300 transform group-hover:scale-110"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="p-5 space-y-2 text-white relative z-10">
          <h2 className="text-2xl font-bold text-amber-500 line-clamp-2 group-hover:text-secondary">
            {data?.title}
          </h2>
          <p className="line-clamp-2 text-gray-300">{data?.description}</p>
          <div className="text-sm font-semibold">
            <p className=" text-amber-500 font-bold">Category:</p> 
            <p>{data?.category}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className=" text-amber-500 font-bold">Total lectures:</p> 
            <p>{data?.numberOfLecture}</p>
          </div>
          <div className="text-sm font-semibold">
            <p className=" text-amber-500 font-bold">Instructor:</p>
            <p>{data.createdBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
