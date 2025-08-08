import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
      question: "Διαθέτω υπαίθριο χώρο αλλά δεν είναι τακτοποιημένος. Θα χρειαστεί να πληρώσω για την κατάλληλη διαμόρφωσή του;",
      answer: "Όχι. Δεν πληρώνετε απολύτως τίποτα. Εφόσον το ακίνητό σας κριθεί κατάλληλο για Χώρο Στάθμευσης οχημάτων αναλαμβάνουμε εμείς το κόστος για την πλήρη διαμόρφωσή του."
    },
    {
      question: "Διαθέτω ήδη έναν χώρο Στάθμευσης. Αναλαμβάνετε τη λειτουργία του;",
      answer: "Σωστά. Αναλαμβάνουμε τη Μίσθωση του χώρου σας και τον Οργανώνουμε κατάλληλα ώστε να πληροί τις προϋποθέσεις ενός λειτουργικού χώρου στάθμευσης."
    },
    {
      question: "Διαθέτω έναν χώρο στάθμευσης αλλά δεν θέλω πλέον να τον λειτουργώ ο ίδιος. Αναλαμβάνετε τη Διαχείρισή του;",
      answer: "Σωστά. Διαθέτουμε την κατάλληλη Πείρα για τη σωστή Διαχείριση του χώρου σας. Στελεχώνουμε και λειτουργούμε τον χώρο σας κι εσείς απολαμβάνετε το οφέλη της συνεργασίας μας."
    },
    {
      question: "Αναλαμβάνετε τον Εξοπλισμό και την Οργάνωση άλλων χώρων που δεν διαχειρίζεστε;",
      answer: "Αναλαμβάνουμε τη σωστή επιλογή κατάλληλου εξοπλισμού από τις μεγαλύτερες εταιρείες του χώρου και οργανώνουμε τον χώρο σας ώστε να τον λειτουργείτε με το μεγαλύτερο δυνατό κέρδος."
    }
  ];
  

export default function Faq() {
  return (
    <section id="faq" className="w-full py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Συνήθεις Ερωτήσεις</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
