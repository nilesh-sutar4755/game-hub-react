import { Button } from "@chakra-ui/react";
interface Props {
  onReset: () => void;
}
const ResetFilter = ({ onReset }: Props) => {
  return <Button onClick={() => onReset()}>Reset Filters</Button>;
};

export default ResetFilter;
