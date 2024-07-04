import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const Category = () => {

  return (
    
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
       
      </CardBody>
    </Card>
    
  )
}

export default Category
