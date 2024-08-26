import { useState,useEffect} from "react";

const useScroll = () => {
    const [scorll,setScorll] = useState(0) 
  useEffect(()=>{
    window.onscroll = ()=>{
      setScorll(window.scrollY);
    }
  },[])
    return scorll
};

export default useScroll;