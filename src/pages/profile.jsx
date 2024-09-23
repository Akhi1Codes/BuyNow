import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { userProfile, updateProfile } from "../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const refs = [useRef(null), useRef(null)];
  const [editName, seteditName] = useState();
  const [editEmail, seteditEmail] = useState();
  const { profile } = useSelector((state) => state.auth);
  const name = profile?.user?.name;
  const email = profile?.user?.email;
  const image = profile?.user?.avatar?.url;

  useEffect(() => {
    dispatch(userProfile());
  }, []);

  useEffect(() => {
    seteditName(name);
    seteditEmail(email);
  }, [name, email]);
  const handleEdit = (index) => {
    refs[index].current.removeAttribute("readOnly");
    refs[index].current.focus();
    refs[index].current.style.backgroundColor = "white";
    refs[index].current.style.color = "black";
  };

  const handleSave = (name, email) => {
    dispatch(updateProfile({ name, email }));
    refs.forEach((ref) => {
      ref.current.setAttribute("readOnly", true);
      ref.current.style.backgroundColor = "inherit";
      ref.current.style.color = "white";
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 py-10">
      <MetaData title="Profile Page" content="Profile Details" />
      <div>
        <img className="rounded-full" src={image} alt="Profile" />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            ref={refs[0]}
            type="text"
            value={editName}
            readOnly
            className="focus:outline-none bg-inherit"
            onChange={(e) => seteditName(e.target.value)}
          />
          <button onClick={() => handleEdit(0)}>Edit</button>
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            ref={refs[1]}
            type="text"
            value={editEmail}
            readOnly
            className="focus:outline-none bg-inherit"
            onChange={(e) => seteditEmail(e.target.value)}
          />
          <button onClick={() => handleEdit(1)}>Edit</button>
        </div>
        <div>
          <button onClick={() => handleSave(editName, editEmail)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
