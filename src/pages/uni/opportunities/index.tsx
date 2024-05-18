import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import SideBar from "@/widgets/SideBar";
import PageName from "@/widgets/PageName";

const index = () => {
  return (
    <SideBar>
      <div className="w-full">
        <PageName pageName="Opportunities" />
        <div className="flex">
          <Card className="py-4">
            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
              <p className="text-tiny font-bold uppercase">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="text-large font-bold">Frontend Radio</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="rounded-xl object-cover"
                src="https://nextui.org/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </SideBar>
  );
};

export default index;
