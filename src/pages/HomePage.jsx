import ImageSlider from '../components/ImageSlider.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Car, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
  const sliderImages = [
    {
      url: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Modern car on road",
      title: "Manage Your Vehicle Information",
      description: "Access all your vehicle details in one secure place"
    },
    {
      url: "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Luxury car dashboard",
      title: "Easy Registration Process",
      description: "Simple and intuitive registration and management"
    },
    {
      url: "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Car registration plates",
      title: "Digital License Plate Management",
      description: "Securely access and manage your license plate information"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary-600" />,
      title: "Secure Management",
      description: "Your vehicle and personal information is always protected with industry-leading security"
    },
    {
      icon: <Car className="w-12 h-12 text-primary-600" />,
      title: "Vehicle Tracking",
      description: "Keep track of all your vehicle details in one convenient digital space"
    },
    {
      icon: <Clock className="w-12 h-12 text-primary-600" />,
      title: "24/7 Access",
      description: "Access your vehicle information anytime, anywhere from any device"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <section className="w-full">
        <ImageSlider images={sliderImages} />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
     {!isAuthenticated&&<section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of vehicle owners who trust CARHUB for their vehicle management needs.
          </p>
          <Link 
            to="/login" 
            className="bg-white text-primary-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Sign In Now
          </Link>
        </div>
      </section>}
    </div>
  );
};

export default HomePage;