import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import SideBar from "@/widgets/SideBar";
import PageName from "@/widgets/PageName";
import { OfferCard } from "@/components/uni/offer/OfferCard";
import ModalComponent from "@/widgets/CreateOfferModal";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://192.168.43.106:8080/api/offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <SideBar>
      <div className="w-full flex flex-col">
        <PageName pageName="Offers" />
        <Button
          onClick={() => router.push("/uni/add")}
          color="success"
          title="Add new offer"
          variant="flat"
          className="self-end m-4"
        >
          Add a new offer
        </Button>
        <ModalComponent open={isOpen} handleClose={handleClose} />
        <div className="grid grid-cols-2 gap-4 p-4">
          {offers.map((offer, i) => (
            <OfferCard
              key={i}
              offer={offer}
              showCompare={false}
              viewMore={false}
            />
          ))}
        </div>
      </div>
    </SideBar>
  );
};

export default Index;
