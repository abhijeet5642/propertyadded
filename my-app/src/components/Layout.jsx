// src/components/Layout.jsx
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-skin-base text-white" >
      <Header />
      <main className="flex-1 pt-16 px-6 md:px-10 lg:px-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
