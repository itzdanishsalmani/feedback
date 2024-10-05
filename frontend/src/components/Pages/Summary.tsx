import { useEffect, useState } from "react";
import { NavBarOther } from "../UI/NavBarOther";
import axios from "../BaseURL/axios";
import { toast } from "react-toastify";

interface Review {
  id: number;
  stars: number;
  review: string;
  name: string;
  email: string;
}

interface CardsProps {
  reviews: Review[];
  like: number[];
  setLike: React.Dispatch<React.SetStateAction<number[]>>;
}

const Cards: React.FC<CardsProps> = ({ reviews, like, setLike }) => {
  return (
    <div className="mt-4 ">
      {reviews.length === 0 ? (
        <p>No reviews to display.</p>
      ) : (
        reviews.map((review: Review) => (
          <ReviewCard
            like={like}
            setLike={setLike}
            key={review.id}
            review={review}
          />
        ))
      )}
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
  like: number[];
  setLike: React.Dispatch<React.SetStateAction<number[]>>;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, like, setLike }) => {
  const isLiked = like.includes(review.id);
  return (
    <div className="mt-8 text-slate-200 bg-neutral-800 rounded-lg p-4 font-medium">
      <div
        className={`text-4xl text-right cursor-pointer ${
          isLiked ? "text-red-400" : "text-slate-300"
        }`}
        onClick={() => {
          if (isLiked) {
            // Remove from likes if already liked
            setLike((prev) => prev.filter((id) => id !== review.id));
          } else {
            // Add to likes if not already liked
            setLike((prev) => [...prev, review.id]);
          }
        }}
      >
        ♥
      </div>
      <div className="flex items-center">
        <span className="text-yellow-400 text-2xl">
          {"★".repeat(review.stars)}
        </span>
        <span className="ml-2 text-lg">{review.stars} Stars</span>
      </div>
      <div className="mt-4 break-words">{review.review}</div>
      <div className="mt-4">Name: {review.name}</div>
      <div className="mt-4">Email: {review.email} </div>
    </div>
  );
};

interface OptionsProps {
  setWall: (argument: boolean) => void;
}

// Define the Options component
// sidebar of Wall of Love
const Options: React.FC<OptionsProps> = ({ setWall }) => {
  return (
    <div
      className="mt-4 text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-neutral-800 mr-4"
      onClick={() => setWall(true)}
    >
      Wall of Love
    </div>
  );
};

export function Summary() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [space, setSpace] = useState<string>("");
  const [showWall, setWall] = useState<boolean>(false);

  const [like, setLike] = useState<number[]>([]);

  const [defaultTheme, setTheme] = useState<string>("light");
  const [copied, setcopied] = useState<boolean>(false);

  const [profileImage,setProfileImage] = useState<any>(null)

  //variable to store the spacename and reviewId to create a embedded code

  const spacename = space.toLocaleLowerCase();
  const reviewId = like;
  const theme = defaultTheme;

  useEffect(() => {
    fetchData();
  }, [reviews]);

  async function fetchData() {
    try {
      const res = await axios.get("/getreview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (
        res.data.space.spacename ||
        (res.data.getReview && res.data.getReview.length !== 0)
      ) {
        setReviews(res.data.getReview);
        setSpace(res.data.space.spacename);
        setProfileImage(`https://testimonial-backend-ukzx.onrender.com/${res.data.space.profileImage}`)
      } else {
        console.log(res.data);
        toast(res.data.error + "No reviews found");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast("An error occurred while fetching reviews");
    }
  }

  const copyToClipboard = (codeData: string) => {
    setcopied(true);
    navigator.clipboard.writeText(codeData).then(() => {
      setTimeout(() => {
        setcopied(false);
      }, 500);
    });
  };

  return (
    <div className="relative bg-neutral-900 w-screen min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-0">
        <NavBarOther />

        <div className="mt-4">
          <img src={profileImage} alt="profile Image" width={100} />
        </div>

        {/* wall of love overlap Cards  */}

        {showWall && (
          <div>
            <div className="px-2 md:p-4 md:absolute bg-white md:top-20 md:left-60 md:right-60 rounded-lg">
              <div className="h-fit text-black">
                <div
                  className="text-right cursor-pointer"
                  onClick={() => setWall(false)}>

                  <div className="absolute md:right-10 right-4">
                    <img src="close.svg" alt="close_icon" />
                  </div>
                  
                </div>
                <div className="text-center">
                  <div className="pt-2 mt-4 text-2xl md:text-3xl font-semibold">
                    Embed a Wall of Love
                  </div>

                  <div className="mt-4">Customize your Wall of Love</div>

                  <pre className="mt-4 h-36 text-sm md:text-base bg-neutral-700 text-slate-300 rounded-md overflow-scroll relative">
                    <div
                      className="absolute rounded-lg border mt-2 px-2 py-1 text-sm w-fit right-2 md:right-5 cursor-pointer"
                      onClick={() =>
                        copyToClipboard(`
<div id="testimonial-widget-container"></div>
<div id="main-[${reviewId}][${spacename}][${theme}]"></div>
<script src="https://testimonial-backend-ukzx.onrender.com/js/widget.js"></script>`)
                      }
                    >
                      {copied ? (
                        <div className="flex items-center">
                        <img src="/vector3.svg" alt="Copied" width={20} />copied
                        </div>
                      ) : (
                        <div className="flex items-center">
                        <img src="/vector2.svg" alt="Copy" width={20} />copy code
                        </div>
                      )}
                    </div>
                    <div className="mt-8 md:mt-2 ">
                      {`
<div id="testimonial-widget-container"></div>
<div id="main-[${reviewId}][${spacename}][${theme}]"></div>
<script src="https://testimonial-backend-ukzx.onrender.comjs/widget.js"></script>
    `}
                    </div>
                  </pre>
                </div>
              </div>

              <div className="mt-4 text-black">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="theme"
                      checked={defaultTheme === "light"}
                      onChange={() => setTheme("light")}
                    />{" "}
                    Light theme
                  </label>
                </div>
                <div>
                  <label className="mt-4">
                    <input
                      type="radio"
                      name="theme"
                      checked={defaultTheme === "dark"}
                      onChange={() => setTheme("dark")}
                    />{" "}
                    Dark theme
                  </label>
                </div>
                <br />
                <input type="checkbox" name="" id="date" /> Show date
              </div>
            </div>
          </div>
        )}

        {/* overlap ended */}

        <div className="mt-4">{space}</div>
        <div className="mt-4">
          Space public URL:{" "}
          <a
            href={`https://testimonialss.vercel.app/${space}`}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://testimonialss.vercel.app/{space}
          </a>
        </div>

        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-4">
            <Options setWall={setWall} />
          </div>
          <div className="col-span-8">
            <Cards like={like} setLike={setLike} reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
