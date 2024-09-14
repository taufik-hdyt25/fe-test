import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CustomerPage, HomePage } from "./pages";
import NotFoundPage from "./pages/not-found";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
