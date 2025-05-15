import React from 'react';
import { Shield, Users, TrendingUp, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About CARHUB</h1>
          <p className="text-lg max-w-2xl mx-auto">
            A secure, innovative platform dedicated to simplifying vehicle information management.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="CAR HUB Office" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                CARHUB was founded in 2020 with a simple mission: to transform how people manage their vehicle information. 
                We recognized that traditional vehicle documentation systems were outdated and inefficient, often causing 
                frustration for vehicle owners.
              </p>
              <p className="text-gray-700 mb-4">
                Our team of automotive and technology experts came together to create a digital solution that would 
                simplify vehicle information management, making it more accessible, secure, and user-friendly.
              </p>
              <p className="text-gray-700">
                Today, CAR HUB serves thousands of vehicle owners, helping them manage their vehicle registration, 
                license plate information, and more—all in one convenient digital platform.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;
