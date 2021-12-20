import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage, Header, Country } from '../pages';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Homepage />} />
                    <Route path="Country/:countryId" element={<Country />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
