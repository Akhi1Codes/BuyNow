import React, { useState, useEffect, useRef } from "react";
import MetaData from "../utils/MetaData";
import { useGetUserQuery, useUpdateUserMutation } from "../redux/api/authApi";

const Profile = () => {
  // Fetch user data
  const { data, isLoading: isLoadingUser } = useGetUserQuery();

  // State for editable fields
  const [editableUser, setEditableUser] = useState({
    name: "",
    email: "",
  });

  // Refs for input fields
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // Mutation hook for updating user
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Track which field is currently being edited
  const [editingField, setEditingField] = useState(null);

  // Initialize editable fields when user data is loaded
  useEffect(() => {
    if (data?.user) {
      setEditableUser({
        name: data.user.name || "",
        email: data.user.email || "",
      });
    }
  }, [data]);

  // Handle editing a specific field
  const handleEdit = (field) => {
    setEditingField(field);
    const inputRef = field === "name" ? nameInputRef : emailInputRef;

    if (inputRef.current) {
      inputRef.current.removeAttribute("readOnly");
      inputRef.current.focus();
    }
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      // Validate inputs
      if (!editableUser.name || !editableUser.email) {
        return;
      }

      // Perform update
      const response = await updateUser({
        name: editableUser.name,
        email: editableUser.email,
      }).unwrap();
      console.log(response);

      // Reset editing state
      setEditingField(null);

      // Show success message
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    // Reset to original data
    setEditableUser({
      name: data?.user?.name || "",
      email: data?.user?.email || "",
    });
    setEditingField(null);
  };

  // Render loading state
  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  // Render profile
  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title="Profile Page" content="Profile Details" />

      <div className="max-w-md mx-auto rounded-lg overflow-hidden">
        {/* Profile Image */}
        <div className="flex justify-center py-6">
          <img
            src={data?.user?.avatar?.url}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-gray-200"
          />
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Name</label>
            <div className="flex items-center">
              <input
                ref={nameInputRef}
                type="text"
                value={editableUser.name}
                readOnly={editingField !== "name"}
                onChange={(e) =>
                  setEditableUser((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 border rounded ${
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

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-300 font-bold mb-2">Email</label>
            <div className="flex items-center">
              <input
                ref={emailInputRef}
                type="email"
                value={editableUser.email}
                readOnly={editingField !== "email"}
                onChange={(e) =>
                  setEditableUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className={`w-full px-3 py-2 border rounded ${
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

          {/* Action Buttons */}
          {editingField && (
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
