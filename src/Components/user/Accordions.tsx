import {Accordion, AccordionItem} from "@nextui-org/react";

function Accordions() {

    const defaultContent1 ='Fundraising is the process of collecting voluntary financial contributions from individuals, businesses, or organizations to support a specific cause, project, or need. It empowers communities to come together and make a positive impact, whether for medical expenses, education, or charitable initiatives, by pooling resources for a greater good.'
 
    const defaultContent2 ='You can easily become a fundraiser by signing up on our platform and submitting the necessary information and documents. After a thorough evaluation of your data, your fundraising campaign will go live, allowing you to start raising funds for your cause.'

    const defaultContent3='yes, We charge a 5% fee from the total amount raised through your crowdfunding campaign to ensure the smooth operation of our platform. Rest assured, there are no additional hidden charges, allowing you to focus on your fundraising goals without any unexpected costs.'


  return (
    <Accordion variant="splitted">
    <AccordionItem key="1" aria-label="Accordion 1" className="font-semibold" title="What is Crowdfunding">
      {defaultContent1}
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" className="font-semibold" title="How to be a Fundraiser">
      {defaultContent2}
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" className="font-semibold" title="Is there any charges in this platform">
      {defaultContent3}
    </AccordionItem>
    </Accordion>
  )
}

export default Accordions

