import { GiBullseye } from "react-icons/gi";
import { FaRegThumbsUp } from "react-icons/fa";
import { CiFaceMeh } from "react-icons/ci";
import { IconType } from "react-icons";
import { Icon } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    3: GiBullseye,
    4: CiFaceMeh,
    5: FaRegThumbsUp,
  };
  return <Icon as={iconMap[rating]} color="blue.500"></Icon>;
};

export default Emoji;
