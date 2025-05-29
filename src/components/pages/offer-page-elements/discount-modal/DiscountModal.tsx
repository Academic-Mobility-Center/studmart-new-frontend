import React from "react";

interface EmployeePromocode {
  id: string;
  name: string;
  description: string;
  size: number;
  promocodeValue: string;
  partner: {
    id: string;
    companyName: string;
    subtitle: string;
    maxDiscount: number;
    isFixed: boolean;
  };
  hasAllRegions: boolean;
  regions: [];
}

interface PersonalPromocode {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    university: {
      id: number;
      name: string;
    };
  };
  discount: {
    id: string;
    name: string;
    description: string;
    size: number;
    promocodeValue: string | null;
    partner: {
      id: string;
      companyName: string;
      subtitle: string;
      maxDiscount: number;
      isFixed: boolean;
      category: {
        id: number;
        name: string;
      };
    };
    hasAllRegions: boolean;
    regions: [];
  };
  promocode: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  promoCode?: PersonalPromocode | EmployeePromocode;
}

const DiscountModal: React.FC<Props> = ({ isOpen, closeModal, promoCode }) => {
  if (!isOpen || !promoCode) return null;

  const isEmployee = !("discount" in promoCode);

  const name = isEmployee ? promoCode.name : promoCode.discount.name;
  const description = isEmployee ? promoCode.description : promoCode.discount.description;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>{name}</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>

        <button
          onClick={closeModal}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#8fe248",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default DiscountModal;
