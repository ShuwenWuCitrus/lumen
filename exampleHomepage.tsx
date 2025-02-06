// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from "react";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const App: React.FC = () => {
  const [currentMood, setCurrentMood] = useState("peaceful");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-emerald-600">
                Lumen
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full"
              >
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Tasks
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Notes
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Resources
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Community
              </a>
              <button className="bg-emerald-600 text-white px-4 py-2 !rounded-button whitespace-nowrap">
                <i className="fas fa-plus mr-2"></i>Create
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pr-12">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Lumen
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A mindful platform designed for ADHD and INFP individuals to
                manage tasks, record thoughts, and find resonance within a
                supportive community.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 !rounded-button whitespace-nowrap hover:bg-emerald-700 transition">
                Start Your Journey
              </button>
            </div>
            <div className="w-1/2">
              <img
                src="https://public.readdy.ai/ai/img_res/005fa80f539ce7249bc9fbc421e5dc02.jpg"
                alt="Peaceful illustration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-48 mb-6 overflow-hidden rounded-lg">
              <img
                src="https://public.readdy.ai/ai/img_res/e71164d8d6955616a1a5c7ca8821d795.jpg"
                alt="Task Management"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Task Management
            </h3>
            <p className="text-gray-600">
              Simple and intuitive task organization designed specifically for
              ADHD minds. Break down complex projects into manageable steps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-48 mb-6 overflow-hidden rounded-lg">
              <img
                src="https://public.readdy.ai/ai/img_res/12b6416534027592bd8e0a7540d29936.jpg"
                alt="Thought Recording"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Thought Journal
            </h3>
            <p className="text-gray-600">
              Capture your thoughts and feelings in a safe space. Track
              emotional patterns and celebrate personal growth moments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="h-48 mb-6 overflow-hidden rounded-lg">
              <img
                src="https://public.readdy.ai/ai/img_res/370dec714387daecd093d9ec4743e102.jpg"
                alt="Community"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Find Your Tribe
            </h3>
            <p className="text-gray-600">
              Connect with others who understand your journey. Share experiences
              and find support in our mindful community.
            </p>
          </div>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
            Daily Mood Tracking
          </h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex space-x-4 mb-8">
                {["peaceful", "happy", "anxious", "focused", "tired"].map(
                  (mood) => (
                    <button
                      key={mood}
                      onClick={() => setCurrentMood(mood)}
                      className={`px-4 py-2 rounded-full capitalize whitespace-nowrap !rounded-button ${
                        currentMood === mood
                          ? "bg-emerald-600 text-white"
                          : "bg-white text-gray-600 hover:bg-emerald-50"
                      }`}
                    >
                      {mood}
                    </button>
                  )
                )}
              </div>
              <div className="h-64" id="moodChart"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                  Today's Mindful Moments
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check-circle text-emerald-600 mr-3"></i>
                    Morning meditation completed
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check-circle text-emerald-600 mr-3"></i>
                    Took a nature walk
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check-circle text-emerald-600 mr-3"></i>
                    Practiced deep breathing
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">
                  Upcoming Activities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <i className="far fa-calendar text-purple-600 mr-3"></i>
                    Group Support Session at 3 PM
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="far fa-calendar text-purple-600 mr-3"></i>
                    Mindfulness Workshop Tomorrow
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
          Community Stories
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="mb-12"
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://readdy.ai/api/search-image?query=A professional headshot portrait with neutral background showing confidence and warmth number ${index}&width=50&height=50&orientation=squarish`}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      Emily Parker
                    </h4>
                    <p className="text-sm text-gray-500">ADHD Advocate</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Lumen has transformed how I manage my daily tasks. The
                  community support here is incredible, and I've finally found
                  tools that work for my brain."
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Lumen</h3>
              <p className="text-sm">
                Empowering neurodivergent individuals to thrive through mindful
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2024 Lumen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
