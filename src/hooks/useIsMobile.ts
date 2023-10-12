import { useEffect, useState } from "react"

export const useIsMobile = (screensize?: number) => {
  const [width, setWidthWindow] = useState(0)

  useEffect(() => {
    const handleChange = () => setWidthWindow(window.innerWidth)

    handleChange()
    window.addEventListener('resize', handleChange)

    return () => window.removeEventListener('resize', handleChange)
  }, [])

  return width <= (screensize ?? 600)
}