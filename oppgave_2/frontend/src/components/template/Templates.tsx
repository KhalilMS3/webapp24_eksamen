'use client'
import useTemplate from '@/hooks/useTemplate'
import React from 'react'
import TemplateCard from './TemplateCard'

export default function Templates() {
   const { templates, loading, error } = useTemplate()
   
   return (
      <section className='p-10'>
         <h2 className='text-3xl mb-10 font-semibold'>Maler</h2>
         {
            loading ? (<p>Laster inn malene...</p>) :
               error ? (<p>Det oppsted en feil ved lasting av malene 🫤 <br /> {error}</p>)
                  : templates.length > 0 ? (
                     <section className='flex flex-wrap justify-items-stretch gap-3'>
                        {
                           templates.map((template) => (
                              <TemplateCard
                                 key={template.id}
                                 id={template.id}
                                 title={template.title}
                                 description={template.description}
                                 price={template.price}
                                 capacity={template.capacity}
                                 isPrivate={template.is_private}
                                 no_overlapping_event={template.no_overlapping_events}
                                 date_locked={template.date_locked}
                              />
                           ))
                        }
                     </section>
                  ) : (
                        !loading && <p>Ingen maler funnet 🙁</p>
                  )}
      </section>
  )
}
