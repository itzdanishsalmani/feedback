export const Footer = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mt-24 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <div>
              <img src="logo.svg" alt="" width={150} />
            </div>
            <div className="mt-4">
              The easiest solution to getting text and video testimonials from
              your customers
            </div>
          </div>
          <div className="mt-4 md:mb-24 md:mt-0 flex justify-around cursor-pointer ">
            <div>
              <div className="text-white">PRODUCTS</div>
              <div>Our Wall of Love</div>
              <div>Chrome extension</div>
              <div>Slack app</div>
              <div>Hopin app</div>
              <div>Pricing</div>
              <div>Features</div>
              <div>Integrations</div>
              <div>Help center</div>
              <div>Product Demo</div>
              <div>Status page</div>
            </div>

            <div>
              <div className="text-white">COMPANY</div>
              <div>Our resources</div>
              <div>Tutorials</div>
              <div>Customer stories</div>
              <div>Join affiliate program</div>
              <div>Privacy policy</div>
              <div>Terms of Service</div>
              <div>Cookie policy</div>
              <div>DPA (GDPR)</div>
              <div>Contact us</div>
            </div>
          </div>

          <div className="mt-4 pb-12 md:mt-0 flex justify-around cursor-pointer ">
            <div>
              <div className="text-white">CUSTOMERS</div>
              <div>Agencies</div>
              <div>B2B companies</div>
              <div>Course creators</div>
              <div>eCommerce</div>
              <div>Consumer apps</div>
            </div>

            <div>
              <div className="text-white">LATEST VIDEO</div>
              <img src="footer-img.png" alt="" width={150} />
              <div>
                <div>AI Space Creator</div>
                <div>in Testimonial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
