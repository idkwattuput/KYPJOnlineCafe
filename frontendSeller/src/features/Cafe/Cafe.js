import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Cookies from 'js-cookie';
import UpdateCafe from './UpdateCafe';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cafe = () => {
    const [cafe_image_url, setImage] = useState();
    const seller_id = Cookies.get("seller_id");
    const { data } = useFetch(`http://localhost:3500/cafe/${seller_id}`)
    const navigate = useNavigate()

    const handleImage = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('cafeImage', cafe_image_url)
            formData.append('cafe_id', data[0].cafe_id)

            const response = await axios.patch('http://localhost:3500/cafe/updateImage', formData);

            if (response.status === 200 || response.status === 201) {
                console.log("Update Image Successful");
                navigate('/welcome');
                // You can also access the response data if the server sends any.
                console.log("Server response data:", response.data);
            } else {
                console.error("Update failed with status code:", response.status);
                // Handle the error and provide user feedback
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className='text-center p-4'>Your Cafe</h1>
            <div className='flex justify-center items-center'>
                {data.map((cafe) => (
                    <div key={cafe.id} className="flex items-center justify-center m-auto transition duration-300 ease-in-out card max-w-fit max-h-max delay-60 hover:-translate-y-1 hover:scale-105">
                        <img src={`http://localhost:3500/images/${cafe.cafe_image_url}`} alt="" className="max-w-full rounded-t-3xl h-52" />
                        <div className="flex flex-col items-center justify-center min-w-full p-4 bg-white card-body rounded-b-3xl">
                            <h3 className="card-title">{cafe.cafe_name}</h3>
                            <p className="text-sm font-thin">{cafe.description}</p>
                            <p className="font-medium">{cafe.cafe_location}</p>
                        </div>
                    </div>
                ))}
                <form action="" encType='multipart/form-data' onSubmit={handleImage}>
                    <div className="relative max-w-sm">
                        <label
                            htmlFor=""
                            onClick={() => {
                                document.getElementById("image").focus();
                            }}
                        >
                            Change Image
                        </label>
                        <input
                            id="image"
                            name="cafeImage"
                            type="file" // Specify accepted file types if needed
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border border-gray-300 w-full py-2 px-3 rounded-md focus:border-black focus:outline-none"
                        />
                    </div>
                    <input type="submit" value="Change" />
                </form>
            </div>
            <div>
                <UpdateCafe />
            </div>
        </div>
    )
}

export default Cafe