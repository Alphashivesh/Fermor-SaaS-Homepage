# Fermor | AI-First Personal Finance Platform

**Live Demo:** [https://fermor-saa-s-homepage.vercel.app](https://fermor-saa-s-homepage.vercel.app)

Fermor is an enterprise-grade SaaS landing page and interactive frontend application designed to showcase advanced product engineering, state-driven UI/UX, and complex data visualization. Built with React and Vite, it simulates the experience of a high-end personal finance platform powered by an intelligent, context-aware AI assistant.

## 🚀 Core Features

This project moves beyond a static landing page by implementing deep micro-interactions, real-time data simulations, and highly complex React state management:

*   **Generative AI Assistant:** A split-screen chat interface that doesn't just return text, but renders functional React components (Generative UI) directly inside the chat stream (e.g., "Cancel Subscription" buttons).
*   **Account Aggregator Simulation:** A multi-step, async authentication modal simulating a secure OAuth connection to Tier-1 banks using the RBI framework.
*   **Live Financial Cockpit:** A real-time dashboard featuring simulated WebSocket telemetry, causing net worth and asset allocations to dynamically tick and flash.
*   **Interactive Wealth Engine:** A dynamic compound interest calculator utilizing `useMemo` and Recharts to render instant, interactive SVG area charts as users drag financial sliders.
*   **Global Command Palette:** A keyboard-first navigation system triggered by `Cmd + K` (or `Ctrl + K`), pausing background scrolling and providing instant access to modals and sections.
*   **Pro Advisor Split-Screen:** An interactive financial planner where changes to dropdown parameters (Time Horizon, Risk) automatically trigger responsive AI chat updates.
*   **Premium Visual Engineering:**
    *   Mouse-tracking Spotlight Bento Grids.
    *   Spring-physics Magnetic Buttons.
    *   Animated Aurora breathing backgrounds.
    *   3D Tilt Cards with live "Cost of Inaction" mathematical tickers.
    *   Global scroll progress tracking and floating MacOS-style docks.

## 🛠️ Tech Stack

*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion (Spring physics, layout transitions, AnimatePresence)
*   **Data Visualization:** Recharts
*   **Icons:** Lucide React
*   **Deployment:** Vercel

## 📂 Architecture & Component Breakdown

The application is heavily modularized for maintainability and performance:

*   `App.jsx`: Global state manager lifting crucial states (like `isBankModalOpen`) to allow interoperability between the Command Palette and localized buttons.
*   `AIAssistant.jsx` & `ProAdvisorMode.jsx`: Handles chat history state, simulated typing intervals, and Generative UI component mounting.
*   `AdvancedSimulator.jsx`: Manages complex frontend mathematical loops and `useMemo` caching to ensure smooth 60fps charting without UI lag.
*   `BankLinkModal.jsx` & `TrialModal.jsx`: Manages complex, multi-step asynchronous user onboarding flows.
*   `CostOfInaction.jsx`: Implements `useMotionValue` and `useTransform` for 3D CSS perspective manipulation based on cursor coordinates.

## 💻 Getting Started (Local Development)

To run this project locally, ensure you have Node.js installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd fermor-homepage
   ```
2. **Install dependencies:**
   ```bash
   npm install
   
   ```


   *(Note: This project relies on `framer-motion`, `recharts`, and `lucide-react`)*

3. **Start the development server:**
   ```bash
   npm run dev
   
   ```


4. **View the application:**
Open your browser and navigate to `http://localhost:5173/` (or the port provided in your terminal).

## 🔒 Security & Performance Notes

* **Performance:** All heavy chart recalculations are wrapped in React's `useMemo` hooks to prevent unnecessary re-renders.
* **Client-Side Only:** This application is entirely frontend-driven. All AI responses and API connections are simulated locally using React state and `useEffect` timeouts. No real financial data or personal credentials are collected or stored.
