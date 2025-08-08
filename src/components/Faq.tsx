'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

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
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      image,
      { y: -20, autoAlpha: 0, scale: 0.95 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    ).to(
      image,
      {
        y: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      },
      "-=0.5"
    );

  }, []);

  return (
    <section id="faq" ref={sectionRef} className="w-full py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="md:order-2">
              <div className="text-left mb-8">
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
          <div ref={imageRef} className="md:order-1 opacity-0">
            <Image
              src="/images/col-right-01.jpg"
              alt="Parking illustration"
              width={600}
              height={600}
              className="rounded-lg shadow-2xl object-cover"
              data-ai-hint="parking garage"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
