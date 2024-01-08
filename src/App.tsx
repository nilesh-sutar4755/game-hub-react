import { Grid, GridItem, Show, HStack, Flex, Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import ResetFilter from "./components/ResetFilter";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string | "";
  searchText: string | "";
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [clearInputValue, setClearInputValue] = useState(false);

  const handleClearInput = () => {
    setClearInputValue(false);
    setTimeout(() => {
      setClearInputValue(true);
    }, 0);
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: `1fr`,
        lg: `200px 1fr`,
      }}
    >
      <GridItem area="nav" marginY={5} paddingX={3}>
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
          onClear={() => setGameQuery({ ...gameQuery, searchText: "" })}
          clearInputValue={clearInputValue}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX="5px">
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box marginLeft={10}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginTop={3} gap={3}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
              onSelectedPlatform={(platform) =>
                setGameQuery({ ...gameQuery, platform })
              }
            />
            <SortSelector
              selectedSorOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
            />
            <ResetFilter
              onReset={() => {
                setGameQuery({
                  genre: null,
                  platform: null,
                  sortOrder: "",
                  searchText: "",
                }),
                  handleClearInput();
              }}
            />
          </Flex>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
