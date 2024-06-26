import React, { useState, useEffect } from "react"
import ImageGallery from "./ImageGallery"
import "./App.css"

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2000) // Adjust the delay time as needed

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="App">
      {loading ? (
        <div className="loading-title">
          <h1>Loading...</h1>
        </div>
      ) : (
        <ImageGallery />
      )}
    </div>
  )
}

export default App
