import React, { useState, useEffect, useRef } from "react";
import Loader from "../../components/Loader";
import MetaData from "../../utils/MetaData";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "../../redux/api/authApi";
import useProtectedRouteRedirect from "../../hooks/useProtectedRouteRedirect";

const Profile = () => {
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [updatePassword, { isLoading: isPasswordUpdating }] =
    useUpdateUserPasswordMutation();

  useProtectedRouteRedirect(error);

  const [editableUser, setEditableUser] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [editingField, setEditingField] = useState(null);
  const [showPasswordField, setshowPasswordField] = useState(false);

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  useEffect(() => {
    if (data?.user) {
      setEditableUser({
        name: data.user.name || "",
        email: data.user.email || "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [data]);

  const handleEdit = (field) => {
    if (inputRefs[field]) {
      setEditingField(field);

      const inputRef = inputRefs[field];
      if (inputRef.current) {
        inputRef.current.removeAttribute("readOnly");
        inputRef.current.focus();
      }
      if (field == "password") {
        inputRef.current.placeholder = "Enter current password";
      }
    }
  };

  const handleSave = async () => {
    if (editingField === "name" || editingField === "email") {
      try {
        if (!editableUser.name || !editableUser.email) {
          setStatus("Please fill in all user fields");
          return;
        }
        await updateUser({
          name: editableUser.name,
          email: editableUser.email,
        }).unwrap();
        setEditingField(null);
        setStatus("");
      } catch (error) {
        setStatus("Profile update failed:");
        return;
      }
    }
    if (editingField === "password") {
      if (
        !editableUser.oldPassword ||
        !editableUser.newPassword ||
        !editableUser.confirmNewPassword
      ) {
        setStatus("Please fill in all password fields");
        return;
      }
      if (editableUser.newPassword !== editableUser.confirmNewPassword) {
        setStatus("New passwords do not match");
        return;
      }
      if (editableUser.newPassword.length < 8) {
        setStatus("New password must be at least 8 characters long");
        return;
      }

      try {
        await updatePassword({
          oldPassword: editableUser.oldPassword,
          password: editableUser.newPassword,
        }).unwrap();
        setEditableUser((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        setStatus("");
      } catch (error) {
        setStatus("Failed to update password");
      }
    }
  };

  const handleCancel = () => {
    setEditableUser({
      name: data?.user?.name || "",
      email: data?.user?.email || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setStatus("");
    setEditingField(null);
    setshowPasswordField(false);
    Object.values(inputRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.setAttribute("readOnly", true);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title="Profile Page" content="Profile Details" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-md mx-auto rounded-lg overflow-hidden">
          <div className="flex justify-center py-6">
            <img
              src={data?.user?.avatar?.url}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-gray-200"
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(showPasswordField);
            }}
          >
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2">
                  Name
                </label>
                <div className="flex items-center">
                  <input
                    ref={inputRefs.name}
                    type="text"
                    value={editableUser.name}
                    autoComplete="name "
                    readOnly
                    onChange={(e) =>
                      setEditableUser((prev) => ({
                        ...prev,
                        name: e.target.value || "",
                      }))
                    }
                    className={`w-[85%] px-3 py-2 border rounded ${
                      editingField === "name"
                        ? "bg-white text-black"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  />
                  {editingField !== "name" && (
                    <button
                      onClick={() => handleEdit("name")}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 font-bold mb-2">
                  Email
                </label>
                <div className="flex items-center">
                  <input
                    ref={inputRefs.email}
                    type="email"
                    value={editableUser.email}
                    autoComplete="email"
                    readOnly
                    onChange={(e) =>
                      setEditableUser((prev) => ({
                        ...prev,
                        email: e.target.value || "",
                      }))
                    }
                    className={`w-[85%] px-3 py-2 border rounded ${
                      editingField === "email"
                        ? "bg-white text-black"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  />
                  {editingField !== "email" && (
                    <button
                      onClick={() => handleEdit("email")}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <label
                    htmlFor="oldPassword"
                    className="block text-gray-300 font-bold mb-2"
                  >
                    Current Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type="password"
                      id="oldPassword"
                      ref={inputRefs.password}
                      readOnly
                      value={editableUser.oldPassword}
                      autoComplete="current-password"
                      onChange={(e) =>
                        setEditableUser((prev) => ({
                          ...prev,
                          oldPassword: e.target.value || "",
                        }))
                      }
                      placeholder="*********"
                      className="w-[85%] px-3 py-2 border rounded bg-gray-100 text-gray-700"
                      required
                    />
                    {!showPasswordField && (
                      <button
                        className="ml-2 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setshowPasswordField(!showPasswordField);
                          handleEdit("password");
                        }}
                      >
                        {" "}
                        Edit
                      </button>
                    )}
                  </div>
                  {status && <p className="text-sm text-red-700">{status}</p>}
                </div>
                {showPasswordField && (
                  <div>
                    <div className="mb-6">
                      <label
                        htmlFor="newPassword"
                        className="block text-gray-300 font-bold mb-2"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        value={editableUser.newPassword}
                        onChange={(e) =>
                          setEditableUser((prev) => ({
                            ...prev,
                            newPassword: e.target.value || "",
                          }))
                        }
                        placeholder="Enter new password"
                        className="w-[85%] px-3 py-2 border rounded bg-gray-100 text-gray-700"
                        required
                        minLength={8}
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="confirmNewPassword"
                        className="block text-gray-300 font-bold mb-2"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        value={editableUser.confirmNewPassword}
                        autoComplete="confirm-password"
                        onChange={(e) =>
                          setEditableUser((prev) => ({
                            ...prev,
                            confirmNewPassword: e.target.value || "",
                          }))
                        }
                        placeholder="Confirm new password"
                        className="w-[85%] px-3 py-2 border rounded bg-gray-100 text-gray-700"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                )}
              </div>

              {(editingField || showPasswordField) && (
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    {isUpdating || isPasswordUpdating ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
