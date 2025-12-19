
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthScreen } from './screens/AuthScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ProgramScreen } from './screens/ProgramScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { SosScreen } from './screens/SosScreen';
import { MilestonesScreen } from './screens/MilestonesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AuthScreen />} />
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/program" element={<ProgramScreen />} />
                <Route path="/community" element={<CommunityScreen />} />
                <Route path="/milestones" element={<MilestonesScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/sos" element={<SosScreen />} />
                {/* Redirigir cualquier ruta desconocida a la raíz */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
