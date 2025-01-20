"use client";
import { useState, useEffect } from 'react';

import styles from "../app/alphabot-pcn/styles.module.css";
import Image from "next/image";


const SqueezedCheckbox = () => {
    const [, setIsSqueezed] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const image = document.querySelector('.squeeze-on-scroll') as Element; // Type assertion
        if (!image) return; // Check if image is null
  
        const distanceFromTop = image.getBoundingClientRect().top;
  
        if (distanceFromTop < window.innerHeight * 0.7) { // Adjust the threshold as needed
          setIsSqueezed(true);
        } else {
          setIsSqueezed(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); // Empty dependency array ensures the effect runs only once
  
    return (
      
        <div className="checkboc_img">
            <Image
              src="/Checkbox.png"
              alt="PCN"
              width={40}
              height={40}
              className={`${styles.overlay_img}`}
          />
          </div>
      
    );
  }
  
  export default SqueezedCheckbox;
  