import userGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres } = userGenres();
  return (
    <ul>
      {genres?.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;
