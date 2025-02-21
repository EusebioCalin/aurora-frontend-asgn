

interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}

interface EndpointMovie {
  id: string;
  title: string;
  description: string;
  image_url: string;
  rating: number;
}

export {
  type Movie,
  type EndpointMovie
}