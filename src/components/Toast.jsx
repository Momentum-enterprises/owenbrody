import { useEffect, useState } from 'react'
export default function Toast({ message }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (message) setVisible(true); else setVisible(false); }, [message])
  return <div className={`toast ${visible?'show':''}`}>{message}</div>
}