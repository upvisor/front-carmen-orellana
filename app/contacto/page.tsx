import React from 'react'
import { ContactPage } from '@/components/contact'
import { Design } from '@/interfaces'
import { Slider } from '@/components/home'
import { Subscribe } from '@/components/ui'
import { Block1, Block2, Block3, Block4, Block5, Block7, Call, Calls, Checkout, Lead1, Lead2, Video } from '@/components/design'

export const revalidate = 3600

async function fetchDesign () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`)
  return res.json()
}

async function fetchForms () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`)
  return res.json()
}

async function fetchCalls () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`)
  return res.json()
}

async function fetchServices () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
  return res.json()
}

async function fetchPayment () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`)
  return res.json()
}

async function fetchStoreData () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`)
  return res.json()
}

export async function generateMetadata() {
  const design: Design = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`).then((res) => res.json())
  const home = design.pages?.find(page => page.page === 'Contacto')
  return {
    title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
    description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
    openGraph: {
      title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
      description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/contacto`,
      images: [home?.image && home.image !== '' ? home.image : '']
    }
  }
}

export default async function Page () {

  const [design, forms, calls, services, payment, storeData] = await Promise.all([
    fetchDesign(),
    fetchForms(),
    fetchCalls(),
    fetchServices(),
    fetchStoreData(),
    fetchPayment()
  ])

  return (
    <div className="flex flex-col">
      {
        design.pages.map((page: any) => {
          if (page.page === 'Contacto') {
            return (
              <>
                {
                  page.design.map((content: any, index: any) => {
                    if (content.content === 'Carrusel') {
                      return <Slider key={content.content} info={content.info} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 1') {
                      return <Block1 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 2') {
                      return <Block2 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 3') {
                      return <Block3 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 4') {
                      return <Block4 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 5') {
                      return <Block5 key={content.content} content={content} index={index} forms={forms} calls={calls} design={design} payment={payment} />
                    } else if (content.content === 'Contacto') {
                      return <ContactPage key={content.content} info={ content.info } index={index} />
                    } else if (content.content === 'Suscripción') {
                      return <Subscribe key={content.content} info={ content.info } />
                    } else if (content.content === 'Lead 1') {
                      return <Lead1 key={content.content} content={content} forms={forms} index={index} services={services} />
                    } else if (content.content === 'Video') {
                      return <Video key={content.content} content={content} index={index} />
                    } else if (content.content === 'Agendar llamada') {
                      return <Call key={content.content} calls={calls} content={content} services={services} payment={payment} storeData={storeData} />
                    } else if (content.content === 'Bloque 7') {
                      return <Block7 key={content.content} content={content} />
                    } else if (content.content === 'Llamadas') {
                      return <Calls key={content.content} content={content} calls={calls} />
                    } else if (content.content === 'Checkout') {
                      return <Checkout key={content.content} content={content} services={services} storeData={storeData} />
                    } else if (content.content === 'Lead 2') {
                      return <Lead2 key={content.content} content={content} forms={forms} index={index} services={services} storeData={storeData} />
                    }
                  })
                }
              </>
            )
          }
        })
      }
    </div>
  )
}