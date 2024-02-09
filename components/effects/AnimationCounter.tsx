"use client"

import { useEffect, useRef } from "react"
import { AnimationPlaybackControls, animate } from "framer-motion"

type AnimateCounterProps = {
  total?: number
  className?: string
  rest?: any
}

const AnimateCounter = ({ total, ...rest }: AnimateCounterProps) => {
  const countRef = useRef<HTMLSpanElement>(null)
  const initialCount = 0

  useEffect(() => {
    const count = countRef.current

    const controls: AnimationPlaybackControls = animate(initialCount, total, {
      duration: 1,
      onUpdate: (value) => {
        if (count) {
          count.textContent = Math.floor(value).toString()
        }
      },
    })

    return () => controls.stop()
  }, [total])

  return <span {...rest} ref={countRef} />
}

export default AnimateCounter
