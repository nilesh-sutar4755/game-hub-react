import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/react.svg";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
interface Props {
  onSearch: (searchText: string) => void;
  onClear: () => void;
  clearInputValue?: boolean;
}

const NavBar = ({ onSearch, onClear, clearInputValue }: Props) => {
  return (
    <HStack padding="10px">
      <Image src={logo} boxSize="60px"></Image>
      <SearchInput
        onSearch={onSearch}
        onClear={onClear}
        clearInputValue={clearInputValue}
      />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
