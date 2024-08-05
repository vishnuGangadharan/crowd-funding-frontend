import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

function Accordions() {

    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
 



  return (
    <Accordion variant="splitted">
    <AccordionItem key="1" aria-label="Accordion 1" title="What is Crowdfunding">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="How to be a Fundraiser">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="Is there any charges in this platform">
      {defaultContent}
    </AccordionItem>
    </Accordion>
  )
}

export default Accordions

