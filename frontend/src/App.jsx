import RoutesWrapper from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <RoutesWrapper />
    </AuthProvider>
  );
}
