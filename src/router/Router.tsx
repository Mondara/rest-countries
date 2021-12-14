import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/header/header';
import Homepage from '../pages/Homepage/Homepage';
import Country from '../pages/Country/country';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="Country/:countryId" element={<Country />} />
            </Routes>
        </BrowserRouter>
    );
}
