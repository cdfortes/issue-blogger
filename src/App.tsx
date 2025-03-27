
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Define default language as Portuguese
const defaultLanguage = "pt";

const App = () => (
  <BrowserRouter>
    <AppProvider defaultLanguage={defaultLanguage}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post/:issueNumber" element={<PostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </AppProvider>
  </BrowserRouter>
);

export default App;
