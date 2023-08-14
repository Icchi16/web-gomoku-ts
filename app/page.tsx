import Modal from "@/components/modals/Modal";
import { useTheme } from "@/hooks/useTheme";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="h-full">
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        progressClassName="bg-red-400"
        theme="colored"
      />
      <Modal />
    </div>
  );
}
