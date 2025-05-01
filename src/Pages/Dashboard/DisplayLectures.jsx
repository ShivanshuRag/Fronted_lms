import { useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  FiPlus,
  FiTrash2,
  FiPlay,
  FiPause,
  FiVolume2,
  FiMaximize,
  FiSettings,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerState, setPlayerState] = useState({
    playing: false,
    volume: 0.8,
    playbackRate: 1.0,
    pip: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLectures, setCompletedLectures] = useState([]);

  const fetchLectures = useCallback(async () => {
    try {
      if (state?._id) {
        await dispatch(getCourseLectures(state._id));
      }
    } catch (error) {
      toast.error("Failed to load lectures");
    }
  }, [dispatch, state?._id]);

  const handleLectureDelete = async (courseId, lectureId) => {
    try {
      await dispatch(deleteCourseLecture({ courseId, lectureId }));
      await fetchLectures();
      toast.success("Lecture deleted successfully");
    } catch (error) {
      toast.error("Failed to delete lecture");
    }
  };

  const toggleCompleteLecture = (lectureId) => {
    setCompletedLectures((prev) =>
      prev.includes(lectureId)
        ? prev.filter((id) => id !== lectureId)
        : [...prev, lectureId]
    );
  };

  useEffect(() => {
    if (!state) navigate("/courses");
    fetchLectures();
  }, [state, navigate, fetchLectures]);

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
    setPlayerState((prev) => ({ ...prev, playing: true }));
  };

  return (
    <HomeLayout>
      <div className="flex flex-col gap-8 items-center justify-center min-h-[90vh] py-8 mx-auto px-4 max-w-7xl">
        {/* Course Header */}
        <div className="bg-yellow-500 shadow-sm border-b rounded-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {state?.title || "Course Content"}
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 py-6 ">
          {/* Video Player Section (Left) */}
          <div
            className={`${sidebarOpen ? "lg:w-2/3" : "w-full"} pr-0 lg:pr-6`}
          >
            <div className="relative bg-black rounded-lg overflow-hidden shadow-lg aspect-video">
              <ReactPlayer
                url={lectures[currentVideo]?.lecture?.secure_url}
                playing={playerState.playing}
                volume={playerState.volume}
                playbackRate={playerState.playbackRate}
                pip={playerState.pip}
                controls
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
                onReady={() => setPlayerReady(true)}
                onEnded={() =>
                  toggleCompleteLecture(lectures[currentVideo]?._id)
                }
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />

              {!playerReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-pulse text-white">
                    Loading video...
                  </div>
                </div>
              )}
            </div>

            {/* Video Info Section */}
            <div className="mt-6  border border-gray-600 p-6 rounded-lg shadow-sm ">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-300 mb-2">
                    {lectures[currentVideo]?.title}
                  </h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm text-gray-400">
                      Lecture {currentVideo + 1} of {lectures?.length}
                    </span>
                    {completedLectures.includes(
                      lectures[currentVideo]?._id
                    ) && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
                {role === "Admin" && (
                  <button
                    onClick={() =>
                      handleLectureDelete(
                        state._id,
                        lectures[currentVideo]?._id
                      )
                    }
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiTrash2 size={18} />
                    <span>Delete</span>
                  </button>
                )}
              </div>

              <div className="prose max-w-none text-gray-400 mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  About this lecture
                </h3>
                <p>
                  {lectures[currentVideo]?.description ||
                    "No description available"}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) - Lecture List */}
          <div
            className={`${
              sidebarOpen ? "lg:w-1/3" : "lg:w-16"
            } mt-6 lg:mt-0 transition-all duration-300 `}
          >
            <div className=" rounded-lg shadow-sm overflow-hidden border border-gray-600">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-yellow-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <h3 className="font-bold text-gray-900">
                  {sidebarOpen ? "Course Content" : ""}
                </h3>
                <button className="text-gray-400 hover:text-gray-700 ">
                  {sidebarOpen ? <FiChevronDown /> : <FiChevronUp />}
                </button>
              </div>

              {sidebarOpen && (
                <div className="divide-y divide-gray-400 max-h-[600px] overflow-y-auto ">
                  <div className="px-4 py-3 bg-slate-700 ">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-200">
                        {lectures?.length} lectures •{" "}
                        {Math.round(
                          lectures?.reduce(
                            (acc, lecture) => acc + (lecture.duration || 0),
                            0
                          ) / 60
                        )}{" "}
                        min
                      </span>
                      {role === "Admin" && (
                        <button
                          onClick={() =>
                            navigate("/course/addlecture", {
                              state: { ...state },
                            })
                          }
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                        >
                          <FiPlus size={16} />
                          <span>Add lecture</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {lectures?.map((lecture, idx) => (
                    <div
                      key={lecture._id}
                      className={`p-4 bg-slate-700 hover:bg-slate-600 cursor-pointer transition-colors ${
                        currentVideo === idx ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleVideoSelect(idx)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-3">
                          {completedLectures.includes(lecture._id) ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                              <span className="text-xs text-gray-500">
                                {idx + 1}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              currentVideo === idx
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {lecture.title}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {Math.round((lecture.duration || 0) / 60)} min
                            </span>
                            {role === "Admin" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLectureDelete(state._id, lecture._id);
                                }}
                                className="text-red-400 hover:text-red-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
