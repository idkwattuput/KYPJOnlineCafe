import React from 'react'
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex justify-center items-center gap-2 p-4'>
        <p className='font-medium'>&copy;2023 Develop By DDWD(S2). All Right Reseved</p>
        <Link to="https://github.com/yaayad/kypjcafe2"><AiFillGithub size={28}/></Link>
    </footer>
  )
}

export default Footer