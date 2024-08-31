import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { baseAxiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import { updateUserProfile } from "@/api/userUrl";

const EditProfile: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    username: "",
    bio: "",
    link: "",
    image: "",
    coverImage: "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const profileImgRef = useRef<HTMLInputElement>(null);
  const coverImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    baseAxiosInstance
      .get("http://localhost:8080/api/users/me")
      .then((response) => {
        const userData = response.data;
        setUser({
          fullName: userData.fullName,
          email: userData.email,
          username: userData.username,
          bio: userData.bio,
          link: userData.link,
          image: userData.image,
          coverImage: userData.coverImage,
          currentPassword: "",
          newPassword: "",
        });
        setImage(userData.image);
        setCoverImage(userData.coverImage);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load user profile");
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedUser = { ...user, image, coverImage };

    updateUserProfile(updatedUser)
      .then(() => {
        toast.success("Successfully updated profile");
        setIsSubmitting(false);
        // router.push('/profile'); // Navigate to the profile page or any other page
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile");
        setIsSubmitting(false);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const openDialog = () => {
    const dialog = document.getElementById("edit_profile_dialog") as HTMLDialogElement;
    dialog?.showModal();
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <>
      <button
        className="btn btn-outline bg-transparent text-white rounded-full btn-sm"
        onClick={openDialog}
      >
        Edit Profile
      </button>
      <dialog id="edit_profile_dialog" className="modal">
        <div className="modal-box border rounded-md border-black shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
              <img
                src={image || "/default-profile.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <input
                type="file"
                ref={profileImgRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => profileImgRef.current?.click()}
                className="btn bg-black text-white"
              >
                Change Profile Picture
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                src={coverImage || "/default-cover.png"}
                alt="Cover"
                className="w-full h-40 object-cover"
              />
              <input
                type="file"
                ref={coverImgRef}
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => coverImgRef.current?.click()}
                className="btn bg-black text-white"
              >
                Change Cover Image
              </button>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <textarea
              placeholder="Bio"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <input
              type="text"
              placeholder="Link"
              value={user.link}
              onChange={(e) => setUser({ ...user, link: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <input
              type="password"
              placeholder="Current Password"
              value={user.currentPassword}
              onChange={(e) => setUser({ ...user, currentPassword: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <input
              type="password"
              placeholder="New Password"
              value={user.newPassword}
              onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
              className='flex-1 input border border-gray-700 rounded p-2 input-md'
              />
            <button
              type="submit"
              className="btn bg-white text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button type="button" className="btn btn-outline mt-6" onClick={() => {
              const dialog = document.getElementById("edit_profile_dialog") as HTMLDialogElement;
              dialog?.close();
            }}>Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfile;
