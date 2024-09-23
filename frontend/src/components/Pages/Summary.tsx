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
}

const Cards: React.FC<CardsProps> = ({ reviews }) => {
  return (
    <div className="mt-4 text-slate-200 bg-neutral-800 rounded-lg p-4 font-medium">
      {reviews.length === 0 ? (
        <p>No reviews to display.</p>
      ) : (
        reviews.map((review: Review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="mb-6">
      <div className="text-2xl text-right" onClick={() => {}}>
        ★
      </div>
      <div className="flex items-center">
        <span className="text-yellow-500 text-2xl">
          {"★".repeat(review.stars)}
        </span>
        <span className="ml-2 text-lg">{review.stars} Stars</span>
      </div>
      <div className="mt-4">{review.review}</div>
      <div className="mt-4">Name: {review.name}</div>
      <div className="mt-4">Email: {review.email} </div>
    </div>
  );
};

interface OptionsProps {
  setWall : (argument:boolean) => void;
}

// Define the Options component
// sidebar of Wall of Love
const Options: React.FC<OptionsProps> = ({ setWall }) => {
  return (
    <div
      className="mt-4 text-white cursor-pointer p-2 rounded-lg hover:bg-neutral-800 mr-4"
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

  useEffect(() => {
    fetchData();
  }, []);

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
        console.log(res.data.space.spacename);
      } else {
        console.log(res.data);
        toast(res.data.error + "No reviews found");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast("An error occurred while fetching reviews");
    }
  }

  return (
    <div className="relative bg-neutral-900 w-screen h-screen">
      <div className="max-w-[1200px] mx-auto">
        <NavBarOther />

        <div className="mt-4">
          <img src="logo.svg" alt="Logo" width={100} />
        </div>

        {/* wall of love overlap Cards  */}

        {showWall && (
          <div className="absolute bg-white top-20 left-60 right-60 rounded-lg">
            <div className="h-fit text-black">
              <div
                className="text-right cursor-pointer"
                onClick={() => setWall(false)}
              >
                close

              </div>
              <div className="text-center">
                <div className="mt-4 text-3xl font-semibold">
                  Embed a Wall of Love
                </div>
                <div className="mt-4">Customize your Wall of Love</div>

                <div className="mt-4">
                  <p>
                    let id = testimonialId;
                  <div id='{`testimonial-widget-container${id}`}' ></div>
                    <script
                      type="text/javascript"
                      src="http://localhost:3000/js/widget.js"
                    ></script>
                    const userId = 1 
                    const theme = 2
                    <iframe
                      id="{`${userId}`+`${theme}`}"
                      src="https://embed-v2.testimonial.to/carousel/all/hello6?theme=dark&autoplay=on&showmore=on&one-row=on&hideDate=on&same-height=off&tag=all&arrowColor=9BA9B4"
                      width="100%"
                    ></iframe>
                  </p>
                  code come here
                </div>
              </div>

              <div className="mt-4">
                <input type="checkbox" name="" id="dark" /> Dark theme
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
            href={`http://localhost:5173/${space}`}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:5173/{space}
          </a>
        </div>

        <div className="grid grid-cols-12 mt-12">
          <div className="col-span-4">
            <Options setWall={setWall} />
          </div>
          <div className="col-span-8">
            <Cards reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
