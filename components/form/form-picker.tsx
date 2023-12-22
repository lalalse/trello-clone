"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { unsplash } from "@/lib/unsplash"
import { Check, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'
import { defaultImages } from '@/lib/constants/image'
import { FormErrors } from './form-errors'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({
  id,
  errors
}: FormPickerProps) => {
  const { pending } = useFormStatus()

  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImgId, setSelectedImgId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9
        })

        if (result && result.response) {
          const imgResult = (result.response as Array<Record<string, any>>)
          setImages(imgResult)
        } else {
          console.error("Failed to get images from Unsplash")
          setImages(defaultImages)
        }
      } catch (error) {
        console.log(error)
        setImages([defaultImages])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 textsky-700 animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                pending && "opacity-50 hover:opacity-50 cursor-auto"
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImgId(image.id)
              }}
            >
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                checked={selectedImgId === image.id}
                onChange={() => { return }}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                src={image.urls.thumb}
                sizes='90'
                alt="Unsplash image"
                className="object-cover rounded-sm"
                fill />
              {selectedImgId === image.id && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absoulte bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/10" >
                {image.user.name}
              </Link>
            </div>
          )
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  )
}