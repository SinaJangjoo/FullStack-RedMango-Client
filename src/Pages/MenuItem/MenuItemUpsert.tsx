import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Categories } from "../../Utility/SD";

const Categories=[
  SD_Categories.APPETIZER,
  SD_Categories.ENTREE,
  SD_Categories.DESSERT,
  SD_Categories.BEVERAGES,
]

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: Categories[0],
  price: "",
  image: "",
};


function MenuItemUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>(); //The image that we want to store in database
  const [imageToDisplay, setImageToDisplay] = useState<string>(); // The image that we want to display with local storage
  const [loading, setLoading] = useState(false);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const { data } = useGetMenuItemByIdQuery(id);
  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
        image: data.result.image,
      };
      setMenuItemInputs(tempData);
      //setImageToDisplay(data.result.image)
    }
  }, [data]);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0]; // we retrieve the first file
  //   if (file) {
  //     const imgType = file.type.split("/")[1]; // It will gives us the type of the image
  //     const validImgTypes = ["jpeg", "jpg", "png"]; // The validate image types that we eant to give
  //     const isImgTypeValid = validImgTypes.filter((e) => {
  //       return e === imgType;
  //     }); // If the image type was matches with the image that we uploaded, then store that in isImgValid

  //     //Now we want to add some validations on file size
  //     // if (file.size > 1000 * 1024) {
  //     //   setImageToStore("");
  //     //   toastNotify("File must be less than 1 MB", "error");
  //     //   return;
  //     // } else if (isImgTypeValid.length === 0) {
  //     //   setImageToStore("");
  //     //   toastNotify("File must be in JPEG , JPG or PNG", "error");
  //     //   return;
  //     // }

  //     //Save the file to our database
  //     // const reader = new FileReader();
  //     // reader.readAsDataURL(file);
  //     // setImageToStore(file);
  //     // reader.onload = (e) => {
  //     //   const imgUrl = e.target?.result as string;
  //     //   setImageToDisplay(imgUrl);
  //     //};
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!menuItemInputs.image && !id) {
      toastNotify("Pleade upload an Iamge", "error");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    formData.append("File", menuItemInputs.image);

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMenuItem({
        data: formData,
        id,
      });
      toastNotify("Menu Item updated successfully", "success");
    } else {
      //create
      const response = await createMenuItem(formData);
      toastNotify("Menu Item created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/menuItem/menuItemList");
    }

    setLoading(false);
  };
  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              rows={10}
              name="description"
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
             <select
              className="form-control mt-3 form-select"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            >
              {Categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="text"
              name="image"
              onChange={handleMenuItemInput}
              className="form-control mt-3"
              value={menuItemInputs.image}
              placeholder="Enter Image URL"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/menuItem/menuItemList")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={menuItemInputs.image}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
