import { deleteProduct } from "@/app/lib/inventory/action";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NotificationModal from "../NotificationModal";
import { revalidate } from "@/app/lib/inventory/revalidate";

export function DeleteButton({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    console.log("delete");
    const deleteProductById = await deleteProduct(id);
    if (deleteProductById.status === "ok") {
      setMessage(deleteProductById.message);
      setShowModal(true);
    }
  };
  const onClose = () => {
    setShowModal(false);
    revalidate("/dashboard/inventory", "page", false);
  };
  return (
    <form action={handleSubmit}>
      {!message ? (
        ""
      ) : (
        <NotificationModal
          message={message}
          isOpen={showModal}
          onClose={onClose}
        />
      )}
      <button className="bg-primary p-1 rounded-tr-lg rounded-bl-lg">
        <TrashIcon width={12} />
      </button>
    </form>
  );
}
