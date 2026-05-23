import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { CheckIns } from './pages/CheckIns';
import { TrainingOverview } from './pages/TrainingOverview';
import { TrainingSession } from './pages/TrainingSession';
import { NutritionOverview } from './pages/NutritionOverview';
import { MealDetails } from './pages/MealDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Progress } from './pages/Progress';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App Routes with Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/training" replace />} />
                <Route path="/check-ins" element={<CheckIns />} />
                <Route path="/training" element={<TrainingOverview />} />
                <Route path="/training/arms" element={<TrainingSession />} />
                <Route path="/nutrition" element={<NutritionOverview />} />
                <Route path="/nutrition/breakfast" element={<MealDetails />} />
                <Route path="/progress" element={<Progress />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
