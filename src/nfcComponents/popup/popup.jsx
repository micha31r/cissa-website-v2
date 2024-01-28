import { useEffect, useRef } from 'react'
import './popup.css'

export default function Popup ({ children, width=500, height=600, show, toggle }) {
  const popupRef = useRef(null)

  function clickCallback (event) {
    // Hide when clicked outside of popup
    if (show && !popupRef.current.contains(event.target)) {
      toggle(false)
    }
  }

  useEffect(() => {
    // Use setTimeout to wait for the next React update cycle
    setTimeout(() => {
      window.addEventListener('click', clickCallback)
    })
    return () => window.removeEventListener('click', clickCallback)
  }, [show])

  return (
    <div 
      ref={popupRef}
      className="popup" 
      style={{
        width,
        height,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      <div className="popup__inner">
        <div className="popup__content">
          {children}
        </div>
      </div>
    </div>
  )
}