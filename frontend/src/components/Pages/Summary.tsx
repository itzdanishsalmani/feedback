import { useEffect, useState } from "react";
import { NavBarOther } from "../UI/NavBarOther";
import axios from "../BaseURL/axios";
import { toast } from "react-toastify"

interface Review {
  stars: number;
  review: string;
  name: string;
  email: string;
}

// Define CardsProps for Card
interface CardsProps {
  reviews: Review[];
}

const Cards: React.FC<CardsProps> = ({ reviews }) => {
  return (
    <div className="mt-4 text-slate-200 bg-neutral-800 rounded-lg p-4 font-medium">
      {reviews.length === 0 ? (
        <p>No reviews to display.</p>
      ) : (
        reviews.map((review: Review, index: number) => (
          <div key={index} className="mb-6">
            <div className="flex items-center">
              <span className="text-yellow-500 text-2xl">
                {"★".repeat(review.stars)}
              </span>
              <span className="ml-2 text-lg">{review.stars} Stars</span>
            </div>
            <div className="mt-4">{review.review}</div>
            <div className="mt-4">Name: {review.name}</div>
            <div className="mt-4">Email: {review.email}</div>
          </div>
        ))
      )}
    </div>
  );
};

// Define the Options component
const Options: React.FC = () => {
  return <div className="mt-4 text-white">Wall of Love</div>;
};

export function Summary() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [space, setSpace] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get("/getreview", {
        withCredentials: true,
      });
      if (
        res.data.space.spacename ||
        res.data.getReview &&
        res.data.getReview.length !== 0
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
    <div className="bg-neutral-900 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <NavBarOther />

        <div className="mt-4">
          <img src="logo.svg" alt="Logo" width={100} />
        </div>
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
            <Options />
          </div>
          <div className="col-span-8">
            <Cards reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
