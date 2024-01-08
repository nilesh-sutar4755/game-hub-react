import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

interface Props {
  onSearch: (searchText: string) => void;
  onClear: () => void;
  clearInputValue?: boolean;
}

const SearchInput = ({ onSearch, onClear, clearInputValue }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    if (ref.current) {
      setInputValue(ref?.current?.value);
    }
  };

  const handleClear = () => {
    onClear();
    setInputValue("");
    if (ref.current) ref.current.value = "";
  };

  useEffect(() => {
    if (clearInputValue) {
      setInputValue("");
      if (ref.current) ref.current.value = "";
    }
  }, [clearInputValue]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
          ref={ref}
          onChange={handleInput}
          value={inputValue}
        ></Input>
        {ref?.current?.value && (
          <InputRightElement
            onClick={handleClear}
            cursor="pointer"
            children={<MdOutlineClose />}
          />
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
