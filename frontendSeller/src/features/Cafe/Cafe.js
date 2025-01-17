import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import UpdateCafe from "./UpdateCafe";
import { useNavigate } from "react-router-dom";

const Cafe = () => {
	const [cafe_image_url, setImage] = useState();
	const seller_id = Cookies.get("seller_id");
	const { data } = useFetch(`https://kypjcafeapi.onrender.com/cafe/${seller_id}`);
	const navigate = useNavigate();
	const hasItem = Cookies.get("has_items") === "true";

	const handleDelete = async (e) => {
		e.preventDefault();

		if (hasItem) {
			window.alert("You need to delete all item first before delete cafe!");
		} else {
			const userConfirmed = window.confirm("Are you sure you want to delete this cafe?");
			if (userConfirmed) {
				try {
					const cafe_id = data[0].cafe_id;

					const response = await fetch(`https://kypjcafeapi.onrender.com/cafe/${cafe_id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (response.status === 200 || response.status === 201) {
						console.log("Delete Cafe Successful");
						navigate("/welcome");
						// You can also access the response data if the server sends any.
						console.log("Server response data:", response.data);
					} else {
						console.error("Delete failed with status code:", response.status);
						// Handle the error and provide user feedback
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	return (
		<div className="widescreen:section-min-height tallscreen:section-min-height tallscreenMax:section-min-height bg-cover bg-blend-multiply bg-slate-500 bg-no-repeat bg-[url('https://www.v2.kypj.edu.my/wp-content/uploads/2020/04/Kafetaria-05.jpg')] pb-10">
			<Header />
			<h1 className="mt- mb-2 text-3xl text-zinc-200 text-center p-4">Your Cafe</h1>
			<div className="font-Rubik justify-center text-zinc-200">
				{data.map((cafe) => (
					<div key={cafe.id} className=" text-black flex items-center justify-center m-auto card max-w-fit max-h-max">
						<img src={`https://kypjcafeapi.onrender.com/images/${cafe.cafe_image_url}`} alt="" className="max-w-full rounded-t-3xl h-52" />
						<div className="flex flex-col items-center justify-center min-w-full p-4 bg-white card-body rounded-b-3xl">
							<h3 className="card-title">{cafe.cafe_name}</h3>
							<p className="text-sm">{cafe.description}</p>
							<p className="">{cafe.cafe_location}</p>
						</div>
					</div>
				))}

				<UpdateCafe />

				<button onClick={handleDelete} className="flex justify-center mt-5 text-white text-sm w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 bg-[#6859ea] hover:bg-gradient-to-r from-red-500 to-red-800">
					Delete Cafe
				</button>
			</div>
		</div>
	);
};

export default Cafe;
