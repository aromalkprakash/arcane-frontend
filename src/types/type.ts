export type MovieT = {
    _id: string,
    movie: string,
    title: string,
    poster: string,
    bannerImg: string,
    releaseYear: number,
    director: string[],
    trailer: string,
    genre: string[],
    duration: string,
    description: string,
    actors: string[],
};

export interface User {
    image: string;
      _id: string;
      fullName: string;
      email: string;
      username: string;
      role: string;
      bio: string;
      likedMovies: string[];
      followers: string[];
      following: string[];
      createdAt: string;
      updatedAt: string;
  }

export type MReview = {
    length: number;
    userId: User | string;
    map: any;
    _id: string,
    review: string,
    rating: number,
    movieId: string,
    user: User,
    username?: string,
    image?: string,
    likes: string[],
    createdAt: any,
    usersId: string
}

export type UReview = {
    length: number;
    userId: string;
    map: any;
    _id: string,
    review: string,
    rating: number,
    movieId: string,
    user: User,
    movie: MovieT,
    username?: string,
    image?: string,
    likes: string[],
    createdAt: any,
}

export type authT = {
    _id: string,
    username: string,
    fullName: string,
    image: string,
    coverImage: string,
    createdAt: string,
    bio: string,
    email: string,
    following: string[],
    unfollow: string[];
}

export type FReview = {
    _id: string;
    rating: number;
    user: User;
    userId: string;
    movie: MovieT;
    review: any;
    likes: string;
    limit: number;
    page: number;
    createdAt: any;
    reviews: MReview;
    pagination: number;
};
  
export type FUReviewPageResponse = {
    reviews: FReview[];
    totalPages: number;
    totalReviews: number;
  };
  
  
export interface LikeUnlikeResponse {
    message: string;
    likes: string[]; // Adjust this type based on your actual response
}


export interface ProfilePageCounts {
    likedMoviesCount: string;
    likedReviewsCount: string;
    followingCount: string;
    followersCount: string;
}

  
