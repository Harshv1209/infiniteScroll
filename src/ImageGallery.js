import React, { useState, useEffect, useRef, useCallback } from "react"

const ImageGallery = () => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const observer = useRef()

  const fetchImages = useCallback(async () => {
    const newImages = Array.from(
      { length: 10 },
      (_, index) => `https://picsum.photos/200/300/?random=${page}-${index}`
    )
    setImages((prevImages) => [...prevImages, ...newImages])
  }, [page])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const lastImageRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [])

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {images.map((src, index) => {
        if (index === images.length - 1) {
          return (
            <img
              ref={lastImageRef}
              key={src}
              src={src}
              alt="Picsum"
              style={{
                width: "200px",
                height: "200px",
                margin: "10px",
                objectFit: "cover",
              }}
              loading="lazy"
            />
          )
        }
        return (
          <img
            key={src}
            src={src}
            alt="Picsum"
            style={{
              width: "200px",
              height: "200px",
              margin: "10px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        )
      })}
    </div>
  )
}

export default ImageGallery
