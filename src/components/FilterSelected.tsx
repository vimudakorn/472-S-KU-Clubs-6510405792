import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
    placeholder: string;
    items: string[];
    className?: string;
}
export default function FilterSelected({placeholder , items, className}: Props) {
  return (
    <Select>
      <SelectTrigger className={`h-10 bg-green-900 border-none focus:border-transparent focus:ring-0 focus:outline-none rounded-none text-gray-100 ${className}`}>
        <SelectValue className="" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
