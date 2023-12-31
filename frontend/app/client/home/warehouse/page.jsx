"use client"

import React, { useEffect, useState } from "react";
import love from "../../../../public/images/logo/love(1).svg";
import left from "../../../../public/images/dashboard/left-arrow.svg";
import bell from "../../../../public/images/dashboard/bell.svg";
import axios from "axios";
import Image from "next/image";
import Stripe from "stripe";
import Link from "next/link";
import loading from "../../../../public/images/circleLoader.gif";
import { Toaster, toast } from "react-hot-toast"

const Page = () => {
  const [Data, setData] = useState();
  const [shake, setShake] = useState(false);
  const [isButtonLaoding, setIsButtonLaoding] = useState(false);

  let SelectedName = ''
  let SelectedPrice = 0
  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
        "https://recycle-it.onrender.com/client/dashboard/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.products);
      } catch(error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])


  const Key = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
  const stripe = new Stripe(Key, {
    apiVersion: "2022-11-15",
  });

  const handleCheckout = async (items) => {
    setIsButtonLaoding(true)
    toast.success("Payment initiated...", {
      style: {
        border: "2px solid rgba(255, 255, 255, 0.1)",
        padding: "10px",
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        fontFamily: "Space-Grostek",
        fontSize: '1.1em'
      },
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
    const saveProducts = async ()=>{
      const token = localStorage.getItem('token')
      const url = `https://recycle-it.onrender.com/client/products/`+items._id
      try {

        const res = await axios.post(url,null,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log(err)
      }
    }


    const getSavedProd = async () =>{
      const token = localStorage.getItem('token')
      try {

        const url = "https://recycle-it.onrender.com/client/dashboard/orderedItems"
        const res = await axios.get(url,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        const last = res.data.orderforclient.length - 1
        SelectedName = res.data.orderforclient[last].type
        SelectedPrice = res.data.orderforclient[last].price
      } catch (err) {
        console.log(err)
      }
    }

    await saveProducts()
    await getSavedProd()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: SelectedName,
            },
            unit_amount: SelectedPrice*100,
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      mode: "payment",
      success_url: `${origin}/client/success`,
    });
    if (session.url) {
      window.location.href = session.url;
    }
    setIsButtonLaoding(false)
   };

   const handleWish = async(items)=>{
    const token = localStorage.getItem('token')
    try {

      const res = await axios.post('https://recycle-it.onrender.com/client/wishlist/products/'+items._id,null,{
        headers : {
          Authorization :  `Bearer ${token}`
        }
      })
      console.log(res.data)
      toast.success("Item added to wishlist!🥳", {
        style: {
          border: "2px solid rgba(255, 255, 255, 0.1)",
          padding: "10px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          fontFamily: "Space-Grostek",
          fontSize: '1.1em'
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } catch (err) {
      toast.error("Failed to add to wishlist.☹️", {
        style: {
          border: "2px solid rgba(255, 255, 255, 0.1)",
          padding: "10px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          fontFamily: "Space-Grostek",
          fontSize: '1.1em'
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    } finally {
      setShake(false);
    }
   }
   const animateButton = () => {
    const image = document.getElementById("like-button");
    image.classList.add('jiggle');
    setTimeout(() => {
      image.classList.remove('jiggle');
    }, 1000);
  };

  return (
   <div className="panel">
    <div className="phone:px-3 lg:px-10 flex justify-between border-b-2 border-white/10 phone:py-3 lg:py-4">
      <Link href="/client/home">
        <Image src={left} alt="" className="phone:w-9 phone:h-9 lg:w-12 lg:h-12 my-auto"/>
      </Link>
      <h1 className="phone:text-3xl lg:text-5xl font-roxale text-white">
        Reycle It
      </h1>
      <Link href="/admin/notifications">
        <Image src={bell} alt="" className="phone:w-8 phone:h-8 lg:w-12 lg:h-12 my-auto"/>
      </Link>
    </div>
    <div className="lg:grid lg:grid-cols-3 w-[100%] h-full phone:px-5 lg:px-10 mx-auto lg:py-7 gap-5">
      {Data ? (
        Data.map((items, index) => (
          <div className="bg-white/10 border-2 flex flex-col justify-between lg:gap-7 border-white/10 lg:h-72 rounded-2xl lg:grid lg:grid-cols-2 lg:my-0 phone:my-5 px-3 shadow-lg" key={index}>
            <img
              src={items.img}
              alt=""
              className="m-auto overflow-hidden phone:h-52 lg:h-64 w-full object-cover rounded-2xl phone:mt-4"
            />
            <div className="my-5 flex flex-col justify-between phone:gap-7 lg:gap-0">
              <div className="">
                <div className="flex my-auto justify-between w-full">
                  <div className="font-roxale text-3xl text-white break-words">
                    {items.type}
                  </div>
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                  />
                  <button id="like-button" onClick={animateButton}>
                    <Image src={love} alt="" className="w-9 h-9 mt-auto" onClick={()=>{handleWish(items)}}/>
                  </button>
                </div>
                <p className="font-roxale text-gray-300">
                  {items.desc}
                </p>
              </div>
              <div className="flex lg:flex-col gap-2 phone:justify-between">
                <p className="phone:text-2xl lg:text-3xl font-roxale text-white my-auto">
                  Price: ₹{items.price}
                </p>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                />
                <button onClick={() =>handleCheckout(items)} className={`font-roxale py-3 rounded-lg shadow-lg my-auto w-[50%] ${
                  isButtonLaoding ? 'bg-gray-300/10 cursor-not-allowed border border-black/10' : 'bg-black text-white'
                }`} disabled={isButtonLaoding}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[85vh] w-screen">
          <Image src={loading} alt="" className="w-20 h-20"/>
        </div>
      )}
    </div>
    </div>
  );
};

export default Page;
