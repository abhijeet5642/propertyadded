import React, { useState } from 'react'; // Import useState
import { PhoneCall, Mail, MapPin, Clock, Users, Calendar, Briefcase, Globe, CheckCircle, Send, UserPlus } from 'lucide-react'; // Importing Lucide icons, added Send, UserPlus

export default function Contact() {
  // State for the "Send Us a Message" form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactFormStatus, setContactFormStatus] = useState(''); // 'success', 'error', ''

  // State for the "Join Our Broker Network" form
  const [brokerForm, setBrokerForm] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    experience: '',
    locations: '',
    brokerMessage: '',
  });
  const [brokerFormStatus, setBrokerFormStatus] = useState(''); // 'success', 'error', ''

  // Handle change for "Send Us a Message" form
  const handleContactFormChange = (e) => {
    const { id, value } = e.target;
    setContactForm((prev) => ({ ...prev, [id]: value }));
  };

  // Handle submit for "Send Us a Message" form
  const handleContactFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setContactFormStatus('sending'); // Indicate sending status

    // In a real application, you would send this data to your backend server.
    // The backend server would then send an email to ashutoshsharansrivastava@gmail.com.
    // Direct email sending from client-side JavaScript is not secure or reliable.

    console.log('Contact Form Data:', contactForm);
    // Example of a hypothetical API call:
    /*
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: 'ashutoshsharansrivastava@gmail.com', // Recipient email handled by backend
          formData: contactForm,
        }),
      });

      if (response.ok) {
        setContactFormStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' }); // Clear form
        console.log('Contact form submitted successfully!');
      } else {
        setContactFormStatus('error');
        console.error('Failed to send contact form:', response.statusText);
      }
    } catch (error) {
      setContactFormStatus('error');
      console.error('Error sending contact form:', error);
    }
    */

    // Simulate API call for demonstration:
    setTimeout(() => {
      setContactFormStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' }); // Clear form
      console.log('Contact form simulated successfully sent!');
    }, 1500);
  };

  // Handle change for "Join Our Broker Network" form
  const handleBrokerFormChange = (e) => {
    const { id, value } = e.target;
    setBrokerForm((prev) => ({ ...prev, [id.replace('broker-', '')]: value }));
  };

  // Handle submit for "Join Our Broker Network" form
  const handleBrokerFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setBrokerFormStatus('sending'); // Indicate sending status

    // Similar to the contact form, this data would be sent to your backend.
    // The backend would then process the broker application and potentially send an email
    // to ashutoshsharansrivastava@gmail.com or store it in a database.

    console.log('Broker Form Data:', brokerForm);
    // Example of a hypothetical API call:
    /*
    try {
      const response = await fetch('/api/submit-broker-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: 'ashutoshsharansrivastava@gmail.com', // Recipient email handled by backend
          formData: brokerForm,
        }),
      });

      if (response.ok) {
        setBrokerFormStatus('success');
        setBrokerForm({ fullName: '', dob: '', phone: '', email: '', experience: '', locations: '', brokerMessage: '' }); // Clear form
        console.log('Broker form submitted successfully!');
      } else {
        setBrokerFormStatus('error');
        console.error('Failed to submit broker form:', response.statusText);
      }
    } catch (error) {
      setBrokerFormStatus('error');
      console.error('Error submitting broker form:', error);
    }
    */

    // Simulate API call for demonstration:
    setTimeout(() => {
      setBrokerFormStatus('success');
      setBrokerForm({ fullName: '', dob: '', phone: '', email: '', experience: '', locations: '', brokerMessage: '' }); // Clear form
      console.log('Broker form simulated successfully submitted!');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 py-16 sm:py-20 md:py-24">
      {/* Edge-to-edge container with responsive padding */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 space-y-16 sm:space-y-20">

        {/* ── Hero Section ───────────────────────────────────────────────────── */}
        <header className="text-center space-y-6 px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-md">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-700 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're here to help you with all your real estate needs. Reach out to us today!
          </p>
        </header>

        {/* ── Contact Information ───────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <PhoneCall size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-700 leading-relaxed">
                +91 8860719916
              </p>
              <p className="text-gray-700 leading-relaxed">
                +91 9871309875
              </p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <Mail size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-700 leading-relaxed">
                info@pnbwofficials.com
              </p>
              <p className="text-gray-700 leading-relaxed">
                support@pnbwofficials.com
              </p>
            </div>
            {/* Address */}
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-600 mb-4">
                <MapPin size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-700 leading-relaxed">
                PNBW Officials,
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sector 62, Noida, Uttar Pradesh, India
              </p>
            </div>
            {/* Working Hours */}
            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-full lg:col-span-1">
              <div className="text-blue-600 mb-4">
                <Clock size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
              <p className="text-gray-700 leading-relaxed">
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-gray-700 leading-relaxed">
                Saturday: 10:00 AM - 4:00 PM
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sunday: Closed
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact Form ───────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Send Us a Message</h2>
          <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleContactFormSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter your full name"
                value={contactForm.name}
                onChange={handleContactFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="your.email@example.com"
                value={contactForm.email}
                onChange={handleContactFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 text-lg font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Regarding property inquiry, partnership, etc."
                value={contactForm.subject}
                onChange={handleContactFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Type your message here..."
                value={contactForm.message}
                onChange={handleContactFormChange}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                disabled={contactFormStatus === 'sending'}
              >
                {contactFormStatus === 'sending' ? 'Sending...' : <><Send size={20} className="mr-2" /> Send Message</>}
              </button>
            </div>
            {contactFormStatus === 'success' && (
              <p className="text-center text-green-600 mt-4 font-semibold">Message sent successfully!</p>
            )}
            {contactFormStatus === 'error' && (
              <p className="text-center text-red-600 mt-4 font-semibold">Failed to send message. Please try again.</p>
            )}
          </form>
        </section>

        {/* ── Join Our Broker Network ───────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-green-500 pb-4 mb-8 inline-block">Join Our Broker Network</h2>
          <p className="text-gray-800 leading-relaxed text-lg max-w-3xl mx-auto mb-8">
            Are you a passionate and professional real estate broker looking to expand your reach and grow with a trusted partner? Join PNBW Officials' esteemed network!
          </p>
          <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleBrokerFormSubmit}>
            <div>
              <label htmlFor="broker-fullName" className="block text-gray-700 text-lg font-semibold mb-2">Full Name</label>
              <input
                type="text"
                id="broker-fullName"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Enter your full name"
                value={brokerForm.fullName}
                onChange={handleBrokerFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="broker-dob" className="block text-gray-700 text-lg font-semibold mb-2">Date of Birth</label>
              <input
                type="date"
                id="broker-dob"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                value={brokerForm.dob}
                onChange={handleBrokerFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="broker-phone" className="block text-gray-700 text-lg font-semibold mb-2">Contact Number</label>
              <input
                type="tel"
                id="broker-phone"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="e.g., +91 9876543210"
                value={brokerForm.phone}
                onChange={handleBrokerFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="broker-email" className="block text-gray-700 text-lg font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="broker-email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="your.broker.email@example.com"
                value={brokerForm.email}
                onChange={handleBrokerFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="broker-experience" className="block text-gray-700 text-lg font-semibold mb-2">Years of Experience in Real Estate</label>
              <input
                type="number"
                id="broker-experience"
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="e.g., 5"
                value={brokerForm.experience}
                onChange={handleBrokerFormChange}
              />
            </div>
            <div>
              <label htmlFor="broker-locations" className="block text-gray-700 text-lg font-semibold mb-2">Preferred Operating Locations (e.g., Noida, Ghaziabad, Delhi)</label>
              <textarea
                id="broker-locations"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="List cities or regions where you primarily operate"
                value={brokerForm.locations}
                onChange={handleBrokerFormChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="broker-message" className="block text-gray-700 text-lg font-semibold mb-2">Brief Message (Optional)</label>
              <textarea
                id="broker-message"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Tell us a bit about yourself or your specialization"
                value={brokerForm.brokerMessage}
                onChange={handleBrokerFormChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                disabled={brokerFormStatus === 'sending'}
              >
                {brokerFormStatus === 'sending' ? 'Submitting...' : <><UserPlus size={20} className="mr-2" /> Submit Application</>}
              </button>
            </div>
            {brokerFormStatus === 'success' && (
              <p className="text-center text-green-600 mt-4 font-semibold">Application submitted successfully!</p>
            )}
            {brokerFormStatus === 'error' && (
              <p className="text-center text-red-600 mt-4 font-semibold">Failed to submit application. Please try again.</p>
            )}
          </form>
        </section>

        {/* ── Map Section (Placeholder) ───────────────────────────────────────────────── */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-[1.005]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Find Us on the Map</h2>
          <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-2xl font-bold">
            {/* Placeholder for an embedded map (e.g., Google Maps iframe) */}
            Map Placeholder
          </div>
        </section>
      </div>
    </main>
  );
}
