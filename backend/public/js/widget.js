(function () {
  // required reviewId for testimonial
  
  const CONTAINER_ID = `testimonial-widget-container`;
  
  const reviewIdElement = document.querySelector("[id^='reviewId-']");
  const reviewIdString = reviewIdElement.id.match(/\[(.*?)\]/)[1]; // Extract the string inside the brackets
  let reviewIds = reviewIdString.split(",").map(Number); // Convert the string to an array of numbers

  const spacenameElement = document.querySelector("[id^='spacename-']");
  const spacenameString = spacenameElement.id.match(/\[(.*?)\]/)[1]; // Extract the string inside the brackets
  let spacename = spacenameString // Convert the string to an array of numbers

  let id = reviewIds

  const API_URL = `http://localhost:3000/testimonial/${spacename}`;

  const style = document.createElement("style");
  style.innerHTML = `
    #${CONTAINER_ID} .main {
      max-width: 400px;
      max-height:300px;
      margin:20px;
      padding: 10px;
      font-family: Arial, sans-serif;
      background-color: #FFF;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    #${CONTAINER_ID} .first-letter {
      width: 30px;
      height: 30px;
      color: blue;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
    }
    #${CONTAINER_ID} .stars {
      color: #FFD700;
      margin-bottom: 5px;
    }
    #${CONTAINER_ID} .review-text {
      font-size: 14px;
      margin-bottom: 5px;
;

    }
  `;
  document.head.appendChild(style);

  // Create the container if it doesn't exist
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
  }

  // Function to fetch and render reviews
  async function loadTestimonials() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const getReview = data.getReview;

      // Filtering the reviews based on the required IDs
      const filterData = getReview.filter((review) => id.includes(review.id));

      renderReviews(filterData);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      container.innerHTML = "<p>Unable to load testimonials at this time.</p>";
    }
  }

  // Function to render reviews
  function renderReviews(reviews) {
    if (reviews.length === 0) {
      container.innerHTML = "<p>No testimonials available.</p>";
      return;
    }

    const testimonialsHTML = reviews
      .map(
        (user) => `
      <div class="main">
        <div> 
        <p class="first-letter">${user.name[0]}</p>
        <span> ${user.name} </span> 
         </div>
        <div class="stars"> ${"★".repeat(user.stars)} </div>
        <div class="review-text"> ${user.review} </div>
      </div>
    `
      )
      .join("");

    container.innerHTML = testimonialsHTML;
  }

  // Initialize the widget
  loadTestimonials();
})();