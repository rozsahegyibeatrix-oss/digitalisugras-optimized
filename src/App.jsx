import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import Portfolio from './components/sections/Portfolio';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/munkaink" element={<SectionPage Section={Portfolio} routeKey="work" />} />
        <Route path="/arak" element={<SectionPage Section={Pricing} routeKey="pricing" />} />
        <Route path="/gyik" element={<SectionPage Section={FAQ} routeKey="faq" />} />
        <Route path="/en" element={<Home lang="en" />} />
        <Route path="/en/home" element={<Home lang="en" />} />
        <Route path="/en/work" element={<SectionPage Section={Portfolio} routeKey="work" lang="en" />} />
        <Route path="/en/pricing" element={<SectionPage Section={Pricing} routeKey="pricing" lang="en" />} />
        <Route path="/en/faq" element={<SectionPage Section={FAQ} routeKey="faq" lang="en" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App
