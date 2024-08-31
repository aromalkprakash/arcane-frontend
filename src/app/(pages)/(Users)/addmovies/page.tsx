"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { baseAxiosInstance } from "@/lib/axiosInstance";
import { Cross, LucidePictureInPicture } from "lucide-react";
import "@/styles/addMovie.scss";

const CustomAddMovie: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    director: "",
    releaseYear: "",
    trailer: "",
    poster: "",
    bannerImg: "",
  });

  const posterRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "poster" | "bannerImg"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, [type]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const movieData = {
      ...formData,
      director: formData.director.split(",").map((d) => d.trim()),
    };

    baseAxiosInstance
      .post("http://localhost:8080/api/movie/addmovie", movieData, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Successfully created movie");
        setFormData({
          title: "",
          description: "",
          genre: "",
          duration: "",
          director: "",
          releaseYear: "",
          trailer: "",
          poster: "",
          bannerImg: "",
        });
      })
      .catch(() => {
        toast.error("Failed to create movie");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form-container">
      <h2 className="form-title">Add new film</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Film Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input
          id="director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Directors (comma separated)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="trailer">Trailer URL</label>
        <input
          id="trailer"
          name="trailer"
          value={formData.trailer}
          onChange={handleChange}
          placeholder="URL"
        />
      </div>
      <div className="form-group">
        <label htmlFor="releaseYear">Release Year</label>
        <input
          id="releaseYear"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          placeholder="Year"
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Overview</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="About the film"
        />
      </div>
      <div className="form-group">
        <label htmlFor="poster">Poster</label>
        {formData.poster && (
          <div className="image-preview">
            <Cross
              className="remove-icon"
              onClick={() => {
                setFormData({ ...formData, poster: "" });
                if (posterRef.current) posterRef.current.value = "";
              }}
            />
            <img src={formData.poster} alt="Poster" className="image" />
          </div>
        )}
        <div className="upload-section">
          <LucidePictureInPicture
            className="upload-icon"
            onClick={() => posterRef.current?.click()}
          />
          <span className="image-labels">Click here to upload poster</span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={posterRef}
          hidden
          onChange={(e) => handleImageChange(e, "poster")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="banner">Banner</label>
        {formData.bannerImg && (
          <div className="image-preview">
            <Cross
              className="remove-icon"
              onClick={() => {
                setFormData({ ...formData, bannerImg: "" });
                if (bannerRef.current) bannerRef.current.value = "";
              }}
            />
            <img src={formData.bannerImg} alt="Banner" className="image" />
          </div>
        )}
        <div className="upload-section">
          <LucidePictureInPicture
            className="upload-icon"
            onClick={() => bannerRef.current?.click()}
          />
          <span className="image-labels">Click here to upload banner</span>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={bannerRef}
          hidden
          onChange={(e) => handleImageChange(e, "bannerImg")}
        />
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default CustomAddMovie;
