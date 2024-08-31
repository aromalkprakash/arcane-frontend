"use client";
import { useState, useEffect, useRef } from "react";
import { baseAxiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import { Cross, LucidePictureInPicture } from "lucide-react";
import { useRouter } from "next/navigation";
import "../../../../../../styles/addMovie.scss";
import Loading from "@/components/User/Loading/Loading";

interface MovieProp {
  params: {
    movieId: string;
  };
}

const EditMovie: React.FC<MovieProp> = ({ params }) => {
  const { movieId } = params;
  const router = useRouter();

  const [movie, setMovie] = useState({
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

  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState<string | null>(null);
  const [bannerImg, setBannerImg] = useState<string | null>(null);

  const posterRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (movieId) {
      baseAxiosInstance
        .get(`http://localhost:8080/api/movie/getmoviedetails/${movieId}`)
        .then((response) => {
          const movieData = response.data;
          setMovie({
            title: movieData.title,
            description: movieData.description,
            genre: movieData.genre,
            duration: movieData.duration,
            director: movieData.director.join(", "),
            releaseYear: movieData.releaseYear,
            trailer: movieData.trailer,
            poster: movieData.poster,
            bannerImg: movieData.bannerImg,
          });
          setPoster(movieData.poster);
          setBannerImg(movieData.bannerImg);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to load movie details");
        });
    }
  }, [movieId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedMovie = { ...movie, poster, bannerImg };

    baseAxiosInstance
      .post(
        `http://localhost:8080/api/movie/updatemovie/${movieId}`,
        updatedMovie,
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Successfully updated movie");
        router.push(`/film/${movieId}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update movie");
      });
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPoster(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPoster("");
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImg(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setBannerImg("");
    }
  };

  if (loading) return <div><Loading/></div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="custom-form-container"
    > 
      <h2 className="form-title">Edit film</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={movie.title}
          onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          placeholder="Film Title"
          name="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          value={movie.genre}
          onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
          placeholder="Genre"
        />
      </div>
    
      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input
          id="director"
          value={movie.director}
          onChange={(e) =>
            setMovie({ ...movie, director: e.target.value })
          }
          placeholder="Directors (comma separated)"
        />
      </div>
      <div className="form-group">
        <label htmlFor="trailer">Trailer</label>
        <input
          id="trailer"
          value={movie.trailer}
          onChange={(e) =>
            setMovie({ ...movie, trailer: e.target.value })
          }
          placeholder="URL"
        />
      </div>
  
      <div className="form-group">
        <label htmlFor="releaseYear">Release Year</label>
        <input
          id="releaseYear"
          value={movie.releaseYear}
          onChange={(e) =>
            setMovie({ ...movie, releaseYear: e.target.value })
          }
          placeholder="Year"
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          value={movie.duration}
          onChange={(e) =>
            setMovie({ ...movie, duration: e.target.value })
          }
          placeholder="Duration"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Overview</label>
        <textarea
          id="description"
          value={movie.description}
          onChange={(e) =>
            setMovie({ ...movie, description: e.target.value })
          }
          placeholder="About film"
          name="description"
        />
        </div>
        <div className="form-group">
      <label htmlFor="poster">Poster</label>
      {poster && (
        <div className="image-preview">
          <Cross
            className="remove-icon"
            onClick={() => {
              setPoster(null);
              if (posterRef.current) posterRef.current.value = "";
            }}
          />
          <img
            src={poster}
            className="w-full mx-auto h-72 object-contain rounded"
          />
        </div>
      )}
        <div className="upload-section">
          <LucidePictureInPicture
            className="fill-primary w-6 h-6 cursor-pointer"
            onClick={() => posterRef.current?.click()}
          />
          <p className="image-labels">Click here to upload poster</p>
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={posterRef}
          onChange={handlePosterChange}
        />
      </div>
    
      <div className="form-group">
        <label htmlFor="banner">Banner</label>
        {bannerImg && (
          <div className="image-preview">
            <Cross
              className="remove-icon"
              onClick={() => {
                setBannerImg(null);
                if (bannerRef.current) bannerRef.current.value = "";
              }}
            />
            <img
              src={bannerImg}
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}
          <div className="upload-section">
            <LucidePictureInPicture
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => bannerRef.current?.click()}
            />
            <p className="image-labels">Click here to upload banner image</p>
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={bannerRef}
            onChange={handleBannerChange}
          />
      </div>
      <button type="submit" className="submit-btn">
        Submit
        </button>
    </form>
  );
};

export default EditMovie;
