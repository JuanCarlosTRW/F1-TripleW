"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn, type Testimonial } from "./ui/TestimonialsColumn";

const reviews: Testimonial[] = [
  {
    text: "Have rented from this company many times. They have excellent customer service and the RV has always been in Great shape. What stands out about this company is the convenience. They will delivery a Golf Cart and RV to wherever you\u2019re at and you don\u2019t have to touch a thing.",
    name: "Daniel Henson",
    rating: 5,
  },
  {
    text: "This was the easiest rental I have ever done. These guys were quick to answer any questions, very professional, and so convenient for our weekend at the ATV park. The unit was super clean and perfect size for the family. Definitely recommend!!",
    name: "Jennifer Crumley",
    rating: 5,
  },
  {
    text: "Triple W Rentals provided professional and excellent quality of service. From booking the RV rental, to the unit provided itself, the experience was great. They even without request, provided an upgraded unit to insure the stay was the best it could be.",
    name: "Dennis Kruse",
    rating: 5,
  },
  {
    text: "We rented the Impression RV for a mini vacation with our grand kids. They were thrilled with the bunk beds, and we felt the RV was spacious and easy to handle. Westin and his brother were super helpful and informative throughout our experience. Very friendly and laid-back guys! We would definitely use Triple-W again!",
    name: "Dan Laura Savage",
    rating: 5,
  },
  {
    text: "We\u2019ve used Triple W Rentals twice now. And we can\u2019t be more pleased! Their trailers are exceptionally clean and exactly as they are described on their website. Triple W goes out of their way to give you the best experience. We will definitely be using them again and recommending them to all our family and friends!",
    name: "Mylissa Messer",
    rating: 5,
  },
  {
    text: "Such a wonderful experience!!! Triple W was super responsive, and super easy to work with. The camper we rented was more than I had expected! Very nice and clean! As repeat customers we will most definitely continue to us Triple W!",
    name: "Ashlie W",
    rating: 5,
  },
  {
    text: "If youre looking for an RV rental option, Triple W Rentals should be your only phone call! Phenomenal customer service, and a great selection of clean and nice rvs.",
    name: "Brandon",
    rating: 5,
  },
  {
    text: "Best RV rental ever! They rented to us at a moment\u2019s notice on the 4th of July. Delivered same day, setup, and provided an overview. Amazing! Top notch! Above and beyond!",
    name: "Luci Wade-Cantu",
    rating: 5,
  },
  {
    text: "The customer service was outstanding. Shane went above and beyond. The camper was delivered and set up before I even arrived, completely stocked. All I had to do was bring my family and food.",
    name: "Amy Walker",
    rating: 5,
  },
  {
    text: "Triple W was great to work with. As a RV novice Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded with strong A/C. Will definitely use them again.",
    name: "Sandy McKinney",
    rating: 5,
  },
  {
    text: "Great experience! The booking process was smooth, the staff was friendly and helpful, and the Momentum RV was in excellent condition. Everything went exactly as planned.",
    name: "Jaden Richardson",
    rating: 5,
  },
  {
    text: "The RV was setup and delivered for us. Clean and roomy. Westin and his company were a pleasure to do business with. Couldn\u2019t ask for a better experience!",
    name: "Grant Walker",
    rating: 5,
  },
];

const column1 = reviews.slice(0, 4);
const column2 = reviews.slice(4, 8);
const column3 = reviews.slice(8, 12);

export default function Reviews() {
  return (
    <section className="relative bg-white w-full py-20 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-[#D4A853]/40 text-[#8B6B1F] py-1 px-4 rounded-full text-[11px] tracking-[0.25em] uppercase">
              Testimonials
            </div>
          </div>
          <h2 className="font-display text-[#1A1510] text-4xl md:text-5xl mt-5 leading-tight">
            Don&apos;t Take Our Word for It.
          </h2>
        </motion.div>

        <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] md:max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={column1} duration={18} variant="light" />
          <TestimonialsColumn
            testimonials={column2}
            className="hidden md:block"
            duration={22}
            variant="light"
          />
          <TestimonialsColumn
            testimonials={column3}
            className="hidden lg:block"
            duration={20}
            variant="light"
          />
        </div>
      </div>
    </section>
  );
}
