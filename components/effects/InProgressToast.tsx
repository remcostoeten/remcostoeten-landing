// 'use client';
// import React, { useEffect } from 'react';
// import { toast } from 'sonner';

// const WIPToast = () => {
//     useEffect(() => {
//         toast('This website is a work in progress.');
//     }, []);

//     return null;
// };

// export default WIPToast;

"use client"

import React, { useEffect } from "react"
import { toast } from "sonner"

type ToastProps = {
  text?: string
}

const WIPToast = ({
  text = "This website is a work in progress.",
}: ToastProps) => {
  useEffect(() => {
    toast(text)
  }, [text])

  return null
}

export default WIPToast
