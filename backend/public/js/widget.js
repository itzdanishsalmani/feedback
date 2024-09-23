(function() {
  // Configuration
  const userId = 2
  const API_URL = `http://localhost:3000/testimonial/${userId}`;
  const CONTAINER_ID = 'testimonial-widget-container';

  const style = document.createElement('style');
  style.innerHTML = `
    #${CONTAINER_ID} {
      font-family: Arial, sans-serif;
      background-color: #FFF;
      padding: 20px;
      border-radius: 8px;
      max-width: 400px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    #${CONTAINER_ID} .testimonial {
      margin-bottom: 20px;
    }
    #${CONTAINER_ID} .testimonial:last-child {
      margin-bottom: 0;
    }
    #${CONTAINER_ID} .stars {
      color: #FFD700;
      margin-bottom: 5px;
    }
    #${CONTAINER_ID} .review-text {
      font-size: 14px;
      margin-bottom: 5px;
    }
    #${CONTAINER_ID} .reviewer {
      font-weight: bold;
      font-size: 13px;
      color: #555;
    }
  `;
  document.head.appendChild(style);

  // Create the container if it doesn't exist
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
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
      console.log(data.getReview)
      renderReviews(getReview);
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      container.innerHTML = '<p>Unable to load testimonials at this time.</p>';
    }
  }

  // Function to render reviews
  function renderReviews(reviews) {
    if (reviews.length === 0) {
      container.innerHTML = '<p>No testimonials available.</p>';
      return;
    }

    const testimonialsHTML = reviews.map(user => `
      <div class="testimonial">
        <div class="review-text">Spacename: "${user.spacename}"</div>
      </div>
    `).join('');

    container.innerHTML = testimonialsHTML;
  }

  // Initialize the widget
  loadTestimonials();
})();
