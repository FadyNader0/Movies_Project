import './Faq.css'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

export default function Faq() {
  return (
    <div className="accordion-container">
      <h2 className='header'>Frequently Asked Questions</h2>
      <Accordion collapseAll className='accordion'>
        <AccordionPanel >
          <AccordionTitle className='panel'>How can I discover movies on your platform?</AccordionTitle>
          <AccordionContent className='content'>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              You can easily discover movies by browsing our extensive collection. Use our advanced filters to search by genre,
              year, popularity, and more. You can also search for specific titles or explore our curated categories.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className='panel'>What information is available for each movie?</AccordionTitle>
          <AccordionContent className='content'>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              For each movie, you can find detailed information including plot summaries, cast details,
              release dates, ratings, reviews, and trailers. You can also see user ratings and read
              community reviews to help make your viewing decisions.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className='panel'>Can I save movies to watch later?</AccordionTitle>
          <AccordionContent className='content'>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Yes! You can add movies to your favorites list to keep track of films you're interested in.
              This makes it easy to find them later and keep up with movies you want to watch.
            </p>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel>
          <AccordionTitle className='panel'>How do I find similar movies?</AccordionTitle>
          <AccordionContent className='content'>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Our platform offers several ways to discover similar movies:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>Browse by genre categories</li>
              <li>Check movie recommendations</li>
              <li>Explore movies by the same cast or director</li>
              <li>Use our advanced filtering options</li>
            </ul>
          </AccordionContent>
        </AccordionPanel>

      </Accordion>
    </div>
  );
}
